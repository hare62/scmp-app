import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

const FilterButton = (props) => {
  const { iconName, btnName, onClick } = props;

  return (
    <TouchableOpacity
      onPress={() => onClick()}
      underlayColor='transparent'
    >
      <View style={styles.text_container}>
        <Feather
          name={iconName}
          size={18}
          style={{ color: 'white', }}
        />
        <Text
          style={styles.text}
        >
        {btnName}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text_container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingLeft: 20,
    paddingRight: 20
  },
  text: {
      fontSize: 16,
      color: 'white',
      fontWeight: '400',
      padding: 8,
  }
});

export default FilterButton;