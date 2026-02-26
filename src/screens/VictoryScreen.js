import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useGame } from '../context/GameContext';
import AnimatedButton from '../components/AnimatedButton';
import ParticleEffect from '../components/ParticleEffect';

const { width, height } = Dimensions.get('window');

const VictoryScreen = ({ navigation }) => {
  const { solvedPuzzles, inventory, resetGame } = useGame();
  const [showParticles, setShowParticles] = useState(true);

  const handlePlayAgain = () => {
    resetGame();
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      {/* Background celebration effects */}
      <View style={styles.backgroundDecoration}>
        <Animatable.View
          animation="pulse"
          iterationCount="infinite"
          duration={2000}
          style={styles.celebrationOrb1}
        />
        <Animatable.View
          animation="pulse"
          iterationCount="infinite"
          duration={2000}
          delay={500}
          style={styles.celebrationOrb2}
        />
        <Animatable.View
          animation="pulse"
          iterationCount="infinite"
          duration={2000}
          delay={1000}
          style={styles.celebrationOrb3}
        />
      </View>

      <Animatable.View
        animation="bounceInDown"
        duration={1000}
        style={styles.victoryContent}
      >
        <Text style={styles.victoryTitle}>🎉 Victory! 🎉</Text>
        <Text style={styles.victoryMessage}>You escaped the room!</Text>
        
        <Animatable.View
          animation="fadeInUp"
          duration={800}
          delay={500}
          style={styles.statsContainer}
        >
          <Text style={styles.statsTitle}>📊 Your Stats:</Text>
          <Text style={styles.statsText}>🧩 Puzzles Solved: {solvedPuzzles.length}</Text>
          <Text style={styles.statsText}>🎒 Items Collected: {inventory.length}</Text>
        </Animatable.View>
        
        <Animatable.View
          animation="fadeInUp"
          duration={800}
          delay={800}
          style={styles.itemsContainer}
        >
          <Text style={styles.itemsTitle}>🏆 Items Found:</Text>
          {inventory.map((item, index) => (
            <Animatable.Text
              key={index}
              animation="bounceIn"
              duration={500}
              delay={1000 + index * 100}
              style={styles.itemText}
            >
              ✨ {item}
            </Animatable.Text>
          ))}
        </Animatable.View>
      </Animatable.View>
      
      <Animatable.View
        animation="bounceInUp"
        duration={1000}
        delay={1200}
        style={styles.buttonContainer}
      >
        <AnimatedButton
          title="🎮 Play Again"
          onPress={handlePlayAgain}
          type="primary"
          style={styles.playAgainButton}
        />
      </Animatable.View>

      <ParticleEffect 
        trigger={showParticles}
        type="success"
        count={30}
        duration={2000}
        colors={['#4ECDC4', '#FFD93D', '#FF6B6B', '#95E1D3', '#F38181', '#AA96DA']}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  backgroundDecoration: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
  },
  celebrationOrb1: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(78, 205, 196, 0.2)',
    top: height * 0.1,
    left: width * 0.1,
  },
  celebrationOrb2: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 217, 61, 0.2)',
    top: height * 0.6,
    right: width * 0.1,
  },
  celebrationOrb3: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 107, 107, 0.2)',
    bottom: height * 0.1,
    left: width * 0.7,
  },
  victoryContent: {
    alignItems: 'center',
    marginBottom: 40,
    zIndex: 1,
  },
  victoryTitle: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#4ecdc4',
    marginBottom: 20,
    textAlign: 'center',
    textShadowColor: '#fff',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
  },
  victoryMessage: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 30,
    textAlign: 'center',
  },
  statsContainer: {
    backgroundColor: '#0f0f1e',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    width: '100%',
    borderWidth: 2,
    borderColor: '#4ECDC4',
  },
  statsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ff6b6b',
    marginBottom: 10,
  },
  statsText: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 5,
  },
  itemsContainer: {
    backgroundColor: '#0f0f1e',
    padding: 20,
    borderRadius: 15,
    width: '100%',
    borderWidth: 2,
    borderColor: '#FFD93D',
  },
  itemsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ff6b6b',
    marginBottom: 10,
  },
  itemText: {
    fontSize: 16,
    color: '#4ecdc4',
    marginBottom: 5,
  },
  buttonContainer: {
    zIndex: 1,
  },
  playAgainButton: {
    paddingHorizontal: 40,
    paddingVertical: 15,
  },
});

export default VictoryScreen;
