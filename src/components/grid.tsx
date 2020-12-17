import React, { useState, useEffect } from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import { ClientSideRowModelModule, GridOptions } from "@ag-grid-community/all-modules";
import { connect } from 'react-redux';

import {getItems, getQueryId} from '../api';
import {getTradeMetadata, setUpdatedIds} from '../actions';
import getDataTypes, {getColumnDefinitionList, getColumnNameList} from '../utils/columnDefs';
import {getCalculatedColDefList} from '../utils/predefinedConfig';

import 'ag-grid-community/dist/styles/ag-grid.css';
import "@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css";
import 'ag-grid-enterprise';
import { parseDataSource } from '../utils/dataFormatter';

import Adaptable from '@adaptabletools/adaptable/agGrid';
// import Adaptable Component and other types
import '@adaptabletools/adaptable/index.css';
import '@adaptabletools/adaptable/themes/dark.css';
import AdaptableReact, {
  AdaptableOptions, DataChangedInfo, FilterOptions, AdaptableApi, PredefinedConfig, ActionColumnClickedEventArgs, AdaptableMenuItem, 
  ActionColumnClickedInfo, MenuInfo, AdaptableColumn, GetColumnValuesFunction
} from "@adaptabletools/adaptable-react-aggrid";
import { AllEnterpriseModules } from '@ag-grid-enterprise/all-modules';


interface MapDispatchToProps {
  getTradeMetadata: (destinationObject: any) => any;
 }

interface MapStateToProps {
  metadata: any;
  rowData: any;
  groupedColumns: any[];
  aggColumns: any[];
  isPivot: boolean;
  loading: boolean;
  pivotColumns: any[];
  isApplyFilters: boolean;
  selectedFilterValuesByColumn: any;
  lastGridRequest: any;
  dataTypesMap: any;
  pinnedBottomRow: any;
  pinnedTopRowDataById: any;
  theme: string;
  searchText: string;
  savingViewName: string;
  selectedViewName: string;
  isCondensedView: boolean;
  updatedIds: string[];
}

interface IProps {
  destinationObject: string;
  screenName: string;
  openDetailScreen: (params: any) => void;
}

interface MapStateToProps {
  metadata: any;
  rowData: any;
  groupedColumns: any[];
  aggColumns: any[];
  isPivot: boolean;
  loading: boolean;
  pivotColumns: any[];
  isApplyFilters: boolean;
  selectedFilterValuesByColumn: any;
  lastGridRequest: any;
  dataTypesMap: any;
  pinnedBottomRow: any;
  pinnedTopRowDataById: any;
  theme: string;
  searchText: string;
  savingViewName: string;
  selectedViewName: string;
  isCondensedView: boolean;
  updatedIds: string[];
}

class Grid extends React.Component<IProps & MapStateToProps & MapDispatchToProps, MapStateToProps>  {
  gridApi: any;
  columnApi: any; 
  serverRequest: any;
  
   // Get trade meta data
    componentDidMount(){
      const { getTradeMetadata } = this.props;
      getTradeMetadata({destinationObject: "TradeView"});
      debugger;
      getQueryId('TradeView').then(response => {
        debugger;
        const { data } = response.data;
        const { sessionId, queryHash } = data;
        // Yuan: calling another api here. check EventSource
        // Does this mean everytime my data is updated in the backend, eventSource will get the data back to me?
        const eventSource = new EventSource(`https://hydra.transcendstreet.com:8768/realtime-svc/start-query?queryId=${queryHash}&sessionId=${sessionId}`);
        eventSource.onmessage = (e: any) => {
          const { updatedIds }  = JSON.parse(e.data);
          setUpdatedIds({updatedIds});
        }
        debugger;        
      })
    }

    onGridReady = (params: any) => {
      this.gridApi = params.api;
      this.columnApi = params.columnApi;
      // Autosize all columns
      const allColIds = this.columnApi.getAllColumns().map((column: any) => column.colId);
      this.columnApi.autoSizeColumns(allColIds);
      
      const{metadata} = this.props;

      // print new column formula
      // console.log("meta data w/ new formula", formatColumnExpr(metadata));

      // print meta data name
      console.log("metadata", metadata.extensionMetaData.filter((column: any) => column.formula === null).map((column: any) => column.uiColumn))

      // handle formula string
      // 1. filter metadata with formulas
      const formulatedCols = metadata.extensionMetaData.filter((column: any) => column.formula !== null)
      const formulas = formulatedCols.map((formulatedCol: any) => formulatedCol.formula.split(",", 2));
      console.log(formulas);

      const requestParams = {
        destinationObject: "TradeView",
        columnNames: getColumnNameList(metadata)
      };
      // Set source data
      const dataSource = this.createServerDataSource(requestParams, getDataTypes(metadata));      
      this.gridApi.setServerSideDatasource(dataSource);
    }

