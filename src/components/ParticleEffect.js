import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';

const ParticleEffect = ({ 
  trigger, 
  type = 'success', 
  count = 10, 
  duration = 1000,
  colors = ['#4ECDC4', '#FFD93D', '#FF6B6B', '#95E1D3']
}) => {
  const particles = useRef([]);
  const animations = useRef([]);

  useEffect(() => {
    if (trigger) {
      createParticles();
    }
  }, [trigger]);

  const createParticles = () => {
    particles.current = [];
    animations.current = [];

    for (let i = 0; i < count; i++) {
      const particle = {
        id: Math.random(),
        x: new Animated.Value(0),
        y: new Animated.Value(0),
        opacity: new Animated.Value(1),
        scale: new Animated.Value(1),
        color: colors[Math.floor(Math.random() * colors.length)]
      };

      particles.current.push(particle);

      // Create random animation for each particle
      const angle = (Math.PI * 2 * i) / count;
      const distance = 50 + Math.random() * 50;
      const endX = Math.cos(angle) * distance;
      const endY = Math.sin(angle) * distance;

      const animation = Animated.parallel([
        Animated.timing(particle.x, {
          toValue: endX,
          duration: duration,
          useNativeDriver: true,
        }),
        Animated.timing(particle.y, {
          toValue: endY,
          duration: duration,
          useNativeDriver: true,
        }),
        Animated.sequence([
          Animated.timing(particle.opacity, {
            toValue: 0,
            duration: duration * 0.7,
            delay: duration * 0.3,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(particle.scale, {
            toValue: 1.5,
            duration: duration * 0.5,
            useNativeDriver: true,
          }),
          Animated.timing(particle.scale, {
            toValue: 0,
            duration: duration * 0.5,
            useNativeDriver: true,
          }),
        ]),
      ]);

      animations.current.push(animation);
    }

    // Start all animations
    Animated.parallel(animations.current).start();
  };

  if (!trigger) return null;

  return (
    <View style={styles.container} pointerEvents="none">
      {particles.current.map((particle) => (
        <Animated.View
          key={particle.id}
          style={[
            styles.particle,
            {
              backgroundColor: particle.color,
              transform: [
                { translateX: particle.x },
                { translateY: particle.y },
                { scale: particle.scale },
              ],
              opacity: particle.opacity,
            },
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  particle: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});

export default ParticleEffect;
