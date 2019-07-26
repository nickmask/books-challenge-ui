import React from "react";
import PropTypes from "prop-types";

import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { fetchBookDetails } from "../../utils/api";

import styles from "./BookDetails.module.css";

class BookDetails extends React.Component {
  state = {
    book: {
      author: "",
      description: "",
      id: "",
      price: "",
      stockAmount: "",
      thumbnail: "",
      title: ""
    },
    isFetching: true,
    error: null
  };

  componentDidMount = async () => {
    if (!this.state.book.author) {
      try {
        const bookId = this.props.match.params.id;
        const book = await fetchBookDetails(bookId);

        this.setState({ isFetching: false, book });
      } catch (error) {
        alert("Error getting book details. Please try again later");
        this.setState({
          error
        });
      }
    }
  };

  onAddToCart = () => {
    this.props.onAddToCart(this.state.book);
  };

  isStockRemaining = () => {
    const { id, stockAmount } = this.state.book;

    const totalStock = stockAmount;
    const totalInCart = this.props.cartItems.filter(item => id === item.id)
      .length;
    const remainingStock = totalStock - totalInCart;

    return remainingStock > 0;
  };

  render() {
    const {
      author,
      description,
      price,
      stockAmount,
      thumbnail,
      title
    } = this.state.book;
    const { isFetching } = this.state;

    return (
      <div className={styles.container}>
        {isFetching ? (
          <LoadingSpinner />
        ) : (
          <div>
            <h1 className={styles.pageHeader} aria-label="Book title">
              {title}
            </h1>
            <hr className={styles.separator} />
            <img
              className={styles.bookCover}
              src={thumbnail}
              alt={`Cover of ${title} book`}
            />
            <div>
              <p aria-label="Book author">{`${author.firstName} ${
                author.lastName
              }`}</p>
              <p aria-label="Book description">{description}</p>
              <p aria-label="Book price">£{price}</p>
              <p aria-label="Stock amount">
                {stockAmount > 0
                  ? `Available stock: ${stockAmount}`
                  : "Out of stock"}
              </p>
              <button
                type="submit"
                disabled={!this.isStockRemaining()}
                onClick={this.onAddToCart}
              >
                Add to cart
              </button>
              <button
                className={styles.buyNow}
                disabled={stockAmount <= 0}
                type="submit"
                onClick={() => alert("To be implemented")}
              >
                Buy now
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

BookDetails.propTypes = {
  onAddToCart: PropTypes.func.isRequired,
  cartItems: PropTypes.array.isRequired
};

export default BookDetails;
