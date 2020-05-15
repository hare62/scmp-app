import React, { Component } from 'react';
import {
  View,
  StyleSheet
} from 'react-native';
import FilterStatusView from './FilterStatusView';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';

let tabNavs;
class TopNavTabsTimeView extends Component {
  constructor(props) {
    super(props);
  }

  componentWillUnmount(){
    tabNavs=null;
  }
  getTabs() { 
    const tabs = {};
    const { tabNames } = this.props;

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

  tabNav() {
    if (!tabNavs) {
      tabNavs = createAppContainer(createMaterialTopTabNavigator(
        this.getTabs(),
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
    return tabNavs;
  }

  render() {
    const TabNavigator = this.tabNav();
    return (
      <View style={styles.container}>
        {<TabNavigator />}
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

export default TopNavTabsTimeView;