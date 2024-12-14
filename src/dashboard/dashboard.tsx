import React, {useCallback, useContext, useEffect, useState} from 'react';
import {RefreshControl, ScrollView, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {GlobalContext} from '../../store/StoreContext';
import {getMessage} from '../config/services';
import LoadingSvg from '../assets/loading';
import {useIsFocused} from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function DashboardPage({navigation}: any) {
  //--- STORE ---///
  const {user, emailList, setEmailList} = useContext(GlobalContext);
  const [refreshing, setRefreshing] = React.useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const isFocused = useIsFocused();

  const requestEmailList = async () => {
    if (user.id !== '' && user.token !== '') {
      setLoading(true);
      const resp = await getMessage(user.id, user.token);
      setEmailList(resp);
      setLoading(false);
    }
  };

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await requestEmailList();
    setRefreshing(false);
  }, []);

  useEffect(() => {
    if (isFocused) {
      requestEmailList();
    }
  }, [isFocused]);

  return (
    <SafeAreaProvider>
      <ScrollView
        contentContainerStyle={styles.body}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <LinearGradient colors={['#078FC5', '#13B6F6']} style={styles.card}>
          <Text style={styles.title}>NEW</Text>
          {loading && <View>{<LoadingSvg width={36} height={36} />}</View>}
          {!loading && <Text style={styles.number}>0</Text>}
        </LinearGradient>
        <LinearGradient colors={['#078FC5', '#13B6F6']} style={styles.card}>
          <Text style={styles.title}>TOTAL</Text>
          {loading && (
            <View style={styles.svg_container}>
              <LoadingSvg width={36} height={36} />
            </View>
          )}
          {!loading && <Text style={styles.number}>{emailList.length}</Text>}
        </LinearGradient>
      </ScrollView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column',
    margin: 10,
    gap: 16,
  },
  card: {
    backgroundColor: 'blue',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    padding: 16,
    width: '100%',
    borderRadius: 8,
    boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
  },
  title: {
    color: 'white',
    fontWeight: '500',
    fontSize: 16,
  },
  svg_container: {},
  number: {
    color: 'white',
    fontWeight: '500',
    fontSize: 32,
  },
});
