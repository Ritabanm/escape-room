import React, { useState } from 'react';
import { TouchableOpacity, Animated, View, Text, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';

const InteractiveItem = ({ 
  item, 
  onPress, 
  collected, 
  type = 'item',
  position = { x: 0, y: 0 },
  size = 60 
}) => {
  const [scaleValue] = useState(new Animated.Value(1));
  const [bounceValue] = useState(new Animated.Value(0));

  const handlePress = () => {
    if (!collected) {
      // Bounce animation
      Animated.sequence([
        Animated.timing(bounceValue, {
          toValue: -10,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(bounceValue, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();

      // Scale animation
      Animated.sequence([
        Animated.timing(scaleValue, {
          toValue: 0.8,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(scaleValue, {
          toValue: 1.1,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(scaleValue, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();

      onPress();
    }
  };

  const getItemEmoji = () => {
    switch (item) {
      case 'key':
        return '🗝️';
      case 'flashlight':
        return '🔦';
      case 'knife':
        return '🔪';
      case 'soap':
        return '🧼';
      case 'note':
        return '📝';
      case 'map':
        return '🗺️';
      case 'clue1':
      case 'clue2':
        return '🔍';
      case 'key2':
        return '🔑';
      case 'ingredients':
        return '🥘';
      case 'code':
        return '🔢';
      case 'flour':
        return '🌾';
      case 'water':
        return '💧';
      case 'sugar':
        return '🍬';
      case 'salt':
        return '🧂';
      case 'oil':
        return '🫒';
      default:
        return '📦';
    }
  };

  const getItemColor = () => {
    switch (type) {
      case 'puzzle':
        return collected ? '#4ECDC4' : '#FF6B6B';
      case 'item':
        return collected ? '#666' : '#FFD93D';
      case 'exit':
        return '#4ECDC4';
      default:
        return '#FFD93D';
    }
  };

  if (collected && type === 'item') {
    return null;
  }

  return (
    <Animatable.View
      animation={collected ? 'fadeOut' : 'pulse'}
      iterationCount={type === 'puzzle' && !collected ? 'infinite' : 1}
      duration={2000}
      style={[
        styles.container,
        {
          left: position.x,
          top: position.y,
          width: size,
          height: size,
        }
      ]}
    >
      <Animated.View
        style={[
          styles.itemContainer,
          {
            backgroundColor: getItemColor(),
            transform: [
              { scale: scaleValue },
              { translateY: bounceValue }
            ],
            opacity: collected ? 0.3 : 1,
          }
        ]}
      >
        <TouchableOpacity
          style={styles.touchable}
          onPress={handlePress}
          disabled={collected}
        >
          <Text style={styles.emoji}>{getItemEmoji()}</Text>
          {type === 'puzzle' && !collected && (
            <View style={styles.puzzleIndicator}>
              <Text style={styles.puzzleText}>!</Text>
            </View>
          )}
        </TouchableOpacity>
      </Animated.View>
      
      {/* Glow effect for interactive items */}
      {!collected && (
        <Animatable.View
          animation="pulse"
          iterationCount="infinite"
          duration={1500}
          style={[
            styles.glow,
            {
              backgroundColor: getItemColor(),
              width: size + 10,
              height: size + 10,
            }
          ]}
        />
      )}
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemContainer: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    borderWidth: 2,
    borderColor: '#fff',
  },
  touchable: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {
    fontSize: 24,
    textAlign: 'center',
  },
  puzzleIndicator: {
    position: 'absolute',
    top: -5,
    right: -5,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FF6B6B',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  puzzleText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  glow: {
    position: 'absolute',
    borderRadius: 20,
    opacity: 0.3,
    zIndex: -1,
  },
});

export default InteractiveItem;
