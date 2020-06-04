import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import NavigationBar from '../../common/Component/NavigationBar';
import { ListItem } from 'react-native-elements';
import NavigationManager from '../../navigation/NavigationManager';
import { connect } from 'react-redux';
import { getScrapProcessList } from '../../redux/action/qualityInspector/index';

class ScrapProcessPage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { proInspectionId } = this.props.navigation.state.params;
    console.log("proInspectionId",this.props)
    this.props.getScrapProcessList(proInspectionId);
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

  handleItem(i, item) {
    let { navigation } = this.props;
    let { isBatchQualityPage } = this.props.navigation.state.params;
    if (isBatchQualityPage) {
      navigation.navigate('BatchQualityPage', { scrapProcessItem: item })
    } else {
      navigation.navigate('AddMechanicalPage', { scrapProcessItem: item });
    }
  }

  render() {
    const { scrapProcessList } = this.props;
    return (
      <View style={{ marginBottom: 50 }}>
        <NavigationBar
          title={'选择报废工序'}
          style={{ backgroundColor: '#376CDA' }}
          leftButton={this.renderTabLeftButton()}
        />
        <ScrollView>
          <View>
            {scrapProcessList ?
              scrapProcessList.map((item, i) => (
                <ListItem
                  key={i}
                  title={item.technologyName}
                  bottomDivider
                  chevron
                  onPress={() => { this.handleItem(i, item) }}
                />
              )) : null
            }
          </View>
        </ScrollView>
      </View>
    );
  }
}

// 请求报废接口
const mapStateToProps = (state) => ({
  scrapProcessList: state.qualityInspector.scrapProcessList
});

const mapDispatchToProps = (dispatch) => ({
  getScrapProcessList(proInspectionId) {
    dispatch(getScrapProcessList(proInspectionId))
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ScrapProcessPage);