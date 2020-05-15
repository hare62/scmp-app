import React from 'react';
import {
  View,
  Text,
} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styles from '../../../common/Styles/SheetDetailView';
import { fitSize } from '../../../utils/Fit';

const SheetDetailView = (props) => {
  const { time,
          materialsID,
          materialsName,
          materialsNum,
          matQty } = props.navigation.state.params;

  return (
    <View style={styles.container}>
        <View style={styles.containTop}>
          <EvilIcons
            name={'check'}
            size={fitSize(70)}
            style={styles.containLeft}
          />
          <View style={styles.containRight}>
            <Text ellipsizeMode="tail" numberOfLines={1} style={styles.materialsIDText}>
              {materialsID}
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
                {time}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.containBottom}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.materialsCountText}>
              物料数量
              </Text>
            <Text style={{ fontSize: 18, color: '#676767', marginLeft: 5 }}>
              {materialsNum}
            </Text>
          </View>
        </View>
      </View>
  );
};

export default SheetDetailView;