import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ImageBackground
} from 'react-native';
import { deviceWidthDp, deviceHeightDp } from '../../utils/Fit';
import images from '../../assert/image.js';

class WelcomePage extends Component {
  componentDidMount() {
    this.timer = setTimeout(() => {
      const { navigation } = this.props;
      // navigation.navigate('LoginPage');
      navigation.navigate('QualityInspectorPage');
    }, 2000);
  }

  UNSAFE_componentWillMount() {
    this.timer && clearTimeout(this.timer);
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground style={[styles.img]} source={images.welcome}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img:{
    height:deviceHeightDp,
    width:deviceWidthDp,
  }
});

export default WelcomePage;