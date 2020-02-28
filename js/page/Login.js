import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import actions from '../action';
import { connect } from 'react-redux';

class MyPage extends Component {
    gotoWorkerPage() {
        const { navigation } = this.props;
        console.log(this.props)
        navigation.navigate('Worker');
    }

    gotoWorkshopDirector() {
        const { navigation } = this.props;
        console.log(this.props)
        navigation.navigate('WorkshopDirector');
    }
    render() {
        const { navigation } = this.props;
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>LoginPage</Text>
                <Button
                    style={styles.contain}
                    title={'跳转到工人派工单'}
                    onPress={() => this.gotoWorkerPage()}
                />
                <Button
                    style={styles.button2}
                    title={'跳转到车间主任'}
                    onPress={() => this.gotoWorkshopDirector()}
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
        marginBottom:20
    },

    contain: {
        padding: 20,
        backgroundColor:'red',
        marginBottom:20
    },
    button2:{
        marginTop:20
    }
});
const mapDispatchToProps = dispatch => ({
    onThemeChange: theme => dispatch(actions.onThemeChange(theme)),
});
export default connect(null, mapDispatchToProps)(MyPage);
