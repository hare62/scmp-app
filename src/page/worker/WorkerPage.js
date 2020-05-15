import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import NavigationBar from '../../common/Component/NavigationBar';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { fitSize } from '../../utils/Fit';
import { connect } from 'react-redux';
import {
  getLoadingMoreSheetList,
  resetAllSheetListData,
  getPullUpRefreshDefaultSheetList
} from '../../redux/action/worker/index';
import SheetListView from './component/SheetListView';
import TopNavTabsTimeView from './component/TopNavTabsTimeView';
import TopNavTabsStatusView from './component/TopNavTabsStatusView';
import { changeLoginStatus as changeLoginStatusAtion } from '../../redux/action/login/index';
import { LoginStatusEnum } from '../login/Constants';

export const TabPageEnum = {
  defaultPage: Symbol('defaultPage'),
  fiterTimePage: Symbol('fiterTimePage'),
  filterStatusPage: Symbol('filterStatusPage'),
}

class WorkerPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterCondition: TabPageEnum.defaultPage,
      tabNames: '',
    }

    this.createFilterStatusView = this.createFilterStatusView.bind(this);
    this.createFilterTimeView = this.createFilterTimeView.bind(this);
  }

  componentDidMount() {
    const { getPullUpRefreshDefaultSheetList } = this.props;
    getPullUpRefreshDefaultSheetList()
  }

  componentWillUnmount() {
    const { changeLoginStatus, resetAllSheetListData } = this.props;
    changeLoginStatus(LoginStatusEnum.Unlogin);
    resetAllSheetListData();
  }

  async createFilterTimeView() {
    await this.setState(() => {
      return {
        filterCondition: TabPageEnum.fiterTimePage,
        tabNames: [
          { label: '三天前', key: 'DAY', value: 'dateLogo=DAY' },
          { label: '一周前', key: 'WEEK', value: 'dateLogo=WEEK' },
          { label: '一个月前', key: 'MONTH', value: 'dateLogo=MONTH' },
        ]
      }
    });
  }

  async createFilterStatusView() {
    await this.setState({
      filterCondition: TabPageEnum.filterStatusPage,
      tabNames: [
        { label: '未完成', key: '未完成', value: 'sheetStatus=01' },
        { label: '已完成', key: '已完成', value: 'sheetStatus=02' },
      ]
    });
  }

  /**
   * 1.1.1渲染右侧图标按钮
   */
  renderTabRightButton() {
    return (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
          onPress={() => this.createFilterTimeView()}>
          <Ionicons
            name={'ios-timer'}
            size={fitSize(20)}
            style={{ color: 'white', marginRight: fitSize(20) }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.createFilterStatusView()}>
          <AntDesign
            name={'filter'}
            size={fitSize(20)}
            style={{ color: 'white', marginRight: fitSize(20) }}
          />
        </TouchableOpacity>
      </View>
    );
  }
  
  /**
   * 1.2渲染页面的内容
   * 1.2.1默认派工单
   * 1.2.2时间筛选派工单
   * 1.2.3状态筛选派工单
   */
  renderContainer = () => {
    const { filterCondition, tabNames } = this.state;
    const {
      workerSheetListData,
      getPullUpRefreshDefaultSheetList,
      getLoadingMoreSheetList } = this.props;

    switch (filterCondition) {
      case TabPageEnum.defaultPage:
        return <SheetListView
          sheetListData={workerSheetListData}
          getLoadingMoreSheetList={getLoadingMoreSheetList}
          getPullUpRefreshSheetList={getPullUpRefreshDefaultSheetList}
        />;
      case TabPageEnum.filterStatusPage:
        return <TopNavTabsStatusView tabNames={tabNames} />;
      case TabPageEnum.fiterTimePage:
        return <TopNavTabsTimeView tabNames={tabNames} />;
      default:
        return null;
    }
  }

  /**
   * 1.渲染页面的组件
   */
  render() {

    return (
      <View style={styles.container}>
        {/* 1.1渲染导航栏NavigationBar */}
        <NavigationBar
          title={'工人派工单'}
          rightButton={this.renderTabRightButton()}
        />
        {/* 1.2渲染页面的内容 */}
        {this.renderContainer()}
      </View>
    );
  }
}

/**
 * 此处不可以再多添加其他会变得数据会引起子组件TopNavTabsStatusView/TopNavTabsTimeView重新渲染
 */
const mapState = (state) => ({
  workerSheetListData: state.Worker.workerSheetListData,
})

const mapDispatch = (dispatch) => ({
  //获取加载更多派工单
  getLoadingMoreSheetList(sheetListData) {
    dispatch(getLoadingMoreSheetList(sheetListData))
  },
  //更改登录状态
  changeLoginStatus(loginStatus) {
    dispatch(changeLoginStatusAtion(loginStatus));
  },
  //重置所有派工单数据
  resetAllSheetListData() {
    dispatch(resetAllSheetListData())
  },
  //下拉刷新派工单
  getPullUpRefreshDefaultSheetList() {
    dispatch(getPullUpRefreshDefaultSheetList())
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default connect(mapState, mapDispatch)(WorkerPage);