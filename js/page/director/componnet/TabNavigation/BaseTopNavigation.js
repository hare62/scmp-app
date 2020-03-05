import {
  StyleSheet
} from 'react-native';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';

const BaseTopNavigation = (routerOptions) => {
  return (
    createAppContainer(createMaterialTopTabNavigator(
      routerOptions,
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
          inactiveTintColor: '#000000',
        },
      }))
  );
}

const styles = StyleSheet.create({
  tabStyle: {
      minWidth: 50,
      color: 'red',
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
  }
});

export default BaseTopNavigation;