import React, {useEffect} from 'react';
import type {PropsWithChildren} from 'react';
import {Animated, Text, View, TouchableOpacity, StyleSheet} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

type LevelProps = PropsWithChildren<{
  endValue: number;
  total: number;
  reached: number;
  level: number;
  levelText: string;
  pause: number;
}>;

const LevelStatus = ({
  endValue,
  total,
  reached,
  level,
  levelText,
  pause,
}: LevelProps) => {
  let startValue = new Animated.Value(0);

  let fadeAnim = new Animated.Value(0);

  let animation = new Animated.Value(0);

  let animationWidth = new Animated.Value(0);

  let widthInterpolate = animationWidth.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', `${100 * (reached / total)}%`],
  });

  useEffect(() => {
    // Top to Bottom bar transition
    Animated.timing(startValue, {
      toValue: endValue,
      duration: pause,
      useNativeDriver: true,
      delay: pause * level,
    }).start();

    // Fading in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2500,
      useNativeDriver: true,
      delay: pause * level,
    }).start();

    // Progress level filling up
    Animated.timing(animationWidth, {
      toValue: 1,
      duration: 2000,
      delay: 2000 + pause * level,
      useNativeDriver: false,
    }).start();
  }, [
    startValue,
    endValue,
    animation,
    reached,
    total,
    pause,
    level,
    animationWidth,
    fadeAnim,
  ]);

  return (
    <Animated.View
      style={[
        {
          opacity: fadeAnim,
          transform: [{translateY: startValue}],
          marginVertical: 5,
        },
      ]}>
      <View style={styles.barContainer}>
        <Text style={styles.barText1}>{levelText}</Text>
        <Text style={styles.barText2}>
          {parseInt(`${(reached / total) * 100}`)}%
        </Text>
      </View>
      <TouchableOpacity onPress={() => {}} style={styles.progressContainer}>
        <Animated.View
          style={{
            height: '100%',
            width: widthInterpolate,
            marginVertical: 40,
            position: 'absolute',
          }}>
          <LinearGradient
            style={styles.progressFull}
            colors={['#ee0af2', '#fe4cad', '#ee0af2']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
          />
          {/* {total === reached ? (
            <LinearGradient
              style={styles.progressFull}
              colors={['#ee0af2', '#fe4cad', '#ee0af2']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
            />
          ) : ( */}
          {/* <View style={styles.progressPartial} /> */}
          {/* )} */}
        </Animated.View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default LevelStatus;

const styles = StyleSheet.create({
  barContainer: {
    zIndex: 20,
    alignItems: 'stretch',
    justifyContent: 'space-between',
    width: 300,
    flexDirection: 'row',
    marginVertical: 8,
    marginHorizontal: 3,
  },
  barText1: {
    fontWeight: '600',
    color: 'white',
    fontSize: 16,
    fontFamily: 'Montserratt',
    letterSpacing: 1.2,
  },
  barText2: {
    fontWeight: '400',
    color: 'white',
    fontSize: 14,
  },
  progressContainer: {
    backgroundColor: '#1a2c5d',
    height: 16,
    width: 300,
    borderRadius: 180,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  progressPartial: {
    height: '100%',
    width: '110%',
    borderRadius: 100,
    backgroundColor: '#326bfe',
  },
  progressFull: {
    height: '100%',
    width: '110%',
    borderRadius: 100,
  },
});
