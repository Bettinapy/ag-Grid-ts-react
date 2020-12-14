interface IState {
    isPivot: boolean,
    tradeViewMetadata: any | null,
    tradeViewData: any | null,
    groupedColumns: any[],
    aggColumns: any[],
    dataTypesMap: any,
    loading: boolean,
    pivotColumns: any[],
    filterValuesByColumn: any,
    selectedFilterValuesByColumn: any,
    isApplyFilters: boolean,
    lastGridRequest: any,
    pinnedBottomRow: any,
    pinnedTopRowData: any,
    securityFilterField: string;
    totalRowCount: number;
    updatedIds: any[];
  }
  
  const initailState: IState = {
    isPivot: false,
    tradeViewMetadata: null,
    tradeViewData: null,
    groupedColumns: [],
    aggColumns: [],
    dataTypesMap: {},
    loading: false,
    pivotColumns: [],
    securityFilterField: '',
    filterValuesByColumn: {},
    selectedFilterValuesByColumn: {},
    isApplyFilters: false,
    lastGridRequest: {},
    pinnedBottomRow: {},
    pinnedTopRowData: [],
    totalRowCount: 0,
    updatedIds: [],
  }

  const tradeViewReducer = (state = initailState, action: any) => {
      debugger;
    switch (action.type) {
      case 'FETCH_TRADE_META_DATA_TRIGGER': 
      case 'FETCH_TRADE_META_DATA': {
        const { response, requestPayload } = action.payload;
        const { destinationObject } = requestPayload
        const tradeViewMetadata = response.uiExtensionMetadata.find((item: any) => item["destinationClassName"] === destinationObject);
        const pinnedBottomRow = tradeViewMetadata.extensionMetaData.reduce((dict: any, column: any) => {
            dict[column.uiColumn] = {}
            return dict
        }, {});
        debugger;
        return {
            ...state,
            loading: false,
            tradeViewMetadata,
            pinnedBottomRow
        }
      }
      default:
          return state;
    }
};
    export default tradeViewReducer;