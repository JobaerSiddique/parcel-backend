export function generateTrackingNumber(): string {
  const prefix = 'TRK';
  const randomNum = Math.floor(100000 + Math.random() * 900000);
  const datePart = new Date().getTime().toString().slice(-6);
  return `${prefix}${datePart}${randomNum}`;
}