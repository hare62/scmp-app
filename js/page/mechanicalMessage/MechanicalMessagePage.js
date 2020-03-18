import React, { Component } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet
} from 'react-native';
import NavigationManager from '../../navigation/NavigationManager';
import NavigationBar from '../../common/NavigationBar';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SheetDetailView from './component/SheetDetailView';
import MechanicalView from './component/MechanicalView';
import { connect } from 'react-redux';
import { getMechanicalMessageList } from '../../action/qualityInspector/index';
import Constants from '../../utils/Constants';
import { deviceWidthDp } from '../../utils/Fit'

class MechanicalMessagePage extends Component {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    NavigationManager.setNavigation(navigation);

  }

  componentDidMount() {
    this.props.getMechanicalMessageList();
  }

  renderTabLeftButton() {
    return (
      <TouchableOpacity
        onPress={() => {
          NavigationManager.goBack();
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

  render() {
    return (
      <>
        <NavigationBar
          title={'零件号质检'}
          style={{ backgroundColor: '#376CDA' }}
          leftButton={this.renderTabLeftButton()}
        />
        <SheetDetailView {...this.props} />
        <MechanicalView {...this.props} />
        <TouchableOpacity style={styles.addMechanical}>
          <Text style={styles.addMechanicalText}>+  新增零件号</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.submit}>
          <Text style={styles.submitText}>提交</Text>
        </TouchableOpacity>
      </>
    );
  }
}
// 请求零件号的接口
const mapStateToProps = (state) => ({
  mechanicalList: state.qualityInspector.mechanicalList
});

const mapDispatchToProps = (dispatch) => ({
  getMechanicalMessageList() {
    dispatch(getMechanicalMessageList())
  }
});

const styles = StyleSheet.create({
  addMechanical:{
    height:50,
    width:200,
    borderWidth:1,
    paddingLeft:10,
    marginLeft:40,
    justifyContent:"center",
    alignItems:"center",
    color:Constants.THEME_COLOR,
    borderColor:Constants.THEME_COLOR
  },
  addMechanicalText:{
    fontSize:20,
    color:Constants.THEME_COLOR
  },
  submit:{
    width: deviceWidthDp,
    height:55,
    backgroundColor:Constants.BUTTON,
    marginTop:20,
    justifyContent:"center",
    alignItems:"center",
  },
  submitText:{
    color:'white',
    fontSize:20
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(MechanicalMessagePage);
