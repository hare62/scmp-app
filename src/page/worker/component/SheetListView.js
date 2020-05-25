import React, { Component } from 'react';
import {
  FlatList,
  View,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  RefreshControl
} from 'react-native';
import { connect } from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import NavigationManager from '../../../navigation/NavigationManager';
import { fitSize } from '../../../utils/Fit';
import styles from '../../../common/Styles/SheetItem';
import { sheetListStatusView } from '../../../utils/Common';
import Constants from '../../../utils/Constants';
import { resetDefaultSheetList } from '../../../redux/action/worker/index';

class SheetListView extends Component {
  constructor(props) {
    super(props);
  }

  /**
   * 1.1渲染每个子列表
   * @param {*} data 
   */
  renderSheetItem(data) {
    const {
      planDate,
      matName,
      sheetCode,
      sheetStatus } = data.item;
    const {
      keyEx,
      value } = this.props;
    const filterSheetListData = data;

    return (
      <TouchableOpacity
        onPress={() => {
          NavigationManager.push('DetailPage', { keyEx, value, filterSheetListData, ...data.item });
        }}
      >
        <View style={styles.cell_container}>
          <View style={styles.container_left} >
            {sheetListStatusView(sheetStatus)}
          </View>
          <View style={styles.container_right}>
            <View style={styles.container_right_title} >
              <Text ellipsizeMode="tail" numberOfLines={1} style={styles.container_right_title_order} >
                {sheetCode}
              </Text>
              <Text ellipsizeMode="tail" numberOfLines={1} style={styles.container_right_title_materials}>
                {matName}
              </Text>
            </View>
            <View style={styles.container_right_contain} >
              <Text style={styles.container_right_date} >
                <AntDesign
                  name={'clockcircleo'}
                  size={fitSize(20)}
                  style={{ color: '#aaa', }}
                />
              </Text>
              <Text style={styles.container_right_text}>
                {planDate}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  /**
   * 1.3渲染加载更多的图标
   */
  renderIndicator() {
    const { isLoadingMore } = this.props;
    return (isLoadingMore ? <>
      <View style={styles.indicatorContainer}>
        <ActivityIndicator
          style={styles.indicator}
        />
        <Text>正在加载...</Text>
      </View></> : null);
  }

  showFooterComponent() {
    this.setState(() => ({
      isShowFooter: true
    }))
  }

  hideFooterComponent() {
    this.setState(() => ({
      isShowFooter: false
    }))
  }

  ListEmptyView() {
    return (
      <View style={styles.nomessage_container}>
        <Text style={styles.nomessage_container_text}>没有更多数据啦......</Text>
      </View>
    )
  }

  /**
   * 1.2刷新默认派工单
   */
  onRefreshGetDefaultSheetList() {
    // 清除默认派工单数据
    let { 
      resetDefaultSheetList,
      getPullUpRefreshSheetList,
      getPullUpRefreshFilterSheetList,
      keyEx,
      value
    } = this.props;

    resetDefaultSheetList();
    if (keyEx && value) {
      getPullUpRefreshFilterSheetList(keyEx, value);
    } else {
      getPullUpRefreshSheetList();
    }
  }

  /**
   *1. 渲染滚动列表
   */
  render() {
    const {
      keyEx,
      value,
      sheetListData,
      getLoadingMoreSheetList,
      isLoading } = this.props;

    return (
      <View style={{ marginBottom: 60 }}>
        <FlatList
          data={sheetListData.sheetList}
          renderItem={data => this.renderSheetItem(data)}
          keyExtractor={item => item.sheetId}
          refreshControl={
            <RefreshControl
              title={'Loading'}
              titleColor={Constants.THEME_COLOR}
              colors={[Constants.THEME_COLOR]}
              refreshing={isLoading}
              onRefresh={() => (this.onRefreshGetDefaultSheetList())}
              tintColor={Constants.THEME_COLOR}
            />
          }
          ListFooterComponent={() => (this.renderIndicator())}
          onEndReached={() => {
            if (sheetListData.canLoadMoreData()) {
              sheetListData.nextPage();
              getLoadingMoreSheetList(sheetListData, keyEx, value);
            }
          }}
          /**
           * 决定当距离内容最底部还有多远时触发onEndReached回调。注意此参数是一个比值而非像素单位。
           * 比如，0.5 表示距离内容最底部的距离为当前列表可见长度的一半时触发。
           */
          onEndReachedThreshold={0.1}
        />
      </View>
    );
  }
};

SheetListView.defaultProps = {
  keyEx: '',
  value: ''
}

const mapState = (state) => ({
  isLoading: state.Worker.isLoading,
  isLoadingMore: state.Worker.isLoadingMore,
  // workerSheetListData: state.Worker.workerSheetListData,
})

const mapDispatch = (dispatch) => ({
  resetDefaultSheetList() {
    dispatch(resetDefaultSheetList());
  }
})

export default connect(mapState, mapDispatch)(SheetListView);
