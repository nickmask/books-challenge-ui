import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import styles from "./BookCard.module.css";

function BookCard({
  title,
  author,
  price,
  description,
  stockAmount,
  thumbnail,
  id
}) {
  const createBookTitleUrl = title.replace(/\s/g, "-");

  return (
    <Link to={`/book/${createBookTitleUrl}/${id}`}>
      <div className={styles.card}>
        <img
          className={styles.thumbnail}
          src={thumbnail}
          alt={`Cover of ${title} book`}
        />
        <h2 className={styles.title} aria-label="Book title">
          {title}
        </h2>
        <p className={styles.author} aria-label="Book author">
          {author}
        </p>
        <p className={styles.price} aria-label="Book price">
          £{price}
        </p>
        <div className={styles.stock}>
          {stockAmount > 0 ? "In stock" : "Out of stock"}
        </div>
      </div>
    </Link>
  );
}

BookCard.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  stockAmount: PropTypes.number.isRequired,
  thumbnail: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired
};

export default BookCard;
