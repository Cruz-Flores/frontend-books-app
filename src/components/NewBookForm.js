import React, { useState } from 'react';

const NewBookForm = ({ createBook }) => {
  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
  });

  const handleInputChange = (event) => {
    setNewBook({
      ...newBook,
      [event.target.name]: event.target.value,
    });
  };

  const addBook = (event) => {
    event.preventDefault();

    createBook(newBook);
    setNewBook({
      title: '',
      author: '',
    });
  };

  return (
    <div id="newBookDiv">
      <h2>Create new</h2>
      <form id="newBookForm" className="form" onSubmit={addBook}>
        <div className="divInput">
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            className="title"
            value={newBook.title}
            type="text"
            name="title"
            onChange={handleInputChange}
          />
        </div>
        <div className="divInput">
          <label htmlFor="author">Author:</label>
          <input
            id="author"
            value={newBook.author}
            type="text"
            name="author"
            onChange={handleInputChange}
          />
        </div>
        <div className="divNewBookInput">
          <button id="createBookButton" className="greenButton" type="submit">
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export { NewBookForm };
