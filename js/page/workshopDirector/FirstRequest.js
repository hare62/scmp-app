import React, { Component } from 'react';
import {View} from 'react-native'
import WorkerDispatchList from '../../common/WorkerDispatchList'
// import console = require('console');
class FirstRequestData extends Component {

 constructor(props){
     super(props);
     console.log('--------props',this.props)
 }

    render() {

       
        return (
            <View>
                {/* <WorkerDispatchList   {...this.props} /> */}
               
            </View>

        )
    }

}

export default FirstRequestData;