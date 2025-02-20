import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';


const RankingScreen = () => {
  const [points, setPoints] = useState(0);  // State to store the points

  useEffect(() => {
    // Function to fetch the ranking data
    const fetchRankingData = async () => {
      try {
        const response = await axios.get('https://zeewebvalley.com/quizup/super-admin/api/Controll/ranking/');
        // Extract the point value from the API response
        if (response.data && response.data.data && response.data.data.length > 0) {
          const { point } = response.data.data[0];
          setPoints(point); // Set the points in state
        }
      } catch (error) {
        console.error('Error fetching ranking data:', error);
      }
    };

    fetchRankingData();  // Call the function when component mounts
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Points: {points}</Text> 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default RankingScreen;
