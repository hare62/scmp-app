import React from 'react';
import {
  FlatList,
  View,
  RefreshControl
} from 'react-native';
import SheetItem from './SheetItem';

const THEME_COLOR = '#AA2F23';

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
            titleColor={THEME_COLOR}
            colors={[THEME_COLOR]}
            refreshing={false}
            onRefresh={() => { }}
            tintColor={THEME_COLOR}
          />
        }
      />
    </View>
  );
};

export default SheetListView;
