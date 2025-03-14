import { render, screen } from '@testing-library/react';
import OrderList from '../components/OrderList';

test('renders order list', () => {
  render(<OrderList orders={[{ id: 1, product: 'Laptop', quantity: 2 }]} />);

  expect(screen.getByText(/Laptop/i)).toBeInTheDocument();
});
