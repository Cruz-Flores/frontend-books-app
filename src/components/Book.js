import React, { useState } from 'react';

const Book = ({ book, addLikes, deleteBook, userLoged }) => {
  const [visible, setVisible] = useState(false);

  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const butonText = visible ? 'hide' : 'view';

  return (
    <div id="bookDiv" className="bookDiv">
      <div id="titleDiv">
        <p>
          {book.title} - {book.author}
        </p>
        <button className="greenButton" onClick={toggleVisibility}>
          {butonText}
        </button>
      </div>
      <div id="showWhenVisible" style={showWhenVisible}>
        {/* <p>{book.likes}</p>
        <button className="blueButton" onClick={addLikes}>
          like
        </button> */}
        <p>{book.user.name}</p>
        {book.user.name === userLoged.name && (
          <button className="redButton" onClick={deleteBook}>
            remove
          </button>
        )}
      </div>
    </div>
  );
};

export { Book };
