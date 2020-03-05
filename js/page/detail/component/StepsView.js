import React from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

const StepsView = (props) => {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.stepContainer}>
            <Text style={{fontSize: 20, color: '#A7A7A7'}}>
              step 1
            </Text>
            <Text style={{fontSize: 20, color: '#616161'}}>
              粗加工
            </Text>
          </View>
          <EvilIcons
            name={'check'}
            size={50}
            style={{ color: '#376CDA', marginTop: 30 }}
          />
        </View>
      </View>

      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.stepContainer}>
            <Text style={{fontSize: 20, color: '#A7A7A7'}}>
              step 2
            </Text>
            <Text style={{fontSize: 20, color: '#616161'}}>
              粗加工
            </Text>
          </View>
          <EvilIcons
            name={'check'}
            size={50}
            style={{ color: '#376CDA', marginTop: 30 }}
          />
        </View>
      </View>

      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.stepContainer}>
            <Text style={{fontSize: 20, color: '#A7A7A7'}}>
              step 3
            </Text>
            <Text style={{fontSize: 20, color: '#616161'}}>
              粗加工
            </Text>
          </View>
          <EvilIcons
            name={'check'}
            size={50}
            style={{ color: '#376CDA', marginTop: 30 }}
          />
        </View>
      </View>
    </>
  )
};  

const styles = StyleSheet.create({
  container: {
    height: 100,
    flexDirection: 'row',
    justifyContent: 'center',
    borderTopColor: '#F4F4F4',
    borderTopWidth: 2
  },
  content: {
    width: 420,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  stepContainer: {
    width: 230,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  }
});

export default StepsView;