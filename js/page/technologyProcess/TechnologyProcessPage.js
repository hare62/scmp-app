import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import NavigationManager from '../../navigation/NavigationManager';
import NavigationBar from '../../common/NavigationBar';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SheetDetailView from './component/SheetDetailView';
import StepsView from './component/StepsView';
import { connect } from 'react-redux';
import { getTechnologyProcessList } from '../../action/qualityInspector/index';

class TechnologyProcessPage extends Component {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    NavigationManager.setNavigation(navigation);

  }

  componentDidMount() {
    this.props.getTechnologyProcessList();
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
          title={'我的派工单'}
          style={{ backgroundColor: '#376CDA' }}
          leftButton={this.renderTabLeftButton()}
        />
        <SheetDetailView {...this.props} />
        <StepsView {...this.props} />
      </>
    );
  }
}
// 请求工艺工序接口
const mapStateToProps = (state) =>({
  technologyProcessList:state.qualityInspector.technologyProcessList
});

const mapDispatchToProps = (dispatch) =>({
  getTechnologyProcessList(){
    dispatch(getTechnologyProcessList())
  }  
});

export default connect(mapStateToProps, mapDispatchToProps)(TechnologyProcessPage);

// export default TechnologyProcessPage;