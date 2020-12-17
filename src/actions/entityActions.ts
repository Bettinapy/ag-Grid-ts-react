import {createRequestActionTypes, action} from '../utils/appUtils';

export const FETCH_TRADE_META_DATA = createRequestActionTypes('FETCH_TRADE_META_DATA')
export const FETCH_TRADE_DATA = createRequestActionTypes('FETCH_TRADE_DATA')
export const FETCH_LEGAL_META_DATA = createRequestActionTypes('FETCH_LEGAL_META_DATA')
export const SET_TRADE_FILTER_COLUMN_VALUES = createRequestActionTypes('SET_TRADE_FILTER_COLUMN_VALUES');

export const tradeMetaDataFetch = {
    request: () => action('FETCH_TRADE_META_DATA_TRIGGER'),
    success: (response: any,  requestPayload: any) => {
      return action('FETCH_TRADE_META_DATA_SUCCESS', {
        payload: { response, requestPayload }
      })
    },
    failure: (error: any) =>
      action(FETCH_TRADE_META_DATA.ERROR, { payload: { error } })
  };

export const tradeDataFetch = {
    request: () => action('FETCH_TRADE_DATA_TRIGGER'),
    success: (response: any,  requestPayload: any) => {
        return action('FETCH_TRADE_DATA_SUCCESS', {
        payload: { response, requestPayload }
        })
    },
    failure: (error: any) =>
        action(FETCH_TRADE_DATA.ERROR, { payload: { error } })
};