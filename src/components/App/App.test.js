import React from "react";
import { shallow } from "enzyme";
import createRouterContext from "react-router-test-context";

import App from "./App";

describe("App", () => {
  const context = createRouterContext();

  it("should render correctly", () => {
    const component = shallow(<App />, { context });

    expect(component).toMatchSnapshot();
  });

  it("should get correct total cart value", () => {
    const component = shallow(<App />, { context });

    component.setState({
      cartItems: [
        { id: 1, price: 20 },
        { id: 1, price: 15 },
        { id: 2, price: 20 },
        { id: 99, price: 50 }
      ]
    });

    const getTotalCartValueMethod = component.instance().getTotalCartValue;

    expect(getTotalCartValueMethod()).toEqual(105);
  });

  it("should get correct total cart when empty", () => {
    const component = shallow(<App />, { context });

    component.setState({
      cartItems: []
    });

    const getTotalCartValueMethod = component.instance().getTotalCartValue;

    expect(getTotalCartValueMethod()).toEqual(0);
  });

  it("should get correct total cart value with floats", () => {
    const component = shallow(<App />, { context });

    component.setState({
      cartItems: [
        { id: 1, price: 20 },
        { id: 1, price: 15.7 },
        { id: 2, price: 20 },
        { id: 99, price: 50.5 }
      ]
    });

    const getTotalCartValueMethod = component.instance().getTotalCartValue;

    expect(getTotalCartValueMethod()).toEqual(106.2);
  });

  it("should handle adding books to cart", () => {
    const component = shallow(<App />, { context });

    const handleAddToCart = component.instance().handleAddToCart;

    handleAddToCart({ id: 1, name: "The Great Booksy", price: 20 });

    expect(component.state().cartItems).toEqual([
      { id: 1, name: "The Great Booksy", price: 20 }
    ]);

    handleAddToCart({ id: 2, name: "Notting Shill", price: 20 });

    expect(component.state().cartItems).toEqual([
      { id: 1, name: "The Great Booksy", price: 20 },
      { id: 2, name: "Notting Shill", price: 20 }
    ]);
  });
});
