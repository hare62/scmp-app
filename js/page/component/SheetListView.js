import React from 'react';
import {
  FlatList,
  View,
  RefreshControl
} from 'react-native';
import SheetItem from '../qualityInspector/component/SheetItem';
import Constants from '../../utils/Constants';

const SheetListView = (props) => {
  const { sheetListData, renderSheetItem } = props;

  return (
    <View>
      <FlatList
        data={sheetListData}
        renderItem={data => renderSheetItem(data)}
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

SheetListView.defaultProps = {
  renderSheetItem: (data) => {
    return <SheetItem {...data} />
  }
}

export default SheetListView;
