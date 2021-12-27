import React, { useState } from 'react';

const RegistryForm = ({ createNewUser, login }) => {
  const [newUser, setNewUser] = useState({
    name: '',
    username: '',
    password: '',
  });

  const handleInputChange = (event) => {
    setNewUser({
      ...newUser,
      [event.target.name]: event.target.value,
    });
  };

  const addNewUser = async (event) => {
    event.preventDefault();

    createNewUser(newUser);

    setNewUser({
      name: '',
      username: '',
      password: '',
    });
  };

  return (
    <form onSubmit={addNewUser} className="form">
      <div className="divInput">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          value={newUser.name}
          placeholder="Enter name"
          onChange={handleInputChange}
        />
      </div>
      <div className="divInput">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          name="username"
          value={newUser.username}
          placeholder="Enter username"
          onChange={handleInputChange}
        />
      </div>
      <div className="divInput">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          value={newUser.password}
          placeholder="Enter password"
          onChange={handleInputChange}
        />
      </div>
      <button className="greenButton">Registry</button>
    </form>
  );
};

export { RegistryForm };
