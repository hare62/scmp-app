import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
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

const sheetListstatusView = (sheetListstatus) => {
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
        {sheetListstatusView(status)}
      </View>
    </View>
  )
}

const MechanicalView = (props) => {
  let { mechanicalList } = props;

  return (
    <View>
      <Text>零件号信息</Text>
      <FlatList
        data={mechanicalList}
        renderItem={data => renderTechnologyProcessList(data)}
        keyExtractor={item => item.mechanicalName}
      />
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    height: 100,
    flexDirection: 'row',
    justifyContent: 'center',
    borderTopColor: '#F4F4F4',
    borderTopWidth: 2
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: "center"
  },
});

export default MechanicalView;