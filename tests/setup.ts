import '@testing-library/jest-dom/vitest';

// JSDOM mock for window.scrollTo
if (typeof window !== 'undefined') {
  window.scrollTo = () => {};
}
