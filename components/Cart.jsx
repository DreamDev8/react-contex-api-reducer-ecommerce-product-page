import { useGlobalContext } from "../src/Context";

function Cart() {
  const { cart, removeItem, isCartOpen, discount } = useGlobalContext();

  const itemsPriceTotal = cart.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );

  const itemsPriceDiscountTotal =
    itemsPriceTotal - itemsPriceTotal * (discount / 100);

  return (
    <aside
      className={isCartOpen ? "cart-wrapper" : "cart-wrapper-hide"}
      style={{
        width: cart.length === 0 && "360px",
        height: cart.length === 0 && "245px",
      }}
    >
      <div>
        <h2>Cart</h2>
      </div>
      {cart.length === 0 ? (
        <h2 className="cart-wrapper-empty">Your cart is empty.</h2>
      ) : (
        <div>
          <div className="cart-item-wrapper layout-flex">
            {cart.map((item, index) => {
              return (
                <div className="cart-item" key={index}>
                  <img
                    className="cart-item-img"
                    src={item.images[0].img}
                    alt="delete-product"
                  />
                  <div className="cart-item-text">
                    <h3>{item.name}</h3>
                    <div>
                      <h4>
                        $
                        {parseFloat(
                          item.price - item.price * (discount / 100)
                        ).toFixed(2)}
                      </h4>
                      <h4>x {item.quantity}</h4>
                      <h4>
                        $
                        {parseFloat(
                          item.quantity *
                            (item.price - item.price * (discount / 100))
                        ).toFixed(2)}
                      </h4>
                    </div>
                  </div>
                  <button
                    className="cart-item-delete"
                    onClick={() => removeItem(item.id)}
                  >
                    <img src="images/icon-delete.svg" alt="delete-product" />
                  </button>
                </div>
              );
            })}
          </div>
          <h3 className="cart-item-total">
            Total: ${parseFloat(itemsPriceDiscountTotal).toFixed(2)}
          </h3>
          <div className="cart-item-checkout">
            <button>Checkout</button>
          </div>
        </div>
      )}
    </aside>
  );
}

export default Cart;
