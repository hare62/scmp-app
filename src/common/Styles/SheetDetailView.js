import { StyleSheet } from 'react-native';
import Constants from '../../utils/Constants';
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8F8F8'
  },
  containTop: {
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
  },
  containLeft: {
    color: Constants.THEME_COLOR,
    flex: 2
  },
  containRight: {
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 8,
    paddingRight:20
  },
  containBottom: {
    height: 60,
    borderTopColor: '#F2F3F4',
    borderTopWidth: 2,
    borderBottomColor: '#E7EAEF',
    borderBottomWidth: 2,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  materialsIDText: {
    fontSize: 25,
    color: '#828282',
    flexWrap: 'nowrap'
  },
  materialsNameText: {
    fontSize: 18,
    color: '#878787',
    paddingTop: 5
  },
  timeView: {
    flexDirection: 'row',
    paddingTop: 10
  },
  timeText: {
    marginLeft: 10,
    color: '#aaa'
  },
  materialsCountText: {
    fontSize: 18,
    color: '#676767'
  }
});

export default styles;
