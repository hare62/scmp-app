class NavigationManager {
  static setNavigation(navigation) {
    NavigationManager.navigation = navigation;
  }

  static goPage(page, params) {
    const { navigation } = NavigationManager;
    if (!navigation) {
      console.error(`NavigationManager - goPage: navigation can not be null, target page is ${page}`);
      return;
    }

    navigation.navigate(
      page,
      {
        ...params,
      },
    );
  }

  static push(page, params) {
    const { navigation } = NavigationManager;
    if (!navigation) {
      console.error(`NavigationManager - push: navigation can not be null, target page is ${page}`);
      return;
    }

    navigation.push(
      page,
      {
        ...params,
      },
    );
  }

  static pop() {
    const { navigation } = NavigationManager;
    navigation.pop();
  }

  static goBack() {
    NavigationManager.navigation.goBack();
  }
};

export default NavigationManager;