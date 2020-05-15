import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity
} from 'react-native';
import NavigationManager from '../../../navigation/NavigationManager';
import { processStatusView } from '../../../utils/Common';
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
      // NavigationManager.goPage('MechanicalMessagePage', { ...data.item });
      return false;
    }
    // NavigationManager.goPage('BatchQualityPage', { ...data.item });
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
    let { hasMechanical } = this.props;
    if (hasMechanical === '有' && !partNumber) {
      this.setState({
        visible: true,
        source: data
      });
    }
    else if (hasMechanical === '有' && partNumber) {
      NavigationManager.push('MechanicalMessagePage', { hasMechanical, ...data });
    }
    else if (hasMechanical === '没有') {
      NavigationManager.push('BatchQualityPage', { ...data });
    }
  }

  renderTechnologyProcessList(data, callBack) {
    let { step, name, status, equipment } = data.item;

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
              {equipment}
            </Text>
            {processStatusView(status)}
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  noMechanical(data) {
    this.setState({
      visible: false
    });
    NavigationManager.push('BatchQualityPage', { ...data });
  }

  hasMechanical(data) {
    this.setState({
      visible: false
    });
    // 传的参数是flatlist的里面有item和index
    const { hasMechanical } = this.props;
    NavigationManager.push('MechanicalMessagePage', { hasMechanical,...data });
  }

  render() {
    let { technologyProcessList } = this.props;
    let { visible, source } = this.state;
    return (
      <View>
        <FlatList
          data={technologyProcessList}
          renderItem={data => this.renderTechnologyProcessList(data, this.onPopModalView)}
          keyExtractor={item => item.step}
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