# Escape Room Game

A React Native escape room game for iOS and Android built with Expo.

## Features

- **Multiple Rooms**: Explore 5 interconnected rooms (Living Room, Bedroom, Kitchen, Bathroom, Dining Room)
- **Interactive Puzzles**: 8 different puzzle types including number locks, symbol matching, and item collection
- **Inventory System**: Collect and use items to solve puzzles
- **Hint System**: Get hints when stuck (limited to 3 per game)
- **Dark Theme**: Immersive dark UI with colorful accents
- **Cross-Platform**: Works on both iOS and Android

## Game Story

You find yourself trapped in a mysterious house. Explore rooms, solve puzzles, and collect items to find your way out!

## Rooms

1. **Living Room**: Starting point with picture frame and bookshelf puzzles
2. **Bedroom**: Contains number lock chest and symbol puzzle
3. **Kitchen**: Recipe puzzle and locked cupboard
4. **Bathroom**: Mirror puzzle with hidden message
5. **Dining Room**: Final room with the escape door

## Puzzles

- **Picture Frame**: Find the hidden key
- **Bookshelf**: Arrange books in color order
- **Number Lock**: 4-digit combination chest
- **Symbol Puzzle**: Match symbols on the wall
- **Recipe Puzzle**: Mix correct ingredients
- **Cupboard**: Use key to unlock
- **Mirror Puzzle**: Clean the mirror to reveal code
- **Final Door**: Use all collected items to escape

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

## Running the App

### Development Server
```bash
npm start
```

### iOS
```bash
npm run ios
```

### Android
```bash
npm run android
```

### Web
```bash
npm run web
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Inventory.js
│   ├── PuzzleModal.js
│   └── RoomView.js
├── context/            # Game state management
│   └── GameContext.js
├── navigation/         # App navigation
│   └── AppNavigator.js
└── screens/           # Main app screens
    ├── GameScreen.js
    ├── HomeScreen.js
    └── VictoryScreen.js
```

## Game Controls

- **Tap puzzles** to open them
- **Tap items** to collect them
- **Tap exits** to move between rooms
- **Use inventory button** to view collected items
- **Use hints** when stuck (limited to 3)

## Technologies Used

- React Native with Expo
- React Navigation for navigation
- React Context API for state management
- React Native built-in components

## Future Enhancements

- Sound effects and background music
- Save/load game progress
- More rooms and puzzles
- Timer system
- Achievement system
- Multiplayer mode

## Contributing

Feel free to submit pull requests or create issues for bugs and feature requests.

## License

This project is open source and available under the MIT License.
