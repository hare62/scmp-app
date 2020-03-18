import React from 'react';
import {
  Modal,
  ProgressBarAndroid,
  StyleSheet,
  View
} from 'react-native';



const Loading = (props) => {
  const {
          onClose
        } = props;

  return (
    <Modal
      transparent={true}
      visible={true}
      onRequestClose={() => onClose()}
    >
      <View style={styles.loadingBox}>
        <ProgressBarAndroid styleAttr='Inverse' color='#FF4500' />
      </View>
    </Modal>)
}

const styles = StyleSheet.create({
  loadingBox: { // Loading居中
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
})

export default Loading;