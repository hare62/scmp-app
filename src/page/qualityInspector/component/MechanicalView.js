import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity
} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import NavigationManager from '../../../navigation/NavigationManager';

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
  let {
    mechanicalName,
    status,
    conclusion } = data.item;
  return (
    <TouchableOpacity
      onPress={() => {
        NavigationManager.push('AddMechanicalPage', { ...data })
      }}
    >
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
    </TouchableOpacity>
  )
}

const MechanicalView = (props) => {
  const { item } = props.navigation.state.params;
  const { partNumber } = item;
  // TODO

  //  走接口渲染的数据，如果这边后端不是走接口请把这里和父组件的接口都删掉
  // const {
  //   name,
  //   step,
  //   number,
  //   time } = item;
  // let { mechanicalList } = props;

  return (
    <View style={styles.block}>
      <Text style={styles.title}>零件号信息</Text>
      <FlatList
        data={partNumber}
        renderItem={data => renderTechnologyProcessList(data)}
        keyExtractor={item => item.mechanicalName}
        style={styles.flatList}
      />
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    height: 100,
    flexDirection: 'row',
    justifyContent: 'center',
    borderBottomColor: '#F4F4F4',
    borderBottomWidth: 2
  },
  block: {
    flex: 1
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: "center"
  },
  title: {
    padding: 10
  },
  flatList: {
    backgroundColor: "white",
    margin: 10,
    marginTop: 0,
    marginBottom: 10
  }
});

export default MechanicalView;