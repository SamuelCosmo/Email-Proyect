import React, {useContext, useEffect, useState} from 'react';
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {getAuth} from '../config/services';
import {GlobalContext} from '../../store/StoreContext';
import WaveBackground from './components/wave_background';
import {useIsFocused} from '@react-navigation/native';

export default function LoginPage({navigation}: any) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {setUser} = useContext(GlobalContext);

  const isFocused = useIsFocused();

  const handleLogin = async () => {
    try {
      const resp = await getAuth(username, password);
      if (resp.msg === 'Success') {
        setUser({id: resp.data.id, token: resp.data.jwt});
        navigation.navigate('Home');
      }
    } catch (e) {
      Alert.alert(
        'Invalid Credentials',
        'Please enter correct username and password.',
      );
    }
  };

  useEffect(() => {
    if (isFocused) {
      setUsername('');
      setPassword('');
    }
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <View style={styles.background}>{WaveBackground()}</View>
      <View style={styles.body}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#7c7c7c"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#7c7c7c"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Pressable
          style={({pressed}) => [
            styles.button,
            pressed && styles.buttonPressed,
          ]}
          onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 64,
    padding: 16,
    width: 256,
    boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
    borderRadius: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 8,
    marginBottom: 12,
    color: 'black'
  },
  button: {
    justifyContent: 'center',
    alignContent: 'center',
    paddingVertical: 4,
    paddingHorizontal: 16,
    width: 128,
    backgroundColor: '#089DD9',
    borderRadius: 8,
  },
  buttonPressed: {
    backgroundColor: '#078FC5',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 500,
    color: 'white',
    textAlign: 'center',
  },
});
