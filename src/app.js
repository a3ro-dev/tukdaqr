import QRCode from 'qrcode';
import { splitAmount, paymentUri } from './payments.js';

const form = document.querySelector('#payment-form');
const qrGrid = document.querySelector('#qr-grid');
const printButton = document.querySelector('#print-all');
const formatter = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 2 });

document.querySelector('#year').textContent = new Date().getFullYear();

const showError = (field, message = '') => {
  document.querySelector(`#${field}-error`).textContent = message;
  document.querySelector(`#${field}`).setAttribute('aria-invalid', Boolean(message));
};

form.addEventListener('submit', async event => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(form));
  const amount = Number(data.amount);
  const upiValid = /^[\w.-]{2,256}@[a-zA-Z]{2,64}$/.test(data.upi.trim());
  const nameValid = data.name.trim().length >= 2;
  const amountValid = Number.isFinite(amount) && amount >= 1 && amount <= 199900;

  showError('upi', upiValid ? '' : 'Enter a UPI ID like name@bank.');
  showError('name', nameValid ? '' : 'Enter the account holder name.');
  showError('amount', amountValid ? '' : 'Enter an amount from ₹1 to ₹1,99,900.');
  if (!upiValid || !nameValid || !amountValid) return form.querySelector('[aria-invalid="true"]').focus();

  const parts = splitAmount(amount);
  qrGrid.replaceChildren();
  document.querySelector('#empty').hidden = true;
  document.querySelector('#results').hidden = false;
  document.querySelector('#total-output').textContent = formatter.format(amount);
  document.querySelector('#count-output').textContent = parts.length;
  document.querySelector('#result-title').textContent = `${parts.length} payment${parts.length === 1 ? '' : 's'} to collect`;

  const button = form.querySelector('button[type="submit"]');
  button.disabled = true;
  button.firstElementChild.textContent = 'Generating…';

  for (const [index, part] of parts.entries()) {
    const uri = paymentUri({ ...data, upi: data.upi.trim(), name: data.name.trim(), note: data.note.trim() }, part, index);
    const image = await QRCode.toDataURL(uri, { width: 360, margin: 2, errorCorrectionLevel: 'M', color: { dark: '#142033', light: '#fffefb' } });
    const article = document.createElement('article');
    article.className = 'qr-sheet';
    article.innerHTML = `<div class="qr-meta"><span>Payment ${index + 1}</span><span>${index + 1} of ${parts.length}</span></div><img src="${image}" width="240" height="240" alt="UPI payment QR ${index + 1} for ${formatter.format(part)}"/><strong>${formatter.format(part)}</strong><span>${data.upi.trim()}</span><a class="download" href="${image}" download="tukdaqr-payment-${index + 1}.png">Download PNG</a>`;
    qrGrid.append(article);
  }

  button.disabled = false;
  button.firstElementChild.textContent = 'Regenerate QR codes';
  printButton.disabled = false;
  document.querySelector('#result-title').focus?.();
});

printButton.addEventListener('click', () => window.print());
