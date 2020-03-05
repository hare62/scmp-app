import React from 'react';
import {
  Modal,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FilterButton from './FilterButton';

const FilterCondition = {
  time: {
    btnName: '选择时间',
    iconName: 'clock'
  },
  status: {
    btnName: '选择状态',
    iconName: 'filter'
  },
  member: {
    btnName: '选择人员',
    iconName: 'user'
  }
};

const FilterView = (props) => {
  const { visible,
    onClose,
    onSelectTime,
    onSelectStatus,
    onSelectMember } = props;

  return (
    <Modal
      transparent={true}
      visible={visible}
      onRequestClose={() => onClose()}
    >
      <TouchableOpacity
        style={styles.container}
        onPress={() => onClose()}
      >
        <MaterialIcons
          name={'arrow-drop-up'}
          size={36}
          style={styles.arrow}
        />
        <View style={styles.content}>
          <FilterButton
            {...FilterCondition.time}
            onClick={() => onSelectTime()}
          />
          <FilterButton
            {...FilterCondition.status}
            onClick={() => onSelectStatus()}
          />
          <FilterButton
            {...FilterCondition.member}
            onClick={() => onSelectMember()}
          />
        </View>
      </TouchableOpacity>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0)',
    flex: 1,
    alignItems: 'flex-end',
  },
  arrow: {
    marginTop: 40,
    color: 'black',
    padding: 0,
    margin: -15,
    marginRight: 25,
  },
  content: {
    backgroundColor: 'black',
    borderRadius: 3,
    paddingTop: 3,
    paddingBottom: 3,
    marginRight: 3,
    alignItems: 'center',
  }
});

export default FilterView;