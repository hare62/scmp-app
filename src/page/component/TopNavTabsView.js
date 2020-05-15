import React, { Component } from 'react';
import {
  View,
  StyleSheet
} from 'react-native';
import FilterStatusView from '../worker/component/FilterStatusView';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';

let tabNav;
const _getTabs = (props) => {
  const tabs = {};
  const { tabNames } = props;

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

const _tabNav = (props) => {
  if(!tabNav){
    console.warn("2次")
    tabNav = createAppContainer(createMaterialTopTabNavigator(
      _getTabs(props),
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
  }
  return tabNav;
}

const TopNavTabsView = (props) => {
  const TabNavigator = _tabNav(props);
  console.warn("1次")
  return (
    <View style={styles.container}>
      {<TabNavigator />}
    </View>
  );
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