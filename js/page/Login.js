import React, {Component} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import actions from '../action';
import {connect} from 'react-redux';

class MyPage extends Component {
   gotoWorkerPage(){
    const {navigation} = this.props;
    console.log(this.props)
    navigation.navigate('Worker');
   }

    render() {
        const {navigation} = this.props;
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>LoginPage</Text>
                <Button
                    title={'登录页面0'}
                    onPress={() => this.gotoWorkerPage()}
                />
            </View>
        );
    }

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
});
const mapDispatchToProps = dispatch => ({
    onThemeChange: theme => dispatch(actions.onThemeChange(theme)),
});
export default connect(null, mapDispatchToProps)(MyPage);
