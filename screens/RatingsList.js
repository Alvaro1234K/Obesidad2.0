import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import axios from 'axios';

const App = () => {
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    fetchRatings();
  }, []);

  const fetchRatings = async () => {
    try {
      const response = await axios.get('https://api-tu-api.com/ratings');
      setRatings(response.data);
    } catch (error) {
      console.error('Error al obtener calificaciones:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Listado de Ratings:</Text>
      <FlatList
        data={ratings}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  ratingText: {
    fontSize: 16,
  },
});

export default App;
