import React, { Component } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View
} from 'react-native';
import NavigationManager from '../../navigation/NavigationManager';
import NavigationBar from '../../common/Component/NavigationBar';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MechanicalQualityView from './component/MechanicalQualityView';
import NormalTremView from './component/NormalTremView';
import { connect } from 'react-redux';
import { postAddMechanical, postMD5Files } from '../../redux/action/qualityInspector/index';
import Constants from '../../utils/Constants';
import Toast from 'react-native-easy-toast';
import RNFileSelector from 'react-native-file-selector';

class AddMechanicalPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mechanical: "",//零件号
      realNumber: "",//实际值
      qualityResult: 0,//质检结果
      uploadReport: "上传质检报告",
      isDetailPage:false
    }
    this.submitResult = this.submitResult.bind(this);
    this.changeResult = this.changeResult.bind(this);
    this.changeMechanical = this.changeMechanical.bind(this);
    this.changeQualityResult = this.changeQualityResult.bind(this);
    this.onRNFileSelector = this.onRNFileSelector.bind(this);
  }

  componentDidMount() {
    const { item } = this.props.navigation.state.params;
    if (item) {
      //有参数过来就是详情页面
      const { mechanicalName, conclusion, realNumber } = item;
      this.setState({
        realNumber: realNumber.toString(),
        mechanical: mechanicalName,
        qualityResult: conclusion,
        isDetailPage:true
      })
    }
  }

  onRNFileSelector() {

    RNFileSelector.Show(
      {
        title: 'Select File',
        onDone: (path) => {
          this.setState({
            uploadReport: '所选文件: ' + path
            
          })
          const { postMD5Files } = this.props;
          postMD5Files(path);
          console.log('onRNFileSelector file selected: ' + path)
        },
        onCancel: () => {
          console.log('cancelled')
        }
      }
    )
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

  changeMechanical(mechanical) {
    this.setState({
      mechanical
    });
  }

  changeResult(realNumber) {
    this.setState({
      realNumber
    });
  }

  changeQualityResult(qualityResult) {
    this.setState({
      qualityResult
    });
  }

  submitResult() {
    const { mechanical, qualityResult, realNumber } = this.state;
    const { postAddMechanical } = this.props;
    postAddMechanical(mechanical, qualityResult, realNumber, (result) => {
      this.toast.show(result);
    })
  }

  render() {
    const { mechanical, realNumber, qualityResult, uploadReport, isDetailPage } = this.state;
    const { item } = this.props.navigation.state.params;
    return (
      <View style={styles.contains}>
        <NavigationBar
          title={'新增零件号'}
          style={{ backgroundColor: '#376CDA' }}
          leftButton={this.renderTabLeftButton()}
        />
        <MechanicalQualityView 
          {...this.props}
          changeMechanical={this.changeMechanical}
          mechanical={mechanical}
          changeQualityResult={this.changeQualityResult}
          qualityResult={qualityResult}
          onRNFileSelector={this.onRNFileSelector}
          uploadReport={uploadReport}
          isDownLoad={item}
          isDetailPage={isDetailPage}
        />
        <NormalTremView 
          {...this.props}
          changeResult={this.changeResult}
          realNumber={realNumber} 
          isDetailPage={isDetailPage}
        />
        { isDetailPage ? null : 
        <View style={styles.warpper}>
          <TouchableOpacity
            style={styles.submit}
            onPress={this.submitResult}
          >
            <Text style={styles.submitText}>保存</Text>
          </TouchableOpacity>
        </View>}
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
    backgroundColor: "#F2F6F8",
  },
  addMechanical: {
    height: 50,
    width: 200,
    borderWidth: 1,
    paddingLeft: 10,
    marginLeft: 40,
    justifyContent: "center",
    alignItems: "center",
    color: Constants.THEME_COLOR,
    borderColor: Constants.THEME_COLOR
  },
  addMechanicalText: {
    fontSize: 20,
    color: Constants.THEME_COLOR
  },
  submit: {
    height: 50,
    backgroundColor: Constants.BUTTON,
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 10,
    paddingRight: 10,
  },
  submitText: {
    color: 'white',
    fontSize: 20,
  },
  warpper: {
    paddingLeft: 10,
    paddingRight: 10,
  }
})

const mapDispatchToProps = (dispatch) => ({
  //提交新增零件号
  postAddMechanical(mechanical, qualityResult, realNumber, callBack) {
    dispatch(postAddMechanical(mechanical, qualityResult, realNumber, callBack))
  },
  postMD5Files(filepath){
    dispatch(postMD5Files(filepath))
  }
});

export default connect(null, mapDispatchToProps)(AddMechanicalPage);
