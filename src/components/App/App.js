import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { FaArrowLeft, FaShoppingCart } from "react-icons/fa";

import BookList from "../BookList/BookList";
import BookDetails from "../BookDetails/BookDetails";
import Cart from "../Cart/Cart";

import styles from "./App.module.css";

class App extends React.Component {
  state = {
    cartItems: []
  };

  handleAddToCart = bookDetails => {
    this.setState(prevState => {
      const cartItems = [...prevState.cartItems, bookDetails];

      return { cartItems };
    });
  };

  getTotalCartValue = () => {
    const totalValue = this.state.cartItems.reduce(
      (accumulator, currentBook) => currentBook.price + accumulator,
      0
    );

    return totalValue;
  };

  removeCartItem = index => {
    this.setState(prevState => {
      const cartItems = [...prevState.cartItems];
      cartItems.splice(index, 1);

      return { cartItems };
    });
  };

  render() {
    const { cartItems } = this.state;
    const backToBooks = (
      <Link className={styles.back} to="/">
        <FaArrowLeft />
        <span className={styles.backText}>back to books</span>
      </Link>
    );

    return (
      <Router>
        <div className={styles.container}>
          <header className={styles.header}>
            <span>Books on tap</span>
          </header>
          <nav className={styles.nav}>
            <Switch>
              <Route exact path="/" render={() => <span />} />
              <Route path="/book" render={() => backToBooks} />
              <Route path="/cart" render={() => backToBooks} />
            </Switch>

            <Link to="/cart">
              <div className={styles.cart}>
                <p aria-label="Total cart value">{`£${this.getTotalCartValue()}`}</p>
                <hr className={styles.seperator} />
                <p
                  aria-label="Number of items in cart"
                  className={styles.cartCount}
                >
                  <FaShoppingCart className={styles.cartIcon} color={"#fff"} />
                  <span>{cartItems.length}</span>
                </p>
              </div>
            </Link>
          </nav>

          <main>
            <Switch>
              <Route exact path="/" component={BookList} />
              <Route
                exact
                path="/book/:title/:id"
                render={routeProps => (
                  <BookDetails
                    {...routeProps}
                    onAddToCart={this.handleAddToCart}
                    cartItems={cartItems}
                  />
                )}
              />
              <Route
                exact
                path="/cart"
                render={routeProps => (
                  <Cart
                    {...routeProps}
                    totalValue={this.getTotalCartValue()}
                    cartItems={cartItems}
                    onRemoveCartItem={this.removeCartItem}
                  />
                )}
              />
              <Route render={() => <h1>404</h1>} />
            </Switch>
          </main>
          <footer />
        </div>
      </Router>
    );
  }
}

export default App;