    createServerDataSource = (requestParams: any, dataTypesMap: any) => {
      const dataSource: any = {
        getRows: (params: any) => {
          const { request, parentNode} = params;
          try {
            const serverRequest = {
              "queryName": requestParams.destinationObject,
              "beginIndex": params.startRow,
              "endIndex": params.endRow,
              "columnNames": requestParams.columnNames
            };
          ;  
            getItems(serverRequest).then((response: any) => {
              debugger;
              const dataSource = parseDataSource(response.data.data, dataTypesMap);
              const { totalRowCount } = response.data.data;
              //this.setTotalRowCount(totalRowCount)
              const lastRow = true ? -1 : totalRowCount;
              // if (rowGroupCols.length) {
              //   setColumnsInvisible(rowGroupCols, parentNode);
              // }
              params.successCallback(dataSource, lastRow);
              //this.setRowHeight();
            })
          } catch (error) {
            params.failCallback();
          }
        }
      }
      dataSource.requestParams = requestParams;
      return dataSource;
    }

    

    render(){
      const{screenName, metadata} = this.props;
      //if metadata does not exist
      if(!metadata) {
        return (
          <div></div>
        )
      }
      // 1. define columns, columnDefs is an array
      const columnDefs = getColumnDefinitionList(metadata.extensionMetaData);
      // 2. define gridOptions
      const gridOptions = {
        columnDefs,
        rowModelType: 'serverSide',
        onGridReady: this.onGridReady,
      }

      // config calculated column
      const calculatedColConfig: PredefinedConfig = {
        Dashboard: {
          VisibleButtons: ['CalculatedColumn'],
        },
        CalculatedColumn: {
          CalculatedColumns: getCalculatedColDefList(metadata)
        }
      }
      console.log('calculatedConfig', calculatedColConfig);
      // define adaptableOptions
      const adaptableOptions: AdaptableOptions = {
        primaryKey: "id",
        userName: "sandbox user",
        adaptableId: "adaptable react demo",
        predefinedConfig: calculatedColConfig,
        vendorGrid: { ...gridOptions},
        queryOptions: {
          ignoreCaseInQueries: false,
        },
      };

      // const modules = [...AllEnterpriseModules, ClientSideRowModelModule];
      const modules = [...AllEnterpriseModules];

      debugger;
      // Create the AdapTable inastance by using the AdapTableReact component
      // And also create the ag-Grid instance by using the AgGridReact component
      // NOTE: we pass the SAME gridOptions object into both 
      return (

        <div>
        <header>Trade View</header>
        <div style={{ display: "flex", flexFlow: "column", height: "100vh" }}>
          <AdaptableReact
              style={{ flex: "none" }}
              gridOptions={gridOptions}
              adaptableOptions={adaptableOptions}
              modules={modules}
              // onAdaptableReady={({ adaptableApi}) => {
              //   console.log("ready!!!!");
              //   adaptableApi.eventApi.on("SelectionChanged", (args) => {
              //     console.warn(args);
              //   });
              // }}
            />
          <div className="ag-theme-balham" style={{ flex: 1 }}>
            {/* <button onClick={onButtonClick}>Get selected rows</button> */}
            <AgGridReact
                gridOptions = {gridOptions}
                />
          </div>

        </div>
        </div>
      );
    }
    
};

const mapDispatchToProps: MapDispatchToProps  = {
  getTradeMetadata,
};

const mapStateToProps = (state: any) => ({
  metadata: state.tradeViewContainer.tradeViewMetadata,
  rowData: state.tradeViewContainer.tradeViewData,
  groupedColumns: state.tradeViewContainer.groupedColumns,
  isPivot: state.tradeViewContainer.isPivot,
  loading: state.tradeViewContainer.loading,
  pivotColumns: state.tradeViewContainer.pivotColumns,
  isApplyFilters: state.tradeViewContainer.isApplyFilters,
  selectedFilterValuesByColumn: state.tradeViewContainer.selectedFilterValuesByColumn,
  lastGridRequest: state.tradeViewContainer.lastGridRequest,
  dataTypesMap: state.tradeViewContainer.dataTypesMap,
  pinnedBottomRow: state.tradeViewContainer.pinnedBottomRow
})

export default connect(mapStateToProps, mapDispatchToProps)(Grid);