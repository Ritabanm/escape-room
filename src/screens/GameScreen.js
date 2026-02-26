import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, Dimensions } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useGame } from '../context/GameContext';
import RoomView from '../components/RoomView';
import Inventory from '../components/Inventory';
import PuzzleModal from '../components/PuzzleModal';
import AnimatedButton from '../components/AnimatedButton';
import ParticleEffect from '../components/ParticleEffect';

const { width, height } = Dimensions.get('window');

const GameScreen = ({ navigation }) => {
  const { 
    currentRoom, 
    rooms, 
    inventory, 
    solvedPuzzles, 
    hints, 
    moveToRoom, 
    addToInventory, 
    solvePuzzle, 
    useHint,
    winGame 
  } = useGame();
  
  const [selectedPuzzle, setSelectedPuzzle] = useState(null);
  const [showInventory, setShowInventory] = useState(false);
  const [showParticles, setShowParticles] = useState(false);
  const [roomTransition, setRoomTransition] = useState(false);

  const room = rooms[currentRoom];

  const handlePuzzlePress = (puzzleId) => {
    const puzzle = room.puzzles.find(p => p === puzzleId);
    if (puzzle && !solvedPuzzles.includes(puzzleId)) {
      setSelectedPuzzle(puzzleId);
    }
  };

  const handleItemPickup = (item) => {
    if (!inventory.includes(item)) {
      addToInventory(item);
      setShowParticles(true);
      setTimeout(() => setShowParticles(false), 1000);
      Alert.alert('Item Picked Up', `You added ${item} to your inventory!`);
    }
  };

  const handlePuzzleSolve = (puzzleId, reward) => {
    solvePuzzle(puzzleId);
    setShowParticles(true);
    setTimeout(() => setShowParticles(false), 1500);
    
    if (reward) {
      setTimeout(() => {
        addToInventory(reward);
        Alert.alert('Puzzle Solved!', `You found: ${reward}`);
      }, 800);
    }
    
    setSelectedPuzzle(null);
    
    if (puzzleId === 'final_door') {
      winGame();
      setTimeout(() => {
        navigation.navigate('Victory');
      }, 2000);
    }
  };

  const handleUseHint = () => {
    if (hints > 0) {
      useHint();
      setShowParticles(true);
      setTimeout(() => setShowParticles(false), 800);
      Alert.alert('Hint Used', `You have ${hints - 1} hints remaining.`);
    } else {
      Alert.alert('No Hints', 'You have no hints remaining!');
    }
  };

  const handleRoomExit = (direction) => {
    const nextRoomId = room.exits[direction];
    if (nextRoomId) {
      setRoomTransition(true);
      setTimeout(() => {
        moveToRoom(nextRoomId);
        setRoomTransition(false);
      }, 500);
    }
  };

  return (
    <View style={styles.container}>
      <Animatable.View
        animation={roomTransition ? 'fadeOut' : 'fadeIn'}
        duration={500}
        style={styles.header}
      >
        <Text style={styles.roomName}>{room.name}</Text>
        <View style={styles.stats}>
          <AnimatedButton
            title={`💡 ${hints}`}
            onPress={handleUseHint}
            type={hints > 0 ? 'warning' : 'secondary'}
            disabled={hints === 0}
            style={styles.hintButton}
          />
          <AnimatedButton
            title={`🎒 ${inventory.length}`}
            onPress={() => setShowInventory(!showInventory)}
            type="secondary"
            style={styles.inventoryButton}
          />
        </View>
      </Animatable.View>

      <Animatable.View
        animation={roomTransition ? 'fadeOut' : 'fadeIn'}
        duration={500}
        delay={200}
        style={styles.content}
      >
        <RoomView 
          room={room}
          solvedPuzzles={solvedPuzzles}
          onPuzzlePress={handlePuzzlePress}
          onItemPickup={handleItemPickup}
          onRoomExit={handleRoomExit}
        />
      </Animatable.View>

      {showInventory && (
        <Animatable.View
          animation="slideInUp"
          duration={300}
          style={styles.inventoryPanel}
        >
          <Inventory 
            items={inventory}
            onClose={() => setShowInventory(false)}
          />
        </Animatable.View>
      )}

      {selectedPuzzle && (
        <PuzzleModal
          puzzleId={selectedPuzzle}
          inventory={inventory}
          onClose={() => setSelectedPuzzle(null)}
          onSolve={handlePuzzleSolve}
        />
      )}

      <ParticleEffect 
        trigger={showParticles}
        type="success"
        count={15}
        duration={1000}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f1e',
  },
  header: {
    backgroundColor: '#1a1a2e',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  roomName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textShadowColor: '#4ECDC4',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  hintButton: {
    minWidth: 80,
  },
  inventoryButton: {
    minWidth: 80,
  },
  content: {
    flex: 1,
  },
  inventoryPanel: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#1a1a2e',
    borderTopWidth: 2,
    borderTopColor: '#333',
    maxHeight: 200,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
});

export default GameScreen;
