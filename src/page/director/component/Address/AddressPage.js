import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  FlatList,
  RefreshControl
} from 'react-native';
import NavigationBar from '../../../../common/Component/NavigationBar';
import AntDesign from 'react-native-vector-icons/AntDesign';
import NavigationManager from '../../../../navigation/NavigationManager';
import Constants from '../../../../utils/Constants';
import { connect } from 'react-redux';
import { getAddressList, getSearchAddressList } from '../../../../redux/action/director';
import { getColor } from '../../../../utils/Common';

class AddressPage extends Component {
  constructor(props) {
    super(props);

    const { navigation } = this.props;
    NavigationManager.setNavigation(navigation);
    this.state = {
      searchWords: ''
    }
  }

  componentDidMount() {
    this.props.getAddressList();
  }

  renderTabLeftButton() {
    return (
      <TouchableOpacity
        onPress={() => {
          NavigationManager.pop()
        }}
      >
        <AntDesign
          name={'left'}
          size={18}
          style={{ color: 'white', marginLeft: 10 }}
        />
      </TouchableOpacity>
    );
  }

  SheetItem(data) {
    const { item } = data;
    const userName = item.USER_NM;
    const userID = item.USER_ID;
    const iconName = userName.substring(userName.length - 2);
    const getRandomColor = getColor();

    return (
      <TouchableOpacity
        onPress={()=>{
          NavigationManager.push('WorkerSheetListPage', {userID,userName})
        }}
      >
        <View style={styles.sheetItem}>
          <View style={{
            height: 60,
            width: 60,
            borderRadius: 50,
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 1,
            borderColor: "#aaa",
            backgroundColor: "#388ED9",
          }}
          >
            <Text style={styles.addressText}>{iconName}</Text>
          </View>
          <View style={styles.sheetItemRight}>
            <Text style={styles.addressRightText}>{userName}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  searchAddress(searchWords) {
    this.setState({
      searchWords
    })
    const { getSearchAddressList } = this.props;

    getSearchAddressList(searchWords);
  }

  renderAddressView() {
    const { addressList } = this.props;
    return (
      <FlatList
        data={addressList}
        renderItem={data => this.SheetItem(data)}
        keyExtractor={item => item.USER_ID}
        refreshControl={
          <RefreshControl
            title={'Loading'}
            titleColor={Constants.THEME_COLOR}
            colors={[Constants.THEME_COLOR]}
            refreshing={false}
            onRefresh={() => { }}
            tintColor={Constants.THEME_COLOR}
          />
        }
      />
    )
  }

  renderSearchAddress() {
    const { searchAddressList } = this.props;
    return (
      <FlatList
        data={searchAddressList}
        renderItem={data => this.SheetItem(data)}
        keyExtractor={item => item.USER_ID}
        refreshControl={
          <RefreshControl
            title={'Loading'}
            titleColor={Constants.THEME_COLOR}
            colors={[Constants.THEME_COLOR]}
            refreshing={false}
            onRefresh={() => { }}
            tintColor={Constants.THEME_COLOR}
          />
        }
      />
    )
  }

  render() {
    const { searchWords } = this.state;

    return (
      <View style={styles.contain}>
        <NavigationBar
          title={'通讯录'}
          style={{ backgroundColor: '#376CDA' }}
          leftButton={this.renderTabLeftButton()}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          onChangeText={(searchWords) => this.searchAddress(searchWords)}
          value={this.state.searchWords}
        />
        {!!searchWords ? this.renderSearchAddress() : this.renderAddressView()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  contain: {
    flex: 1,
    backgroundColor: Constants.THEME_BACKGROUND,
  },
  searchInput: {
    borderWidth: 0.2,
    borderColor: Constants.INPUT_BORDER,
    padding: 10,
    margin: 10,
    shadowColor: '#ECECEC',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 1,
    fontSize: 20,
    borderRadius:5
  },
  sheetItem: {
    flexDirection: "row",
    padding: 10
  },
  sheetItemLeft: {
    height: 60,
    width: 60,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center"
  },
  sheetItemRight: {
    alignItems: "flex-start",
    justifyContent: "center",
    marginLeft: 10,
    fontSize: 18,
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: Constants.BORDER_COLOR
  },
  addressText: {
    color: "white",
    fontSize: 20
  },
  addressRightText: {
    fontSize: 20,
    color: Constants.TEXT_CONTENT
  }
})

const mapState = (state) => ({
  addressList: state.director.addressList,
  searchAddressList: state.director.searchAddressList
})

const mapDispatch = (dispatch) => ({
  getAddressList() {
    dispatch(getAddressList())
  },
  getSearchAddressList(searchWords) {
    dispatch(getSearchAddressList(searchWords))
  }
})
export default connect(mapState, mapDispatch)(AddressPage);