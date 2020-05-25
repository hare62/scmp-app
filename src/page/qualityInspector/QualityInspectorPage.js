import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text
} from 'react-native';
import NavigationBar from '../../common/Component/NavigationBar';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { fitSize } from '../../utils/Fit';
import { connect } from 'react-redux';
import { 
  getQualityInspectorSheetList, 
  getLoadingMoreSheetList,
  resetDefaultSheetList
} from '../../redux/action/qualityInspector/index';
import SheetListView from './component/SheetListView';
import TopNavTabsView from './component/TopNavTabsView';
import Constants from '../../utils/Constants';
import { changeLoginStatus as changeLoginStatusAtion } from '../../redux/action/login/index';
import { LoginStatusEnum } from '../login/Constants';
// import NavigationManager from '../../navigation/NavigationManager';
import MessageCenter from '../../api/MessageCenter';
import { Quality_LOAD_MORE　}　from '../../api/MessageDefine';

export const TabPageEnum = {
  defaultPage: Symbol('defaultPage'),
  fiterTimePage: Symbol('fiterTimePage'),
  filterStatusPage: Symbol('filterStatusPage'),
}

class QualityInspectorPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterCondition: TabPageEnum.defaultPage,
      tabNames: '',
      SheetListData:{},//默认质检单数据
    }
    this.createFilterStatusView = this.createFilterStatusView.bind(this);
    this.createFilterTimeView = this.createFilterTimeView.bind(this);
    // MessageCenter.getInstance().registerMessage(Quality_LOAD_MORE, this, this.refreshSheetListData);
    
  }

  // refreshSheetListData(SheetListData) {
  //   this.setState({
  //     SheetListData
  //   })
  // }

  componentDidMount() {
    this.props.requestWorkSheetList((res)=>{
     
    });
  }

  componentWillUnmount(){
    const { changeLoginStatus } =this.props;
    changeLoginStatus(LoginStatusEnum.Unlogin);
    MessageCenter.getInstance().unregisterMessage(Quality_LOAD_MORE);
  }

  async createFilterTimeView() {
    await this.setState(() => ({
      filterCondition: TabPageEnum.fiterTimePage,
      tabNames: [
        { label: '三天前', key: 'DAY', value: 'dateLogo=DAY' },
        { label: '一周前', key: 'WEEK', value: 'dateLogo=WEEK' },
        { label: '一个月前', key: 'MONTH', value: 'dateLogo=MONTH' },
      ]
    }));
  }

  async createFilterStatusView() {
    await this.setState({
      filterCondition: TabPageEnum.filterStatusPage,
      tabNames: [
        { label: '未报工', key: '未完成', value: 'sheetStatus=01' },
        { label: '已报工', key: '已完成', value: 'sheetStatus=02' },
      ]
    });
  }

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

  renderSheetItem(data) {
    return (<SheetItem {...data} />);
  }

  renderTopNavigationPage = () => {
    const { filterCondition, tabNames, SheetListData  } = this.state;
    const { sheetList } = SheetListData;
    const { 
      getLoadingMoreSheetList,
      qualityInspectorSheetList, 
      requestWorkSheetList, 
      resetDefaultSheetList } = this.props;
    switch (filterCondition) {
      case TabPageEnum.defaultPage:
        return <SheetListView 
                  sheetListData={qualityInspectorSheetList}
                  getLoadingMoreSheetList={getLoadingMoreSheetList}
                  getPullUpRefreshSheetList={requestWorkSheetList} 
                  resetDefaultSheetList={resetDefaultSheetList}
                  />;
      case TabPageEnum.filterStatusPage:
        return <TopNavTabsView tabNames={tabNames} />;
      case TabPageEnum.fiterTimePage:
        return <TopNavTabsView tabNames={tabNames} />;
      default:
        return null;
    }
  }

  render() {
    
    return (
      <View style={styles.container}>
        <NavigationBar
          title={'质检单'}
          style={{ backgroundColor: Constants.THEME_COLOR }}
          rightButton={this.renderTabRightButton()}
        />
        {this.renderTopNavigationPage()}
      </View>
    );
  }
}

const mapState = (state) => ({
  qualityInspectorSheetList: state.qualityInspector.qualityInspectorSheetList
})

const mapDispatch = (dispatch) => ({
  //下拉刷新派工单===请求派工单
  requestWorkSheetList(callBack) {
    dispatch(getQualityInspectorSheetList(callBack))
  },
  //更改登录状态
  changeLoginStatus(loginStatus) {
    dispatch(changeLoginStatusAtion(loginStatus));
  },
  getLoadingMoreSheetList(callBack){
    dispatch(getLoadingMoreSheetList(callBack))
  },
  resetDefaultSheetList(){
    dispatch(resetDefaultSheetList())
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default connect(mapState, mapDispatch)(QualityInspectorPage);