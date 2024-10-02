import {
  ADD_TO_CART,
  REMOVE_ITEM,
  INCREASE_PRODUCT,
  DECREASE_PRODUCT,
  CHANGE_PRODUCT_IMAGES,
  IMAGES_MOBILE_NEXT,
  IMAGES_MOBILE_PREV,
  LIGHTBOX_OPEN,
} from "./actions";

export let cartQuantity;
let changeQty;
export let removeItemQty;

function reducer(state, action) {
  if (action.type === ADD_TO_CART) {
    cartQuantity = state.products.reduce(
      (quantity, item) => quantity + item.quantity,
      0
    );

    if (action.payload.product.quantity === 0 && state.cart.length === 0) {
      return { ...state, cart: [...state.cart] };
    } else if (action.payload.product.quantity !== 0) {
      const updatedQty = changeQty.filter((x) => x.quantity !== 0);
      return { ...state, cart: updatedQty };
    } else if (action.payload.product.quantity === 0) {
      const updatedQty = changeQty.filter((x) => x.quantity !== 0);
      return { ...state, cart: updatedQty };
    }
  } else if (action.type === INCREASE_PRODUCT) {
    changeQty = state.products.map((item) => {
      return item.id === action.payload.id
        ? { ...item, quantity: item.quantity + 1 }
        : item;
    });

    return { ...state, products: changeQty };
  } else if (action.type === DECREASE_PRODUCT) {
    changeQty = state.products.map((item) => {
      return item.id === action.payload.id
        ? {
            ...item,
            quantity:
              item.quantity === 0 ? (item.quantity = 0) : item.quantity - 1,
          }
        : item;
    });
    return { ...state, products: changeQty };
  } else if (action.type === REMOVE_ITEM) {
    const updateProductQty = state.products.map((item) => {
      return item.id === action.payload.id
        ? { ...item, quantity: (item.quantity = 0) }
        : item;
    });

    removeItemQty = state.cart.filter((x) => x.id !== action.payload.id);
    return { ...state, cart: removeItemQty };
  } else if (action.type === CHANGE_PRODUCT_IMAGES) {
    const updateImages = state.products.map((product) => {
      return product.id === action.payload.id
        ? { ...product, mainImg: action.payload.img }
        : product;
    });

    return { ...state, products: updateImages };
  } else if (action.type === LIGHTBOX_OPEN) {
    const updateLightbox = state.products.map((product) => {
      return product.id === action.payload.id
        ? { ...product, isLightboxOpen: true }
        : { ...product, isLightboxOpen: false };
    });
    return { ...state, products: updateLightbox };
  } else if (action.type === IMAGES_MOBILE_NEXT) {
    const updateMobileImage = state.products.map((product) => {
      return product.id === action.payload.id
        ? { ...product, changeSlideMobile: true }
        : { ...product, changeSlideMobile: false };
    });
    return { ...state, products: updateMobileImage };
  } else if (action.type === IMAGES_MOBILE_PREV) {
    const updateMobileImage = state.products.map((product) => {
      return product.id === action.payload.id
        ? { ...product, changeSlideMobile: true }
        : { ...product, changeSlideMobile: false };
    });
    return { ...state, products: updateMobileImage };
  }
}

export default reducer;
