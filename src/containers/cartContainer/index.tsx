import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReducedState } from '../../redux/types';
import { fetchCart, changeProductQty, clearCart } from '../../redux/actions';
import './CartContainer.scss';

function CartContainer() {
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
    <div className="cartWrapper">
      <div className="productWrapper">
        {products?.map((item) => (
          <div className="productRow">
            <h6 className="productTitle">{item.title}</h6>
            <div className="productNumbers">
              <input
                type="number"
                value={item.qty}
                min={0}
                max={99}
                name={String(item.id)}
                key={item.id}
                onFocus={handleFocus}
                onChange={(e) => {
                  if (e.target.value.length > 1 && e.target.value[0] === '0') {
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
              <h6 className="singleProductTotals">
                {currency + (item.price * item.qty).toFixed(2)}
              </h6>
            </div>
          </div>
        ))}
      </div>
      <div className="actionWrapper">
        <h2 className="cartSubTotal">
          {currency + cartSubTotal.toFixed(2) || 0}
        </h2>
        <div className="buttonWrapper">
          <button className="buttonClear" onClick={() => dispatch(clearCart())}>
            Clear
          </button>
          <button className="buttonCheckout" disabled={!cartSubTotal}>
            Check Out
          </button>
        </div>
      </div>
    </div>
  ) : null;
}

export default CartContainer;
