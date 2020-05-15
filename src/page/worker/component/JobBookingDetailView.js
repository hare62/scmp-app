import React from 'react';
import {
  View,
  Text,
} from 'react-native';
import styles from '../../../common/Styles/MechanicalDetailView';
import { processStatusView } from '../../../utils/Common';

const JobBookingDetailView = (props) => {
  const { technologyName,
          tecStep,
          equipmentName,
          sheetStatusCode,
          completeQty,
          matQty } = props.navigation.state.params;
  return (
    <View style={styles.container}>
      {processStatusView(sheetStatusCode)}
      <View style={styles.innerContainer}>
      <Text ellipsizeMode="tail" numberOfLines={1} style={styles.materialsIDText}>
          工艺工序名称:{technologyName}
        </Text>
        <Text ellipsizeMode="tail" numberOfLines={1} style={styles.materialsIDText}>
          步骤:{tecStep}
        </Text>
        <Text ellipsizeMode="tail" numberOfLines={1} style={styles.materialsNameText}>
          设备名称:{equipmentName}
        </Text>
        <Text ellipsizeMode="tail" numberOfLines={1} style={styles.materialsNameText}>
          物料数量:{matQty}
        </Text>
        <Text ellipsizeMode="tail" numberOfLines={1} style={styles.materialsNameText}>
          实际完成数:{completeQty}
        </Text>
      </View>
    </View>
  );
}

export default JobBookingDetailView;