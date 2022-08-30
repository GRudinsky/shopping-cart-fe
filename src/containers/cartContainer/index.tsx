import React, { useEffect } from 'react';
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
    <form
      id="cartWrapper"
      className="cartWrapper"
      onSubmit={(e) => {
        e.preventDefault();
        window.alert('Submitting form');
      }}
    >
      <div className="productWrapper">
        {products?.map((item, idx) => {
          const { id, title, qty, price } = item;
          return (
            <div data-testid="productRow" key={id} className="productRow">
              <p data-testid={`productTitle_${idx}`} className="productTitle">
                {title}
              </p>
              <div className="productNumbers">
                <input
                  aria-labelledby={`quantityInput_${idx}`}
                  data-testid={`quantityInput_${idx}`}
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
                <p
                  data-testid={`productTotals_${idx}`}
                  className="singleProductTotals"
                >
                  {currency + (price * qty).toFixed(2)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="actionWrapper">
        <h2 data-testid="cartSubTotal" className="cartSubTotal">
          {currency + cartSubTotal.toFixed(2) || 0}
        </h2>
        <div className="buttonWrapper">
          <button
            data-testid="buttonClear"
            className="buttonClear"
            onClick={(e) => {
              e.preventDefault();
              dispatch(clearCart());
            }}
          >
            Clear
          </button>
          <button
            type="submit"
            data-testid="buttonCheckout"
            className="buttonCheckout"
            disabled={!cartSubTotal}
          >
            Check Out
          </button>
        </div>
      </div>
    </form>
  ) : null;
};

export default CartContainer;
