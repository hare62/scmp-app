import React, { Component } from 'react';
import {
  View,
} from 'react-native';
import SheetListView from './SheetListView';
import { connect } from 'react-redux';
import { getFilterSheetList } from '../../../redux/action/qualityInspector/index';

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
    const url = this.getFetchUrl(key, value);
    const pageSize = 1;
    getFilterSheetList(key, url, pageSize);
  }

  render() {
    const { tabNames, item } = this.props;
    const { key } = tabNames;
    let SheetList = item[key];

    return (
      <View>
        {!SheetList ? <></> : <SheetListView sheetListData={SheetList.filterSheetList} />}
      </View>
    );
  }
}

const mapState = (state) => ({
  item: state.qualityInspector,
})

const mapDispatch = (dispatch) => ({
  getFilterSheetList(label, url, pageSize) {
    dispatch(getFilterSheetList(label, url, pageSize))
  }
});

export default connect(mapState, mapDispatch)(FilterStatusView);

