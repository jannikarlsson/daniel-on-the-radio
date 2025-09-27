const { isToday, extractDateTime, getDate, getTime } = require('./utils');

describe('isToday', () => {
  it('returns true for today', () => {
    const today = new Date().toLocaleDateString();
    expect(isToday(today)).toBe(true);
  });
  it('returns false for non-today', () => {
    expect(isToday('2000-01-01')).toBe(false);
  });
  it('returns false for null/undefined', () => {
    expect(isToday(null)).toBe(false);
    expect(isToday(undefined)).toBe(false);
  });
});

describe('extractDateTime', () => {
  it('extracts timestamp from /Date(...) string', () => {
    expect(extractDateTime('/Date(1693526400000)/')).toBe(1693526400000);
  });
  it('returns -1 for invalid string', () => {
    expect(extractDateTime('invalid')).toBe(-1);
  });
});

describe('getDate', () => {
  it('returns localized date string for valid input', () => {
    const timestamp = Date.UTC(2023, 8, 1); // September 1, 2023
    const input = `/Date(${timestamp})/`;
    const expected = new Date(timestamp).toLocaleDateString();
    expect(getDate(input)).toBe(expected);
  });
  it('returns null for invalid input', () => {
    expect(getDate('invalid')).toBeNull();
    expect(getDate(null)).toBeNull();
  });
});

describe('getTime', () => {
  it('returns localized time string for valid input', () => {
    const timestamp = Date.UTC(2023, 8, 1, 12, 0, 0); // 12:00:00 UTC
    const input = `/Date(${timestamp})/`;
    const expected = new Date(timestamp).toLocaleTimeString();
    expect(getTime(input)).toBe(expected);
  });
  it('returns null for invalid input', () => {
    expect(getTime('invalid')).toBeNull();
    expect(getTime(undefined)).toBeNull();
  });
});
