export const normalizeAddress = (address: string): string => {
  if (!address || typeof address !== 'string') {
    throw new Error('Invalid address');
  }

  return address
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\b(st|street|rd|road|ave|avenue)\b/g, match => {
      const abbr: Record<string, string> = {
        st: 'street',
        rd: 'road',
        ave: 'avenue'
      };
      return abbr[match] || match;
    });
};