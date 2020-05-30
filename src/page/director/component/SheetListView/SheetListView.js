import React, { Component } from 'react';
import {
  FlatList,
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  RefreshControl
} from 'react-native';
import SheetItem from './SheetItem';
import { connect } from 'react-redux';
import { TabPageEnum } from '../../define';
import {
  getDefaultSheetList,
  getLastDaysSheetList,
  getLastWeekSheetList,
  getHalfYearSheetList,
  getUnreportedSheetList,
  getCheckingSheetList,
  getFinishedSheetList,
  getRefreshDefaultSheetList,
  getRefreshLastDaysSheetList,
  getRefreshLastWeekSheetList,
  getRefreshHalfYearSheetList,
  getRefreshUnreportedSheetList,
  getRefreshCheckingSheetList,
  getRefreshFinishedSheetList
} from '../../../../redux/action/director';
import Constants from '../../../../utils/Constants';
import { LoadingView } from '../../../../common/Component/LoadingView';

class SheetListView extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.requestRefreshSheetData();
  }

  requestRefreshSheetData() {
    const requestRefreshMethod = this.getRequestRefreshMethod();
    requestRefreshMethod();
  }

  requestSheetData() {
    const requestMethod = this.getRequestMethod();
    const sheetListData = this.getSheetListDatas();

    requestMethod(sheetListData);
  }

  getRequestRefreshMethod() {
    const { pageIdentify,
      getRefreshDefaultSheetList,
      getRefreshLastDaysSheetList,
      getRefreshLastWeekSheetList,
      getRefreshHalfYearSheetList,
      getRefreshUnreportedSheetList,
      getRefreshCheckingSheetList,
      getRefreshFinishedSheetList } = this.props;

    switch (pageIdentify) {
      case TabPageEnum.LastDaysPage:
        return getRefreshLastDaysSheetList;
      case TabPageEnum.LastWeekPage:
        return getRefreshLastWeekSheetList;
      case TabPageEnum.LastHalfYearPage:
        return getRefreshHalfYearSheetList;
      case TabPageEnum.UnreportedPage:
        return getRefreshUnreportedSheetList;
      case TabPageEnum.CheckingPage:
        return getRefreshCheckingSheetList;
      case TabPageEnum.FinishedPage:
        return getRefreshFinishedSheetList;
      default:
        return getRefreshDefaultSheetList;
    }
  }

  getRequestMethod() {
    const { pageIdentify,
            requestWorkSheetList,
            requestLastDaysSheetList,
            requestLastWeekSheetList,
            requestHalfYearSheetList,
            requestUnreportedSheetList,
            requestCheckingSheetList,
            requestFinishedSheetList } = this.props;

    switch (pageIdentify) {
      case TabPageEnum.LastDaysPage:
        return requestLastDaysSheetList;
      case TabPageEnum.LastWeekPage:
        return requestLastWeekSheetList;
      case TabPageEnum.LastHalfYearPage:
        return requestHalfYearSheetList;
      case TabPageEnum.UnreportedPage:
        return requestUnreportedSheetList;
      case TabPageEnum.CheckingPage:
        return requestCheckingSheetList;
      case TabPageEnum.FinishedPage:
        return requestFinishedSheetList;
      default:
        return requestWorkSheetList;
    }
  }

  getSheetListDatas() {
    const { pageIdentify,
            workSheetList,
            lastDaysSheetList,
            lastWeekSheetList,
            halfYearSheetList,
            unreportedSheetList,
            checkingSheetList,
            finishedSheetList } = this.props;

    switch (pageIdentify) {
      case TabPageEnum.LastDaysPage:
        return lastDaysSheetList;
      case TabPageEnum.LastWeekPage:
        return lastWeekSheetList;
      case TabPageEnum.LastHalfYearPage:
        return halfYearSheetList;
      case TabPageEnum.UnreportedPage:
        return unreportedSheetList;
      case TabPageEnum.CheckingPage:
        return checkingSheetList;
      case TabPageEnum.FinishedPage:
        return finishedSheetList;
      default:
        return workSheetList;
    }
  }

  getIndicator() {
    let { isLoadingMore } = this.props
    return (isLoadingMore ? <><View style={styles.indicatorContainer}>
      <ActivityIndicator
        style={styles.indicator}
      />
      <Text>正在加载...</Text>
    </View></> : null);
  }

  ListEmptyView() {
    return (
      <View style={styles.nomessage_container}>
        <Text style={styles.nomessage_container_text}>没有更多数据啦......</Text>
      </View>
    )
  }

  renderIndicator() {
    const { isLoadingMore } = this.props;
    return (isLoadingMore ? <><View style={styles.indicatorContainer}>
      <ActivityIndicator
        style={styles.indicator}
      />
      <Text>正在加载...</Text>
    </View></> : null);
  }

  render() {
    const sheetDatas = this.getSheetListDatas();
    const { sheetList } = sheetDatas;
    const { isLoading } = this.props;

    return (
      <View>
        <FlatList
          style={{ marginBottom: 50 }}
          data={sheetList}
          renderItem={data => <SheetItem {...data} />}
          keyExtractor={item => item.sheetId}
          refreshControl={
            <RefreshControl
              title={'Loading'}
              titleColor={Constants.THEME_COLOR}
              colors={[Constants.THEME_COLOR]}
              refreshing={isLoading}
              onRefresh={() =>(this.requestRefreshSheetData()) }
              tintColor={Constants.THEME_COLOR}
            /> 
          }
          ListFooterComponent={() => (this.renderIndicator())}
          onEndReached={() => {
            if (sheetDatas.canLoadMoreData()) {
              sheetDatas.nextPage();
              this.requestSheetData();
            }
          }}
          onEndReachedThreshold={0.1}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  indicatorContainer:{
    justifyContent:'center',
    alignItems:'center'
  },
  indicator: {
    color: Constants.THEME_COLOR,
    margin: 10
  },
  nomessage_container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,

  },
  nomessage_container_text: {
    color: Constants.DESCRIBE
  },
})

