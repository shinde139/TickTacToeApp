import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

const History = ({ navigation }) => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchScores = async () => {
    try {
      const response = await fetch('http://192.168.0.183:5000/api/scores'); // ✅ NO space in URL
      const data = await response.json();
      console.log('Fetched game history:', data); // ✅ DEBUG log
      setHistory(data);
    } catch (error) {
      console.error('Failed to load score history:', error); // ✅ DEBUG error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchScores();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.winner}>🏆 Winner: {item.winner}</Text>
      <Text style={styles.players}>
        Player X: {item.playerX} vs Player O: {item.playerO}
      </Text>
      <Text style={styles.date}>
        Played on: {new Date(item.date).toLocaleString()}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Game History</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : history.length === 0 ? (
        <Text style={styles.noData}>No game history found.</Text>
      ) : (
        <FlatList
          data={history}
          keyExtractor={(item) => item._id.toString()}
          renderItem={renderItem}
        />
      )}

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backText}>← Back to Game</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f2f2f2',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  item: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 3,
  },
  winner: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  players: {
    fontSize: 16,
  },
  date: {
    fontSize: 14,
    color: '#777',
    marginTop: 5,
  },
  noData: {
    textAlign: 'center',
    fontSize: 16,
    color: '#999',
  },
  backButton: {
    marginTop: 20,
    alignSelf: 'center',
    padding: 10,
    backgroundColor: '#007AFF',
    borderRadius: 6,
  },
  backText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default History;
