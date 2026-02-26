import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, Alert, ScrollView } from 'react-native';
import { useGame } from '../context/GameContext';

const PuzzleModal = ({ puzzleId, inventory, onClose, onSolve }) => {
  const { puzzles } = useGame();
  const puzzle = puzzles[puzzleId];
  
  const [input, setInput] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [bookOrder, setBookOrder] = useState([]);
  const [symbolOrder, setSymbolOrder] = useState([]);
  const [numberInput, setNumberInput] = useState('');

  if (!puzzle) return null;

  const handleSubmit = () => {
    let isCorrect = false;
    let solutionInput = '';

    switch (puzzleId) {
      case 'picture_frame':
        isCorrect = input.toLowerCase() === puzzle.solution;
        solutionInput = input;
        break;
        
      case 'number_lock':
        isCorrect = numberInput === puzzle.solution;
        solutionInput = numberInput;
        break;
        
      case 'bookshelf':
        isCorrect = bookOrder.length === puzzle.solution.length && 
                   bookOrder.every((color, index) => color === puzzle.solution[index]);
        solutionInput = bookOrder;
        break;
        
      case 'symbol_puzzle':
        isCorrect = symbolOrder.length === puzzle.solution.length && 
                   symbolOrder.every((symbol, index) => symbol === puzzle.solution[index]);
        solutionInput = symbolOrder;
        break;
        
      case 'recipe_puzzle':
        isCorrect = selectedItems.length === puzzle.solution.length && 
                   selectedItems.every(item => puzzle.solution.includes(item));
        solutionInput = selectedItems;
        break;
        
      case 'cupboard':
        isCorrect = inventory.includes(puzzle.solution);
        solutionInput = puzzle.solution;
        break;
        
      case 'mirror_puzzle':
        isCorrect = input.toLowerCase() === puzzle.solution;
        solutionInput = input;
        break;
        
      case 'final_door':
        isCorrect = puzzle.solution.every(item => inventory.includes(item));
        solutionInput = puzzle.solution;
        break;
        
      default:
        isCorrect = false;
    }

    if (isCorrect) {
      onSolve(puzzleId, puzzle.reward);
      Alert.alert('Puzzle Solved!', `You found: ${puzzle.reward}`);
    } else {
      Alert.alert('Incorrect', 'That\'s not the right solution. Try again!');
    }
  };

  const renderPuzzleContent = () => {
    switch (puzzleId) {
      case 'picture_frame':
        return (
          <View>
            <TextInput
              style={styles.textInput}
              placeholder="Enter what you find..."
              value={input}
              onChangeText={setInput}
            />
          </View>
        );
        
      case 'number_lock':
        return (
          <View>
            <TextInput
              style={styles.textInput}
              placeholder="Enter 4-digit code"
              value={numberInput}
              onChangeText={setNumberInput}
              keyboardType="numeric"
              maxLength={4}
            />
          </View>
        );
        
      case 'bookshelf':
        const colors = ['red', 'blue', 'green', 'yellow'];
        return (
          <View>
            <Text style={styles.instruction}>Arrange books in correct order:</Text>
            {colors.map(color => (
              <TouchableOpacity
                key={color}
                style={[styles.colorButton, { backgroundColor: color }]}
                onPress={() => {
                  if (!bookOrder.includes(color)) {
                    setBookOrder([...bookOrder, color]);
                  }
                }}
              >
                <Text style={styles.colorButtonText}>{color.toUpperCase()}</Text>
              </TouchableOpacity>
            ))}
            <View style={styles.selectionDisplay}>
              <Text style={styles.selectionText}>Order: {bookOrder.join(' → ')}</Text>
              <TouchableOpacity
                style={styles.clearButton}
                onPress={() => setBookOrder([])}
              >
                <Text style={styles.clearButtonText}>Clear</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
        
      case 'symbol_puzzle':
        const symbols = ['circle', 'square', 'triangle', 'star'];
        const symbolEmojis = { circle: '⭕', square: '⬜', triangle: '🔺', star: '⭐' };
        return (
          <View>
            <Text style={styles.instruction}>Match the symbols in correct order:</Text>
            {symbols.map(symbol => (
              <TouchableOpacity
                key={symbol}
                style={styles.symbolButton}
                onPress={() => {
                  if (!symbolOrder.includes(symbol)) {
                    setSymbolOrder([...symbolOrder, symbol]);
                  }
                }}
              >
                <Text style={styles.symbolEmoji}>{symbolEmojis[symbol]}</Text>
                <Text style={styles.symbolText}>{symbol.toUpperCase()}</Text>
              </TouchableOpacity>
            ))}
            <View style={styles.selectionDisplay}>
              <Text style={styles.selectionText}>
                Order: {symbolOrder.map(s => symbolEmojis[s]).join(' → ')}
              </Text>
              <TouchableOpacity
                style={styles.clearButton}
                onPress={() => setSymbolOrder([])}
              >
                <Text style={styles.clearButtonText}>Clear</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
        
      case 'recipe_puzzle':
        const ingredients = ['flour', 'water', 'sugar', 'salt', 'oil'];
        return (
          <View>
            <Text style={styles.instruction}>Select the correct ingredients:</Text>
            {ingredients.map(ingredient => (
              <TouchableOpacity
                key={ingredient}
                style={[
                  styles.ingredientButton,
                  selectedItems.includes(ingredient) && styles.selectedIngredient
                ]}
                onPress={() => {
                  if (selectedItems.includes(ingredient)) {
                    setSelectedItems(selectedItems.filter(item => item !== ingredient));
                  } else {
                    setSelectedItems([...selectedItems, ingredient]);
                  }
                }}
              >
                <Text style={styles.ingredientText}>{ingredient.toUpperCase()}</Text>
              </TouchableOpacity>
            ))}
          </View>
        );
        
      case 'cupboard':
        return (
          <View>
            <Text style={styles.instruction}>
              You need: {puzzle.solution}
            </Text>
            <Text style={styles.inventoryCheck}>
              You have: {inventory.includes(puzzle.solution) ? '✓' : '✗'} {puzzle.solution}
            </Text>
          </View>
        );
        
      case 'mirror_puzzle':
        return (
          <View>
            <TextInput
              style={styles.textInput}
              placeholder="What should you do with the mirror?"
              value={input}
              onChangeText={setInput}
            />
          </View>
        );
        
      case 'final_door':
        return (
          <View>
            <Text style={styles.instruction}>You need all these items:</Text>
            {puzzle.solution.map(item => (
              <Text key={item} style={styles.itemCheck}>
                {inventory.includes(item) ? '✓' : '✗'} {item}
              </Text>
            ))}
          </View>
        );
        
      default:
        return (
          <View>
            <TextInput
              style={styles.textInput}
              placeholder="Enter solution..."
              value={input}
              onChangeText={setInput}
            />
          </View>
        );
    }
  };

  return (
    <Modal
      visible={true}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{puzzle.name}</Text>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>
        </View>
        
        <ScrollView style={styles.content}>
          <Text style={styles.description}>{puzzle.description}</Text>
          
          {renderPuzzleContent()}
          
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitText}>Submit Solution</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1,
  },
  closeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#ff6b6b',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  description: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 30,
    lineHeight: 24,
  },
  instruction: {
    fontSize: 16,
    color: '#4ecdc4',
    marginBottom: 20,
    fontWeight: '500',
  },
  textInput: {
    backgroundColor: '#2a2a3e',
    color: '#fff',
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 20,
  },
  colorButton: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  colorButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  symbolButton: {
    backgroundColor: '#2a2a3e',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  symbolEmoji: {
    fontSize: 24,
    marginRight: 15,
  },
  symbolText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  ingredientButton: {
    backgroundColor: '#2a2a3e',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#ffd93d',
  },
  selectedIngredient: {
    backgroundColor: '#4ecdc4',
    borderLeftColor: '#fff',
  },
  ingredientText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  selectionDisplay: {
    backgroundColor: '#2a2a3e',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  selectionText: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 10,
  },
  clearButton: {
    backgroundColor: '#ff6b6b',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  clearButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  inventoryCheck: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 20,
  },
  itemCheck: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: '#4ecdc4',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 30,
  },
  submitText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PuzzleModal;
