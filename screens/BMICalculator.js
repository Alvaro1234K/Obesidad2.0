import React, { useState } from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const BMICalculator = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [bmiResult, setBmiResult] = useState('');
  const navigation = useNavigation();

  const calculateBMI = () => {
    const heightInMeters = height / 100;
    const bmiValue = weight / (heightInMeters * heightInMeters);
    setBmi(bmiValue.toFixed(2));

    if (bmiValue < 18.5) {
      setBmiResult('Bajo peso');
    } else if (bmiValue >= 18.5 && bmiValue < 24.9) {
      setBmiResult('Peso normal');
    } else if (bmiValue >= 25 && bmiValue < 29.9) {
      setBmiResult('Sobrepeso');
    } else {
      setBmiResult('Obesidad');
    }
  };

  const getDietRecommendation = (bmiResult) => {
    switch (bmiResult) {
      case 'Bajo peso':
        return 'Recomendaciones para bajo peso...';
      case 'Peso normal':
        return 'Recomendaciones para peso normal...';
      case 'Sobrepeso':
        return 'Recomendaciones para sobrepeso...';
      case 'Obesidad':
        return 'Recomendaciones para obesidad...';
      default:
        return 'No se encontraron recomendaciones.';
    }
  };

  return (
    <ImageBackground
      source={require('../assets/images/vegan_diet.jpg')}
      style={styles.background}
    >
      <View style={styles.container}>
        <TextInput
          label="Peso (kg)"
          value={weight}
          onChangeText={setWeight}
          keyboardType="numeric"
          style={styles.input}
        />
        <TextInput
          label="Altura (cm)"
          value={height}
          onChangeText={setHeight}
          keyboardType="numeric"
          style={styles.input}
        />
        <Button mode="contained" onPress={calculateBMI} style={styles.button}>
          Calcular IMC
        </Button>
        {bmi && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultText}>Tu IMC es: {bmi}</Text>
            <Text style={styles.resultText}>Clasificación: {bmiResult}</Text>
            <Text style={styles.recommendation}>{getDietRecommendation(bmiResult)}</Text>
          </View>
        )}
      </View>
    </ImageBackground>
  );
};

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
  resultContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  resultText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  recommendation: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default BMICalculator;
