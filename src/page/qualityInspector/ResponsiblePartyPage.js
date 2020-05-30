import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';
import NavigationBar from '../../common/Component/NavigationBar';
import AntDesign from 'react-native-vector-icons/AntDesign';
import NavigationManager from '../../navigation/NavigationManager';
import FactoryView from './component/FactoryView';
import MonitorView from './component/MonitorView';
import SupplierView from './component/SupplierView';

class TopNavTabsView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabNames: [
        { label: '工厂', key: 'DAY', value: 'dateLogo=DAY' },
        { label: '供应商', key: 'WEEK', value: 'dateLogo=WEEK' },
        { label: '班组', key: 'MONTH', value: 'dateLogo=MONTH' },
      ],
      search: '',
    }
  }

  renderTabLeftButton() {
    return (
      <TouchableOpacity
        onPress={() => {
          NavigationManager.pop();
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

  _getTabs() {
    let { isBatchQualityPage } = this.props.navigation.state.params;
    const TimeNavigationOptions = {
      LastDaysPage: {
        screen: (props) => {
          return <FactoryView  {...props} isBatchQualityPage={isBatchQualityPage} />
        },
        navigationOptions: {
          tabBarLabel: '工厂'
        },
      },
      LastWeekPage: {
        screen: (props) => {
          return <SupplierView   {...props} isBatchQualityPage={isBatchQualityPage} />
        },
        navigationOptions: {
          tabBarLabel: '供应商'
        },
      },
      LastHalfYearPage: {
        screen: (props) => {
          return <MonitorView   {...props} isBatchQualityPage={isBatchQualityPage} />
        },
        navigationOptions: {
          tabBarLabel: '班组'
        },
      },
    }
    return TimeNavigationOptions;
  }

  _tabNav() {

    this.tabNav = createAppContainer(createMaterialTopTabNavigator(
      this._getTabs(),
      {
        tabBarOptions: {
          tabStyle: styles.tabStyle,
          upperCaseLabel: false,
          scrollEnabled: false,
          style: {
            backgroundColor: 'white',
            color: 'red'
          },
          indicatorStyle: styles.indicatorStyle,
          labelStyle: styles.labelStyle,
          activeTintColor: styles.activeTintColor,
          inactiveTintColor: {
            color: 'yellow'
          },
        },
      },
    ));

    return this.tabNav;
  }

  render() {
    const TabNavigator = this._tabNav();
    return (
      <View style={styles.container}>
        <NavigationBar
          title={'选择责任方'}
          style={{ backgroundColor: '#376CDA' }}
          leftButton={this.renderTabLeftButton()}
        />
        <TabNavigator></TabNavigator>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabStyle: {
    minWidth: 20,
    color: 'red'
  },
  indicatorStyle: {
    height: 2,
    backgroundColor: '#376CDA',
  },
  labelStyle: {
    fontSize: 16,
    marginTop: 6,
    marginBottom: 6,
    color: "#376CDA"
  },
  activeTintColor: {
    color: 'red'
  },
});

export default TopNavTabsView;