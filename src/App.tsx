import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReducedState } from './redux/types';
import { fetchCart, changeProductQty, clearCart } from './redux/actions';
import logo from './logo.svg';
import './App.css';

function App() {
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

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {products?.map((item) => (
          <input
            type="number"
            value={item.qty}
            min={0}
            name={String(item.id)}
            key={item.id}
            onChange={(e) =>
              dispatch(
                changeProductQty({
                  id: Number(e.target.name),
                  qty: Number(e.target.value)
                })
              )
            }
          ></input>
        ))}
        <p>{currency + cartSubTotal || 0}</p>
        <button onClick={() => dispatch(clearCart())}>Clear</button>
      </header>
    </div>
  );
}

export default App;
