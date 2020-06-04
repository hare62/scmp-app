import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { SearchBar } from 'react-native-elements';
import { getSupplierList, getMoreSupplierList } from '../../../redux/action/qualityInspector/index';
import Constants from '../../../utils/Constants';
import { renderNullView, renderLoadMoreView } from '../../../common/Component/ComponentView';
import NavigationManager from "../../../navigation/NavigationManager";

class SupplierView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      list: []
    };
    this.onRefreshGetDefaultSheetList = this.onRefreshGetDefaultSheetList.bind(this);
    this.handleItem = this.handleItem.bind(this);
  }

  componentDidMount() {
    let responsiblePartyType = "02";
    this.props.getSupplierList({ responsiblePartyType });
  }

  updateSearch = (search) => {
    this.setState({ search });
    let responsiblePartyType = "02";
    const { getSupplierList } = this.props;
    let name = search;
    getSupplierList({ responsiblePartyType, name });
  };

  handleItem(i, item) {
    let { isBatchQualityPage } = this.props;
    if (isBatchQualityPage) {
      NavigationManager.goPage('BatchQualityPage', { responsiblePartyItem: item })
    } else {
      NavigationManager.goPage('AddMechanicalPage', { responsiblePartyItem: item })
    }
  }

  renderSheetItem(data) {
    return (
      <TouchableOpacity
        onPress={() => { this.handleItem(data.index, data.item) }}
      >
        <View style={styles.contain} >
          <Text>{data.item.name}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  onRefreshGetDefaultSheetList() {
    let responsiblePartyType = "02";
    this.props.getSupplierList({ responsiblePartyType });
  }

  renderIndicator() {
    const { isLoadingMore } = this.props;
    return (isLoadingMore ? renderLoadMoreView() : null);
  }

  render() {
    const { search } = this.state;
    const { supplierList, getMoreSupplierList } = this.props;
    console.log("supplierList.responsiblePartyList",supplierList)
    return (
      <View style={{ marginBottom: 80 }}>
        <SearchBar
          placeholder="Type Here..."
          onChangeText={this.updateSearch}
          value={search}
        />
        {
          supplierList ? (
            supplierList.responsiblePartyList.length ? (<FlatList
              data={supplierList.responsiblePartyList
              }
              renderItem={data => this.renderSheetItem(data)}
              keyExtractor={item => item.userId}
              refreshControl={
                <RefreshControl
                  title={'Loading'}
                  titleColor={Constants.THEME_COLOR}
                  colors={[Constants.THEME_COLOR]}
                  refreshing={false}
                  onRefresh={this.onRefreshGetDefaultSheetList}
                  tintColor={Constants.THEME_COLOR}
                />
              }
              ListFooterComponent={() => (this.renderIndicator())}
              onEndReached={() => {
                if (supplierList.canLoadMoreData()) {
                  supplierList.nextPage();
                  let proInspectionId = "02"
                  getMoreSupplierList({ responsiblePartyType: proInspectionId, supplierList });
                }
              }}
              onEndReachedThreshold={0.1}
            />) : renderNullView()
          ) : null
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  contain: {
    height: 55,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingLeft: 10,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1
  },
  indicatorContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  indicator: {
    color: Constants.THEME_COLOR,
    margin: 10
  },
})

const mapState = (state) => ({
  supplierList: state.qualityInspector.supplierList,
  isLoadingMore: state.qualityInspector.isLoadingMore
})

const mapDispatch = (dispatch) => ({
  getSupplierList({ responsiblePartyType, name }) {
    dispatch(getSupplierList({ responsiblePartyType, name }))
  },
  getMoreSupplierList({ responsiblePartyType, supplierList }) {
    dispatch(getMoreSupplierList({ responsiblePartyType, supplierList }))
  }
});

export default connect(mapState, mapDispatch)(SupplierView);

