class NavigationManager {
  static setNavigation(navigation) {
    NavigationManager.navigation = navigation;
  }

  static goPage(page, params) {
    const { navigation } = NavigationManager;
    if (!navigation) {
      console.log(`NavigationManager - goPage: navigation can not be null, target page is ${page}`);
      return;
    }

    navigation.navigate(
      page,
      {
        ...params,
      },
    );
  }

  static goBack() {
    NavigationManager.navigation.goBack();
  }
};

export default NavigationManager;