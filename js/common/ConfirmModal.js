import React from 'react';
import {
  Modal,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
} from 'react-native';

const ConfirmModal = (props) => {
  const { visible,
          onClose,
          notice,
          callbackConfirm
        } = props;

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
        <View style={styles.content}>
          <View style={styles.notice}><Text >{notice}</Text></View>
          <TouchableOpacity 
             style={styles.confirm}
             onPress={()=> callbackConfirm()}
          >
            <Text>确定</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
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
    paddingBottom:20,
    justifyContent:'center',
    width:200,
    paddingLeft:20,
    paddingRight:20
  },
  confirm: {
    borderTopWidth: 1,
    alignItems: 'center',
    paddingTop: 10,
    borderColor:'#ccc',
    paddingBottom:10,
    paddingLeft:20,
    paddingRight:20
  },
});

export default ConfirmModal;