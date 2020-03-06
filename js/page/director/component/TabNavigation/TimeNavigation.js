import React from 'react';
import BaseTopNavigation from './BaseTopNavigation';
import SheetListView from '../SheetListView/SheetListView';
import { TabPageEnum } from '../../define';

const TimeNavigationOptions = {
  LastDaysPage: {
    screen: (props) => {
      return <SheetListView pageIdentify={TabPageEnum.LastDaysPage} />
    },
    navigationOptions: {
      tabBarLabel: '最近三天'
    }
  },
  LastWeekPage: {
    screen: (props) => {
      return <SheetListView pageIdentify={TabPageEnum.LastWeekPage} />
    },
    navigationOptions: {
      tabBarLabel: '最近一周'
    }
  },
  LastHalfYearPage: {
    screen: (props) => {
      return <SheetListView pageIdentify={TabPageEnum.LastHalfYearPage} />
    },
    navigationOptions: {
      tabBarLabel: '最近半年'
    }
  },
}

const TimeNavigation = BaseTopNavigation(TimeNavigationOptions);

export default TimeNavigation;