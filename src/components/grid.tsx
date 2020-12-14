import React, { useState, useEffect } from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import { connect } from 'react-redux';

import {getQueryId} from '../api';
import {getTradeMetadata} from '../actions';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';


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
    // Get trade meta data
    componentDidMount(){
      getTradeMetadata({destinationObject: "TradeView"});
      debugger;
    }
    render(){

      return (
        <div className="ag-theme-alpine" style={ { height: 400, width: 600 } }>
          {/* <button onClick={onButtonClick}>Get selected rows</button> */}
      <AgGridReact
          rowSelection="multiple"
         groupSelectsChildren={true}
         autoGroupColumnDef={{
             headerName: "Model",
             field: "model",
             cellRenderer:'agGroupCellRenderer',
             cellRendererParams: {
                 checkbox: true
             }
         }}>
              <AgGridColumn field="make" sortable={true} filter={true} checkboxSelection={true} ></AgGridColumn>
              <AgGridColumn field="model" sortable={true} filter={true} ></AgGridColumn>
              <AgGridColumn field="price" sortable={true} filter={true} ></AgGridColumn>
          </AgGridReact>
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