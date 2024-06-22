import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function SettingsScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userId, setUserId] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    // Fetch user data
    const fetchUserData = async () => {
      const userToken = await AsyncStorage.getItem('userToken');
      // Simulacion con datos ficticios
      const user = {
        _id: '123456', // Reemplaza esto con la ID del usuario obtenida del backend
        email: '',
        password: ''
      };
      setUserId(user._id);
      setEmail(user.email);
      setPassword(user.password);
    };
    fetchUserData();
  }, []);

  const updateUser = async () => {
    try {
      await axios.put(`http://localhost:5000/users/${userId}`, { email, password });
      alert('Cuenta actualizada correctamente');
    } catch (error) {
      console.error(error);
      alert('Error al actualizar la cuenta');
    }
  };

  const deleteUser = async () => {
    try {
      await axios.delete(`http://localhost:5000/users/${userId}`);
      await AsyncStorage.removeItem('userToken');
      alert('Cuenta eliminada correctamente');
      navigation.navigate('Login');
    } catch (error) {
      console.error(error);
      alert('Error al eliminar la cuenta');
    }
  };

  return (
    <ImageBackground
      source={require('../assets/images/obesity_prevention.jpg')}
      style={styles.background}
    >
      <View style={styles.container}>
        <TextInput
          label="Correo electrónico"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          style={styles.input}
        />
        <TextInput
          label="Contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />
        <Button mode="contained" onPress={updateUser} style={styles.button}>
          Actualizar Cuenta
        </Button>
        <Button mode="contained" onPress={deleteUser} style={styles.deleteButton}>
          Eliminar Cuenta
        </Button>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
  },
  deleteButton: {
    marginTop: 16,
    backgroundColor: 'red',
  },
});
