import { combineReducers } from 'redux';
import settingReducer from './settingReducer';
import tradeViewReducer from './tradeViewReducer';

export default combineReducers({
    tradeViewContainer: tradeViewReducer,
    settingsContainer: settingReducer
  });