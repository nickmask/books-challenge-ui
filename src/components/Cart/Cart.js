import React from "react";
import PropTypes from "prop-types";

import styles from "./Cart.module.css";

const Cart = ({ cartItems, totalValue, onRemoveCartItem }) => {
  const removeCartItem = event => {
    onRemoveCartItem(event.target.getAttribute("data-index"));
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.pageHeader}>Cart</h1>
      <hr className={styles.separator} />
      {cartItems.length > 0 ? (
        <div>
          {cartItems.map((item, index) => (
            <div key={item.id + index}>
              <div className={styles.cartItem}>
                <img
                  className={styles.bookCover}
                  src={item.thumbnail}
                  alt={`Cover of ${item.title} book`}
                />
                <div className={styles.detailsContainer}>
                  <div className={styles.details}>
                    <h2 aria-label="Book title">{item.title}</h2>
                    <p aria-label="Book author">{`${item.author.firstName} ${
                      item.author.lastName
                    }`}</p>
                    <p aria-label="Book price">£{item.price}</p>
                  </div>
                  <div>
                    <button data-index={index} onClick={removeCartItem}>
                      Remove
                    </button>
                  </div>
                </div>
              </div>
              <hr className={styles.separator} />
            </div>
          ))}
          <div className={styles.buy}>
            <p>Total price: £{totalValue}</p>
            <div className={styles.buyButtonCotainer}>
              <span>
                <button
                  type="submit"
                  onClick={() => alert("To be implemented")}
                >
                  Buy all
                </button>
              </span>
            </div>
          </div>
        </div>
      ) : (
        <h2>Cart empty</h2>
      )}
    </div>
  );
};

Cart.proptype = {
  cartItems: PropTypes.object.isRequired,
  totalValue: PropTypes.string.isRequired,
  onRemoveCartItem: PropTypes.func.isRequired
};

export default Cart;
