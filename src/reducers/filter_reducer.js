import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";

const filter_reducer = (state, action) => {
  if (action.type === LOAD_PRODUCTS) {
    let maxPrice = action.payload.map((p) => p.price);
    //console.log(maxPrice);
    maxPrice = Math.max(...maxPrice); //to get max price

    return {
      ...state,
      all_products: [...action.payload],
      filtered_products: [...action.payload], // in both arrays we define spread(...) operator i.e. we just copying the values & not referencing the same place in memory. Without spread opertaor it points if we filterd products then we cannot go to default as its default behavior of JS and it will point to same place in memory
      filters: { ...state.filters, max_price: maxPrice, price: maxPrice }, //preserve initial state & define max_price & price
    };
  }

  if (action.type === SET_GRIDVIEW) {
    return { ...state, grid_view: true };
  }

  if (action.type === SET_LISTVIEW) {
    return { ...state, grid_view: false };
  }

  if (action.type === UPDATE_SORT) {
    return { ...state, sort: action.payload }; //get values price-lowest, price-highest, name-a, name-z
  }

  if (action.type === SORT_PRODUCTS) {
    const { sort, filtered_products } = state;
    //console.log("sort=>" + sort);
    let tempProducts = [...filtered_products];
    if (sort === "price-lowest") {
      tempProducts = tempProducts.sort((a, b) => {
        if (a.price < b.price) {
          return -1; //if a price is less than b price then place a before b
        }
        if (a.price > b.price) {
          return 1; //if a price is bigger than b price then place a after b
        }
        return 0;
      });
    }
    if (sort === "price-highest") {
      tempProducts = tempProducts.sort((a, b) => b.price - a.price);
    }
    if (sort === "name-a") {
      tempProducts = tempProducts.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
    }
    if (sort === "name-z") {
      tempProducts = tempProducts.sort((a, b) => {
        return b.name.localeCompare(a.name);
      });
    }
    return { ...state, filtered_products: tempProducts };
  }

  if (action.type === UPDATE_FILTERS) {
    const { name, value } = action.payload;
    return { ...state, filters: { ...state.filters, [name]: value } };
  }
  if (action.type === FILTER_PRODUCTS) {
    const { all_products } = state; //get all_products
    const { text, category, company, color, price, shipping } = state.filters;

    let tempProducts = [...all_products]; //whenever we are filtering, we should always have our default data
    // filtering
    // text
    if (text) {
      tempProducts = tempProducts.filter((product) => {
        return product.name.toLowerCase().startsWith(text);
        //we are checking product with property name in product[] with all lowercase & startswith text passed
      });
    }
    // category
    if (category !== "all") {
      tempProducts = tempProducts.filter(
        (product) => product.category === category
        //product is array with multiple objects as contents data & having category as one of the property
        //we here compare category selected fro GUI with product category(product.category)
      );
    }

    // company
    if (company !== "all") {
      tempProducts = tempProducts.filter(
        (product) => product.company === company
      );
    }
    // colors
    if (color !== "all") {
      tempProducts = tempProducts.filter((product) => {
        return product.colors.find((c) => c === color);
        //here property color is array so we will find selected color in given product.color[]
        //as colors property is array, we will check selected color in state array
      });
    }
    // price
    tempProducts = tempProducts.filter((product) => product.price <= price);

    // shipping
    if (shipping) {
      tempProducts = tempProducts.filter(
        (product) => product.shipping === true
        //return those products which is havinng property.shpping value true
      );
    }
    //console.log({ tempProducts });
    return { ...state, filtered_products: tempProducts };
  }
  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      filters: {
        ...state.filters,
        text: "",
        company: "all",
        category: "all",
        color: "all",
        price: state.filters.max_price,
        shipping: false,
      },
    };
  }

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
