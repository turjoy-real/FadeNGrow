import React, {useState} from 'react';
import {FlatList, RefreshControl, useWindowDimensions} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import LevelStatus from './components/LevelStatus';

// the pause before one bar space starts fadding in after its successor
const pause = 400; //ms

function App(): React.JSX.Element {
  const {height} = useWindowDimensions();

  const Xpos = height / 4.5;
  const gap = 10;

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1);
  }, []);

  return (
    <LinearGradient
      style={{height: '100%', width: '100%', alignItems: 'center'}}
      start={{x: 0, y: 1}}
      end={{x: 1, y: 0}}
      locations={[0.7, 0.99]}
      colors={['#010d23', '#200d44']}>
      <FlatList
        keyExtractor={item => item.levelText}
        contentContainerStyle={{height: '100%'}}
        data={data}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({item}) =>
          !refreshing ? (
            <LevelStatus
              reached={item.reached}
              total={item.total}
              endValue={Xpos - gap * item.level}
              level={item.level}
              levelText={item.levelText}
              pause={pause}
            />
          ) : null
        }
      />
    </LinearGradient>
  );
}

export default App;

const data = [
  {
    reached: 100,
    total: 243,
    level: 4,
    levelText: 'HLD',
  },
  {
    reached: 7,
    total: 81,
    level: 3,
    levelText: 'LLD',
  },
  {
    reached: 7,
    total: 27,
    level: 2,
    levelText: 'JAVA',
  },
  {
    reached: 9,
    total: 9,
    level: 1,
    levelText: 'DSA',
  },
  {
    reached: 2,
    total: 3,
    level: 0,
    levelText: 'Basic',
  },
];
