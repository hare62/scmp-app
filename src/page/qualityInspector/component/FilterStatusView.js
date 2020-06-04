import React, { Component } from 'react';
import {
  View,
} from 'react-native';
import SheetListView from './SheetListView';
import { connect } from 'react-redux';
import SheetListData from '../../../data/qualityInspector/SheetListData';
import { getFilterSheetList, getPullUpRefreshFilterSheetList, resetDefaultSheetList} from '../../../redux/action/qualityInspector/index';

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
    const { tabNames, getFilterSheetList } = this.props;
    const { key, value } = tabNames;
    const sheetListData = new SheetListData();
    getFilterSheetList(sheetListData, key, value);
    //默认数据和下拉加载更多数据是一个方法
  }

  render() {
    const { 
      tabNames, 
      item, 
      getPullUpRefreshFilterSheetList, 
      getFilterSheetList,
      resetDefaultSheetList
    } = this.props;
    const { key, value } = tabNames;
    let SheetList = item[key];

    return (
      <View>
        {!SheetList ? <></> : 
        <SheetListView 
        value={value} 
        keyEx={key}
        sheetListData={SheetList.filterSheetList} 
        getPullUpRefreshFilterSheetList={getPullUpRefreshFilterSheetList}//获取下拉刷新派工单列表数据
        getLoadingMoreSheetList={getFilterSheetList}
        isLoading={SheetList.isLoading}
        isLoadingMore={SheetList.isLoadingMore}
        resetDefaultSheetList={resetDefaultSheetList}
        />}
      </View>
    );
  }
}

const mapState = (state) => ({
  item: state.qualityInspector,
})

const mapDispatch = (dispatch) => ({
   //获取加载更多的筛选质检单
  getFilterSheetList( sheetListData, key, value) {
    dispatch(getFilterSheetList( sheetListData, key, value))
  },
   //获取下拉刷新的筛选质检单
  getPullUpRefreshFilterSheetList(keyEx, value){
    dispatch(getPullUpRefreshFilterSheetList(keyEx, value))
  },
  resetDefaultSheetList(){
    dispatch(resetDefaultSheetList())
  }
});

export default connect(mapState, mapDispatch)(FilterStatusView);

