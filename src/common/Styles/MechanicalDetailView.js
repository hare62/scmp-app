import { StyleSheet } from 'react-native';
import Constants from '../../utils/Constants';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexDirection: 'row',
    paddingTop: 15,
    paddingBottom:15,
    paddingRight:10,
    paddingLeft:10,
    
  },
  innerContainer:{
    alignItems:'flex-start',
    flex:1
  },
  materialsIDText: {
    fontSize: 18,
    color: '#878787',
    flexWrap: 'nowrap'
  },
  materialsNameText: {
    fontSize: 18,
    color: '#878787',
  },
  timeColor:{
    color:Constants.TIME_COLOR
  }
});

export default styles;