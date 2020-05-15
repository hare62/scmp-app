import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  RefreshControl
} from 'react-native';
import NavigationManager from '../../../navigation/NavigationManager';
import { processStatusView } from '../../../utils/Common';
import styles from '../../../common/Styles/StepsView';
import Constants from '../../../utils/Constants';

const renderTechnologyProcessList = (props) => {
  let { tecStep,
    technologyName,
    sheetStatusCode,
    sheetId } = props.item;

  return (
    <TouchableOpacity
      onPress={() => {
        NavigationManager.push('JobBooking', { ...props.item, sheetId })
      }}
    >
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={{ fontSize: 20, color: '#A7A7A7' }}>
            step{tecStep}
          </Text>
          <Text style={{ fontSize: 20, color: '#616161' }}>
            {technologyName}
          </Text>
          {processStatusView(sheetStatusCode)}
        </View>
      </View>
    </TouchableOpacity>
  )
}

const onRefreshStepsView = (props) => {
  let {
        getTechnologyProcessList,
        sheetId
      } = props;
  getTechnologyProcessList(sheetId);
}

const StepsView = (props) => {
  let { processList, isLoading } = props;

  return (
    <View>
      <FlatList
        data={processList}
        renderItem={data => renderTechnologyProcessList(data)}
        keyExtractor={item => item.technologyId}
        refreshControl={
          <RefreshControl
            title={'Loading'}
            titleColor={Constants.THEME_COLOR}
            colors={[Constants.THEME_COLOR]}
            refreshing={isLoading}
            onRefresh={() => onRefreshStepsView(props)}
            tintColor={Constants.THEME_COLOR}
          />
        }
      />
    </View>
  )
};

export default StepsView;