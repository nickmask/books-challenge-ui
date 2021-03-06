import React from "react";
import { shallow } from "enzyme";

import BookCard from "./BookCard";

describe("BookCard", () => {
  it("should render correctly", () => {
    const props = {
      id: "c1dc42ab-548f-4f96-8350-2f56303d7532",
      title: "A Life Changed",
      author: "John Doe",
      price: 10,
      description:
        "Nulla sunt sunt pariatur officia et esse fugiat proident est. Ad laboris ullamco adipisicing nisi in ex. Magna voluptate culpa velit exercitation nisi ipsum est do.",
      stockAmount: 0,
      thumbnail:
        "https://images.unsplash.com/photo-1496484805162-42c00f79cdce?dpr=1&auto=format&fit=crop&w=568&h=379&q=60&cs=tinysrgb&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D"
    };

    const component = shallow(<BookCard {...props} />);

    expect(component).toMatchSnapshot();
  });
});
