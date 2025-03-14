import { render, screen } from '@testing-library/react';
import OrderList from '../components/OrderList';

const orders = [
  { _id: '1', product: 'Laptop', quantity: 2, totalPrice: 2000 },
  { _id: '2', product: 'Phone', quantity: 1, totalPrice: 1000 },
];

test('renders order list correctly', () => {
  render(<OrderList orders={orders} />);

  expect(screen.getByText(/laptop/i)).toBeInTheDocument();
  expect(screen.getByText(/phone/i)).toBeInTheDocument();
});
