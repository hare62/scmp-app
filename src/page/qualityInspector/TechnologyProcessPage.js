import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import NavigationManager from '../../navigation/NavigationManager';
import NavigationBar from '../../common/Component/NavigationBar';
import AntDesign from 'react-native-vector-icons/AntDesign';
import StepsView from './component/StepsView';
import { connect } from 'react-redux';
import { getTechnologyProcessList } from '../../redux/action/qualityInspector/index';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { fitSize } from '../../utils/Fit';
import styles from '../../common/Styles/SheetDetailView';
import { defaultQualityStatus } from '../../utils/Common';

class TechnologyProcessPage extends Component {
  constructor(props) {
    super(props);
    props.navigation.addListener('didFocus', ()=>{ this.init()});
  }

  componentDidMount() {
    this.init();
  }

  init(){
    const { sheetId } = this.props.navigation.state.params;
    this.props.getTechnologyProcessList(sheetId);
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

  renderDetailView() {
    const { sheetListFinishTime,
            sheetListid,
            materialsName,
            materialsNumber,
            worker,
            hasMechanical,
            sheetListstatus } = this.props.navigation.state.params;
    return (
      <View style={styles.container}>
        <View style={styles.containTop}>
          {defaultQualityStatus(sheetListstatus)}
          <View style={styles.containRight}>
            <Text ellipsizeMode="tail" numberOfLines={1} style={styles.materialsIDText}>
              {sheetListid}
            </Text>
            <Text ellipsizeMode="tail" numberOfLines={1} style={styles.materialsNameText}>
              物料名称:{materialsName}
            </Text>
            <View style={styles.timeView}>
              <AntDesign
                name={'clockcircleo'}
                size={18}
                style={{ color: '#aaa' }}
              />
              <Text style={styles.timeText}>
                {sheetListFinishTime}
              </Text>
            </View>
            <Text ellipsizeMode="tail" numberOfLines={1} style={styles.materialsNameText}>
              加工人:{worker}
            </Text>
            <Text ellipsizeMode="tail" numberOfLines={1} style={styles.materialsNameText}>
              是否有零件号:{hasMechanical}
            </Text>
          </View>
        </View>
        <View style={styles.containBottom}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.materialsCountText}>
              物料数量
              </Text>
            <Text style={{ fontSize: 18, color: '#676767', marginLeft: 5 }}>
              {materialsNumber}
            </Text>
          </View>
        </View>
      </View>
    );
  }
  
  render() {
    const {  hasMechanical, sheetListid, sheetId } = this.props.navigation.state.params;
    return (
      <>
        <NavigationBar
          title={'工艺工序列表'}
          style={{ backgroundColor: '#376CDA' }}
          leftButton={this.renderTabLeftButton()}
        />
        { this.renderDetailView()}
        <StepsView {...this.props} hasMechanical={hasMechanical}  sheetListid={sheetListid} sheetId={sheetId} />
      </>
    );
  }
}

// 请求工艺工序接口
const mapStateToProps = (state) =>({
  technologyProcessList:state.qualityInspector.technologyProcessList
});

const mapDispatchToProps = (dispatch) =>({
  getTechnologyProcessList(sheetId){
    dispatch(getTechnologyProcessList(sheetId))
  }  
});

export default connect(mapStateToProps, mapDispatchToProps)(TechnologyProcessPage);
