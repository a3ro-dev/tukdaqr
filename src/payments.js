const LIMIT = 1999;

export const splitAmount = total => {
  const paise = Math.round(total * 100);
  const chunk = LIMIT * 100;
  const count = Math.ceil(paise / chunk);
  return Array.from({ length: count }, (_, index) => Math.min(chunk, paise - index * chunk) / 100);
};

export const paymentUri = ({ upi, name, note }, amount, index) => {
  const query = new URLSearchParams({ pa: upi, pn: name, am: amount.toFixed(2), cu: 'INR' });
  if (note) query.set('tn', `${note} (${index + 1})`);
  return `upi://pay?${query}`;
};
