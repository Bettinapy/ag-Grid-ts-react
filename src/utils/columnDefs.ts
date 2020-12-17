// get column definition list without calculated columns
export const getColumnDefinitionList = (columns: any) => {
    debugger;
    const columnDefs = columns
                        .filter((column: any) => column.formula === null)
                        .map((column: any) => {
                            return{
                                "headerName": column.displayLabel,
                                "field": column.uiColumn,
                                "type": column.type,
                                //"hide": column.visible === 'FALSE' ? true : false,
                                //"valueGetter": column.formula !== null ? abValueGetter : null,
                            }
                        });
    return columnDefs;
}

function abValueGetter(params: any) {
    console.log("valueGetter", params);
    return params.data.TradePrice;
  }


// get all column names without calculated columns
export const getColumnNameList = (columns: any) => {
    // get all columns and their values (valueGetters in ag-grid)
    return columns.extensionMetaData.filter((column: any) => column.formula === null).map((column: any) => column.uiColumn)
    // return columns.extensionMetaData.map((column: any) => column.uiColumn)
  }

export default function getDataTypes(columns: any) {
    return columns.extensionMetaData.reduce((dict: any, column: any) => {
      dict[column.uiColumn] = column.type
      return dict
    }, {})
  }

