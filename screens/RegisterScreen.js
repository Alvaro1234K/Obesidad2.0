import React, { useState } from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleRegister = async () => {
    setError('');
    if (!email || !password || !confirmPassword) {
      setError('Por favor complete todos los campos.');
      return;
    }
    if (!validateEmail(email)) {
      setError('Por favor ingrese un correo electrónico válido.');
      return;
    }
    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    // Simulacion de registro exitoso
    try {
      // Guardar datos de registro (si es necesario)
      await AsyncStorage.setItem('userToken', 'abc123');
      navigation.navigate('Home');
    } catch (e) {
      setError('Error al guardar los datos de registro.');
    }
  };

  return (
    <ImageBackground
      source={require('../assets/images/dash_diet.jpg')}
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
        <TextInput
          label="Confirmar Contraseña"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          style={styles.input}
        />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <Button mode="contained" onPress={handleRegister} style={styles.button}>
          Registrarse
        </Button>
        <Button mode="text" onPress={() => navigation.navigate('Login')} style={styles.loginButton}>
          Iniciar Sesión
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
  loginButton: {
    marginTop: 16,
  },
  errorText: {
    color: 'red',
    marginBottom: 16,
  },
});