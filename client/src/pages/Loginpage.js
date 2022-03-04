import React, { useState } from 'react';

const Loginpage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();

    console.log('att');
  };

  return (
    <form onSubmit={submitHandler}>
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

export default Loginpage;
