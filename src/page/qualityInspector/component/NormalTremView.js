import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput
} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

const StatusEnum = {
  Finish: "Finish",//质检完成
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

const inProgress = () => {
  return (
    <EvilIcons
      name={'spinner-3'}
      size={80}
      style={{ color: '#376CDA', height: 80 }}
    />
  )
}

const sheetListStatusView = (sheetListstatus) => {
  switch (sheetListstatus) {
    case StatusEnum.Finish:
      return FinishIcon();
    case StatusEnum.InProgress:
      return inProgress();
    default:
      return null;
  }
};

const renderTechnologyProcessList = (data) => {
  let { mechanicalName, status, conclusion } = data.item;

  return (
    <View style={styles.container}>

      <View style={styles.content}>
        <Text style={{ fontSize: 20, color: '#A7A7A7' }}>
          {mechanicalName}
        </Text>
        <Text style={{ fontSize: 20, color: '#616161' }}>
          {conclusion}
        </Text>
        {sheetListStatusView(status)}
      </View>
    </View>
  )
}

const NormalTremView = (props) => {
  let { changeResult, realNumber, isDetailPage } = props;

  return (
    <View style={styles.container}>
      <Text style={styles.itemTitle}>内径</Text>
      <View style={styles.innerContainer}>
        <View style={styles.normalContainer}>
          <View style={styles.normalItem}>
            <Text>标准值</Text>
            <Text>10MM</Text>
          </View>
          <View style={styles.normalItem}>
            <Text>正向容差</Text>
            <Text>0.01</Text>
          </View>
          <View style={styles.normalItem}>
            <Text>负向容差</Text>
            <Text>0.01</Text>
          </View>
        </View>
        <Text style={styles.title}>实际值</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(realNumber)=>{changeResult(realNumber)}}
          value={realNumber}
          placeholder="请输入实际值"
          editable={isDetailPage ? false : true}
        />
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F2F6F8",
    padding: 10,
  },
  title: {
    height: 30,
    lineHeight: 30,
    color: "#BBBFC0"
  },
  textInput: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: '#ECECEC',
    paddingLeft: 10
  },
  itemTitle: {
    paddingBottom: 5,
    fontSize: 16,
    borderBottomColor: '#f3f3f3',
    borderBottomWidth: 3
  },
  innerContainer: {
    backgroundColor: 'white',
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
    padding: 10,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: "center"
  },
  normalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  normalItem: {
    marginTop: 10,
    padding: 10,
    borderRadius: 3
  },
  normalValue: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 20
  },
});

export default NormalTremView;