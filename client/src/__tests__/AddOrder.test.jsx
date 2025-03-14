import { render, screen, fireEvent } from '@testing-library/react';
import AddOrder from '../components/AddOrder';

test('submits order form correctly', () => {
  const mockAddOrder = jest.fn();

  render(<AddOrder onAdd={mockAddOrder} />);

  const productInput = screen.getByPlaceholderText(/product name/i);
  const quantityInput = screen.getByPlaceholderText(/quantity/i);
  const priceInput = screen.getByPlaceholderText(/price/i);
  const submitButton = screen.getByRole('button', { name: /add order/i });

  fireEvent.change(productInput, { target: { value: 'Tablet' } });
  fireEvent.change(quantityInput, { target: { value: '1' } });
  fireEvent.change(priceInput, { target: { value: '500' } });
  fireEvent.click(submitButton);

  expect(mockAddOrder).toHaveBeenCalledWith({
    product: 'Tablet',
    quantity: 1,
    totalPrice: 500,
  });
});
