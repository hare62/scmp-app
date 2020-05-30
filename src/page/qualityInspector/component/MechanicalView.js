import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity
} from 'react-native';
import NavigationManager from '../../../navigation/NavigationManager';

const renderTechnologyProcessList = (data, props) => {
  let {
    mechanicalName,
    status,
    conclusion,
    partNo,
    qltConclusion,
    qltConclusionValue,
    qltSheetId } = data.item;  
    const { sheetId, item } = props.navigation.state.params;
    const { isSubmit } = item;
   
  return (
    <TouchableOpacity
      onPress={() => {
        //把最外层数据传进来即可
        NavigationManager.push('AddMechanicalPage', { sheetId, isSubmit, ...data.item,...props.navigation.state.params.item,})
      }}
    >
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={{ fontSize: 20, color: '#A7A7A7' }}>
            {partNo}
          </Text>
          <Text style={{ fontSize: 20, color: '#616161' }}>
           {qltConclusionValue}
          </Text>
          <Text style={{ fontSize: 20, color: '#616161' }}>
            质检状态:{JSON.stringify(qltConclusion)}
            {/* {qltSheetId} */}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const MechanicalView = (props) => {
  const {partNumber} =props.navigation.state.params.item;
  //item 有工艺工序单列信息
  //mechanicalList 整个零件号信息 请求接口的时候那这个参数渲染
  const { mechanicalList } = props;
  return (
    <View style={styles.block}>
      <Text style={styles.title}>零件号信息</Text>
      <FlatList
        data={mechanicalList}
        renderItem={data => renderTechnologyProcessList(data, props)}
        keyExtractor={item => item.qltSheetId}
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