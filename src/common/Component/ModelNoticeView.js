import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  ProgressBarAndroid
} from 'react-native';
import Constants from '../../utils/Constants'

const ModelNoticeView = (props) => {
  const { visible,
          notice,
        } = props;

  return (
    <Modal
      transparent={true}
      visible={visible}
      onRequestClose={() => {}}
    >
      <View
        style={styles.container}
      >
        <View style={styles.content}>
        <ProgressBarAndroid styleAttr='Inverse' color={Constants.THEME_COLOR} />
          <View style={styles.notice}><Text >{notice}</Text></View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  content: {
    backgroundColor: 'white',
    paddingTop: 20,
    width: 200,
    borderRadius: 5
  },
  notice: {
    alignItems: 'center',
    paddingBottom: 20,
    justifyContent: 'center',
    width: 200,
    paddingLeft: 20,
    paddingRight: 20
  },
});

export default ModelNoticeView;