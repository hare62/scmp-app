import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Switch
} from 'react-native';

const MechanicalQualityView = (props) => {
  const {
    name,
    status,
    step,
    number,
    time } = props.navigation.state.params;
  const { 
    changeMechanical, 
    mechanical, 
    qualityResult, 
    changeQualityResult, 
    onRNFileSelector, 
    uploadReport, 
    isDownLoad,
    isDetailPage } = props;
  let temp = ['合格', '待审批'];
  return (
    <View style={styles.container}>

      <View>
        <Text style={styles.title}>零件号:</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(mechanical) => { changeMechanical(mechanical) }}
          value={mechanical}
          placeholder="请输入零件号"
          editable={isDetailPage ? false : true}
        />
      </View>
      <View >
        <Text style={styles.title}>质检结论:</Text>
        <View style={styles.content}>
          {temp.map((item, index) => {
            return <TouchableOpacity
              style={styles.conclusion}
              key={index}
              onPress={isDetailPage ? null: () => changeQualityResult(index)}
              underlayColor='transparent'>
              <Text style={(qualityResult === index) ? styles.select : styles.unSelect}>{item}</Text>
            </TouchableOpacity>
          })}
        </View>
      </View>
      { isDownLoad ? <TouchableOpacity
        style={styles.upload}
        onPress={(uploadReport) => { onRNFileSelector(uploadReport) }}
      >
        <Text style={styles.uploadText}>下载文件</Text>
      </TouchableOpacity> : <TouchableOpacity
        style={styles.upload}
        onPress={(uploadReport) => { onRNFileSelector(uploadReport) }}
      >
        <Text style={styles.uploadText}>{uploadReport}</Text>
      </TouchableOpacity>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F2F6F8',
    padding: 10,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  title: {
    height: 30,
    lineHeight: 30,
    color: "#BBBFC0"
  },
  conclusion: {
    justifyContent: 'center',
    alignItems: 'center',
    color: "white"
  },
  select: {
    backgroundColor: '#2E6AE2',
    padding: 10,
    borderRadius: 20,
    color: "white",
    opacity: 0.9
  },
  unSelect: {
    color: "#BBBFC0"
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 50,
    lineHeight: 50,
    backgroundColor: "white"
  },
  textInput: {
    backgroundColor: "white",
    marginTop: 10,
    paddingLeft: 5,
  },
  upload: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#FFF",
    paddingLeft:10
  },
  uploadText: {
    color: "#386CDA",
    lineHeight:20,
    textAlign:"left",
    letterSpacing:0,
    fontStyle:'normal',
    textDecorationStyle:"dotted",
    textTransform:"none",
  }
});

export default MechanicalQualityView;