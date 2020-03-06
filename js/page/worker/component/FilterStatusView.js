import React, { Component } from 'react';
import {
  View,
} from 'react-native';
import SheetListPage from '../../component/SheetListPage';
import { connect } from 'react-redux';
import { getFilterSheetList } from '../../../action/worker/index';

class FilterStatusView extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.loadData()
  }

  getFetchUrl(key, value) {
    return URL + key + '?' + value;
  }

  loadData() {
    const { data, getFilterSheetList } = this.props;
    const { label, key, value } = data;
    const url = this.getFetchUrl(key, value);
    const pageSize = 1;
    getFilterSheetList(key, url, pageSize);
  }

  render() {
    const { data, item } = this.props;
    const { label, key, value } = data;
    let SheetList = item[key];
    return (
      <View>
        {!SheetList ? <></> : <SheetListPage data={SheetList.filterSheetList} ></SheetListPage>}
      </View>
    )
  }
}

const mapState = (state) => ({
  item: state.Worker,
})

const mapDispatch = (dispatch) => ({
  getFilterSheetList(label, url, pageSize) {
    dispatch(getFilterSheetList(label, url, pageSize))
  }
});


export default connect(mapState, mapDispatch)(FilterStatusView);

