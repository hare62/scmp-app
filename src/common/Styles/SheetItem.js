import { StyleSheet } from 'react-native';
import Constants from '../../utils/Constants'

const styles = StyleSheet.create({
  cell_container: {
    paddingLeft: 5,
    paddingTop: 20,
    flexDirection: 'row',
  },
  container_left: {
    // height: 80,
    flex:2,
    marginRight: 10,
    borderRadius: 50,
    lineHeight: 80,
  },
  container_right: {
    color: 'white',
    // height: 80,
    flex: 10,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1
  },
  container_right_title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 30
  },
  container_right_contain: {
    flexDirection: 'row',
  },
  container_right_contain_item:{
    paddingTop:5,
    paddingBottom:5
  },
  container_right_title_order: {
    color: 'black',
    marginBottom: 10,
    fontSize: 17,
    flex:8
  },
  container_right_title_materials: {
    color: '#666',
    marginBottom: 10,
    marginLeft:10,
    flex:2
  },
  container_right_date: {
    color: "#aaa",
    justifyContent: 'flex-end',
  },
  container_right_text: {
    paddingLeft: 10,
    color: '#aaa'
  },
  nomessage_container:{
    justifyContent:'center',
    alignItems:'center',
    height:100,
  },
  nomessage_container_text:{
   color:Constants.DESCRIBE
  },
  indicatorContainer:{
    justifyContent:'center',
    alignItems:'center'
  }
});
export default styles;