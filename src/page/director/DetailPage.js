import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import NavigationBar from '../../common/Component/NavigationBar';
import AntDesign from 'react-native-vector-icons/AntDesign';
import NavigationManager from '../../navigation/NavigationManager';
import { fitSize } from '../../utils/Fit';
import Constants from '../../utils/Constants';
import { sheetListStatusView } from '../../utils/Common';

const renderTabLeftButton = () => {
  return (
    <TouchableOpacity
      onPress={() => {
        NavigationManager.pop();
      }}
    >
      <AntDesign
        name={'left'}
        size={18}
        style={{ color: 'white', marginLeft: fitSize(10) }}
      />
    </TouchableOpacity>
  );
}

/**
* 车间主任派工单数据
* sheetCode,       <!-- 派工单号 -->
* matName,              <!-- 物料名称 -->
* matQty,                <!-- 物料数量 -->
* planDate,           < !-- 计划时间 -->
* actualComplete,       <!-- 实际完成 -->
* sheetStatusName            <!-- 状态 -->
* sheetId           <!--  派工单Id -->
*/
const RenderDetailView = (props) => {
  const { planDate,
          sheetCode,
          matName,
          matQty,
          sheetStatus,
          sheetStatusName,
          actualComplete } = props.navigation.state.params;

  return (
    <View style={styles.containtFinish}>
      <View style={styles.innerContainLeft}>
        {sheetListStatusView(sheetStatus)}
      </View>
      <View style={styles.innerContain}>
        <Text style={styles.leftDescript}>派工单号</Text>
        <Text style={styles.leftDescript}>物料名称</Text>
        <Text style={styles.leftDescript}>物料数量</Text>
        <Text style={styles.leftDescript}>计划时间</Text>
        <Text style={styles.leftDescript}>实际完成</Text>
        <Text style={styles.leftDescript}>状态</Text>
      </View>
      <View style={styles.innerContain}>
        <Text style={styles.rightDescript}>{sheetCode}</Text>
        <Text style={styles.rightDescript}>{matName}</Text>
        <Text style={styles.rightDescript}>{matQty}</Text>
        <Text style={styles.rightDescript}>{planDate}</Text>
        <Text style={styles.rightDescript}>{actualComplete}</Text>
        <Text style={styles.rightDescript}>{sheetStatusName}</Text>
      </View>
    </View>
  )
}

const DetailPage = (props) => {
  return (
    <View>
      <NavigationBar
        title={'派工单详情'}
        style={{ backgroundColor: '#376CDA' }}
        leftButton={renderTabLeftButton()}
      />
      {RenderDetailView(props)}
    </View>
  )
}

const styles = StyleSheet.create({
  containtFinish: {
    flexDirection: "row",
    backgroundColor: "white",
    margin: 10,
    padding: 10
  },
  leftDescript: {
    color: Constants.TEXT_cONTENT,
    marginTop: 10
  },
  rightDescript: {
    marginTop: 10
  },
  innerContainLeft: {
    flex: 1,
  },
  title: {
    height: 30,
    lineHeight: 30,
    color: "#BBBFC0"
  },
  innerContain: {
    flex: 2
  },
})

export default DetailPage;