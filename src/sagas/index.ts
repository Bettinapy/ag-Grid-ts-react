import { fork, put, takeLatest, takeEvery, all } from 'redux-saga/effects';
import { fetchTradeMetaData, fetchTradeData } from './tradeSagas'
import {FETCH_TRADE_META_DATA} from '../actions/entityActions';
//import { fetchLegalMetaData } from './legalSagas'

export default function* rootSaga() {
  debugger;
  yield all([
    yield takeEvery('FETCH_TRADE_META_DATA_TRIGGER',
      fetchTradeMetaData),
    yield takeEvery('FETCH_TRADE_DATA_TRIGGER',
      fetchTradeData),
  ])
    // yield takeEvery('FETCH_LEGAL_META_DATA'.TRIGGER,
    //   fetchLegalMetaData),
    // yield takeEvery('SET_TRADE_FILTER_COLUMN_VALUES'.TRIGGER,
    //   fetchTradeFilterColumnValues)       
}