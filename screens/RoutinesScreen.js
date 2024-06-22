import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, ImageBackground } from 'react-native';
import { Button, IconButton, Colors, TextInput } from 'react-native-paper';

const RoutinesScreen = ({ routines, addRoutine, deleteRoutine, updateRoutine }) => {
  const [newRoutineTitle, setNewRoutineTitle] = useState('');
  const [newRoutineDescription, setNewRoutineDescription] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  // Componente de renderizado de cada elemento de la lista de rutinas
  const renderRoutineItem = ({ item }) => (
    <View style={styles.routineItem}>
      <Text style={styles.title}>{item.title}</Text>
      <Text>{item.description}</Text>
      <View style={styles.buttonContainer}>
        <IconButton
          icon="delete"
          color={Colors.red500}
          onPress={() => deleteRoutine(item._id)}
        />
        <IconButton
          icon="pencil"
          color={Colors.blue500}
          onPress={() => {
            const updatedRoutine = { ...item, description: 'Nueva descripción' };
            updateRoutine(item._id, updatedRoutine);
          }}
        />
      </View>
    </View>
  );

  return (
    <ImageBackground
      source={require('../assets/images/dash_diet.jpg')}
      style={styles.background}
    >
      <View style={styles.container}>
        {showAddForm ? (
          <View>
            <TextInput
              label="Título"
              value={newRoutineTitle}
              onChangeText={setNewRoutineTitle}
              style={styles.input}
            />
            <TextInput
              label="Descripción"
              value={newRoutineDescription}
              onChangeText={setNewRoutineDescription}
              style={styles.input}
            />
            <Button mode="contained" onPress={addRoutine} style={styles.button}>
              Agregar Rutina
            </Button>
          </View>
        ) : (
          <Button mode="contained" onPress={() => setShowAddForm(true)} style={styles.addButton}>
            Agregar Rutina
          </Button>
        )}
        <FlatList
          data={routines}
          renderItem={renderRoutineItem}
          keyExtractor={(item) => item._id}
        />
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
    padding: 16,
  },
  routineItem: {
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 16,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
  },
  addButton: {
    marginBottom: 16,
  },
});

export default RoutinesScreen;
