import React from 'react';
import {
  FlatList,
  View,
  RefreshControl
} from 'react-native';
import SheetItem from './SheetItem';
import Constants from '../../utils/Constants';

const SheetListView = (props) => {
  const { data } = props;

  return (
    <View>
      <FlatList
        data={data}
        renderItem={data => <SheetItem {...data} />}
        keyExtractor={item => item.id}
        refreshControl={
          <RefreshControl
            title={'Loading'}
            titleColor={Constants.THEME_COLOR}
            colors={[Constants.THEME_COLOR]}
            refreshing={false}
            onRefresh={() => { }}
            tintColor={Constants.THEME_COLOR}
          />
        }
      />
    </View>
  );
};

export default SheetListView;
