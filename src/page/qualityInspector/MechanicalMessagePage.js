/**
 * 质检-零件号信息页面
 */
import React, { Component } from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
} from 'react-native';
import NavigationManager from '../../navigation/NavigationManager';
import NavigationBar from '../../common/Component/NavigationBar';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MechanicalView from './component/MechanicalView';
import { connect } from 'react-redux';
import { 
  getMechanicalMessageList, 
  postTotalMechanicalMessage 
} from '../../redux/action/qualityInspector/index';
import Constants from '../../utils/Constants';
import MechanicalDetailView from './component/MechanicalDetailView';
import Toast from 'react-native-easy-toast';

class MechanicalMessagePage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getMechanicalMessageList();
    console.warn('componentDidMount')
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

  totalSubmit() {
    //该方法将后端的数据返回给后端即可action种还没有写
    const { postTotalMechanicalMessage } = this.props;
    postTotalMechanicalMessage();
    this.toast.show("提交总的零件号")
  }

  /**
   * 新增按钮是根据质检单是否有零件号hasMechanical和是否有零件号信息partNumber这个字段来控制
     hasMechanical:true; && partNumber不存在  
   */
  isShowAddMechanicalButton() {
    const { hasMechanical, item } = this.props.navigation.state.params;
    const { partNumber } = item;
    return (
      (hasMechanical === '有' && !partNumber) ?
        <TouchableOpacity
          onPress={() => {
            NavigationManager.goPage('AddMechanicalPage')
          }}
          style={styles.addMechanical}>
          <Text style={styles.addMechanicalText}>+  新增零件号</Text>
        </TouchableOpacity> : null
    )
  }

  /**
   * 提交按钮显示规则:根据后端工艺工序步骤的字段isSubmit来判断是否显示新增按钮。 	
   */
  isShowSubmitButton() {
    const { item } = this.props.navigation.state.params;
    const { isSubmit } = item;
    return (
      isSubmit ? 
      <TouchableOpacity
        style={styles.submit}
        onPress={() => this.totalSubmit()}
      >
        <Text style={styles.submitText}>提交</Text>
      </TouchableOpacity> : null
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.block}>
          <View style={styles.block}>
            <NavigationBar
              title={'零件号列表'}
              style={{ backgroundColor: '#376CDA' }}
              leftButton={this.renderTabLeftButton()}
            />
            <MechanicalDetailView {...this.props} />
            <MechanicalView {...this.props} />
          </View>
          {this.isShowAddMechanicalButton()}
        </View>
        {this.isShowSubmitButton()}
        <Toast
          ref={(toast) => (this.toast = toast)}
          position={'center'}
        />
      </View>
    );
  }
}

// 请求零件号的接口
const mapStateToProps = (state) => ({
  mechanicalList: state.qualityInspector.mechanicalList,
});

const mapDispatchToProps = (dispatch) => ({
  getMechanicalMessageList() {
    dispatch(getMechanicalMessageList())
  },
  postTotalMechanicalMessage() {
    dispatch(postTotalMechanicalMessage())
  }
});

const styles = StyleSheet.create({
  addMechanical: {
    height: 50,
    width: 200,
    borderWidth: 1,
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
    color: Constants.THEME_COLOR,
    borderColor: Constants.THEME_COLOR
  },
  block: {
    flex: 1,
  },
  addMechanicalText: {
    fontSize: 20,
    color: Constants.THEME_COLOR
  },
  submit: {
    height: 55,
    backgroundColor: Constants.BUTTON,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  submitText: {
    color: 'white',
    fontSize: 20
  },
  container: {
    flex: 1,
    backgroundColor: Constants.THEME_BACKGROUND,
  },
  materialsIDText: {
    fontSize: 18,
    color: '#878787',
    flexWrap: 'nowrap'
  },
  materialsNameText: {
    fontSize: 18,
    color: '#878787',
  },
  timeColor: {
    color: Constants.TIME_COLOR
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(MechanicalMessagePage);
