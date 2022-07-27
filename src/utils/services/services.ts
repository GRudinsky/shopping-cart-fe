import 'whatwg-fetch';
import { CART_API_URL } from '../constants';
export const getShoppingCart = async () => {
  const options = {
    method: 'GET'
  };
  try {
    const response = await fetch(CART_API_URL, options);
    return await response.json();
  } catch (err: any) {
    throw new Error(err.message);
  }
};
