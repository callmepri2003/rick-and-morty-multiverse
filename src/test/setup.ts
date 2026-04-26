import "@testing-library/jest-dom";

// Silence recharts ResizeObserver warnings in jsdom
window.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};
