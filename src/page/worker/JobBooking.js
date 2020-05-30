import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput
} from 'react-native';
import { connect } from 'react-redux';
import NavigationBar from '../../common/Component/NavigationBar';
import AntDesign from 'react-native-vector-icons/AntDesign';
import JobBookingDetailView from './component/JobBookingDetailView';
import Constants from '../../utils/Constants';
import NavigationManager from '../../navigation/NavigationManager';
import { submitJobBooking, getTechnologyProcessList } from '../../redux/action/worker/index';
import Toast from 'react-native-easy-toast';
import ModelView from '../../common/Component/ModelView';
import { processStatusView } from '../../utils/Common';
import { LoadingControl } from '../../common/Component/LoadingView';
import ModelNoticeView from '../../common/Component/ModelNoticeView';

class JobBooking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      completeQty: '',
      isShowModelView: false,
      toastBackgroundColor: 'black',
      jobBookingResultNotice: '',
      isSubmitJobBooking: false,

    };
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

  /**
   * 验证实际完成数
   */
  checkSubmit() {
    const { completeQty } = this.state;
    if (!completeQty) {
      const result = "请输入实际完成数";
      this.toast.show(result);
      return false;
    }

    this.setState({
      isShowModelView: true
    });
  }

  /**
   * 关掉模态框
   */
  onCloseConfirmModal() {
    this.setState({
      isShowModelView: false
    });
  }

  /**
   * 提交报工单
   */
  onSubmitJobBooking() {
    this.onCloseConfirmModal();
    const { submitJobBooking, getTechnologyProcessList } = this.props;
    const { sheetTechnologyId, sheetId } = this.props.navigation.state.params;
    const { completeQty } = this.state;

    submitJobBooking(sheetTechnologyId, completeQty, (result) => {
      this.setState({
        isSubmitJobBooking: true,
        jobBookingResultNotice: result.MESSAGE,
      })
      //通过派工单Id刷新工艺工序列表
      getTechnologyProcessList(sheetId);
      setTimeout(() => {
        this.setState({
          isSubmitJobBooking: false,
        })
        NavigationManager.pop();

      }, 2000)
    });
  }

  /**
   * 渲染报工View
   */
  renderJobBookingView() {
    return (
      <View style={{ flex: 1 }}>
        <JobBookingDetailView style={{ zIndex: 0 }} {...this.props} />
        <View style={{ zIndex: 0 }}>
          <View style={styles.warpper}>
            <Text style={styles.title}>实际完成数:</Text>
            <TextInput
              style={styles.loggingData}
              value={this.state.completeQty}
              onChangeText={(completeQty) => this.setState({ completeQty })}
              placeholder="请输入实际完成数"
              keyboardType='numeric'
            />
          </View>
          <View style={styles.warpper} style={{ zIndex: 0 }}>
            <TouchableOpacity
              style={styles.bottomSubmit}
              onPress={() => { this.checkSubmit() }}
            >
              <Text style={styles.submiText}>报工</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Toast
          ref={(toast) => (this.toast = toast)}
          position={'center'}
          style={{ zIndex: 10 }}
        />
      </View>
    )
  }

  /**
   * 渲染已完成报工详情
   * 步骤、工序名称、设备名称、合格，合用、工废、料废、价格、应得、应扣
   *  /**
   * 返工数：reworkQty;
     返修数： rebuildQty;
     让步接收数： concessionQty;
     改制数：restructuringQty;
   */
  renderFinishJobBookView() {
    const {
      equipmentName,
      tecStep,
      technologyName,
      qualifiedQty,
      shareQty,
      industrialWasteQty,
      matWasteQty,
      price,
      deserved,
      deductible,
      sheetStatusCode,
      callBack,
      reworkQty,
      rebuildQty,
      concessionQty,
      restructuringQty } = this.props.navigation.state.params;

    return (
      <View style={styles.containtFinish}>
        <View style={styles.innerContainLeft}>
          {processStatusView(sheetStatusCode)}
        </View>
        <View style={styles.innerContain}>
          <Text style={styles.leftDescript}>步骤</Text>
          <Text style={styles.leftDescript}>工序名称</Text>
          <Text style={styles.leftDescript}>设备名称</Text>
          <Text style={styles.leftDescript}>合格</Text>
          <Text style={styles.leftDescript}>合用</Text>
          <Text style={styles.leftDescript}>工废</Text>
          <Text style={styles.leftDescript}>料废</Text>
          <Text style={styles.leftDescript}>价格</Text>
          <Text style={styles.leftDescript}>应得</Text>
          <Text style={styles.leftDescript}>应扣</Text>
          <Text style={styles.leftDescript}>返工数：</Text>
          <Text style={styles.leftDescript}>返修数</Text>
          <Text style={styles.leftDescript}>让步接收数</Text>
          <Text style={styles.leftDescript}>改制数</Text>
        </View>
        <View style={styles.innerContain}>
          <Text style={styles.rightDescript}>{tecStep}</Text>
          <Text style={styles.rightDescript}>{equipmentName}</Text>
          <Text style={styles.rightDescript}>{technologyName}</Text>
          <Text style={styles.rightDescript}>{qualifiedQty}</Text>
          <Text style={styles.rightDescript}>{shareQty}</Text>
          <Text style={styles.rightDescript}>{industrialWasteQty}</Text>
          <Text style={styles.rightDescript}>{matWasteQty}</Text>
          <Text style={styles.rightDescript}>{price}</Text>
          <Text style={styles.rightDescript}>{deserved}</Text>
          <Text style={styles.rightDescript}>{deductible}</Text>
          <Text style={styles.rightDescript}>{reworkQty}</Text>
          <Text style={styles.rightDescript}>{rebuildQty}</Text>
          <Text style={styles.rightDescript}>{concessionQty}</Text>
          <Text style={styles.rightDescript}>{restructuringQty}</Text>
        </View>
      </View>
    )
  }

  renderModelView() {
    return (
      <ModelView
        visible={this.state.isShowModelView}
        onClose={() => this.onCloseConfirmModal()}
        notice={'是否确定报工'}
        callbackConfirm={() => this.onSubmitJobBooking()}
      />
    );
  }

  render() {
    let { sheetStatusCode } = this.props.navigation.state.params;
    return (
      <View style={styles.containt}>
        <NavigationBar
          title={'报工'}
          style={{ backgroundColor: '#376CDA' }}
          leftButton={this.renderTabLeftButton()}
        />
        {sheetStatusCode === '03' ? this.renderFinishJobBookView() : this.renderJobBookingView()}
        {this.state.isShowModelView ? this.renderModelView() : null}
        <ModelNoticeView
          visible={this.state.isSubmitJobBooking}
          notice={this.state.jobBookingResultNotice}
        />
      </View>
    )
  }
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
  containt: {
    backgroundColor: Constants.THEME_BACKGROUND,
    flex: 1,
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
  loggingData: {
    backgroundColor: "#fff",
    marginTop: 10,
    paddingLeft: 5,
    color: "#000",
    borderWidth: 1,
    borderColor: "#ECECEC"
  },
  warpper: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  bottomSubmit: {
    backgroundColor: Constants.BUTTON,
    height: 55,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },
  submiText: {
    fontSize: 20,
    color: "white",
  }
})

const mapDispatch = (dispatch) => ({
  submitJobBooking(sheetTechnologyId, completeQty, callBack) {
    dispatch(submitJobBooking(sheetTechnologyId, completeQty, callBack))
  },
  getTechnologyProcessList(sheetId) {
    dispatch(getTechnologyProcessList(sheetId));
  }
});

export default connect(null, mapDispatch)(JobBooking);