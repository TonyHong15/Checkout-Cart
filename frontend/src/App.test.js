import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import calculate from './actions/calculate'

//Basic UI test
test('renders Title', () => {
  const { getByText } = render(<App />);
  const header = getByText(/Checkout Items/i);
  expect(header).toBeInTheDocument();
});

//Basic Unit tests for Calculations
describe("Checkout tests", () => {
    test('adding item with price 5.00 and of quantity 1 should return 5.00', () =>{
        expect(calculate.addQuantityItem(1, 5.00)).toBe(5.00)
        
    })
    test('applying 10% discount given total of 45.99 dollars should return 4.60', () =>
      {
        expect(calculate.calculateDiscount(10, 45.99)).toBe(4.60)
      })
    test('A tax of 13% after applying 10% discount given total of 45.99 dollars should return 5.38', () =>
      {
        let discount = calculate.calculateDiscount(10, 45.99)
        expect(calculate.calculateTax(13, 45.99, discount )).toBe(5.38)
    })
})

