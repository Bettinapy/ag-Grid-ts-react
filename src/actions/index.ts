import { Dispatch } from "redux";

const createAction: any = (type: string, payload: any) => {
    const action: any = {
      type
    };
    if (payload) {
      action.payload = payload;
    }
    debugger;
    return action;
  };

export const isLoggedIn = (params: any) => createAction('IS_LOGGED_IN', params);

export const getTradeMetadata = (params: any) => createAction('FETCH_TRADE_META_DATA_TRIGGER', params)

export const getTradeData = (params: any) => createAction('FETCH_TRADE_DATA_TRIGGER', params)

export const setUpdatedIds = (params: any) => createAction('SET_UPDATED_IDS', params);