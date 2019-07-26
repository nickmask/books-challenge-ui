import React from "react";
import { shallow } from "enzyme";
import createRouterContext from "react-router-test-context";

import BookDetails from "./BookDetails";

describe("BookDetails", () => {
  const context = createRouterContext();
  const book = {
    id: "c1dc42ab-548f-4f96-8350-2f56303d7532",
    title: "A Life Changed",
    author: {
      id: "b6545db7-2a50-4532-8225-3fec60470502",
      firstName: "John",
      lastName: "Doe"
    },
    price: 10,
    description:
      "Nulla sunt sunt pariatur officia et esse fugiat proident est. Ad laboris ullamco adipisicing nisi in ex. Magna voluptate culpa velit exercitation nisi ipsum est do.",
    stockAmount: 1,
    thumbnail:
      "https://images.unsplash.com/photo-1496484805162-42c00f79cdce?dpr=1&auto=format&fit=crop&w=568&h=379&q=60&cs=tinysrgb&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D",
    isbn: "0000044280374"
  };

  const cartItems = [
    { id: "c1dc42ab-548f-4f96-8350-2f56303d7532" },
    { id: "c1dc42ab-548f-4f96-8350-2f56303d7532" }
  ];

  const onAddToCart = jest.fn();

  const match = {
    params: {
      id: "c1dc42ab-548f-4f96-8350-2f56303d7532"
    }
  };

  const props = { cartItems, onAddToCart, match };

  it("should render correctly", async () => {
    const component = shallow(<BookDetails {...props} />, {
      context,
      disableLifecycleMethods: true
    });

    component.setState({
      isFetching: false,
      book
    });

    expect(component).toMatchSnapshot();
  });

  it("isStockRemaining should return false when no stock is remaining", () => {
    const component = shallow(<BookDetails {...props} />, {
      context,
      disableLifecycleMethods: true
    });

    component.setProps({ cartItems });

    component.setState({
      isFetching: false,
      book: {
        id: "c1dc42ab-548f-4f96-8350-2f56303d7532",
        title: "A Life Changed",
        author: {
          id: "b6545db7-2a50-4532-8225-3fec60470502",
          firstName: "John",
          lastName: "Doe"
        },
        price: 10,
        description:
          "Nulla sunt sunt pariatur officia et esse fugiat proident est. Ad laboris ullamco adipisicing nisi in ex. Magna voluptate culpa velit exercitation nisi ipsum est do.",
        stockAmount: 2,
        thumbnail:
          "https://images.unsplash.com/photo-1496484805162-42c00f79cdce?dpr=1&auto=format&fit=crop&w=568&h=379&q=60&cs=tinysrgb&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D",
        isbn: "0000044280374"
      }
    });

    const isStockRemaining = component.instance().isStockRemaining;

    expect(isStockRemaining()).toEqual(false);
  });

  it("isStockRemaining should return true when stock is remaining", () => {
    const component = shallow(<BookDetails {...props} />, {
      context,
      disableLifecycleMethods: true
    });

    component.setProps({ cartItems });

    component.setState({
      isFetching: false,
      book: { ...book, stockAmount: 4 }
    });

    const isStockRemaining = component.instance().isStockRemaining;

    expect(isStockRemaining()).toEqual(true);
  });

  it("should disable 'add to cart' when no stock is remaining", () => {
    const component = shallow(<BookDetails {...props} />, {
      context,
      disableLifecycleMethods: true
    });

    component.setProps({ cartItems });

    component.setState({
      isFetching: false,
      book: { ...book, stockAmount: 2 }
    });

    const addToCartButton = component.find('button[children="Add to cart"]');

    expect(addToCartButton.prop("disabled")).toEqual(true);
  });

  it("should 'add to cart' is not disabled when stock is remaining", () => {
    const component = shallow(<BookDetails {...props} />, {
      context,
      disableLifecycleMethods: true
    });

    component.setProps({ cartItems });

    component.setState({
      isFetching: false,
      book: { ...book, stockAmount: 5 }
    });

    const addToCartButton = component.find('button[children="Add to cart"]');

    expect(addToCartButton.prop("disabled")).toEqual(false);
  });
});
