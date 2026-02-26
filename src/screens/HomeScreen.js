import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import * as Animatable from 'react-native-animatable';
import AnimatedButton from '../components/AnimatedButton';
import ParticleEffect from '../components/ParticleEffect';
import { useGame } from '../context/GameContext';

const { width, height } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const { startGame, resetGame } = useGame();
  const [showParticles, setShowParticles] = useState(false);

  const handleStartGame = () => {
    setShowParticles(true);
    setTimeout(() => {
      resetGame();
      startGame();
      navigation.navigate('Game');
    }, 500);
  };

  return (
    <View style={styles.container}>
      {/* Background decoration */}
      <View style={styles.backgroundDecoration}>
        <Animatable.View
          animation="pulse"
          iterationCount="infinite"
          duration={3000}
          style={styles.floatingOrb1}
        />
        <Animatable.View
          animation="pulse"
          iterationCount="infinite"
          duration={3000}
          delay={1000}
          style={styles.floatingOrb2}
        />
        <Animatable.View
          animation="pulse"
          iterationCount="infinite"
          duration={3000}
          delay={2000}
          style={styles.floatingOrb3}
        />
      </View>

      <View style={styles.content}>
        <Animatable.View
          animation="bounceInDown"
          duration={1000}
          style={styles.titleContainer}
        >
          <Text style={styles.title}>🏚️ Escape Room</Text>
          <Text style={styles.subtitle}>Can you find your way out?</Text>
        </Animatable.View>
        
        <Animatable.View
          animation="fadeInUp"
          duration={1000}
          delay={500}
          style={styles.descriptionContainer}
        >
          <Text style={styles.description}>
            🔒 You find yourself trapped in a mysterious house. 
          </Text>
          <Text style={styles.description}>
            🔍 Explore rooms, solve puzzles, and collect items to escape!
          </Text>
          <Text style={styles.description}>
            ⏱️ But hurry... time is running out!
          </Text>
        </Animatable.View>
      </View>
      
      <Animatable.View
        animation="bounceInUp"
        duration={1000}
        delay={800}
        style={styles.buttonContainer}
      >
        <AnimatedButton
          title="🎮 Start Game"
          onPress={handleStartGame}
          type="primary"
          style={styles.startButton}
          textStyle={styles.startButtonText}
        />
      </Animatable.View>

      <ParticleEffect 
        trigger={showParticles}
        type="success"
        count={20}
        duration={800}
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
  floatingOrb1: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 107, 107, 0.1)',
    top: height * 0.1,
    left: width * 0.1,
  },
  floatingOrb2: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(78, 205, 196, 0.1)',
    top: height * 0.7,
    right: width * 0.1,
  },
  floatingOrb3: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 217, 61, 0.1)',
    bottom: height * 0.2,
    left: width * 0.8,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textShadowColor: '#ff6b6b',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#ccc',
    fontStyle: 'italic',
  },
  descriptionContainer: {
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  description: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 10,
  },
  buttonContainer: {
    zIndex: 1,
  },
  startButton: {
    paddingHorizontal: 40,
    paddingVertical: 15,
  },
  startButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
