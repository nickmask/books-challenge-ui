import React from "react";

import BookCard from "../BookCard/BookCard";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { fetchBooks } from "../../utils/api";

import styles from "./BookList.module.css";

class BookList extends React.Component {
  state = {
    books: null,
    isFetching: true,
    error: null
  };

  async componentDidMount() {
    if (!this.state.books) {
      try {
        const books = await fetchBooks();
        this.setState({ isFetching: false, books });
      } catch (error) {
        alert("Error getting books. Please try again later");
        this.setState({
          error
        });
      }
    }
  }

  render() {
    const { isFetching, books } = this.state;
    return (
      <div className={styles.container}>
        {isFetching ? (
          <LoadingSpinner />
        ) : (
          <>
            <h1 className={styles.pageHeader}>Books</h1>
            <hr className={styles.separator} />
            <div className={styles.list}>
              {books.map(book => (
                <BookCard
                  key={book.id}
                  title={book.title}
                  author={`${book.author.firstName} ${book.author.lastName}`}
                  price={book.price}
                  description={book.description}
                  stockAmount={book.stockAmount}
                  thumbnail={book.thumbnail}
                  id={book.id}
                />
              ))}
            </div>
          </>
        )}
      </div>
    );
  }
}

export default BookList;
