import React from 'react';
import { PropTypes } from 'prop-types';
import {
  ViewPropTypes,
  Text,
  StatusBar,
  StyleSheet,
  View
} from 'react-native';
import {
  NAV_BAR_HEIGHT,
  STATUS_BAR_HEIGHT
} from '../utils/Fit';

const getButtonElement = (element) => {
  return (
    <View style={styles.navBarButton}>
      {element ? element : null}
    </View>
  );
}

const NavigationBar = (props) => {
  const statusBar = (
    !props.statusBar.hidden ?
      <View style={styles.statusBar}>
        <StatusBar {...props.statusBar} />
      </View> : null
  );

  const titleView = (
    props.titleView ? 
    props.titleView :
    (
      <Text
        ellipsizeMode="head" 
        numberOfLines={1} 
        style={styles.title}
      >
        {props.title}
      </Text>
    )
  );

  const content = (
    props.hide ?
    null :
    (
      <View style={styles.navBar}>
        {getButtonElement(props.leftButton)}
        <View style={[styles.navBarTitleContainer, props.titleLayoutStyle]}>
          {titleView}
        </View>
        {getButtonElement(props.rightButton)}
      </View>
    )
  );

  return (
    <View style={[styles.container, props.style]}>
      {statusBar}
      {content}
    </View>
  );
}

//设置状态栏所接受的属性
const StatusBarShape = {
  barStyle: PropTypes.oneOf(['light-content', 'default',]),
  hidden: PropTypes.bool,
  backgroundColor: PropTypes.string,
};

//提供属性的类型检查
NavigationBar.propTypes = {
  style: ViewPropTypes.style,
  title: PropTypes.string,
  titleView: PropTypes.element,
  titleLayoutStyle: ViewPropTypes.style,
  hide: PropTypes.bool,
  statusBar: PropTypes.shape(StatusBarShape),
  rightButton: PropTypes.element,
  leftButton: PropTypes.element,
};

//设置默认属性
NavigationBar.defaultProps = {
  statusBar: {
    barStyle: 'light-content',
    backgroundColor: "black",
    hidden: false,
  }
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2196f3'
  },
  navBarButton: {
    alignItems: 'center'
  },
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: NAV_BAR_HEIGHT
  },
  navBarTitleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 40,
    right: 40,
    top: 0,
    bottom: 0
  },
  title: {
    fontSize: 18,
    color: 'white'
  },
  statusBar: {
    height: STATUS_BAR_HEIGHT
  }
});

export default NavigationBar;