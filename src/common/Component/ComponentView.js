
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator
} from 'react-native';
import { fitSize } from '../../utils/Fit';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Constants from '../../utils/Constants';

export const renderNullView = () => {
  return (
    <View style={styles.nullView}>
      <EvilIcons
        name={'spinner'}
        size={fitSize(30)}
        style={{ color: '#376CDA' }}
      />
      <Text>Not Found...</Text>
    </View>
  );
}

export const renderLoadMoreView = () => {
  return (
  <View style={styles.indicatorContainer}>
    <ActivityIndicator
      style={styles.indicator}
    />
    <Text>正在加载...</Text>
  </View>
  );
}

const styles = StyleSheet.create({
  nullView: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row'
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
