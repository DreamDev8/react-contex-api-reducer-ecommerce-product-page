import { useGlobalContext } from "../src/Context";

function Product() {
  const {
    products,
    addToCart,
    increaseProduct,
    decreaseProduct,
    handleProductImages,
    discount,
    lightboxOpen,
    imageIndex,
    handleNextImg,
    handlePrevImg,
  } = useGlobalContext();

  return (
    <section className="products-main">
      {products.map((product, index) => {
        return (
          <div key={index} className="product-flex layout-flex">
            <div className="product-imgs">
              <div className="main-img mobile-main-img">
                <img
                  onClick={() => lightboxOpen(product.id)}
                  src={product.mainImg}
                  alt=""
                />
              </div>

              <div
                className="mobile-main-slider"
                style={{
                  backgroundImage: product.changeSlideMobile
                    ? `url(${product.images[imageIndex].img})`
                    : `url(${product.images[0].img})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  width: "100%",
                  minHeight: "425px",
                  transition: "all 200ms linear",
                }}
                onClick={() => lightboxOpen(product.id)}
              ></div>

              <div className="mobile-main-slider-btns">
                <button onClick={() => handlePrevImg(product.id)}>
                  <img src="images/icon-previous.svg" alt="" />
                </button>
                <button onClick={() => handleNextImg(product.id)}>
                  <img src="images/icon-next.svg" alt="" />
                </button>
              </div>

              <div className="thumbnail-wrapper layout-flex mobile-thumbnail-wrapper">
                {product.images.map((productImg, index) => {
                  return (
                    <div
                      className="thumbnail-img"
                      key={index}
                      style={{
                        border:
                          product.mainImg === productImg.img
                            ? "3px solid var(--orange)"
                            : "unset",
                        borderRadius:
                          product.mainImg === productImg.img ? "13px" : "0",
                      }}
                    >
                      <img
                        style={{
                          opacity:
                            product.mainImg === productImg.img ? "0.4" : "1",
                        }}
                        onClick={() =>
                          handleProductImages(product.id, productImg.img)
                        }
                        src={productImg.img}
                        alt=""
                      />
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="product-text">
              <h3>{product.brand}</h3>
              <h1>{product.name}</h1>
              <p>{product.description}</p>
              <div className="product-price">
                <div className="product-discount layout-flex">
                  <h2>
                    $
                    {parseFloat(
                      product.price - product.price * (discount / 100)
                    ).toFixed(2)}
                  </h2>
                  <h5>{discount}%</h5>
                </div>
                <h4>${parseFloat(product.price).toFixed(2)}</h4>
              </div>
              <div className="product-btns layout-flex">
                <div className="product-qty layout-flex">
                  <button onClick={() => decreaseProduct(product.id)}>
                    <img src="images/icon-minus.svg" alt="" />
                  </button>
                  <p>{product.quantity}</p>
                  <button onClick={() => increaseProduct(product.id)}>
                    <img src="images/icon-plus.svg" alt="" />
                  </button>
                </div>
                <button
                  className="product-cta layout-flex"
                  onClick={() => addToCart(product)}
                >
                  <img src="images/icon-cart-black.svg" alt="" />
                  <span>Add to cart</span>
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}

export default Product;
