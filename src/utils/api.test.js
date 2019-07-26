import { fetchBooks, fetchBookDetails } from "./api";

const fetchBooksRes = {
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
    }
  ]
};

const fetchBookDetailsRes = {
  results: {
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
  }
};

describe("apiCalls", () => {
  afterEach(() => {
    fetch.mockReset();
  });

  it("fetchBooks parses data correctly", async () => {
    const mockJsonPromise = Promise.resolve(fetchBooksRes);
    const mockFetchPromise = Promise.resolve({
      json: () => mockJsonPromise
    });

    jest.spyOn(global, "fetch").mockImplementation(() => mockFetchPromise);

    const books = await fetchBooks();

    expect(books).toEqual(fetchBooksRes.results);
  });

  it("fetchBooks throws an error if status code is not ok", async () => {
    const mockFetchPromise = Promise.resolve({
      status: 500
    });

    jest.spyOn(global, "fetch").mockImplementation(() => mockFetchPromise);

    expect(fetchBooks()).rejects.toEqual(Error("Error fetching books"));
  });

  it("fetchBookDetails parses data correctly", async () => {
    const mockJsonPromise = Promise.resolve(fetchBookDetailsRes);
    const mockFetchPromise = Promise.resolve({
      json: () => mockJsonPromise
    });

    jest.spyOn(global, "fetch").mockImplementation(() => mockFetchPromise);

    const book = await fetchBookDetails("c1dc42ab-548f-4f96-8350-2f56303d7532");

    expect(book).toEqual(fetchBookDetailsRes.results);
  });

  it("fetchBookDetails throws an error if status code is not ok", async () => {
    const mockFetchPromise = Promise.resolve({
      status: 500
    });

    jest.spyOn(global, "fetch").mockImplementation(() => mockFetchPromise);

    expect(
      fetchBookDetails("c1dc42ab-548f-4f96-8350-2f56303d7532")
    ).rejects.toEqual(Error("Error fetching book details"));
  });
});
