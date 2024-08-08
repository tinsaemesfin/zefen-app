import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../app/rootReducer';
import { increment, decrement } from './counterSlice';
import StyledButton from '../../components/StyledButton';

const Counter: React.FC = () => {
  const count = useSelector((state: RootState) => state.counter);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>{count}</h1>
      <StyledButton onClick={() => dispatch(increment())}>Increment</StyledButton>
      <StyledButton onClick={() => dispatch(decrement())}>Decrement</StyledButton>
      <StyledButton onClick={() => dispatch({ type: 'counter/incrementAsync' })}>Increment Async</StyledButton>
    </div>
  );
};

export default Counter;