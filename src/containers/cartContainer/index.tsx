import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReducedState } from '../../redux/types';
import { fetchCart, changeProductQty, clearCart } from '../../redux/actions';
import './CartContainer.scss';

const CartContainer = () => {
  const dispatch = useDispatch();
  const products = useSelector(
    (state: ReducedState) => state.shoppingCart.products
  );
  const cartSubTotal = useSelector(
    (state: ReducedState) => state.shoppingCart.cartSubTotal
  );
  const currency = useSelector(
    (state: ReducedState) => state.shoppingCart.currency
  );
  const handleFocus = (e: any) => e.target.select();
  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  return currency ? (
    <div id="cartWrapper" className="cartWrapper">
      <div className="productWrapper">
        {products?.map((item, idx) => {
          const { id, title, qty, price } = item;
          return (
            <div data-testId="productRow" key={id} className="productRow">
              <h6 data-testId={`productTitle_${idx}`} className="productTitle">
                {title}
              </h6>
              <div className="productNumbers">
                <input
                  data-testId={`quantityInput_${idx}`}
                  type="number"
                  value={qty}
                  min={0}
                  max={99}
                  name={String(id)}
                  onFocus={handleFocus}
                  onChange={(e) => {
                    if (
                      e.target.value.length > 1 &&
                      e.target.value[0] === '0'
                    ) {
                      handleFocus(e);
                    }
                    dispatch(
                      changeProductQty({
                        id: Number(e.target.name),
                        qty: Number(e.target.value)
                      })
                    );
                  }}
                ></input>
                <h6
                  data-testId={`productTotals_${idx}`}
                  className="singleProductTotals"
                >
                  {currency + (price * qty).toFixed(2)}
                </h6>
              </div>
            </div>
          );
        })}
      </div>
      <div className="actionWrapper">
        <h2 data-testId="cartSubTotal" className="cartSubTotal">
          {currency + cartSubTotal.toFixed(2) || 0}
        </h2>
        <div className="buttonWrapper">
          <button
            data-testId="buttonClear"
            className="buttonClear"
            onClick={() => dispatch(clearCart())}
          >
            Clear
          </button>
          <button
            data-testId="buttonCheckout"
            className="buttonCheckout"
            disabled={!cartSubTotal}
          >
            Check Out
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default CartContainer;
