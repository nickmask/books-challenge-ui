import React from "react";
import { shallow } from "enzyme";
import createRouterContext from "react-router-test-context";

import BookList from "./BookList";

describe("BookList", () => {
  const context = createRouterContext();

  const books = {
    results: [
      {
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
        stockAmount: 0,
        thumbnail:
          "https://images.unsplash.com/photo-1496484805162-42c00f79cdce?dpr=1&auto=format&fit=crop&w=568&h=379&q=60&cs=tinysrgb&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D",
        isbn: "0000044280374"
      },
      {
        id: "da435429-c698-4b5b-9865-808995d82e47",
        title: "The Math Behind React",
        author: {
          id: "1335ccbe-04b6-4d1a-a339-b9ee6202847a",
          firstName: "Jane",
          lastName: "Langton"
        },
        price: 48,
        description:
          "Nulla sunt sunt pariatur officia et esse fugiat proident est. Ad laboris ullamco adipisicing nisi in ex. Magna voluptate culpa velit exercitation nisi ipsum est do.",
        stockAmount: 2,
        thumbnail:
          "https://images.unsplash.com/photo-1453733190371-0a9bedd82893?dpr=1&auto=format&fit=crop&w=568&h=426&q=60&cs=tinysrgb&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D",
        isbn: "0000036338645"
      }
    ]
  };

  beforeEach(() => {
    const mockJsonPromise = Promise.resolve(books);
    const mockFetchPromise = Promise.resolve({
      json: () => mockJsonPromise
    });
    jest.spyOn(global, "fetch").mockImplementation(() => mockFetchPromise);
  });

  afterEach(() => {
    fetch.mockReset();
  });

  it("should render correctly", async () => {
    const component = await shallow(<BookList />, { context });

    await new Promise(resolve => setTimeout(resolve, 0)); // Re-render is not reflected in component without this

    expect(component).toMatchSnapshot();
  });

  it("should render correct number of BookCards", async () => {
    const component = await shallow(<BookList />, { context });

    await new Promise(resolve => setTimeout(resolve, 0)); // Re-render is not reflected in component without this

    const cards = component.find("BookCard");

    expect(cards.length).toEqual(2);
  });

  it("should trigger a fetch call to get books", async () => {
    const component = await shallow(<BookList />, { context });

    await new Promise(resolve => setTimeout(resolve, 0)); // Re-render is not reflected in component without this

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      "https://booksontap.azurewebsites.net/api/books"
    );
  });
});
