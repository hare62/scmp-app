import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity
} from 'react-native';
import NavigationManager from '../../../navigation/NavigationManager';
import { qualityStatusView } from '../../../utils/Common';
import styles from '../../../common/Styles/StepsView';
import ModelView from '../../../common/Component/ModelView';

class StepsView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      source: ''
    }

    this.onPopModalView = this.onPopModalView.bind(this);
    this.hasMechanical = this.hasMechanical.bind(this);
    this.noMechanical = this.noMechanical.bind(this);
  }

  hasMechanicalMessage(data) {
    let { status } = data.item;
    if (data.index === 0 && status === '01') {
      this.setState({
        visible: true
      });
      return false;
    }
  }

  onPopModalView(data) {
    //没有完成质检&&第一道工序&& => 才弹窗询问是否有零件号  InProgress: "01",//质检中01
    //把当前的数据在state中更改 这个时候要作为弹窗的回传参数
    // let { status } = data.item;
    // if (data.index === 0 ) {
    //   this.setState({
    //     visible: true,
    //     source: data
    //   });
    //   return false;
    // }
    let { step, name, status, equipment, partNumber } = data.item;
    let { hasMechanical, sheetListid, sheetId } = this.props;
    if (hasMechanical === '01' && !partNumber) {
      this.setState({
        visible: true,
        source: data
      });
    }
    else if (hasMechanical === '01' && partNumber) {
      NavigationManager.push('MechanicalMessagePage', { hasMechanical, sheetId, ...data });
    }
    else if (hasMechanical === '02') {
      NavigationManager.push('BatchQualityPage', { sheetListid, ...data });
    }
  }

  renderTechnologyProcessList(data, callBack) {
    let {
      step,
      name,
      status,
      equipment,
      number,
      isSubmit,
      partNumber,
      proInspectionId,
      technologyId } = data.item;

    return (
      <TouchableOpacity
        onPress={() => callBack(data)}
      >
        <View style={styles.container}>
          <View style={styles.content}>
            <Text style={{ fontSize: 20, color: '#A7A7A7' }}>
              step{step}
            </Text>
            <Text style={{ fontSize: 20, color: '#616161' }}>
              {name}
            </Text>
            <Text style={{ fontSize: 20, color: '#616161' }}>
              报工数量{number}
            </Text>

            <Text style={{ fontSize: 20, color: '#616161' }}>
              {equipment}
            </Text>
            {qualityStatusView(status)}
          </View>

        </View>
        {/* <View>
          <Text>
            technologyId{JSON.stringify(technologyId)}
          </Text>
          <Text>
            proInspectionId{JSON.stringify(proInspectionId)}
          </Text>
          <Text>
            是否有提交按钮{JSON.stringify(isSubmit)}
          </Text>
          <Text>
            零件号信息{JSON.stringify(partNumber)}
          </Text>

        </View> */}
      </TouchableOpacity>
    )
  }

  noMechanical(data) {
    let { sheetListid } = this.props;
    this.setState({
      visible: false
    });
    NavigationManager.push('BatchQualityPage', { sheetListid, ...data });
  }

  hasMechanical(data) {
    this.setState({
      visible: false
    });
    // 传的参数是flatlist的里面有item和index
    const { hasMechanical, sheetId } = this.props;
    NavigationManager.push('MechanicalMessagePage', { hasMechanical, sheetId, ...data });
  }

  render() {
    let { technologyProcessList } = this.props;
    let { visible, source } = this.state;
    // console.log("StepsViewthis.props", this.props)
    // console.log("StepsViewthis.props.navigation.state.params", this.props.navigation.state.params)
    return (
      <View>
        <FlatList
          data={technologyProcessList}
          renderItem={data => this.renderTechnologyProcessList(data, this.onPopModalView)}
          keyExtractor={item => item.proInspectionId}
        />
        <ModelView
          visible={visible}
          notice="是否有零件号"
          leftText="否"
          rightText="是"
          onClose={(data) => { this.noMechanical(data) }}
          callbackConfirm={(data) => { this.hasMechanical(data) }}
          data={source}
        />
      </View>
    )
  }
}

export default StepsView;