import { describe, it, expect } from 'vitest';
import { sum } from './sum';

describe('sum', () => {
  it('adds two positive numbers', () => {
    expect(sum(2, 3)).toBe(5);
  });

  it('adds a positive and a negative number', () => {
    expect(sum(5, -2)).toBe(3);
  });

  it('adds two negative numbers', () => {
    expect(sum(-4, -6)).toBe(-10);
  });

  it('adds zero', () => {
    expect(sum(0, 5)).toBe(5);
    expect(sum(0, 0)).toBe(0);
  });
});
