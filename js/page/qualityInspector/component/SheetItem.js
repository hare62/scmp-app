import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import NavigationManager from '../../../navigation/NavigationManager';
import { deviceWidthDp } from '../../../utils/Fit';

const StatusEnum = {
  Finish: "Finish",//质检完成
  UnFinish: "UnFinish",//质检未完成
  InProgress: "InProgress"//质检中
};

const FinishIcon = () => {
  return (
    <EvilIcons
      name={'check'}
      size={80}
      style={{ color: '#376CDA' }}
    />
  )
}

const UnFinishIcon = () => {
  return (
    <EvilIcons
      name={'close-o'}
      size={80}
      style={{ color: '#376CDA' }}
    />
  )
}

const inProgress = () => {
  return (
    <EvilIcons
      name={'spinner-3'}
      size={80}
      style={{ color: '#376CDA' }}
    />
  )
}

const sheetListstatusView = (sheetListstatus) => {
  switch (sheetListstatus) {
    case StatusEnum.Finish:
      return FinishIcon();
    case StatusEnum.UnFinish:
      return UnFinishIcon();
    case StatusEnum.InProgress:
      return inProgress();
    default:
      return null;
  }
};

const SheetItem = (props) => {
  const { sheetListFinishTime,
    sheetListid,
    materialsName,
    sheetListstatus } = props.item;

  return (
    <TouchableOpacity
      onPress={() => {
        NavigationManager.goPage('TechnologyProcessPage', { ...props.item });
      }}
    >
      <View style={styles.cell_container}>
        <View style={styles.container_left} >
          {sheetListstatusView(sheetListstatus)}
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
                size={18}
                style={{ color: '#aaa', }}
              />
            </Text>
            <Text style={styles.container_right_text}>
              {sheetListFinishTime}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cell_container: {
    paddingLeft: 5,
    paddingTop: 20,
    flexDirection: 'row'
  },
  container_left: {
    height: 80,
    width: 80,
    marginRight: 10,
    borderRadius: 50,
    lineHeight: 80,
  },
  container_right: {
    color: 'white',
    height: 80,
    flex: 1,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    width:deviceWidthDp*0.8,
  },
  container_right_title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: deviceWidthDp * 0.80,
  },
  container_right_contain: {
    flexDirection: 'row',
  },
  container_right_title_order: {
    color: 'black',
    marginBottom: 10,
    fontSize: 17,
    width:deviceWidthDp * 0.55
  },
  container_right_title_materials: {
    color: '#666',
    marginBottom: 10,
    width:deviceWidthDp * 0.20
  },
  container_right_date: {
    color: "#aaa",
    justifyContent: 'flex-end',
  },
  container_right_text: {
    paddingLeft: 10,
    color: '#aaa'
  }
});

export default SheetItem;