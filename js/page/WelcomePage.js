import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

class WelcomePage extends Component {
  componentDidMount() {
    this.timer = setTimeout(() => {
      const { navigation } = this.props;
      navigation.navigate('DirectorPage');
    }, 300);
  }

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>
          WelcomePage
        </Text>
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
});

export default WelcomePage;