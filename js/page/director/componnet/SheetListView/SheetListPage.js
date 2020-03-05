import React, { Component } from 'react';
import {
  FlatList,
  View,
  RefreshControl
} from 'react-native';
import SheetItem from './SheetItem';
import { connect } from 'react-redux';
import { TabPageEnum } from '../../define';
import {
  getLastDaysSheetList,
  getLastWeekSheetList,
  getHalfYearSheetList,
  getUnreportedSheetList,
  getCheckingSheetList,
  getFinishedSheetList
} from '../../../../action/actionCreators'

const THEME_COLOR = '#AA2F23';

class SheetListPage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { pageIdentify,
            requestLastDaysSheetList,
            requestLastWeekSheetList,
            requestHalfYearSheetList,
            requestUnreportedSheetList,
            requestCheckingSheetList, 
            requestFinishedSheetList } = this.props;

    switch(pageIdentify) {
      case TabPageEnum.LastDaysPage: 
        requestLastDaysSheetList();
        break;
      case TabPageEnum.LastWeekPage:
        requestLastWeekSheetList();
        break;
      case TabPageEnum.LastHalfYearPage: 
        requestHalfYearSheetList();
        break;
      case TabPageEnum.UnreportedPage: 
        requestUnreportedSheetList();
        break;
      case TabPageEnum.CheckingPage:
        requestCheckingSheetList();
        break;
      case TabPageEnum.FinishedPage:
        requestFinishedSheetList();
        break;
      default: 
        break;
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

    switch(pageIdentify) {
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

  render() {
    let sheetDatas = this.getSheetListDatas();

    return (
      <View>
        <FlatList
          data={sheetDatas}
          renderItem={data => <SheetItem {...data} />}
          keyExtractor={item => item.id}
          refreshControl={
            <RefreshControl
              title={'Loading'}
              titleColor={THEME_COLOR}
              colors={[THEME_COLOR]}
              refreshing={false}
              onRefresh={() => {}}
              tintColor={THEME_COLOR}
            />
          }
        />
      </View>
    );
  }
};

const mapState = (state) => ({
  workSheetList: state.director.workSheetList,
  lastDaysSheetList: state.director.lastDaysSheetList,
  lastWeekSheetList: state.director.lastWeekSheetList,
  halfYearSheetList: state.director.halfYearSheetList,
  unreportedSheetList: state.director.unreportedSheetList,
  checkingSheetList: state.director.checkingSheetList,
  finishedSheetList: state.director.finishedSheetList,
});

const mapDispatch = (dispatch) => ({
  requestLastDaysSheetList() {
    dispatch(getLastDaysSheetList());
  },
  requestLastWeekSheetList() {
    dispatch(getLastWeekSheetList());
  },
  requestHalfYearSheetList() {
    dispatch(getHalfYearSheetList());
  },
  requestUnreportedSheetList() {
    dispatch(getUnreportedSheetList());
  },
  requestCheckingSheetList() {
    dispatch(getCheckingSheetList());
  },
  requestFinishedSheetList() {
    dispatch(getFinishedSheetList());
  }
})

export default connect(mapState, mapDispatch)(SheetListPage);