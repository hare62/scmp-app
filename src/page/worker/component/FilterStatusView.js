import React, { Component } from 'react';
import {
  View,
} from 'react-native';
import SheetListView from './SheetListView';
import { connect } from 'react-redux';
import { getFilterSheetList, getPullUpRefreshFilterSheetList } from '../../../redux/action/worker/index';
import SheetListData from '../../../data/worker/SheetListData';

class FilterStatusView extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.loadData();
  }

  getFetchUrl(key, value) {
    return URL + key + '?' + value;
  }

  loadData() {
    const { data, getFilterSheetList } = this.props;
    const { key, value } = data;
    const url = this.getFetchUrl(key, value);
    const sheetListData = new SheetListData();
    getFilterSheetList(sheetListData, key, value);
  }

  render() {
    const { 
      data, 
      filterSheetData, 
      getFilterSheetList, 
      getPullUpRefreshFilterSheetList 
    } = this.props;
    const { key, value } = data;
    let sheetList = filterSheetData[key];
    
    return (
      <View>
        {!sheetList ? <></> : 
            (<SheetListView 
              value={value}
              keyEx={key}
              sheetListData={sheetList.filterSheetList} 
              getLoadingMoreSheetList={getFilterSheetList}//获取加载更多派工单列表数据
              getPullUpRefreshFilterSheetList={getPullUpRefreshFilterSheetList}//获取下拉刷新派工单列表数据
              isLoading={sheetList.isLoading}
              isLoadingMore={sheetList.isLoadingMore}
            />)
        }
      </View>
    );
  }
}

const mapState = (state) => ({
  filterSheetData: state.Worker,
});

const mapDispatch = (dispatch) => ({
  //获取加载更多的筛选派工单
  getFilterSheetList(sheetListData, key, value) {
    dispatch(getFilterSheetList(sheetListData, key, value))
  },
  //获取下拉刷新的筛选派工单
  getPullUpRefreshFilterSheetList(keyEx, value){
    dispatch(getPullUpRefreshFilterSheetList(keyEx, value))
  }
});

export default connect(mapState, mapDispatch)(FilterStatusView);

