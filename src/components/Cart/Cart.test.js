import React from "react";
import { shallow } from "enzyme";

import Cart from "./Cart";

describe("Cart", () => {
  const cartItems = [
    {
      id: "c1dc42ab-548f-4f96-8350-2f56303d7532",
      author: {
        id: "b6545db7-2a50-4532-8225-3fec60470502",
        firstName: "John",
        lastName: "Doe"
      },
      price: 10,
      description:
        "Nulla sunt sunt pariatur officia et esse fugiat proident est. Ad laboris ullamco adipisicing nisi in ex. Magna voluptate culpa velit exercitation nisi ipsum est do.",
      stockAmount: 0,
      thumbnail:
        "https://images.unsplash.com/photo-1496484805162-42c00f79cdce?dpr=1&auto=format&fit=crop&w=568&h=379&q=60&cs=tinysrgb&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D"
    },
    {
      id: "c1dc42ab-548f-4f96-8350-2f56303d7532",
      author: {
        id: "b6545db7-2a50-4532-8225-3fec60470502",
        firstName: "John",
        lastName: "Doe"
      },
      price: 10,
      description:
        "Nulla sunt sunt pariatur officia et esse fugiat proident est. Ad laboris ullamco adipisicing nisi in ex. Magna voluptate culpa velit exercitation nisi ipsum est do.",
      stockAmount: 0,
      thumbnail:
        "https://images.unsplash.com/photo-1496484805162-42c00f79cdce?dpr=1&auto=format&fit=crop&w=568&h=379&q=60&cs=tinysrgb&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D"
    }
  ];

  it("should render correctly", () => {
    const component = shallow(<Cart cartItems={cartItems} />);

    expect(component).toMatchSnapshot();
  });

  it("should render the correct amount of cart items", () => {
    const component = shallow(<Cart cartItems={cartItems} />);

    const removeFromCartButton = component.find('button[children="Remove"]');

    expect(removeFromCartButton.length).toEqual(2);
  });
});
