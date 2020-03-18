import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import NavigationBar from '../../common/NavigationBar';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { fitSize } from '../../utils/Fit';
import { connect } from 'react-redux';
import { getQualityInspectorSheetList } from '../../action/qualityInspector/index';
import SheetListView from './component/SheetListView';
import TopNavTabsView from './component/TopNavTabsView';
import Constants from '../../utils/Constants';
import SheetItem from './component/SheetItem';


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
      tabNames: ''
    }

    this.createFilterStatusView = this.createFilterStatusView.bind(this);
    this.createFilterTimeView = this.createFilterTimeView.bind(this);
  }

  componentDidMount() {
    this.props.requestWorkSheetList();
  }

  async createFilterTimeView() {
    await this.setState(() => ({
      filterCondition: TabPageEnum.fiterTimePage,
      tabNames: [
        { label: '三天前', key: 'C', value: '&sort=stars' },
        { label: '一周前', key: 'C++', value: '&sort=stars' },
        { label: '一个月前', key: 'React', value: '&sort=stars' },
      ]
    }));
  }

  async createFilterStatusView() {
    await this.setState({
      filterCondition: TabPageEnum.filterStatusPage,
      tabNames: [
        { label: '未报工', key: 'JavaScript', value: '&sort=stars' },
        { label: '已报工', key: 'android', value: '&sort=stars' },
        { label: '全部', key: 'All', value: '&sort=stars' },
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
    console.warn("12333");
    console.warn(data);
    return (<SheetItem {...data} />);
  }

  renderTopNavigationPage = (data) => {
    const { filterCondition } = this.state;
    
    switch (filterCondition) {
      case TabPageEnum.defaultPage:
        return <SheetListView sheetListData={data} />;
      case TabPageEnum.filterStatusPage:
        return <TopNavTabsView tabNames={this.state.tabNames} />;
      case TabPageEnum.fiterTimePage:
        return <TopNavTabsView tabNames={this.state.tabNames} />;
      default:
        return null;
    }
  }

  render() {
    const { qualityInspectorSheetList } = this.props;
    
    return (
      <View style={styles.container}>
        <NavigationBar
          title={'质检单'}
          style={{ backgroundColor: Constants.THEME_COLOR }}
          rightButton={this.renderTabRightButton()}
        />
        {this.renderTopNavigationPage(qualityInspectorSheetList)}
      </View>
    );
  }
}

const mapState = (state) => ({
  qualityInspectorSheetList: state.qualityInspector.qualityInspectorSheetList
})

const mapDispatch = (dispatch) => ({
  requestWorkSheetList() {
    dispatch(getQualityInspectorSheetList())
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default connect(mapState, mapDispatch)(QualityInspectorPage);