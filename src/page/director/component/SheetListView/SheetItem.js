import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import NavigationManager from '../../../../navigation/NavigationManager';

const isExitString = (workerName) => {
  return workerName ? workerName.substring(workerName.length - 2) : workerName;
}

const SheetItem = (props) => {
  const { planDate,
          sheetCode,
          matName,
          workerName } = props.item;
          const iconName = isExitString(workerName);

  return (
    <TouchableOpacity
      onPress={() => {
        NavigationManager.goPage('DirectorDetailPage', { ...props.item });
      }}
    >
      <View style={styles.cell_container}>
        <View style={styles.container_left} >
          <View style={{
            height: 60,
            width: 60,
            borderRadius: 50,
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 1,
            borderColor: "#aaa",
            backgroundColor: "#388ED9",
          }}
          >
            <Text style={styles.addressText}>{iconName}</Text>
          </View>
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
    flexDirection: 'row',
  },
  container_left: {
    flex: 2,
    marginRight: 10,
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
  },
  header_image: {
    height: 50,
    width: 50,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#388ED9",
    backgroundColor: "#388ED9",
  },
  addressText: {
    color: "white",
    fontSize: 20,
    borderRadius: 50,
    justifyContent: "center",
  },
});

export default SheetItem;