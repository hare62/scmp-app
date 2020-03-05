import React, { Component } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet
}
  from 'react-native';
import NavigationManager from '../../navigation/NavigationManager';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    NavigationManager.setNavigation(navigation);
  }

  gotoWorkerPage() {
    NavigationManager.goPage('WorkerPage')
  }

  gotoDirectorPage() {
    NavigationManager.goPage('DirectorPage')
  }

  render() {
    return (
      <View style={styles.containt}>
        <Text>LoginPage</Text>
        <Button
          title={"跳转到工人页面"}
          //  onPress={this.gotoWorkerPage()} 区别是什么
          onPress={() => this.gotoWorkerPage()}
        ></Button>
        <Button
          style={{marginTop: 50,flex:1,}}
          title={"跳转到车间主任页面"}
        onPress={() => this.gotoDirectorPage()}
        ></Button>
      </View >
    )
  }
}

const styles = StyleSheet.create({
  containt: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  }
})

export default LoginPage;