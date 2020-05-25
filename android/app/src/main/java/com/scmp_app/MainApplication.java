package com.scmp_app;
//expo
// "com.doingmything" should be your app package name
import com.scmp_app.generated.BasePackageList;

import android.app.Application;
//expo
import org.unimodules.adapters.react.ModuleRegistryAdapter;
import org.unimodules.adapters.react.ReactModuleRegistryProvider;
import org.unimodules.core.interfaces.SingletonModule;
//expo
import android.content.Context;
import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import ui.fileselector.RNFileSelectorPackage;
import com.rnfs.RNFSPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;
//expo
import java.util.Arrays;

import com.tencent.bugly.crashreport.CrashReport;
import java.lang.reflect.InvocationTargetException;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {
        //expo
     private final ReactModuleRegistryProvider mModuleRegistryProvider = new ReactModuleRegistryProvider(new BasePackageList().getPackageList(), null);

  private final ReactNativeHost mReactNativeHost =
      new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
          return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
          @SuppressWarnings("UnnecessaryLocalVariable")
          List<ReactPackage> packages = new PackageList(this).getPackages();
          // Packages that cannot be autolinked yet can be added manually here, for example:
          // packages.add(new MyReactNativePackage());
//          packages.add(new RN)
//           packages.add(new MainReactPackage(),
            new RNFileSelectorPackage();

//                    new RNFSPackage() // <---------- add package

       // Packages that cannot be autolinked yet can be added manually here, for example:
      // packages.add(new MyReactNativePackage());

      // Add unimodules
      List<ReactPackage> unimodules = Arrays.<ReactPackage>asList(
        new ModuleRegistryAdapter(mModuleRegistryProvider)
      );
      packages.addAll(unimodules);


          return packages;
        }

        @Override
        protected String getJSMainModuleName() {
          return "index";
        }
      };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    initializeFlipper(this); // Remove this line if you don't want Flipper enabled
    CrashReport.initCrashReport(getApplicationContext(), "096405133a", false);
  }

  /**
   * Loads Flipper in React Native templates.
   *
   * @param context
   */
  private static void initializeFlipper(Context context) {
    if (BuildConfig.DEBUG) {
      try {
        /*
         We use reflection here to pick up the class that initializes Flipper,
        since Flipper library is not available in release mode
        */
        Class<?> aClass = Class.forName("com.facebook.flipper.ReactNativeFlipper");
        aClass.getMethod("initializeFlipper", Context.class).invoke(null, context);
      } catch (ClassNotFoundException e) {
        e.printStackTrace();
      } catch (NoSuchMethodException e) {
        e.printStackTrace();
      } catch (IllegalAccessException e) {
        e.printStackTrace();
      } catch (InvocationTargetException e) {
        e.printStackTrace();
      }
    }
  }
}
