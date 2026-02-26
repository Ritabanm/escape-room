import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Svg, { Rect, Circle, Ellipse, Line, Polygon, Path } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

const RoomGraphics = ({ roomType, puzzleStates }) => {
  const renderLivingRoom = () => (
    <Svg width={width} height={height * 0.4} viewBox="0 0 400 300">
      {/* Floor */}
      <Rect x="0" y="200" width="400" height="100" fill="#8B4513" />
      
      {/* Walls */}
      <Rect x="0" y="0" width="400" height="200" fill="#D2691E" />
      
      {/* Window */}
      <Rect x="50" y="50" width="80" height="60" fill="#87CEEB" stroke="#654321" strokeWidth="3" />
      <Line x1="90" y1="50" x2="90" y2="110" stroke="#654321" strokeWidth="2" />
      <Line x1="50" y1="80" x2="130" y2="80" stroke="#654321" strokeWidth="2" />
      
      {/* Picture Frame (Puzzle) */}
      <Rect x="250" y="40" width="60" height="80" fill="#8B4513" stroke="#654321" strokeWidth="2" />
      <Rect x="260" y="50" width="40" height="60" fill="#FFF8DC" />
      {puzzleStates.picture_frame ? (
        <Circle cx="280" cy="80" r="15" fill="#4ECDC4" />
      ) : (
        <Circle cx="280" cy="80" r="15" fill="#FFD700" />
      )}
      
      {/* Bookshelf (Puzzle) */}
      <Rect x="20" y="120" width="100" height="80" fill="#654321" />
      <Rect x="30" y="130" width="80" height="15" fill="#8B0000" />
      <Rect x="30" y="150" width="80" height="15" fill="#000080" />
      <Rect x="30" y="170" width="80" height="15" fill="#006400" />
      <Rect x="30" y="190" width="80" height="15" fill="#FFD700" />
      {puzzleStates.bookshelf && (
        <Circle cx="70" cy="160" r="10" fill="#4ECDC4" />
      )}
      
      {/* Door */}
      <Rect x="320" y="100" width="60" height="100" fill="#654321" />
      <Circle cx="365" cy="150" r="3" fill="#FFD700" />
      
      {/* Rug */}
      <Ellipse cx="200" cy="220" rx="80" ry="30" fill="#B22222" opacity="0.7" />
    </Svg>
  );

  const renderBedroom = () => (
    <Svg width={width} height={height * 0.4} viewBox="0 0 400 300">
      {/* Floor */}
      <Rect x="0" y="200" width="400" height="100" fill="#8B4513" />
      
      {/* Walls */}
      <Rect x="0" y="0" width="400" height="200" fill="#F5DEB3" />
      
      {/* Bed */}
      <Rect x="50" y="120" width="120" height="80" fill="#4682B4" />
      <Rect x="50" y="100" width="120" height="20" fill="#FFFFFF" />
      <Rect x="60" y="130" width="40" height="60" fill="#FFB6C1" />
      <Rect x="120" y="130" width="40" height="60" fill="#FFB6C1" />
      
      {/* Chest (Puzzle) */}
      <Rect x="250" y="140" width="80" height="60" fill="#8B4513" stroke="#654321" strokeWidth="2" />
      <Rect x="260" y="130" width="60" height="10" fill="#654321" />
      {puzzleStates.number_lock ? (
        <Circle cx="290" cy="170" r="8" fill="#4ECDC4" />
      ) : (
        <Circle cx="290" cy="170" r="8" fill="#FF6347" />
      )}
      
      {/* Wall Symbols (Puzzle) */}
      <Circle cx="150" cy="50" r="15" fill="#FFD700" opacity="0.8" />
      <Rect x="200" y="35" width="30" height="30" fill="#FF6347" opacity="0.8" />
      <Polygon points="280,35 295,65 265,65" fill="#32CD32" opacity="0.8" />
      <Polygon points="330,50 340,35 350,50 340,65" fill="#FF69B4" opacity="0.8" />
      {puzzleStates.symbol_puzzle && (
        <Circle cx="240" cy="100" r="10" fill="#4ECDC4" />
      )}
      
      {/* Window */}
      <Rect x="320" y="40" width="60" height="50" fill="#87CEEB" stroke="#654321" strokeWidth="2" />
    </Svg>
  );

  const renderKitchen = () => (
    <Svg width={width} height={height * 0.4} viewBox="0 0 400 300">
      {/* Floor */}
      <Rect x="0" y="200" width="400" height="100" fill="#696969" />
      
      {/* Walls */}
      <Rect x="0" y="0" width="400" height="200" fill="#FFE4B5" />
      
      {/* Counter */}
      <Rect x="0" y="140" width="400" height="60" fill="#8B4513" />
      
      {/* Stove */}
      <Rect x="50" y="120" width="80" height="20" fill="#2F4F4F" />
      <Circle cx="70" cy="130" r="8" fill="#FF6347" />
      <Circle cx="110" cy="130" r="8" fill="#FF6347" />
      
      {/* Recipe Book (Puzzle) */}
      <Rect x="200" y="100" width="40" height="50" fill="#8B4513" />
      <Rect x="205" y="105" width="30" height="40" fill="#FFF8DC" />
      <Line x1="210" y1="115" x2="230" y2="115" stroke="#000" strokeWidth="1" />
      <Line x1="210" y1="125" x2="230" y2="125" stroke="#000" strokeWidth="1" />
      <Line x1="210" y1="135" x2="230" y2="135" stroke="#000" strokeWidth="1" />
      {puzzleStates.recipe_puzzle && (
        <Circle cx="220" cy="145" r="5" fill="#4ECDC4" />
      )}
      
      {/* Cupboard (Puzzle) */}
      <Rect x="300" y="80" width="80" height="60" fill="#654321" />
      <Rect x="310" y="90" width="60" height="40" fill="#8B4513" />
      <Circle cx="340" cy="110" r="3" fill="#FFD700" />
      {puzzleStates.cupboard && (
        <Circle cx="340" cy="130" r="5" fill="#4ECDC4" />
      )}
      
      {/* Sink */}
      <Rect x="150" y="120" width="40" height="20" fill="#B0C4DE" />
      <Circle cx="170" cy="130" r="5" fill="#4682B4" />
    </Svg>
  );

  const renderBathroom = () => (
    <Svg width={width} height={height * 0.4} viewBox="0 0 400 300">
      {/* Floor */}
      <Rect x="0" y="200" width="400" height="100" fill="#E0FFFF" />
      
      {/* Walls */}
      <Rect x="0" y="0" width="400" height="200" fill="#F0F8FF" />
      
      {/* Mirror (Puzzle) */}
      <Rect x="150" y="40" width="100" height="80" fill="#C0C0C0" stroke="#808080" strokeWidth="3" />
      {puzzleStates.mirror_puzzle ? (
        <View style={styles.mirrorText}>
          <Rect x="180" y="70" width="40" height="20" fill="#4ECDC4" />
        </View>
      ) : (
        <Rect x="160" y="60" width="80" height="40" fill="#696969" opacity="0.5" />
      )}
      
      {/* Sink */}
      <Rect x="140" y="140" width="60" height="40" fill="#F5F5F5" />
      <Ellipse cx="170" cy="180" rx="20" ry="5" fill="#C0C0C0" />
      <Circle cx="170" cy="160" r="3" fill="#4682B4" />
      
      {/* Toilet */}
      <Rect x="250" y="130" width="40" height="50" fill="#FFFFFF" />
      <Rect x="255" y="120" width="30" height="10" fill="#FFFFFF" />
      <Rect x="260" y="110" width="20" height="10" fill="#FFFFFF" />
      
      {/* Shower */}
      <Rect x="50" y="80" width="60" height="120" fill="#B0C4DE" opacity="0.5" />
      <Rect x="60" y="90" width="40" height="100" fill="#E0FFFF" />
      <Circle cx="80" cy="85" r="5" fill="#C0C0C0" />
    </Svg>
  );

  const renderDiningRoom = () => (
    <Svg width={width} height={height * 0.4} viewBox="0 0 400 300">
      {/* Floor */}
      <Rect x="0" y="200" width="400" height="100" fill="#8B4513" />
      
      {/* Walls */}
      <Rect x="0" y="0" width="400" height="200" fill="#FAEBD7" />
      
      {/* Dining Table */}
      <Rect x="100" y="140" width="200" height="60" fill="#8B4513" />
      <Rect x="120" y="160" width="160" height="40" fill="#654321" />
      <Rect x="90" y="180" width="20" height="40" fill="#654321" />
      <Rect x="290" y="180" width="20" height="40" fill="#654321" />
      
      {/* Chairs */}
      <Rect x="60" y="150" width="30" height="30" fill="#8B4513" />
      <Rect x="70" y="170" width="10" height="30" fill="#654321" />
      <Rect x="310" y="150" width="30" height="30" fill="#8B4513" />
      <Rect x="320" y="170" width="10" height="30" fill="#654321" />
      
      {/* Final Door (Puzzle) */}
      <Rect x="170" y="40" width="60" height="80" fill="#654321" />
      <Rect x="180" y="50" width="40" height="60" fill="#8B4513" />
      <Circle cx="205" cy="80" r="5" fill="#FFD700" />
      {puzzleStates.final_door ? (
        <Circle cx="200" cy="100" r="10" fill="#4ECDC4" />
      ) : (
        <Rect x="190" y="90" width="20" height="30" fill="#FF6347" />
      )}
      
      {/* Chandelier */}
      <Circle cx="200" cy="20" r="15" fill="#FFD700" />
      <Line x1="200" y1="5" x2="200" y2="35" stroke="#8B4513" strokeWidth="2" />
      <Circle cx="185" cy="25" r="5" fill="#FFD700" />
      <Circle cx="215" cy="25" r="5" fill="#FFD700" />
    </Svg>
  );

  const renderRoom = () => {
    switch (roomType) {
      case 'living_room':
        return renderLivingRoom();
      case 'bedroom':
        return renderBedroom();
      case 'kitchen':
        return renderKitchen();
      case 'bathroom':
        return renderBathroom();
      case 'dining_room':
        return renderDiningRoom();
      default:
        return renderLivingRoom();
    }
  };

  return (
    <View style={styles.container}>
      {renderRoom()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#1a1a2e',
  },
  mirrorText: {
    position: 'absolute',
    top: 70,
    left: 180,
  },
});

export default RoomGraphics;
