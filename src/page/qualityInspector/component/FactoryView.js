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
import { getFactoryList, getMoreFactoryList } from '../../../redux/action/qualityInspector/index';
import Constants from '../../../utils/Constants';
import { renderNullView, renderLoadMoreView } from '../../../common/Component/ComponentView';
import NavigationManager from "../../../navigation/NavigationManager";

class FactoryView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
    };
    this.onRefreshGetDefaultSheetList = this.onRefreshGetDefaultSheetList.bind(this);
    this.handleItem = this.handleItem.bind(this);
  }
  componentDidMount() {
    let responsiblePartyType = "01";
    this.props.getFactoryList({ responsiblePartyType });
  }

  updateSearch = (search) => {
    this.setState({ search });
    let responsiblePartyType = "01";
    const { getFactoryList } = this.props;
    let name = search;
    getFactoryList({ responsiblePartyType, name });
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
    let responsiblePartyType = "01";
    this.props.getFactoryList({ responsiblePartyType });
  }

  renderIndicator() {
    const { isLoadingMore } = this.props;
    return (isLoadingMore ? renderLoadMoreView() : null);
  }

  render() {
    const { search } = this.state;
    const { factoryList, getMoreFactoryList } = this.props;
    return (
      <View style={{ marginBottom: 80 }}>
        <SearchBar
          placeholder="Type Here..."
          onChangeText={this.updateSearch}
          value={search}
        />
        {
          factoryList ? (
            factoryList.responsiblePartyList.length ? (<FlatList
              data={factoryList.responsiblePartyList
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
                if (factoryList.canLoadMoreData()) {
                  factoryList.nextPage();
                  let proInspectionId = "01"
                  getMoreFactoryList({ responsiblePartyType: proInspectionId, factoryList });
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

const mapStateToProps = (state) => ({
  factoryList: state.qualityInspector.factoryList,
  isLoadingMore: state.qualityInspector.isLoadingMore
});

const mapDispatchToProps = (dispatch) => ({
  getFactoryList({ responsiblePartyType, name }) {
    dispatch(getFactoryList({ responsiblePartyType, name }))
  },
  getMoreFactoryList({ responsiblePartyType, factoryList }) {
    dispatch(getMoreFactoryList({ responsiblePartyType, factoryList }))
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(FactoryView);

