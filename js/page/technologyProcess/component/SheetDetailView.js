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
  const { sheetListFinishTime,
    sheetListid,
    materialsName,
    materialsNumber,
    sheetListstatus } = props.navigation.state.params;
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <EvilIcons
          name={'check'}
          size={80}
          style={{ color: '#376CDA', marginTop: 30 }}
        />
        <View style={styles.sheetDetailContainer}>
          <Text ellipsizeMode="tail" numberOfLines={1} style={styles.materialsIDText}>
            {sheetListid}
          </Text>
          <Text ellipsizeMode="tail" numberOfLines={1} style={styles.materialsNameText}>
            {materialsName}
          </Text>
          <View style={styles.timeView}>
            <AntDesign
              name={'clockcircleo'}
              size={18}
              style={{ color: '#aaa' }}
            />
            <Text style={styles.timeText}>
              {sheetListFinishTime}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.materialsCountText}>
            物料数量
            </Text>
          <Text style={{ fontSize: 18, color: '#676767', marginLeft: 5 }}>
            {materialsNumber}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 200,
    backgroundColor: '#F8F8F8'
  },
  topContainer: {
    height: 140,
    flexDirection: 'row',
  },
  bottomContainer: {
    height: 60,
    borderTopColor: '#F2F3F4',
    borderTopWidth: 2,
    borderBottomColor: '#E7EAEF',
    borderBottomWidth: 2,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  sheetDetailContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    width: deviceWidthDp * 0.75
  },
  materialsIDText: {
    fontSize: 25,
    color: '#585858',
    flexWrap: 'nowrap'
  },
  materialsNameText: {
    fontSize: 18,
    color: '#878787',
    width: deviceWidthDp * 0.75
  },
  timeView: {
    flexDirection: 'row',
  },
  timeText: {
    marginLeft: 10,
    color: '#aaa'
  },
  finishCountText: {
    fontSize: 18,
    color: '#868686'
  },
  materialsCountText: {
    fontSize: 18,
    color: '#676767'
  }
});

export default SheetDetailView;