const baseUrl = "https://booksontap.azurewebsites.net/api";

export async function fetchBooks() {
  try {
    const res = await fetch(`${baseUrl}/books`);
    const data = await res.json();

    const books = data.results;

    return books;
  } catch (error) {
    throw new Error("Error fetching books", error);
  }
}

export async function fetchBookDetails(id) {
  try {
    const res = await fetch(`${baseUrl}/books/${id}`);
    const data = await res.json();

    const book = data.results;

    return book;
  } catch (error) {
    throw new Error("Error fetching book details", error);
  }
}
