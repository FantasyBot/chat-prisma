import React, { useState } from 'react';
import axios from 'axios';

const Registerpage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(email, password, name);
    try {
      const { data } = await axios({
        method: 'post',
        url: '/api/user/register',
        data: { name, email, password },
      });

      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <p>Name</p>
      <input
        type="text"
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <p>Email</p>
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <p>Password</p>
      <input
        type="text"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default Registerpage;
