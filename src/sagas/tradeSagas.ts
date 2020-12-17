import { tradeMetaDataFetch, tradeDataFetch } from '../actions/entityActions'
import {fetchEntity} from './generics';
import * as api from '../api';

export function* fetchTradeMetaData(action: any) {
  const { destinationObject } = action.payload;
  debugger;
  const response = yield fetchEntity(
    tradeMetaDataFetch,
    api.getMetadata,
    [destinationObject],
    action
  );
}

export function* fetchTradeData(action: any) {
  const { request } = action.payload;
  const response = yield fetchEntity(
    tradeDataFetch,
    api.getItems,
    [request],
    action
  );
}

// export function* fetchTradeFilterColumnValues(action: any) {
//   const { columnNames, destinationObject } = action.payload;
//   const body = {
//     "queryName": destinationObject,
//     columnNames,
//     "aggregateColumnNames": [
//       {
//         "columnName": columnNames[0],
//         "aggregationType": "COUNT"
//       }
//     ]
//   }
//   const response = yield fetchEntity(
//     setTradeFilterValues,
//     api.getItems,
//     [body],
//     action
//   )
// }
