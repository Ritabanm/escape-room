import React, { createContext, useReducer, useContext } from 'react';

const GameContext = createContext();

const initialState = {
  currentRoom: 'living_room',
  inventory: [],
  solvedPuzzles: [],
  gameStarted: false,
  gameWon: false,
  hints: 3,
  rooms: {
    living_room: {
      id: 'living_room',
      name: 'Living Room',
      description: 'A dusty living room with old furniture and mysterious objects.',
      image: null,
      puzzles: ['picture_frame', 'bookshelf'],
      items: ['key'],
      exits: { north: 'bedroom', east: 'kitchen' }
    },
    bedroom: {
      id: 'bedroom',
      name: 'Bedroom',
      description: 'A bedroom with a locked chest and strange markings on the wall.',
      image: null,
      puzzles: ['number_lock', 'symbol_puzzle'],
      items: ['flashlight'],
      exits: { south: 'living_room', west: 'bathroom' }
    },
    kitchen: {
      id: 'kitchen',
      name: 'Kitchen',
      description: 'An old kitchen with a mysterious recipe book and broken appliances.',
      image: null,
      puzzles: ['recipe_puzzle', 'cupboard'],
      items: ['knife'],
      exits: { west: 'living_room', north: 'dining_room' }
    },
    bathroom: {
      id: 'bathroom',
      name: 'Bathroom',
      description: 'A small bathroom with a mirror that seems to hide something.',
      image: null,
      puzzles: ['mirror_puzzle'],
      items: ['soap'],
      exits: { east: 'bedroom' }
    },
    dining_room: {
      id: 'dining_room',
      name: 'Dining Room',
      description: 'A formal dining room with a large table and the final escape door.',
      image: null,
      puzzles: ['final_door'],
      items: [],
      exits: { south: 'kitchen' }
    }
  },
  puzzles: {
    picture_frame: {
      id: 'picture_frame',
      name: 'Mysterious Picture Frame',
      description: 'A picture frame with a hidden compartment.',
      solved: false,
      solution: 'key',
      reward: 'note',
      hint: 'Try looking behind the picture'
    },
    bookshelf: {
      id: 'bookshelf',
      name: 'Bookshelf Puzzle',
      description: 'Books need to be arranged in the correct order.',
      solved: false,
      solution: ['red', 'blue', 'green', 'yellow'],
      reward: 'clue1',
      hint: 'Look at the colors of the books on the spine'
    },
    number_lock: {
      id: 'number_lock',
      name: 'Number Lock',
      description: 'A 4-digit combination lock on the chest.',
      solved: false,
      solution: '1234',
      reward: 'map',
      hint: 'The numbers are hidden somewhere in the room'
    },
    symbol_puzzle: {
      id: 'symbol_puzzle',
      name: 'Symbol Puzzle',
      description: 'Match the symbols on the wall to unlock something.',
      solved: false,
      solution: ['circle', 'square', 'triangle', 'star'],
      reward: 'clue2',
      hint: 'The symbols correspond to shapes you can find'
    },
    recipe_puzzle: {
      id: 'recipe_puzzle',
      name: 'Recipe Puzzle',
      description: 'Follow the recipe to create the right mixture.',
      solved: false,
      solution: ['flour', 'water', 'sugar'],
      reward: 'key2',
      hint: 'Read the recipe book carefully'
    },
    cupboard: {
      id: 'cupboard',
      name: 'Locked Cupboard',
      description: 'A cupboard that needs a key to open.',
      solved: false,
      solution: 'key2',
      reward: 'ingredients',
      hint: 'You need to find the right key first'
    },
    mirror_puzzle: {
      id: 'mirror_puzzle',
      name: 'Mirror Puzzle',
      description: 'The mirror reflection shows something different.',
      solved: false,
      solution: 'wipe_mirror',
      reward: 'code',
      hint: 'Try cleaning the mirror'
    },
    final_door: {
      id: 'final_door',
      name: 'Final Door',
      description: 'The escape door requires multiple items to open.',
      solved: false,
      solution: ['key', 'map', 'code'],
      reward: 'escape',
      hint: 'You need all the collected items'
    }
  }
};

const gameReducer = (state, action) => {
  switch (action.type) {
    case 'START_GAME':
      return {
        ...state,
        gameStarted: true,
        currentRoom: 'living_room'
      };
    
    case 'MOVE_TO_ROOM':
      return {
        ...state,
        currentRoom: action.payload
      };
    
    case 'ADD_TO_INVENTORY':
      return {
        ...state,
        inventory: [...state.inventory, action.payload]
      };
    
    case 'REMOVE_FROM_INVENTORY':
      return {
        ...state,
        inventory: state.inventory.filter(item => item !== action.payload)
      };
    
    case 'SOLVE_PUZZLE':
      return {
        ...state,
        solvedPuzzles: [...state.solvedPuzzles, action.payload],
        puzzles: {
          ...state.puzzles,
          [action.payload]: {
            ...state.puzzles[action.payload],
            solved: true
          }
        }
      };
    
    case 'USE_HINT':
      return {
        ...state,
        hints: state.hints - 1
      };
    
    case 'WIN_GAME':
      return {
        ...state,
        gameWon: true
      };
    
    case 'RESET_GAME':
      return initialState;
    
    default:
      return state;
  }
};

export const GameProvider = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  
  const startGame = () => {
    dispatch({ type: 'START_GAME' });
  };
  
  const moveToRoom = (roomId) => {
    dispatch({ type: 'MOVE_TO_ROOM', payload: roomId });
  };
  
  const addToInventory = (item) => {
    dispatch({ type: 'ADD_TO_INVENTORY', payload: item });
  };
  
  const removeFromInventory = (item) => {
    dispatch({ type: 'REMOVE_FROM_INVENTORY', payload: item });
  };
  
  const solvePuzzle = (puzzleId) => {
    dispatch({ type: 'SOLVE_PUZZLE', payload: puzzleId });
  };
  
  const useHint = () => {
    dispatch({ type: 'USE_HINT' });
  };
  
  const winGame = () => {
    dispatch({ type: 'WIN_GAME' });
  };
  
  const resetGame = () => {
    dispatch({ type: 'RESET_GAME' });
  };
  
  return (
    <GameContext.Provider value={{
      ...state,
      startGame,
      moveToRoom,
      addToInventory,
      removeFromInventory,
      solvePuzzle,
      useHint,
      winGame,
      resetGame
    }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
