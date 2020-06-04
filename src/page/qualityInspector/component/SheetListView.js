import React from 'react';
import {
  FlatList,
  View,
  RefreshControl,
  TouchableOpacity,
  Text,
} from 'react-native';
import Constants from '../../../utils/Constants';
import AntDesign from 'react-native-vector-icons/AntDesign';
import NavigationManager from '../../../navigation/NavigationManager';
import { fitSize } from '../../../utils/Fit';
import styles from '../../../common/Styles/SheetItem';
import { defaultQualityStatus } from '../../../utils/Common';

const SheetItem = (props) => {
  const { 
    sheetListFinishTime,
    sheetListid,
    materialsName,
    sheetListstatus,
    hasMechanical,
    sheetId,
    testData } = props.item;

  return (
    <TouchableOpacity
      onPress={() => {
        NavigationManager.push('TechnologyProcessPage', { ...props.item });
      }}
    >
      <View style={styles.cell_container}>
        <View style={styles.container_left} >
          {defaultQualityStatus(sheetListstatus)}
        </View>
        <View style={styles.container_right}>
          <View style={styles.container_right_title} >
            <Text ellipsizeMode="tail" numberOfLines={1} style={styles.container_right_title_order} >
              {sheetListid}
            </Text>
            <Text ellipsizeMode="tail" numberOfLines={1} style={styles.container_right_title_materials}>
              {materialsName}
            </Text>
          </View>
          <View style={styles.container_right_contain} >
            <Text style={styles.container_right_date} >
              <AntDesign
                name={'clockcircleo'}
                size={fitSize(20)}
                style={{ color: '#aaa', }}
              />
            </Text>
            <Text style={styles.container_right_text}>
              {sheetListFinishTime}
            </Text>

          </View>
          {/* <View style={styles.container_right_contain_item}>
            <Text>01有 02 没有</Text>
            <Text >
              是否有零件号: {hasMechanical}
            </Text>
          </View>
          <View style={styles.container_right_contain_item}>
            <Text >
              sheetID : {sheetId}
            </Text>
          </View>
          <View style={styles.container_right_contain_item}>
            <Text>
              //质检中"01"
              //质检已完成"02"
              //待质检"00"
              {testData}
            </Text>
            <Text >
              质检单状态 : {sheetListstatus}
            </Text>
          </View> */}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const onRefreshGetDefaultSheetList = (props) => {
  // 清除默认派工单数据
  let {
    resetDefaultSheetList,
    getPullUpRefreshSheetList,
    getPullUpRefreshFilterSheetList,
    keyEx,
    value
  } = props;

  // resetDefaultSheetList();//放开后会把整个筛选条件的质检单刷新一遍
  if (keyEx && value) {
    getPullUpRefreshFilterSheetList(keyEx, value);
  } else {
    getPullUpRefreshSheetList();
  }
}

const SheetListView = (props) => {
  const {
    sheetListData,
    getLoadingMoreSheetList,
    keyEx,
    value } = props;

  return (
    <View  style={{ marginBottom: 60 }}>
      <FlatList
        data={sheetListData.sheetList}
        renderItem={data => SheetItem(data)}
        keyExtractor={item => item.sheetListid}
        refreshControl={
          <RefreshControl
            title={'Loading'}
            titleColor={Constants.THEME_COLOR}
            colors={[Constants.THEME_COLOR]}
            refreshing={false}
            onRefresh={()=>{onRefreshGetDefaultSheetList(props)}}
            tintColor={Constants.THEME_COLOR}
          />
        }
        onEndReached={() => {
          if (sheetListData.canLoadMoreData()) {
            sheetListData.nextPage();
            getLoadingMoreSheetList(sheetListData, keyEx, value);
          }
        }}
        onEndReachedThreshold={0.1}
      />
    </View>
  );
};

SheetListView.defaultProps = {
  keyEx: '',
  value: ''
}

export default SheetListView;
