import { useGlobalContext } from "../src/Context";

function Lightbox() {
  const {
    products,
    lightboxOpen,
    imageIndex,
    setImageIndex,
    handleNextImg,
    handlePrevImg,
    handleLightboxImages,
  } = useGlobalContext();

  return (
    <section className="lightbox-main">
      {products.map((product, index) => {
        return (
          <div
            key={index}
            className={
              product.isLightboxOpen
                ? "lightbox-overlay lightbox-overlay-show"
                : "lightbox-overlay"
            }
          >
            <div className="product-imgs lightbox-imgs">
              <div
                className="main-img lightbox-slider"
                style={{
                  backgroundImage: `url(${product.images[imageIndex].img})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "contain",
                  width: "552px",
                  minHeight: "552px",
                  borderRadius: "20px",
                  transition: "all 200ms linear",
                }}
              ></div>

              <div className="thumbnail-wrapper layout-flex">
                {product.images.map((productImg, index) => {
                  return (
                    <div
                      key={index}
                      className={
                        product.images[imageIndex].img === productImg.img
                          ? "thumbnail-individual-container"
                          : undefined
                      }
                    >
                      <img
                        onClick={() => handleLightboxImages(index)}
                        src={productImg.img}
                        alt=""
                        className={
                          product.images[imageIndex].img === productImg.img
                            ? "thumbnail-individual-image"
                            : undefined
                        }
                      />
                    </div>
                  );
                })}
              </div>
              <div className="lightbox-btns">
                <button onClick={handlePrevImg}>
                  <img src="images/icon-previous.svg" alt="" />
                </button>
                <button onClick={handleNextImg}>
                  <img src="images/icon-next.svg" alt="" />
                </button>
              </div>
              <img
                className="lightbox-close"
                src="images/icon-close-white.svg"
                alt=""
                onClick={lightboxOpen}
              />
            </div>
          </div>
        );
      })}
    </section>
  );
}

export default Lightbox;
