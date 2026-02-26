import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import RoomGraphics from './RoomGraphics';
import InteractiveItem from './InteractiveItem';
import AnimatedButton from './AnimatedButton';

const { width, height } = Dimensions.get('window');

const RoomView = ({ room, solvedPuzzles, onPuzzlePress, onItemPickup, onRoomExit }) => {
  const getItemPosition = (itemType, index) => {
    const positions = {
      living_room: {
        puzzles: [
          { x: width * 0.6, y: height * 0.15 }, // picture_frame
          { x: width * 0.1, y: height * 0.25 }, // bookshelf
        ],
        items: [
          { x: width * 0.8, y: height * 0.3 }, // key
        ],
        exits: {
          north: { x: width * 0.5, y: height * 0.1 },
          east: { x: width * 0.85, y: height * 0.2 },
        }
      },
      bedroom: {
        puzzles: [
          { x: width * 0.6, y: height * 0.3 }, // number_lock
          { x: width * 0.4, y: height * 0.15 }, // symbol_puzzle
        ],
        items: [
          { x: width * 0.2, y: height * 0.25 }, // flashlight
        ],
        exits: {
          south: { x: width * 0.5, y: height * 0.4 },
          west: { x: width * 0.15, y: height * 0.2 },
        }
      },
      kitchen: {
        puzzles: [
          { x: width * 0.5, y: height * 0.2 }, // recipe_puzzle
          { x: width * 0.7, y: height * 0.15 }, // cupboard
        ],
        items: [
          { x: width * 0.3, y: height * 0.25 }, // knife
        ],
        exits: {
          west: { x: width * 0.15, y: height * 0.2 },
          north: { x: width * 0.5, y: height * 0.1 },
        }
      },
      bathroom: {
        puzzles: [
          { x: width * 0.4, y: height * 0.15 }, // mirror_puzzle
        ],
        items: [
          { x: width * 0.6, y: height * 0.25 }, // soap
        ],
        exits: {
          east: { x: width * 0.85, y: height * 0.2 },
        }
      },
      dining_room: {
        puzzles: [
          { x: width * 0.4, y: height * 0.15 }, // final_door
        ],
        items: [],
        exits: {
          south: { x: width * 0.5, y: height * 0.4 },
        }
      }
    };
    
    return positions[room.id]?.[itemType]?.[index] || { x: width * 0.5, y: height * 0.2 };
  };

  return (
    <ScrollView style={styles.container}>
      {/* Room Graphics */}
      <View style={styles.graphicsContainer}>
        <RoomGraphics 
          roomType={room.id} 
          puzzleStates={solvedPuzzles.reduce((acc, puzzle) => {
            acc[puzzle] = true;
            return acc;
          }, {})}
        />
        
        {/* Interactive Puzzle Items */}
        {room.puzzles.map((puzzleId, index) => (
          <InteractiveItem
            key={puzzleId}
            item={puzzleId}
            type="puzzle"
            collected={solvedPuzzles.includes(puzzleId)}
            onPress={() => onPuzzlePress(puzzleId)}
            position={getItemPosition('puzzles', index)}
            size={50}
          />
        ))}
        
        {/* Interactive Collectible Items */}
        {room.items.map((item, index) => (
          <InteractiveItem
            key={item}
            item={item}
            type="item"
            collected={false} // This will be handled by inventory state
            onPress={() => onItemPickup(item)}
            position={getItemPosition('items', index)}
            size={45}
          />
        ))}
        
        {/* Interactive Exit Doors */}
        {Object.entries(room.exits).map(([direction, roomId], index) => (
          <InteractiveItem
            key={direction}
            item={direction}
            type="exit"
            collected={false}
            onPress={() => onRoomExit(direction)}
            position={getItemPosition('exits', direction)}
            size={55}
          />
        ))}
      </View>

      <View style={styles.roomInfo}>
        <Text style={styles.description}>{room.description}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Puzzles</Text>
        {room.puzzles.map(puzzleId => (
          <AnimatedButton
            key={puzzleId}
            title={puzzleId.replace('_', ' ').toUpperCase()}
            onPress={() => onPuzzlePress(puzzleId)}
            type={solvedPuzzles.includes(puzzleId) ? 'success' : 'primary'}
            disabled={solvedPuzzles.includes(puzzleId)}
            icon={solvedPuzzles.includes(puzzleId) ? '✓' : '🔍'}
            style={styles.puzzleButton}
          />
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Items</Text>
        {room.items.map((item, index) => (
          <AnimatedButton
            key={index}
            title={`🔍 ${item}`}
            onPress={() => onItemPickup(item)}
            type="warning"
            icon="📦"
            style={styles.itemButton}
          />
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Exits</Text>
        <View style={styles.exitsContainer}>
          {Object.entries(room.exits).map(([direction, roomId]) => (
            <AnimatedButton
              key={direction}
              title={`${direction === 'north' ? '⬆️' : 
                      direction === 'south' ? '⬇️' : 
                      direction === 'east' ? '➡️' : '⬅️'} ${direction.toUpperCase()}`}
              onPress={() => onRoomExit(direction)}
              type="secondary"
              style={styles.exitButton}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  graphicsContainer: {
    position: 'relative',
    height: height * 0.4,
    marginBottom: 20,
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  roomInfo: {
    marginBottom: 30,
    padding: 15,
    backgroundColor: '#1a1a2e',
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#4ECDC4',
  },
  description: {
    fontSize: 16,
    color: '#fff',
    lineHeight: 24,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ff6b6b',
    marginBottom: 15,
  },
  puzzleButton: {
    marginBottom: 10,
  },
  itemButton: {
    marginBottom: 10,
  },
  exitsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  exitButton: {
    minWidth: 100,
  },
});

export default RoomView;
