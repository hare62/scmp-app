import React from 'react';
import BaseTopNavigation from './BaseTopNavigation';
import SheetListPage from '../SheetListView/SheetListPage';
import { TabPageEnum } from '../../define';

const TimeNavigationOptions = {
  LastDaysPage: {
    screen: (props) => {
      return <SheetListPage pageIdentify={TabPageEnum.LastDaysPage} />
    },
    navigationOptions: {
      tabBarLabel: '最近三天'
    }
  },
  LastWeekPage: {
    screen: (props) => {
      return <SheetListPage pageIdentify={TabPageEnum.LastWeekPage} />
    },
    navigationOptions: {
      tabBarLabel: '最近一周'
    }
  },
  LastHalfYearPage: {
    screen: (props) => {
      return <SheetListPage pageIdentify={TabPageEnum.LastHalfYearPage} />
    },
    navigationOptions: {
      tabBarLabel: '最近半年'
    }
  },
}

const TimeNavigation = BaseTopNavigation(TimeNavigationOptions);

export default TimeNavigation;