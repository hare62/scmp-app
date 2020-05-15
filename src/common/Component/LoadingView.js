import React, { Component } from 'react';
import {
  Modal,
  ProgressBarAndroid,
  StyleSheet,
  View
} from 'react-native';

let instances;

export class LoadingControl {
  static show() {
    instances.setState(() => ({
      isShow: true
    }))
  }

  static hide() {
    instances.setState(() => ({
      isShow: false
    }))
  }
}

export class LoadingView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShow: false
    }
    instances = this;
  }

  render() {
    return (
      <Modal
        transparent={true}
        visible={this.state.isShow}
        onRequestClose={() => {}}
      >
        <View style={styles.loadingBox}>
          <ProgressBarAndroid styleAttr='Inverse' color='#FF4500' />
        </View>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  loadingBox: { 
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
})
