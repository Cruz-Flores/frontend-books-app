import React, { useState, useEffect } from 'react';

import { registryService } from './services/registry.js';
import { loginService } from './services/login.js';
import { booksService } from './services/books.js';
import { RegistryForm } from './components/RegistryForm.js';
import { LoginForm } from './components/LoginForm.js';
import { Book } from './components/Book.js';
import { NewBookForm } from './components/NewBookForm.js';
import { Notification } from './components/Notification.js';
import { Togglable } from './components/Togglable.js';

import './index.css';

const App = () => {
  const [books, setBooks] = useState([]);
  const [userToLogin, setUserToLogin] = useState({
    username: '',
    password: '',
  });
  const [userLoged, setUserLoged] = useState(null);
  const [notification, setNotification] = useState(null);

  const handleInputChange = (event) => {
    setUserToLogin({
      ...userToLogin,
      [event.target.name]: event.target.value,
    });
  };

  const notifyWith = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 2000);
  };

  const createNewUser = async (newUser) => {
    try {
      await registryService.userRegistry(newUser);
      const user = await loginService.loginBooks({
        username: newUser.username,
        password: newUser.password,
      });
      window.localStorage.setItem('loggedBooksappUser', JSON.stringify(user));
      booksService.setToken(user.token);
      setUserLoged(user);
      setUserToLogin({
        username: '',
        password: '',
      });
      notifyWith(`${user.name}, registry succesfuly`, 'succes');
    } catch (exception) {
      notifyWith('Wrong credentials', 'error');
    }
  };

  const userLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.loginBooks({
        ...userToLogin,
      });
      window.localStorage.setItem('loggedBooksappUser', JSON.stringify(user));
      booksService.setToken(user.token);
      setUserLoged(user);
      setUserToLogin({
        username: '',
        password: '',
      });
      notifyWith(`${user.name} logged`, 'succes');
    } catch (exception) {
      notifyWith('Wrong credentials', 'error');
    }
  };

  const userLogout = () => {
    window.localStorage.removeItem('loggedBooksappUser');
    setUserLoged(null);
    notifyWith(`${userLoged.name} logout`, 'succes');
  };

  const addBook = async (bookObject) => {
    try {
      const returnedBook = await booksService.create(bookObject);
      setBooks(books.concat(returnedBook));
      notifyWith(
        `A new Book ${returnedBook.title} by ${returnedBook.author} added`,
        'succes'
      );
    } catch (exception) {
      notifyWith('Error', 'error');
    }
  };

  const addLikes = async (bookObject) => {
    const changedBook = { ...bookObject, likes: bookObject.likes + 1 };
    try {
      const returnedBook = await booksService.update(
        bookObject.id,
        changedBook
      );
      setBooks(
        books.map((book) => (book.id !== bookObject.id ? book : returnedBook))
      );
    } catch (exception) {
      notifyWith('Error', 'error');
    }
  };

  const deleteBook = async (book) => {
    const ok = window.confirm(`Delete the book ${book.title}`);
    if (ok) {
      await booksService.remove(book.id);
      setBooks(books.filter((object) => object.id !== book.id));
      notifyWith(`Deleted ${book.title}`, 'succes');
    }
  };

  useEffect(() => {
    booksService.getAll().then((books) => setBooks(books));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBooksappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUserLoged(user);
      booksService.setToken(user.token);
    }
  }, []);

  return (
    <>
      <Notification notification={notification} />
      {!userLoged ? (
        <div className="formDiv">
          <LoginForm
            onSubmit={userLogin}
            userToLogin={userToLogin}
            onChange={handleInputChange}
          />
          <Togglable buttonLabel="Registry">
            <RegistryForm login={userLogin} createNewUser={createNewUser} />
          </Togglable>
        </div>
      ) : (
        <div id="mainDiv">
          <h2>Books</h2>
          <p>
            {userLoged.name} logged in
            <button className="redButton" onClick={userLogout}>
              logout
            </button>
          </p>
          <Togglable buttonLabel="create">
            <NewBookForm createBook={addBook} />
          </Togglable>
          {books.map((book) => (
            <Book
              key={book.id}
              book={book}
              userLoged={userLoged}
              addLikes={() => addLikes(book)}
              deleteBook={() => deleteBook(book)}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default App;
