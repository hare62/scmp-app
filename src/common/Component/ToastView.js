import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';


const ToastView =(props) => {
  let { contant } = props;
  return (
    <View style={styles.container}>
      <Text>hello word </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex:999
  },
})

export default ToastView;
