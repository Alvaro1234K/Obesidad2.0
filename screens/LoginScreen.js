import React, { useState } from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import mongoose from 'mongoose'; // Importa mongoose

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setError('');

    // Verificar si el usuario existe en la base de datos
    try {
      const user = await mongoose.model('User').findOne({ email, password }).exec();
      if (!user) {
        setError('Usuario o contraseña incorrectos.');
        return;
      }

      // Usuario encontrado, guardar en AsyncStorage y navegar a la pantalla Home
      await AsyncStorage.setItem('userToken', user._id.toString());
      navigation.navigate('Home');
    } catch (err) {
      console.error('Error al buscar usuario:', err);
      setError('Error al iniciar sesión.');
    }
  };

  return (
    <ImageBackground
      source={require('../assets/images/keto_diet.jpg')}
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
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <Button mode="contained" onPress={handleLogin} style={styles.button}>
          Iniciar Sesión
        </Button>
        <Button mode="text" onPress={() => navigation.navigate('Register')} style={styles.registerButton}>
          Registrarse
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
    borderRadius: 25,
  },
  registerButton: {
    marginTop: 16,
  },
  errorText: {
    color: 'red',
    marginBottom: 16,
  },
});
