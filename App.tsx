import React, {useContext} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator, DrawerItemList} from '@react-navigation/drawer';
import LoginPage from './src/login/login';
import DashboardPage from './src/dashboard/dashboard';
import EmailPage from './src/email/email';
import {GlobalContext, GlobalProvider} from './store/StoreContext';

// const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

export default function App(): React.JSX.Element {
  return (
    <GlobalProvider>
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="Login"
          screenOptions={{headerShown: false}}>
          <Drawer.Screen
            name="Login"
            component={LoginPage}
            options={{
              title: 'Login',
              headerShown: false,
              drawerStyle: {display: 'none'},
            }}
          />
          <Drawer.Screen
            name="Home"
            component={SecondNavigation}
            options={{
              title: 'Home',
              headerShown: false,
              drawerStyle: {display: 'none'},
            }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </GlobalProvider>
  );
}

function SecondNavigation(): React.JSX.Element {
  return (
    <Drawer.Navigator
      initialRouteName="Dashboard"
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerStyle: {
          backgroundColor: '#078FC5',
        },
        headerTitleAlign: 'left',
        headerTintColor: '#fff',
        drawerActiveBackgroundColor: '#078FC5',
        drawerActiveTintColor: 'white',
        drawerStyle: {
          backgroundColor: '#f2f2f2',
          padding: 10,
        },
      }}>
      <Drawer.Screen
        name="Dashboard"
        component={DashboardPage}
        options={{title: 'Dashboard'}}
      />
      <Drawer.Screen
        name="Mail"
        component={EmailPage}
        options={{title: 'Mail'}}
      />
    </Drawer.Navigator>
  );
}

function CustomDrawerContent(propsDrawer: any) {
  const {setUser, setEmailList} = useContext(GlobalContext);

  const handleSignOut = () => {
    propsDrawer.navigation.navigate('Login'); // Navigate to "Login" screen
    propsDrawer.navigation.closeDrawer(); // Close the drawer
    setUser({id: '', token: ''});
    setEmailList([]);
  };

  return (
    <View style={{flex: 1}}>
      <DrawerItemList {...propsDrawer} />
      <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  signOutButton: {
    marginTop: 'auto',
    padding: 15,
    backgroundColor: '#FF3B30',
    alignItems: 'center',
    borderRadius: 50,
  },
  signOutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
