import { createContext, useContext, useReducer, useState } from "react";
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
import productsData from "./data";
import reducer from "./reducer";

const GlobalContext = createContext();

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};

const initialState = {
  products: productsData,
  cart: [],
};

function AppContext({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // booleans
  const [isCartOpen, setIsCartOpen] = useState(false);

  const discount = 50;

  //sliders

  const [imageIndex, setImageIndex] = useState(0);
  let imagesLength;

  const getImagesLength = state.products.map((product) => {
    imagesLength = product.images.length - 1;
  });

  function handleLightboxImages(slideIndex) {
    setImageIndex(slideIndex);
  }

  // actions

  function addToCart(product) {
    dispatch({ type: ADD_TO_CART, payload: { product } });
  }

  function increaseProduct(id) {
    dispatch({ type: INCREASE_PRODUCT, payload: { id } });
  }

  function decreaseProduct(id) {
    dispatch({ type: DECREASE_PRODUCT, payload: { id } });
  }

  function removeItem(id) {
    dispatch({ type: REMOVE_ITEM, payload: { id } });
  }

  function cartOpen() {
    setIsCartOpen(!isCartOpen);
  }

  function handleProductImages(id, img) {
    dispatch({ type: CHANGE_PRODUCT_IMAGES, payload: { id, img } });
  }

  function lightboxOpen(id) {
    dispatch({ type: LIGHTBOX_OPEN, payload: { id } });
  }

  function handleNextImg(id) {
    dispatch({ type: IMAGES_MOBILE_NEXT, payload: { id } });
    setImageIndex(imageIndex >= imagesLength ? 0 : imageIndex + 1);
    if (imageIndex === imageIndex + 1) {
      setImageIndex(imageIndex - 1);
    }
  }

  function handlePrevImg(id) {
    dispatch({ type: IMAGES_MOBILE_PREV, payload: { id } });
    setImageIndex(imageIndex <= 0 ? imagesLength : imageIndex - 1);
  }

  return (
    <GlobalContext.Provider
      value={{
        ...state,
        addToCart,
        increaseProduct,
        decreaseProduct,
        removeItem,
        isCartOpen,
        setIsCartOpen,
        cartOpen,
        handleProductImages,
        discount,
        lightboxOpen,
        imageIndex,
        setImageIndex,
        handleNextImg,
        handlePrevImg,
        handleLightboxImages,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export default AppContext;
