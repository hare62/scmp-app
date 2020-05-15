import React, { Component } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  TextInput
} from 'react-native';
import NavigationManager from '../../navigation/NavigationManager';
import NavigationBar from '../../common/Component/NavigationBar';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { connect } from 'react-redux';
import { getNoMechanicalMessageDetail, postSubmitResult, postSaveResult } from '../../redux/action/qualityInspector/index';
import MechanicalDetailView from './component/MechanicalDetailView';
import Toast from 'react-native-easy-toast';

class BatchQualityPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      qualified: '请输入合格数',//合格
      fit: '请输入合用数',//合用
      industrialWaste: '请输入工废数',//工废
      materialWaste: '请输入料废数',//料废
      disabledSubmit:false,//提交按钮是否可点击
    }
  }

  componentDidMount() {
    //根据状态请求不同的数据
    let { status } = this.props.navigation.state.params;
    // this.props.getMechanicalMessageList();
    if (status === '03') { //如果状态是已完成,显示详情页面,重置placeholder信息
      let { getNoMechanicalMessageDetail } = this.props;
      getNoMechanicalMessageDetail();
    }
  }

  renderTabLeftButton() {
    return (
      <TouchableOpacity
        onPress={() => {
          NavigationManager.pop();
        }}
      >
        <AntDesign
          name={'left'}
          size={18}
          style={{ color: 'white', marginLeft: 10 }}
        />
      </TouchableOpacity>
    );
  }

  renderFinishQualityView() {
    const { noMechanicalList } = this.props;//数据来源props
    const { qualified, fit, industrialWaste, materialWaste } = noMechanicalList;

    return (
      <View>
        <View style={styles.warpper}>
          <Text style={styles.title}>合格:</Text>
          <TextInput
            style={styles.loggingData}
            placeholder={qualified}

          />
        </View>
        <View style={styles.warpper}>
          <Text style={styles.title}>合用:</Text>
          <TextInput
            style={styles.loggingData}
            placeholder={fit}
            placeholderTextColor='#ccc'
          />
        </View>
        <View style={styles.warpper}>
          <Text style={styles.title}>工废:</Text>
          <TextInput
            style={styles.loggingData}
            placeholder={industrialWaste}
            placeholderTextColor='#ccc'
          />
        </View>
        <View style={styles.warpper}>
          <Text style={styles.title}>料废:</Text>
          <TextInput
            style={styles.loggingData}
            placeholder={materialWaste}
            placeholderTextColor='#ccc'
          />
        </View>
      </View>
    )
  }

  renderUnFinishQualityView() {
    const { qualified, fit, industrialWaste, materialWaste } = this.state;

    return (
      <View>
        <View style={styles.warpper}>
          <Text style={styles.title}>合格:</Text>
          <TextInput
            style={styles.loggingData}
            onChangeText={(qualified) => this.setState({ qualified })}
            value={qualified}
            placeholder={qualified}
            placeholderTextColor='#ccc'
          />
        </View>
      
     
        <View style={styles.warpper}>
          <Text style={styles.title}>待审批:</Text>
          <TextInput
            style={styles.loggingData}
            onChangeText={(materialWaste)=>this.setState({materialWaste})}
            value={materialWaste}
            placeholder={materialWaste}
            placeholderTextColor='#ccc'
          />
        </View>
      </View>
    )
  }

  submitResult() {
    const { postSubmitResult } = this.props;
    const { qualified, fit, industrialWaste, materialWaste } = this.state;
    postSubmitResult(qualified, fit, industrialWaste, materialWaste, (result)=>{
      this.toast.show(result);
      this.setState({
        disabledSubmit:true
      })
    });
  }

  saveResult() {
    const { postSaveResult } = this.props;
    const { qualified, fit, industrialWaste, materialWaste } = this.state;
    postSaveResult(qualified, fit, industrialWaste, materialWaste, (result)=>{
      this.toast.show(result);
    });
  }

  render() {
    let { status } = this.props.navigation.state.params;
    const { disabledSubmit } =this.state;
    const isFinishStatus = (status === '03' ? true : false);
    return (
      <View style={styles.contains}>
        <View style={styles.block}>
          <NavigationBar
            title={'无零件号质检'}
            style={{ backgroundColor: '#376CDA' }}
            leftButton={this.renderTabLeftButton()}
          />
          <MechanicalDetailView {...this.props} />
        {isFinishStatus ? this.renderFinishQualityView() : this.renderUnFinishQualityView()}
        </View>
        {isFinishStatus ? <></> : (
                                    <View style={styles.warpperButton}>
                                      <TouchableOpacity
                                        style={styles.leftBottom}
                                        onPress={() => { this.saveResult() }}
                                      >
                                        <Text>保存</Text>
                                      </TouchableOpacity>
                                      <TouchableOpacity
                                        style={[styles.leftBottom, styles.select]}
                                        onPress={() => { this.submitResult() }}
                                        disabled={disabledSubmit}
                                      >
                                        <Text >提交</Text>
                                      </TouchableOpacity>
                                    </View>
                                    )
        }
         <Toast
          ref={(toast) => (this.toast = toast)}
          position={'center'}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  contains: {
    backgroundColor: "#F1F5F8",
    flex: 1
  },
  block: {
    flex: 1
  },
  warpper: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  leftBottom: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    flex: 1,
    height: 55,
    borderWidth: 1,
    borderColor: '#ECECEC',
    margin: 5,
    shadowColor: '#ECECEC',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 5,
  },
  warpperButton: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    height: 30,
    lineHeight: 30,
    color: "#000"
  },
  loggingData: {
    backgroundColor: "white",
    marginTop: 10,
    paddingLeft: 5,
    color: "#aaa",
    borderWidth: 1,
    borderColor: "#ECECEC"
  },
  select: {
    backgroundColor: "#42BD41",
    borderColor: "#42BD41"
  }
})

// 请求无零件号质检结果的message
const mapStateToProps = (state) => ({
  noMechanicalList: state.qualityInspector.noMechanicalList
});

const mapDispatchToProps = (dispatch) => ({
  getNoMechanicalMessageDetail() {
    dispatch(getNoMechanicalMessageDetail())
  },
  postSubmitResult(qualified, fit, industrialWaste, materialWaste, callBack) {
    dispatch(postSubmitResult(qualified, fit, industrialWaste, materialWaste, callBack))
  },
  postSaveResult(qualified, fit, industrialWaste, materialWaste, callBack) {
    dispatch(postSaveResult(qualified, fit, industrialWaste, materialWaste, callBack))
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(BatchQualityPage);
