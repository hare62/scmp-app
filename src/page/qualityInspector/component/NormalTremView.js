/**写成一个标准项组件
 * 传入参数：standarItem list的一个对象
 * eg:
 * {
    inspectionName: "长",
    standardValue: 10,
    positiveTolerance: 0.01,
    negativeTolerance: 0.03
  }
  changeResult传入一个函数用于监听用户存值在TextInput 
 * 
 */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput
} from 'react-native';

const renderModefyPage = (props) => {
 
  let { changeResult, standarItem, index } = props;
  let { inspectionName, standardValue, positiveTolerance, negativeTolerance, realNumber } = standarItem;
  return (
    <View style={styles.container}>
      <Text style={styles.itemTitle}>标准项renderModefyPage</Text>
      <Text style={styles.itemTitle}>{inspectionName}</Text>
      <View style={styles.innerContainer}>
        <View style={styles.normalContainer}>
          <View style={styles.normalItem}>
            <Text>标准值</Text>
            <Text>{standardValue}MM</Text>
          </View>
          <View style={styles.normalItem}>
            <Text>正向容差</Text>
            <Text>{positiveTolerance}</Text>
          </View>
          <View style={styles.normalItem}>
            <Text>负向容差</Text>
            <Text>{negativeTolerance}</Text>
          </View>
        </View>
        <Text style={styles.title}>实际值</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => { changeResult(text, index) }}
          value={`${realNumber}`}
          placeholder=""
          keyboardType="numeric"
        />
      </View>
    </View>
  )
}

const renderAddPage = (props) => {
  let { changeResult, standarItem, index } = props;
  let { inspectionName, standardValue, positiveTolerance, negativeTolerance, realNumber } = standarItem;
  return (
    <View style={styles.container}>
       <Text style={styles.itemTitle}>标准项renderAddPage</Text>
      <Text style={styles.itemTitle}>{inspectionName}</Text>
      <View style={styles.innerContainer}>
        <View style={styles.normalContainer}>
          <View style={styles.normalItem}>
            <Text>标准值</Text>
            <Text>{standardValue}MM</Text>
          </View>
          <View style={styles.normalItem}>
            <Text>正向容差</Text>
            <Text>{positiveTolerance}</Text>
          </View>
          <View style={styles.normalItem}>
            <Text>负向容差</Text>
            <Text>{negativeTolerance}</Text>
          </View>
        </View>
        <Text style={styles.title}>实际值</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => { changeResult(text, index) }}
          value={`${realNumber}`}
          placeholder="请输入实际值"
          keyboardType="numeric"
        />
      </View>
    </View>
  )
}

const renderDetailPage = (props) => {
  let { changeResult, standarItem, index } = props;
  let { inspectionName, standardValue, positiveTolerance, negativeTolerance, realNumber } = standarItem;

  return (
    <View style={styles.container}>
       <Text style={styles.itemTitle}>标准项renderDetailPage</Text>
      <Text style={styles.itemTitle}>{inspectionName}</Text>
      <View style={styles.innerContainer}>
        <View style={styles.normalContainer}>
          <View style={styles.normalItem}>
            <Text>标准值</Text>
            <Text>{standardValue}MM</Text>
          </View>
          <View style={styles.normalItem}>
            <Text>正向容差</Text>
            <Text>{positiveTolerance}</Text>
          </View>
          <View style={styles.normalItem}>
            <Text>负向容差</Text>
            <Text>{negativeTolerance}</Text>
          </View>
        </View>
        <Text style={styles.title}>实际值</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => { changeResult(text, index) }}
          value={`${realNumber}`}
          keyboardType="numeric"
          editable={false}
        />
      </View>
    </View>
  )
}
const NormalTremView = (props) => {
  let { standarItem, isSubmit, isAddPage, isModifyPage, isDetailPage } = props;
  let { realNumber } = standarItem;
  if (isModifyPage) {//存在实际值===修改页面
    return renderModefyPage(props)
  } else if (isAddPage) {//不存在实际值===新增页面
    return renderAddPage(props);
  } else if (isDetailPage) {//存在实际值&&没有提交按钮 
    return renderDetailPage(props);
  }
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F2F6F8",
    padding: 10,
  },
  title: {
    height: 30,
    lineHeight: 30,
    color: "black"
  },
  textInput: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: '#ECECEC',
    paddingLeft: 10,
    color: 'black'
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