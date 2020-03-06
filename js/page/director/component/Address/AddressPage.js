import React from 'react';
import {
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import NavigationBar from '../../../../common/NavigationBar';
import AntDesign from 'react-native-vector-icons/AntDesign';
import NavigationManager from '../../../../navigation/NavigationManager'

const renderTabLeftButton = () => {
  

  return (
    <TouchableOpacity
      onPress={() => {
        NavigationManager.goBack()
      }}
    >
      <AntDesign
        name={'left'}
        size={18}
        style={{ color: 'white', marginLeft: 10 }}
      />
    </TouchableOpacity>
  );
}

const AddressPage = (props)=>{
  const { navigation } = props;
  NavigationManager.setNavigation(navigation);
  const {data} = props;

  return (
    <View>
      <NavigationBar
          title={'派工单'}
          style={{ backgroundColor: '#376CDA' }}
          leftButton={renderTabLeftButton()}
        />
      <Text>AddressPage</Text>
    </View>
    
  )
} 

export default AddressPage;