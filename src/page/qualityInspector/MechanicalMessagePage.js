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
import ModelNoticeView from '../../common/Component/ModelNoticeView';
import { isMockData } from '../../utils/Config';

class MechanicalMessagePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowNotice: false,
      noticeText: "",
      isShowSubmit: true
    }
    props.navigation.addListener('didFocus', () => { this.init() });
  }

  componentDidMount() {
    this.init();
    const { isSubmit } = this.props.navigation.state.params.item;
    this.setState({
      isShowSubmit: isSubmit
    })
  }

  init() {

    const { proInspectionId } = this.props.navigation.state.params.item
    this.props.getMechanicalMessageList({ proInspectionId });

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
    const { item } = this.props.navigation.state.params;
    const { isSubmit, proInspectionId } = item;
    const { postTotalMechanicalMessage } = this.props;
    postTotalMechanicalMessage(proInspectionId, (result, isSuccess) => {
      this.setState({
        isShowNotice: true,
        noticeText: result,
        isShowSubmit: isSuccess
      })

      setTimeout(() => {
        this.setState({
          isShowNotice: false,
        })
        // TODO 最好是跳转到零件号列表页面
        NavigationManager.pop('TechnologyProcessPage');
      }, 2000)
    });
  }

  /**
   * 新增按钮是根据质检单是否有零件号hasMechanical和请求到的零件号数量小于总的零件号数量字段来控制
   */
  isShowAddMechanicalButton() {

    const { hasMechanical, item, sheetId } = this.props.navigation.state.params;
    const { partNumber, proInspectionId, isSubmit, number } = item;
    let mechanicalList;
    mechanicalList = this.props.mechanicalList;
    // mechanicalList 异步请求到的数据 所以需要等到mechanicalList存在后才会有length这个属性
    const isAddPage = true;
  
    return (
              (mechanicalList && hasMechanical === '01' && isSubmit && mechanicalList.length < number) ?
                <TouchableOpacity
                  onPress={() => {
                    NavigationManager.push('AddMechanicalPage', { sheetId, isAddPage,  ...item })
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
    const { isSubmit, proInspectionId } = item;
    const { isShowSubmit } = this.state;
    return (
      isShowSubmit ?
        <TouchableOpacity
          style={styles.submit}
          onPress={() => this.totalSubmit()}
        >
          <Text style={styles.submitText}>提交</Text>
        </TouchableOpacity> : null
    )
  }

  renderModifyPage() {
    return (
      <View style={styles.container}>
        <View style={styles.block}>
          <View style={styles.block}>
            <NavigationBar
              title={'零件号-renderModifyPage'}
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
        <ModelNoticeView
          visible={this.state.isShowNotice}
          notice={this.state.noticeText}
        />
      </View>
    );
  }

  renderAddPage() {
    return (
      <View style={styles.container}>
        <View style={styles.block}>
          <View style={styles.block}>
            <NavigationBar
              title={'零件号-renderAddPage'}
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
        <ModelNoticeView
          visible={this.state.isShowNotice}
          notice={this.state.noticeText}
        />
      </View>
    );
  }

  renderDetailPage() {
    return (
      <View style={styles.container}>
        <View style={styles.block}>
          <View style={styles.block}>
            <NavigationBar
              title={'零件号-renderDetailPage'}
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
        <ModelNoticeView
          visible={this.state.isShowNotice}
          notice={this.state.noticeText}
        />
      </View>
    );
  }

  renderError() {
    const { isSubmit, partNumber } = this.props.navigation.state.params.item;
    return (
      <View>
        <Text>后端返回字段：没有对应页面展示</Text>
        <Text>是否有提交按钮{JSON.stringify(isSubmit)}</Text>
        <Text>是否存在零件号信息{JSON.stringify(partNumber)}</Text>
      </View>
    );
  }

  render() {
    const { isSubmit, partNumber } = this.props.navigation.state.params.item;
    if (partNumber && isSubmit) {//有质检结论&&有提交按钮===修改页面
      return this.renderModifyPage();
    } else if (!partNumber) {//没有质检结论===新增页面
      return this.renderAddPage();
    } else if (partNumber && !isSubmit) {//有质检结论&&无提交按钮===详情页面
      return this.renderDetailPage();
    } else {
      return this.renderError();
    }
  }
}

// 请求零件号的接口
const mapStateToProps = (state) => ({
  mechanicalList: state.qualityInspector.mechanicalList,
});

const mapDispatchToProps = (dispatch) => ({
  getMechanicalMessageList({ proInspectionId }) {
    dispatch(getMechanicalMessageList({ proInspectionId }))
  },
  postTotalMechanicalMessage(proInspectionId, callBack) {
    dispatch(postTotalMechanicalMessage(proInspectionId, callBack))
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
