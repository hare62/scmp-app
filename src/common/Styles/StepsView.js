import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    height: 100,
    flexDirection: 'row',
    justifyContent: 'center',
    borderBottomColor: '#F4F4F4',
    borderBottomWidth: 2
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: "center"
  },
});

export default styles;