const mapState = (state) => ({
  workSheetList: state.director.workSheetList,
  lastDaysSheetList: state.director.lastDaysSheetList,
  lastWeekSheetList: state.director.lastWeekSheetList,
  halfYearSheetList: state.director.halfYearSheetList,
  unreportedSheetList: state.director.unreportedSheetList,
  checkingSheetList: state.director.checkingSheetList,
  finishedSheetList: state.director.finishedSheetList,
  isLoadingMore: state.director.isLoadingMore,
  isLoading: state.director.isLoading
});

const mapDispatch = (dispatch) => ({
  // 加载更多-获取默认的派工单列表
  requestWorkSheetList(data) {
    dispatch(getDefaultSheetList(data))
  },
  //上拉刷新-获取默认的派工单列表
  getRefreshDefaultSheetList() {
    dispatch(getRefreshDefaultSheetList())
  },
  // 加载更多-获取最近三天的派工单
  requestLastDaysSheetList(data) {
    dispatch(getLastDaysSheetList(data));
  },
  // 上拉刷新-获取最近三天的派工单
  getRefreshLastDaysSheetList() {
    dispatch(getRefreshLastDaysSheetList())
  },
  // 加载更多-获取最近一周的派工单
  requestLastWeekSheetList(data) {
    dispatch(getLastWeekSheetList(data));
  },
  //上拉刷新-获取最近一周的派工单
  getRefreshLastWeekSheetList() {
    dispatch(getRefreshLastWeekSheetList())
  },
  // 加载更多-获取最近半年的派工单
  requestHalfYearSheetList(data) {
    dispatch(getHalfYearSheetList(data));
  },
  //上拉刷新-获取最近半年的派工单
  getRefreshHalfYearSheetList() {
    dispatch(getRefreshHalfYearSheetList())
  },
  // 加载更多-获取未报工的派工单
  requestUnreportedSheetList(data) {
    dispatch(getUnreportedSheetList(data));
  },
  //上拉刷新-获取未报工的派工单
  getRefreshUnreportedSheetList() {
    dispatch(getRefreshUnreportedSheetList())
  },
  // 加载更多-获取质检中的派工单sheetStatus=01
  requestCheckingSheetList(data) {
    dispatch(getCheckingSheetList(data));
  },
  //上拉刷新-获取质检中的派工单sheetStatus=01
  getRefreshCheckingSheetList() {
    dispatch(getRefreshCheckingSheetList())
  },
  //加载更多-获取已完成的派工单sheetStatus=03
  requestFinishedSheetList(data) {
    dispatch(getFinishedSheetList(data));
  },
  //上拉刷新-获取已完成的派工单sheetStatus=03
  getRefreshFinishedSheetList() {
    dispatch(getRefreshFinishedSheetList())
  }

})

export default connect(mapState, mapDispatch)(SheetListView);