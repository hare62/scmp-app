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
import { sheetListStatusView } from '../../../utils/Common';

const SheetItem = (props) => {
  const { sheetListFinishTime,
    sheetListid,
    materialsName,
    sheetListstatus,
    hasMechanical } = props.item;

  return (
    <TouchableOpacity
      onPress={() => {
        NavigationManager.push('TechnologyProcessPage', { ...props.item });
      }}
    >
      <View style={styles.cell_container}>
        <View style={styles.container_left} >
          {sheetListStatusView(sheetListstatus)}
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
          <View style={styles.container_right_contain_item}>
            <Text >
              是否有零件号: {hasMechanical}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const SheetListView = (props) => {
  const { sheetListData } = props;

  return (
    <View>
      <FlatList
        data={sheetListData}
        renderItem={data => SheetItem(data)}
        keyExtractor={item => item.sheetListid}
        refreshControl={
          <RefreshControl
            title={'Loading'}
            titleColor={Constants.THEME_COLOR}
            colors={[Constants.THEME_COLOR]}
            refreshing={false}
            onRefresh={() => { }}
            tintColor={Constants.THEME_COLOR}
          />
        }
      />
    </View>
  );
};

export default SheetListView;
