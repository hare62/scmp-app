import React from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { fitSize } from '../../../utils/Fit';
import styles from '../../../common/Styles/MechanicalDetailView';

const MechanicalDetailView = (props) => {
  const { item } = props.navigation.state.params;
  const {
    name,
    status,
    step,
    number,
    time } = item;

  return (
    <View style={styles.container}>
      <EvilIcons
        name={'check'}
        size={fitSize(50)}
        style={{color: '#376CDA'}}
      />
      <Text ellipsizeMode="tail" numberOfLines={1} style={styles.materialsIDText}>
        {name}
      </Text>
      <Text ellipsizeMode="tail" numberOfLines={1} style={styles.materialsNameText}>
        零件号:{number}
      </Text>
      <View style={{ flexDirection: 'row' }}>
        <AntDesign
          name={'clockcircleo'}
          size={18}
          style={{ color: '#878787', marginRight: 10 }}
        />
        <Text style={styles.timeColor} >
         {time}
        </Text>
      </View>
    </View>
  );
}

export default MechanicalDetailView;