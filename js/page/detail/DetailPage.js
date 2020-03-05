import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import SheetDetailView from './component/SheetDetailView';
import StepsView from './component/StepsView';
import NavigationBar from '../../common/NavigationBar';
import AntDesign from 'react-native-vector-icons/AntDesign';
import NavigationManager from '../../navigation/NavigationManager';

class DetailPage extends Component {
  constructor(props) {
    super(props);

    const { navigation } = this.props;
    NavigationManager.setNavigation(navigation);
  }

  renderTabLeftButton() {
    return (
      <TouchableOpacity
        onPress={() => {
          NavigationManager.goBack()
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
        <StepsView />
      </>
    );
  }
};

export default DetailPage;