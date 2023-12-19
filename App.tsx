import React, { useEffect, useRef } from 'react';
import type {PropsWithChildren} from 'react';
import {
  Animated,
  Text,
  View,
  TouchableOpacity,
  Dimensions
} from 'react-native';



const windowHeight = Dimensions.get('window').height;
const duration = 300;
const duration2 = 2000;


type LevelProps = PropsWithChildren<{
  endValue: number,
  total : number,
  reached : number,
  level : number,
  levelText : string,
  pause : number,
}>


export const LevelStatus = ({
  endValue,
  total,
  reached,
  level,
  levelText,
  pause,
}: LevelProps) => {
  const startValue = useRef(new Animated.Value(0)).current;

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const animation = useRef(new Animated.Value(0)).current;

  const animationWidth = new Animated.Value(0);

  const widthInterpolate = animationWidth.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', `${100 * (reached / total)}%`],
  });

  Animated.timing(animationWidth, {
    toValue: 1,
    duration: duration + duration2,
    delay: duration * 11 + duration * level,
    useNativeDriver: false,
  }).start();

  useEffect(() => {
    Animated.sequence([
      Animated.timing(startValue, {
        toValue: endValue,
        duration: duration,
        useNativeDriver: true,
        delay: duration * level,
      }),
      Animated.timing(animation, {
        toValue: 600 * (reached / total),
        duration: duration2,
        delay: duration * 11,
        useNativeDriver: true,
      }),
    ]).start();
  }, [
    startValue,
    endValue,
    animation,
    reached,
    total,
    pause,
    level,
    animationWidth,
  ]);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2500,
      useNativeDriver: true,
      delay: duration * level,
    }).start();
  }, [fadeAnim, level, pause]);


  

  return (

      <Animated.View
        style={[
          {
            opacity: fadeAnim,
            transform: [{translateY: startValue}],
            marginVertical:5
          },
        ]}>
        <TouchableOpacity
          onPress={() => {}}
          style={{
            backgroundColor: 'rgba(208, 208, 208, 0.8)',
            height: windowHeight / 22,
            width: 300,
            borderRadius: 18,
            justifyContent: 'center',
            overflow: 'hidden',
          }}>
          <View
            style={{
              zIndex: 20,
              alignItems: 'center',
              width: 300,
            }}>
            <Text
              style={{
                fontWeight: 'bold',
                fontFamily: 'Poppins-Regular',
                color: 'white',
              }}>
              {levelText}
            </Text>
          </View>
          {level !== 0 ? (
            <View
              style={{
                backgroundColor: '#fff',
                height: windowHeight / 22 - 6,
                width: windowHeight / 22 - 6,
                margin: 3,
                borderRadius: 20,
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                zIndex: 20,
              }}>
              <Text
                style={{
                  color: 'grey',
                  fontWeight: 'bold',
                  fontFamily: 'Poppins-Regular',
                }}>
                {level}
              </Text>
            </View>
          ) : null}

          <Animated.View
            style={
              {
                height: '100%',
                width: widthInterpolate,
                borderRadius: 160,
                marginVertical: 40,
                backgroundColor: reached == total ? 'red':'grey',
                position: 'absolute',
              }
            }
          />
        </TouchableOpacity>
      </Animated.View>

  );
};


function App(): React.JSX.Element {

  const Xpos = windowHeight / 4.5;
  const gap = 10;

  return (

    <View style={{height: '100%',  alignItems: 'center'}}>
            <LevelStatus
              reached={243}
              total={243}
              endValue={Xpos - gap * 4}
              level={4}
              levelText={'HLD'}
              pause={duration}
            />
            <LevelStatus
              reached={7}
              total={81}
              
              endValue={Xpos - gap * 3}
              level={3}
              levelText={'LLD'}
              pause={duration}
            />
            <LevelStatus
              reached={7}
              total={27}
              endValue={Xpos - gap * 2}
              level={2}
              levelText={'JAVA/PYTHON/JS'}
              pause={duration}
            />
            <LevelStatus
              reached={9}
              total={9}
              endValue={Xpos - gap * 1}
              level={1}
              levelText={'DSA'}
              pause={duration}
            />
            <LevelStatus
              reached={2}
              total={3}
              endValue={Xpos}
              level={0}
              levelText={
                "Basics"
              }
              pause={duration}
            />

    </View>
  );
}


export default App;
