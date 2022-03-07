import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

import { userLoggedOut } from '../store/slices/user';
import { resetApiCallState } from '../store/slices/apiCall';

const Main = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { name } = useSelector((state) => state.user);

  if (!name) {
    return <Navigate replace to="/" />;
  }

  const logOutHandler = () => {
    dispatch(userLoggedOut());
    dispatch(resetApiCallState());
    navigate('/');
  };
  return (
    <div>
      <h1>
        <strong>{name}</strong>is loged in...
      </h1>
      <button onClick={() => logOutHandler()}>Log out</button>
    </div>
  );
};

export default Main;
