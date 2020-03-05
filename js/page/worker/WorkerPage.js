import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity
}
  from 'react-native';
import NavigationBar from '../../common/NavigationBar';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { fitSize } from '../../utils/Fit';
import { connect } from 'react-redux';
import { getDefaultSheetList } from '../../action/worker/index';
import SheetListPage from '../component/SheetListPage'

class WorkerPage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.requestWorkSheetList()
  }

  createWeeklyData() {

  }

  createDailyData() {

  }

  renderTabRightButton() {
    return (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
          onPress={() => this.createWeeklyData()}>
          <Ionicons
            name={'ios-timer'}
            size={fitSize(20)}
            style={{ color: 'white', marginRight: fitSize(20) }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.createDailyData()}>
          <AntDesign
            name={'filter'}
            size={fitSize(20)}
            style={{ color: 'white', marginRight: fitSize(20) }}
          />
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    const { Worker } = this.props;
   
    return (
      <View>
        <NavigationBar
          title={'派工单'}
          style={{ backgroundColor: '#376CDA' }}
          rightButton={this.renderTabRightButton()}
        />
       {!Worker ? <></> :<SheetListPage data={Worker} />}
      </View>
    )
  }
}

const mapState = (state) => ({
  Worker: state.Worker.workSheetList
})

const mapDispatch = (dispatch) => ({
  requestWorkSheetList() {
    dispatch(getDefaultSheetList())
  }
});

export default connect(mapState, mapDispatch)(WorkerPage);