import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ImageBackground
} from 'react-native';
import { deviceWidthDp, deviceHeightDp } from '../../utils/Fit';
import images from '../../assets/image.js';

class WelcomePage extends Component {
  componentDidMount() {
    this.timer = setTimeout(async() => {
      const { navigation } = this.props;
      navigation.navigate('LoginPage');
    }, 2000);
  }
  UNSAFE_componentWillMount() {
    this.timer && clearTimeout(this.timer);
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground style={[styles.img]} source={images.welcome} resizeMode ='stretch'/>
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
