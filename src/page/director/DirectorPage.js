import React, { Component } from 'react';
import { 
	View, 
	TouchableOpacity 
} from 'react-native';
import NavigationManager from '../../navigation/NavigationManager';
import NavigationBar from '../../common/Component/NavigationBar';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FilterView from './component/FilterView/FilterView';
import { fitSize } from '../../utils/Fit';
import TimeNavigation from './component/TabNavigation/TimeNavigation';
import StatusNavigation from './component/TabNavigation/StatusNavigation';
import SheetListView from './component/SheetListView/SheetListView';
import { 
	changeLoginStatus as changeLoginStatusAtion,
} from '../../redux/action/login/index';
import { resetAllSheetListData } from '../../redux/action/director';
import { LoginStatusEnum } from '../login/Constants';
import { connect } from 'react-redux';
import { TabPageEnum } from './define';

/**
 * 过滤条件
 */
const FilterEnum = {
  default: Symbol(),
  time: Symbol(),
  status: Symbol(),
  member: Symbol()
};

class DirectorPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showFilterView: false,
			filterCondition: FilterEnum.default
		};

		const { navigation } = this.props;
		NavigationManager.setNavigation(navigation);

		this.onSelectTime = this.onSelectTime.bind(this);
		this.onSelectStatus = this.onSelectStatus.bind(this);
		this.onSelectMember = this.onSelectMember.bind(this);
		this.resetAllSheetListDatas = this.resetAllSheetListDatas.bind(this);
	}

	componentWillUnmount(){
    const { changeLoginStatus } =this.props;
		changeLoginStatus(LoginStatusEnum.Unlogin);
		this.resetAllSheetListDatas();
  }

	renderTabRightButton() {
		return (
			<View style={{ flexDirection: 'row' }}>
				<TouchableOpacity
					onPress={() => this.onShowFilterView()}
				>
					<AntDesign
						name={'filter'}
						size={fitSize(20)}
						style={{ color: 'white', marginRight: fitSize(20) }}
					/>
				</TouchableOpacity>
			</View>
		);
	}

	resetAllSheetListDatas() {
		let { resetSheetListData } = this.props;
		resetSheetListData();
	}

	async onShowFilterView() {
		await this.setState(() => ({
			showFilterView: true
		}));
	}

	async	onCloseFilterView() {
		await this.setState(() => ({
			showFilterView: false
		}));
	}

	async onSelectTime() {
		this.resetAllSheetListDatas();
		await this.setState(() => ({
			filterCondition: FilterEnum.time,
			showFilterView: false
		}));
	}

	async onSelectStatus() {
		this.resetAllSheetListDatas();
		await this.setState(() => ({
			filterCondition: FilterEnum.status,
			showFilterView: false
		}));
	}

	async onSelectMember() {
		await this.setState(() => ({
			// filterCondition: FilterEnum.member,
			showFilterView: false
		}));

		NavigationManager.push('AddressPage');
	}

	renderTopNavigation() {
		const { filterCondition } = this.state; 

		switch(filterCondition) {
			case FilterEnum.default: 
				return <SheetListView  pageIdentify={TabPageEnum.DefinePage} />;
			case FilterEnum.time:
				return <TimeNavigation />
			case FilterEnum.status:
				return <StatusNavigation />
			case FilterEnum.member:
				return null;
			default:
				console.error("DirectorPage - getTopNavigation: filterCondition error");
				return null;
		}
	}

	render() {
		const { showFilterView } = this.state;
		
		return (
			<View style={{flex: 1}}>
				<NavigationBar
					title={'我的派工单'}
					style={{ backgroundColor: '#376CDA' }}
					rightButton={this.renderTabRightButton()}
				/>
				<FilterView
					visible={showFilterView}
					onClose={() => this.onCloseFilterView()}
					onSelectTime={this.onSelectTime}
					onSelectStatus={this.onSelectStatus}
					onSelectMember={this.onSelectMember}
				/>
				{
					this.renderTopNavigation()
				}
			</View>
		);
	}
}

const mapDispatch = (dispatch) => ({
	changeLoginStatus(loginStatus) {
		dispatch(changeLoginStatusAtion(loginStatus));
	},
	resetSheetListData() {
		dispatch(resetAllSheetListData())
	}
});

export default connect(null, mapDispatch)(DirectorPage);