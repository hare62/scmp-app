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
import { getDefaultSheetList } from '../../action/worker/index';
import SheetListPage from '../component/SheetListPage';
import SelectTopNav from '../component/TopNavTabsPage';

const color = 'red'

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
      tabNames: ''
    }

    this.createFilterStatusView = this.createFilterStatusView.bind(this);
    this.createFilterTimeView = this.createFilterTimeView.bind(this);
  }

  componentDidMount() {
    this.props.requestWorkSheetList()
  }

  async createFilterTimeView() {
    await this.setState(() => ({
      filterCondition: TabPageEnum.fiterTimePage,
      tabNames: [
        { label: '三天前', key: 'C', value: '&sort=stars' },
        { label: '一周前', key: 'C++', value: '&sort=stars' },
        { label: '一个月前', key: 'React', value: '&sort=stars' },
      ]
    }))
  }

  async createFilterStatusView() {
    await this.setState({
      filterCondition: TabPageEnum.filterStatusPage,
      tabNames: [
        { label: '未报工', key: 'JavaScript', value: '&sort=stars' },
        { label: '已报工', key: 'android', value: '&sort=stars' },
        { label: '全部', key: 'All', value: '&sort=stars' },
      ]
    })
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
    )
  }

  renderTopNavigationPage = (Worker) => {
    const { filterCondition } = this.state;
    
    switch (filterCondition) {
      case TabPageEnum.defaultPage:
        return <SheetListPage data={Worker} />;
      case TabPageEnum.filterStatusPage:
        return <SelectTopNav data={this.state.tabNames} />;
      case TabPageEnum.fiterTimePage:
        return <SelectTopNav data={this.state.tabNames} />;
      default:
        return null;
    }
  }

  render() {
    const { Worker } = this.props;
    return (
      <View style={styles.container}>
        <NavigationBar
          title={'派工单'}
          style={{ backgroundColor: '#376CDA' }}
          rightButton={this.renderTabRightButton()}
        />
        {this.renderTopNavigationPage(Worker)}
      </View>
    )
  }
}

const mapState = (state) => ({
  Worker: state.Worker.workSheetList,
})

const mapDispatch = (dispatch) => ({
  requestWorkSheetList() {
    dispatch(getDefaultSheetList())
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default connect(mapState, mapDispatch)(WorkerPage);