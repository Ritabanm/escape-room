import React from 'react';
import { TouchableOpacity, Animated, Text, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';

const AnimatedButton = ({ 
  title, 
  onPress, 
  style, 
  textStyle,
  type = 'primary',
  disabled = false,
  icon = null 
}) => {
  const getButtonStyle = () => {
    switch (type) {
      case 'primary':
        return styles.primaryButton;
      case 'secondary':
        return styles.secondaryButton;
      case 'success':
        return styles.successButton;
      case 'danger':
        return styles.dangerButton;
      case 'warning':
        return styles.warningButton;
      default:
        return styles.primaryButton;
    }
  };

  const getTextStyle = () => {
    switch (type) {
      case 'primary':
        return styles.primaryText;
      case 'secondary':
        return styles.secondaryText;
      case 'success':
        return styles.successText;
      case 'danger':
        return styles.dangerText;
      case 'warning':
        return styles.warningText;
      default:
        return styles.primaryText;
    }
  };

  return (
    <Animatable.View
      animation={disabled ? undefined : 'bounceIn'}
      duration={600}
      style={styles.container}
    >
      <TouchableOpacity
        style={[
          styles.button,
          getButtonStyle(),
          disabled && styles.disabledButton,
          style
        ]}
        onPress={onPress}
        disabled={disabled}
        activeOpacity={0.8}
      >
        {icon && <Text style={styles.icon}>{icon}</Text>}
        <Text style={[styles.text, getTextStyle(), textStyle]}>
          {title}
        </Text>
      </TouchableOpacity>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    minWidth: 120,
  },
  primaryButton: {
    backgroundColor: '#FF6B6B',
    borderWidth: 2,
    borderColor: '#FF8E8E',
  },
  secondaryButton: {
    backgroundColor: '#4ECDC4',
    borderWidth: 2,
    borderColor: '#6FE7E0',
  },
  successButton: {
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: '#66BB6A',
  },
  dangerButton: {
    backgroundColor: '#F44336',
    borderWidth: 2,
    borderColor: '#EF5350',
  },
  warningButton: {
    backgroundColor: '#FF9800',
    borderWidth: 2,
    borderColor: '#FFB74D',
  },
  disabledButton: {
    backgroundColor: '#666',
    borderColor: '#888',
    elevation: 0,
    shadowOpacity: 0,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  primaryText: {
    color: '#FFFFFF',
  },
  secondaryText: {
    color: '#FFFFFF',
  },
  successText: {
    color: '#FFFFFF',
  },
  dangerText: {
    color: '#FFFFFF',
  },
  warningText: {
    color: '#FFFFFF',
  },
  icon: {
    fontSize: 18,
    marginRight: 8,
  },
});

export default AnimatedButton;
