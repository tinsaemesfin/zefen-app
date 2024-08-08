import { takeEvery, put, delay } from 'redux-saga/effects';
import { increment } from './counterSlice';

function* incrementAsync() {
  yield delay(1000);
  yield put(increment());
}

export function* watchIncrementAsync() {
  yield takeEvery('counter/incrementAsync', incrementAsync);
}