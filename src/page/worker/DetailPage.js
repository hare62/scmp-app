import React, { Component } from 'react';
import {
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import StepsView from './component/StepsView';
import NavigationBar from '../../common/Component/NavigationBar';
import AntDesign from 'react-native-vector-icons/AntDesign';
import NavigationManager from '../../navigation/NavigationManager';
import styles from '../../common/Styles/SheetDetailView';
import { connect } from 'react-redux';
import {
  getTechnologyProcessList,
  refreshWorkerCellSheetListData,
  getPullUpRefreshDefaultSheetList,
  refreshFilterWorkerSheetCell
} from '../../redux/action/worker/index';
import { sheetListStatusView, StatusEnum } from '../../utils/Common';
import { LoadingControl } from '../../common/Component/LoadingView';
import { is } from '@babel/types';

class DetailPage extends Component {
  constructor(props) {
    super(props);
    this.state={
      isShow:false
    } 
  } 

  componentDidMount() {
    const { sheetId } = this.props.navigation.state.params;
    //通过派工单Id获取到工艺工序列表
    this.props.getTechnologyProcessList(sheetId);
  }

  componentWillUnmount() {
    const { sheetId, keyEx, value } = this.props .navigation.state.params;
    const { workerSheetListData, refreshWorkerCellSheetListData, isRefreshSheetCell, filterSheetData } = this.props;
    const { sheetList } = workerSheetListData;
   

    //判断派工单是否是完成状态并刷新派工单Cell
    if (isRefreshSheetCell) {
      // this.setState({
      //   isShow:true
      // })
      for (let i = 0; i < sheetList.length; i++) {
        if (sheetList[i].sheetId === sheetId) {
          sheetList[i].sheetStatus = StatusEnum.Finish;
        }
      }
      refreshWorkerCellSheetListData();//只要把workerSheetListData里面的sheetListData放在redux中
      // setInterval(()=>{
      //   this.setState({
      //     isShow:false
      //   })
      // },1000)
    }

    
    if(isRefreshSheetCell){
      if (keyEx && value) {
        //前一页面的数据
        const sheetList = filterSheetData[keyEx].filterSheetList.sheetList;
        //当前筛选页面的数据
        for (let i = 0; i < sheetList.length; i++) {
          if (sheetList[i].sheetId === sheetId) {
            sheetList[i].sheetStatus = StatusEnum.Finish;
          }
        }
        refreshFilterWorkerSheetCell(sheetList, keyEx);//将isRefreshSheetCell重置成false
      }
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

  renderDetailView = () => {
    const { planDate,
      sheetCode,
      matName,
      matQty,
      actualComplete,
      sheetStatus,
      callBack } = this.props.navigation.state.params;

    return (
      <View style={styles.container}>
        <View style={styles.containTop}>
          <View style={styles.containLeft}>
            {sheetListStatusView(sheetStatus)}
          </View>
          <View style={styles.containRight}>
            <Text ellipsizeMode="tail" numberOfLines={1} style={styles.materialsIDText}>
              {sheetCode}
            </Text>
            <Text ellipsizeMode="tail" numberOfLines={1} style={styles.materialsNameText}>
              物料名称:{matName}
            </Text>
            <View style={styles.timeView}>
              <Text style={{ color: '#aaa' }}>计划完成时间:</Text>
              <AntDesign
                name={'clockcircleo'}
                size={18}
                style={{ color: '#aaa' }}
              />
              <Text style={styles.timeText}>
                {planDate}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.containBottom}>
          <Text style={styles.materialsCountText}>
            物料数量:{matQty}
          </Text>
          <Text style={styles.materialsCountText}>
            实际完成数:{actualComplete}
          </Text>
        </View>
      </View>
    );
  }

  render() {
    const { sheetId } = this.props.navigation.state.params;
    console.warn("DetailPage", sheetId);
    const { getTechnologyProcessList, isShow } = this.props;
    // if(isShow){
    //   LoadingControl.show();
    // }else{
    //   LoadingControl.hide();
    // }
    return (
      <>
        <NavigationBar
          title={'我的派工单'}
          style={{ backgroundColor: '#376CDA' }}
          leftButton={this.renderTabLeftButton()}
        />
        {this.renderDetailView()}

        {/* sheetId用于报工页面成功后去刷新工艺工序列表 */}
        <StepsView {...this.props} getTechnologyProcessList={getTechnologyProcessList} sheetId={sheetId} />
      </>
    );
  }
};

// 请求派工单工艺工序接口
const mapStateToProps = (state) => ({
  processList: state.Worker.processList,
  workerSheetListData: state.Worker.workerSheetListData,
  filterSheetData: state.Worker,
  isRefreshSheetCell: state.Worker.isRefreshSheetCell,//判断派工单是否完成
});

const mapDispatchToProps = (dispatch) => ({
  getTechnologyProcessList(dispatchSheetId) {
    dispatch(getTechnologyProcessList(dispatchSheetId))
  },

  //刷新工人单个派工单列表数据
  refreshWorkerCellSheetListData() {
    dispatch(refreshWorkerCellSheetListData())
  },
  //刷新筛选工人派工单cell
  refreshFilterWorkerSheetCell(sheetListData, topNavName) {
    dispatch(refreshFilterWorkerSheetCell(sheetListData, topNavName))
  },
  getPullUpRefreshDefaultSheetList() {
    dispatch(getPullUpRefreshDefaultSheetList())
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailPage);
