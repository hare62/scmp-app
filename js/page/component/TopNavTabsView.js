import React, { Component } from 'react';
import {
  View,
  StyleSheet
} from 'react-native';
import FilterStatusView from '../worker/component/FilterStatusView';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';

class TopNavTabsView extends Component {
  constructor(props) {
    super(props);
  }

  _getTabs() {
    const tabs = {};
    const { data } = this.props;
    let tabNames = data;
    
    tabNames.forEach((item, index) => {
      tabs[`tab${index}`] = {
        screen: (props) => <FilterStatusView {...props} data={item} />,
        navigationOptions: {
          title: item.label,
        },
      }
    });

    return tabs;
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
          }
        },
      },
    ));

    return this.tabNav
  }

  render() {
    const TabNavigator = this._tabNav();
    return (
      <View style={styles.container}>
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