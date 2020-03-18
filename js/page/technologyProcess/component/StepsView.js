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

const renderTechnologyProcessList = (props) => {
  let { step, name, status } = props.item;

  return (
    <TouchableOpacity
      onPress={() => {
        NavigationManager.goPage('MechanicalMessagePage', { ...props.item })
      }}
    >
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={{ fontSize: 20, color: '#A7A7A7' }}>
            step{step}
          </Text>
          <Text style={{ fontSize: 20, color: '#616161' }}>
            {name}
          </Text>
          {sheetListstatusView(status)}
        </View>
      </View>
    </TouchableOpacity>
  )
}

const StepsView = (props) => {
  let { technologyProcessList } = props;

  return (
    <View>
      <FlatList
        data={technologyProcessList}
        renderItem={data => renderTechnologyProcessList(data)}
        keyExtractor={item => item.step}
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

export default StepsView;