import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import NavigationManager from '../../navigation/NavigationManager';
import { fitSize } from '../../utils/Fit';

const SheetItem = (props) => {
  const { planDate,
          sheetCode,
          matName } = props.item;

  return (
    <TouchableOpacity
      onPress={() => {
        NavigationManager.goPage('DetailPage', {...props.item});
      }}
    >
      <View style={styles.cell_container}>
        <View style={styles.container_left} >
          <EvilIcons
            name={'check'}
            size={fitSize(60)}
            style={{ color: '#376CDA' }}
          />
        </View>
        <View style={styles.container_right}>
          <View style={styles.container_right_title} >
            <Text style={styles.container_right_title_order} >
              {sheetCode}
            </Text>
            <Text style={styles.container_right_title_materials}>
              {matName}
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
              {planDate}
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
    flex:2,
    marginRight: 10,
    borderRadius: 50,
    lineHeight: 80,
  },
  container_right: {
    color: 'white',
    height: 80,
    flex: 10,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1
  },
  container_right_title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 30

  },
  container_right_contain: {
    flexDirection: 'row',
  },
  container_right_title_order: {
    color: 'black',
    marginBottom: 10,
    fontSize: 17
  },
  container_right_title_materials: {
    color: '#666',
    marginBottom: 10,
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