export const parseDataSource = (data: any, columnTypesMap: any) => {
    console.log(data)
    const header = data['header'].split('&#31;');
    const rows = data['dataRow'];
    const ds = rows.map((row: any) => parseDataRow(header, row.split("&#31;"), columnTypesMap));
    let dataSource: any = null;
    if (dataSource != null) {
        dataSource.concat(ds);
    } else {
        dataSource = ds;
    }
    debugger;
    return dataSource;
  }
  
  const  parseDataRow = (header: any, rows: any[], columnTypesMap: any) => {
    let obj: any = {};
    for (let i = 0; i < header.length; i++) {
      //console.log(columnTypesMap[header[i]])
      const value = parseDataTypes[columnTypesMap[header[i]]](rows[i])
      obj[header[i]] = value;
    }
    debugger;
    return obj;
  }
  
const parseDataTypes: any = {
    Int: (value: string) => value && parseInt(value),
    Double: (value: string) => value && parseFloat(value),
    Float: (value: string) => value && parseFloat(value),
    DateTime: (value: string) => value,
    undefined: (value: string) => value,
    String: (value: string) => value,
    Long: (value: string) => value && parseFloat(value),
    BigDecimal: (value: string) => value && parseFloat(value),
    Bool: (value: string) => value && Boolean(value),
    StringList: (value: string) => value,
    aliases: {
      'Long': 'Double',
      'BigDecimal': 'Double',
    }
  }