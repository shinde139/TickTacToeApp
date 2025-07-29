// Result.js
import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const Result = ({ route, navigation }) => {
  const { winner, score } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {winner === 'Tie' ? "It's a Tie!" : `Winner: ${winner}`}
      </Text>

      <Text style={styles.score}>X Score: {score.X}</Text>
      <Text style={styles.score}>O Score: {score.O}</Text>

      <Button title="Play Again" onPress={() => navigation.navigate('Game')} />
      <Button title="View History" onPress={() => navigation.navigate('History')} />
    </View>
  );
};

export default Result;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 32, fontWeight: 'bold', marginBottom: 20 },
  score: { fontSize: 20, marginVertical: 5 },
});
