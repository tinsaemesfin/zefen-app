import { all } from 'redux-saga/effects';
import { watchIncrementAsync } from '../features/counter/counterSaga';


function* rootSaga() {
  yield all([
    watchIncrementAsync(),
  ]);
}

export default rootSaga;