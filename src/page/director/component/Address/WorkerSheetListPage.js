import React, { Component } from 'react';
import {
  View,
  RefreshControl,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Text
} from 'react-native';
import NavigationBar from '../../../../common/Component/NavigationBar';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SheetItem from '../SheetListView/SheetItem';
import Constants from '../../../../utils/Constants';
import NavigationManager from '../../../../navigation/NavigationManager';
import { connect } from 'react-redux';
import {
  getSearchWorkerSheetList,
  getRefreshSearchWorkerSheetList,
  resetSearchSheetListData
} from '../../../../redux/action/director';

class WorkerSheetListPage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { getRefreshSearchWorkerSheetList } = this.props;
    const { userID } = this.props.navigation.state.params;
    getRefreshSearchWorkerSheetList(userID);
  }

  componentWillUnmount() {
    let { resetSheetListData } = this.props;
    resetSheetListData();
  }

  renderTabLeftButton() {
    return (
      <TouchableOpacity
        onPress={() => {
          NavigationManager.pop()
        }} e
      >
        <AntDesign
          name={'left'}
          size={18}
          style={{ color: 'white', marginLeft: 10 }}
        />
      </TouchableOpacity>
    );
  }

  renderIndicator() {
    const { isLoadingMore } = this.props;
    return (isLoadingMore ? <><View style={styles.indicatorContainer}>
      <ActivityIndicator
        style={styles.indicator}
      />
      <Text>正在加载...</Text>
    </View></> : null);
  }

  render() {
    const { userName, userID } = this.props.navigation.state.params;
    const { searchWorkerSheetList,
      getSearchWorkerSheetList,
      getRefreshSearchWorkerSheetList,
      isLoading } = this.props;
    const { sheetList } = searchWorkerSheetList;
    const title = `${userName}派工单`;
    return (
      <View>
        <NavigationBar
          title={title}
          style={{ backgroundColor: '#376CDA' }}
          leftButton={this.renderTabLeftButton()}
        />
        <FlatList
          style={{ marginBottom: 50 }}
          data={sheetList}
          renderItem={data => <SheetItem {...data} />}
          keyExtractor={item => item.sheetId}
          refreshControl={
            <RefreshControl
              title={'Loading'}
              titleColor={Constants.THEME_COLOR}
              colors={[Constants.THEME_COLOR]}
              refreshing={isLoading}
              onRefresh={() => getRefreshSearchWorkerSheetList(userID)}
              tintColor={Constants.THEME_COLOR}
            />
          }
          ListFooterComponent={() => (this.renderIndicator())}
          onEndReached={() => {
            if (searchWorkerSheetList.canLoadMoreData()) {
              searchWorkerSheetList.nextPage();
              getSearchWorkerSheetList(userID, searchWorkerSheetList);
            }
          }}
          onEndReachedThreshold={0.1}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
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
  searchWorkerSheetList: state.director.searchWorkerSheetList,
  isLoadingMore: state.director.isLoadingMore,
  isLoading: state.director.isLoading
})

const mapDispatch = (dispatch) => ({
  getSearchWorkerSheetList(userID, searchWorkerSheetList) {
    dispatch(getSearchWorkerSheetList(userID, searchWorkerSheetList))
  },
  resetSheetListData() {
    dispatch(resetSearchSheetListData())
  },
  getRefreshSearchWorkerSheetList(userID) {
    dispatch(getRefreshSearchWorkerSheetList(userID))
  }
})

export default connect(mapState, mapDispatch)(WorkerSheetListPage);