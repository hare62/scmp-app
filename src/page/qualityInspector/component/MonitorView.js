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
import { getMonitorList, getMoreMonitorList } from '../../../redux/action/qualityInspector/index';
import Constants from '../../../utils/Constants';
import { renderNullView, renderLoadMoreView } from '../../../common/Component/ComponentView';
import NavigationManager from "../../../navigation/NavigationManager";

class MonitorView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
    };
    this.onRefreshGetDefaultSheetList = this.onRefreshGetDefaultSheetList.bind(this);
  }

  componentDidMount() {
    let responsiblePartyType = "03";
    this.props.getMonitorList({ responsiblePartyType });
  }

  updateSearch = (search) => {
    this.setState({ search });
    let responsiblePartyType = "03";
    const { getMonitorList } = this.props;
    let name = search;
    getMonitorList({ responsiblePartyType, name });
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
    let responsiblePartyType = "03";
    this.props.getMonitorList({ responsiblePartyType });
  }

  renderIndicator() {
    const { isLoadingMore } = this.props;
    return (isLoadingMore ? renderLoadMoreView() : null);
  }

  renderFlatListView() {
    const { monitorList, getMoreMonitorList } = this.props;
    let length = monitorList.responsiblePartyList.length;
    return (
      <View>
        {length ? (<FlatList
          data={monitorList.responsiblePartyList
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
            if (monitorList.canLoadMoreData()) {
              monitorList.nextPage();
              let proInspectionId = "03"
              getMoreMonitorList({ proInspectionId, monitorList });
            }
          }}
          onEndReachedThreshold={0.1}
        />) : renderNullView()}
      </View>
    )
  }

  render() {
    const { search } = this.state;
    const { monitorList, getMoreMonitorList } = this.props;
    return (
      <View style={{ marginBottom: 80 }}>
        <SearchBar
          placeholder="Type Here..."
          onChangeText={this.updateSearch}
          value={search}
        />
        {
          monitorList ? (
            monitorList.responsiblePartyList.length ? (<FlatList
              data={monitorList.responsiblePartyList
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
                if (monitorList.canLoadMoreData()) {
                  monitorList.nextPage();
                  let proInspectionId = "03"
                  getMoreMonitorList({ responsiblePartyType: proInspectionId, monitorList });
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
  nullView: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row'
  }
})

const mapState = (state) => ({
  monitorList: state.qualityInspector.monitorList,
  isLoadingMore: state.qualityInspector.isLoadingMore
})

const mapDispatch = (dispatch) => ({
  getMonitorList({ responsiblePartyType, name }) {
    dispatch(getMonitorList({ responsiblePartyType, name }))
  },
  getMoreMonitorList({ responsiblePartyType, monitorList }) {
    dispatch(getMoreMonitorList({ responsiblePartyType, monitorList }))
  }
});

export default connect(mapState, mapDispatch)(MonitorView);

