import React from 'react';
import BaseTopNavigation from './BaseTopNavigation';
import SheetListPage from '../SheetListView/SheetListPage';
import { TabPageEnum } from '../../define';

const StatusNavigationOptions = {
  UnreportedPage: {
    screen: (props) => {
      return <SheetListPage pageIdentify={TabPageEnum.UnreportedPage} />
    },
    navigationOptions: {
      tabBarLabel: '未报工'
    }
  },
  CheckingPage: {
    screen: (props) => {
      return <SheetListPage pageIdentify={TabPageEnum.CheckingPage} />
    },
    navigationOptions: {
      tabBarLabel: '质检中'
    }
  },
  FinishedPage: {
    screen: (props) => {
      return <SheetListPage pageIdentify={TabPageEnum.FinishedPage} />
    },
    navigationOptions: {
      tabBarLabel: '已完成'
    }
  },
}

const StatucNavigation = BaseTopNavigation(StatusNavigationOptions);

export default StatucNavigation;