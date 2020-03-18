import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { deviceWidthDp } from '../../../utils/Fit';

const SheetDetailView = (props) => {
  const {
    name,
    status,
    step,
    number,
    time } = props.navigation.state.params;
  return (
    <View style={styles.container}>
      <EvilIcons
        name={'check'}
        size={80}
        style={{ color: '#376CDA' }}
      />
      <Text ellipsizeMode="tail" numberOfLines={1} style={styles.materialsIDText}>
        {name}
      </Text>
      <Text ellipsizeMode="tail" numberOfLines={1} style={styles.materialsNameText}>
        零件号数量:{number}
      </Text>
      <View style={{ flexDirection: 'row' }}>
        <AntDesign
          name={'clockcircleo'}
          size={18}
          style={{ color: '#878787', marginRight: 10 }}
        />
        <Text >
          报工时间:{time}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8F8F8',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 10,
  },
  materialsIDText: {
    fontSize: 25,
    color: '#585858',
    flexWrap: 'nowrap'
  },
  materialsNameText: {
    fontSize: 18,
    color: '#878787',
    width: deviceWidthDp * 0.3
  },
});

export default SheetDetailView;