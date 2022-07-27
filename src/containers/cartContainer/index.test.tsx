import userEvent from '@testing-library/user-event';
import { renderWithStore, screen, waitFor } from '../../utils/testUtils';
import { getShoppingCart } from '../../utils/services';
import { shoppingCartResponse } from '../../utils/fixtures';
import CartContainer from '.';

jest.mock('../../utils/services');

beforeEach(() => {
  (getShoppingCart as jest.Mock).mockResolvedValue(shoppingCartResponse);
});

afterEach(() => {
  (getShoppingCart as jest.Mock).mockReset();
});

describe('<CartContainer/>', () => {
  it('should not render the cart container when getShoppingCart returns null', () => {
    (getShoppingCart as jest.Mock).mockResolvedValue(null);
    const { container } = renderWithStore(<CartContainer />);

    expect(screen.queryByTestId('cartWrapper')).not.toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('should render the cart container correctly when getShoppingCart call returns data', async () => {
    const { container } = renderWithStore(<CartContainer />);

    expect(await screen.findAllByRole('button')).toHaveLength(2);
    expect(screen.getAllByTestId('productRow')).toHaveLength(3);
    expect(container).toMatchSnapshot();
  });

  it('should update the total product and shopping cart values when the product quantity changes', async () => {
    renderWithStore(<CartContainer />);

    const input = await screen.findByTestId('quantityInput_0');
    const totalProductValue = screen.getByTestId('productTotals_0');
    const totalCartValue = screen.getByTestId('cartSubTotal');

    expect(input).toHaveValue(1);
    expect(totalProductValue).toHaveTextContent('$1.80');
    expect(totalCartValue).toHaveTextContent('$8.25');

    userEvent.tab();
    expect(input).toHaveFocus();

    userEvent.clear(input);
    userEvent.type(input, '3');

    await waitFor(() => {
      expect(input).toHaveValue(3);
    });

    expect(totalProductValue).toHaveTextContent('$5.40');
    expect(totalCartValue).toHaveTextContent('$11.85');
  });

  it('should reset the total product and shopping cart values when the "Clear" button is clicked', async () => {
    renderWithStore(<CartContainer />);

    const input = await screen.findByTestId('quantityInput_0');
    const totalProductValue1 = screen.getByTestId('productTotals_0');
    const totalProductValue2 = screen.getByTestId('productTotals_1');
    const totalProductValue3 = screen.getByTestId('productTotals_2');
    const totalCartValue = screen.getByTestId('cartSubTotal');
    const button = screen.getByTestId('buttonClear');

    expect(input).toHaveValue(3);
    expect(totalProductValue1).toHaveTextContent('$5.40');
    expect(totalProductValue2).toHaveTextContent('$3.10');
    expect(totalProductValue3).toHaveTextContent('$3.35');
    expect(totalCartValue).toHaveTextContent('$11.85');

    userEvent.click(button);

    await waitFor(() => {
      expect(input).toHaveValue(0);
    });
    expect(totalProductValue1).toHaveTextContent('$0');
    expect(totalProductValue2).toHaveTextContent('$0');
    expect(totalProductValue3).toHaveTextContent('$0');
    expect(totalCartValue).toHaveTextContent('$0');
  });
});
