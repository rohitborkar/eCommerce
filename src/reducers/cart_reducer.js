import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from "../actions";

const cart_reducer = (state, action) => {
  if (action.type === ADD_TO_CART) {
    const { id, color, amount, product } = action.payload;
    //console.log({ id, color, amount, product });
    /*console.log("Initial Data- state & state.cart");
    console.log(state);
    console.log(state.cart);*/
    const tempItem = state.cart.find((i) => i.id === id + color); //check whether item is in cart
    if (tempItem) {
      const tempCart = state.cart.map((cartItem) => {
        if (cartItem.id === id + color) {
          //if particular id is present then increase amount or quantity
          let newAmount = cartItem.amount + amount;
          if (newAmount > cartItem.max) {
            newAmount = cartItem.max;
          }
          return { ...cartItem, amount: newAmount };
        } else {
          return cartItem;
        }
      });
      /*console.log("tempCart i.e. cart data");
      console.log(tempCart);*/
      return { ...state, cart: tempCart };
    } else {
      //contd.. from if, if item not present create new item
      const newItem = {
        id: id + color,
        name: product.name,
        color,
        amount,
        image: product.images[0].url,
        price: product.price,
        max: product.stock,
      };
      /* console.log("state.cart & newItem data in else");
      console.log(state.cart);
      console.log(newItem);*/
      return { ...state, cart: [...state.cart, newItem] };
    }
  }

  if (action.type === REMOVE_CART_ITEM) {
    const tempCart = state.cart.filter((item) => item.id !== action.payload);
    return { ...state, cart: tempCart };
  }

  if (action.type === CLEAR_CART) {
    return { ...state, cart: [] };
  }

  if (action.type === TOGGLE_CART_ITEM_AMOUNT) {
    const { id, value } = action.payload;
    const tempCart = state.cart.map((item) => {
      /*console.log("item data in TOGGLE_CART_ITEM_AMOUNT");
       console.log(state.cart);
      console.log(item);*/
      if (item.id === id) {
        if (value === "inc") {
          let newAmount = item.amount + 1;
          if (newAmount > item.max) {
            newAmount = item.max;
          }
          return { ...item, amount: newAmount };
        }
        if (value === "dec") {
          let newAmount = item.amount - 1;
          if (newAmount < 1) {
            newAmount = 1;
          }
          return { ...item, amount: newAmount };
        }
      }
      return item;
    });

    return { ...state, cart: tempCart };
  }

  if (action.type === COUNT_CART_TOTALS) {
    /*console.log("cartItem2 in COUNT_CART_TOTALS");
    console.log(state.cart);*/
    const { total_items, total_amount } = state.cart.reduce(
      (total, cartItem2) => {
        //variable name total & cartItem2 can be change to another name
        const { amount, price } = cartItem2;

        total.total_items += amount;
        total.total_amount += price * amount;
        return total;
      },
      {
        total_items: 0,
        total_amount: 0,
      }
    );
    return { ...state, total_items, total_amount };
  }

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default cart_reducer;
