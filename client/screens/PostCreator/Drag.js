import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  Animated,
} from 'react-native';
import {PanGestureHandler, State} from 'react-native-gesture-handler';

let itemHeight = 100;

let FlatItem = () => {
  let translateX = new Animated.Value(0);
  let translateY = new Animated.Value(0);
  let height = new Animated.Value(20);
  let width = new Animated.Value(20);
  let onGestureEvent = Animated.event([
    {
      nativeEvent: {
        translationX: translateX,
        translationY: translateY,
      },
    },
  ]);
  let onGestureTopEvent = Animated.event([
    {
      nativeEvent: {
        translationY: height,
      },
    },
  ]);
  let _lastOffset = {x: 0, y: 0};
  let onHandlerStateChange = event => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      _lastOffset.x += event.nativeEvent.translationX;
      _lastOffset.y += event.nativeEvent.translationY;
      translateX.setOffset(_lastOffset.x);
      translateX.setValue(0);
      translateY.setOffset(_lastOffset.y);
      translateY.setValue(0);
    }
  };

  return (
    <View>
      {/* <PanGestureHandler onGestureEvent={onGestureTopEvent}>
        <Animated.View
          style={{
            widht: width,
            height,
            backgroundColor: 'blue',
            transform: [{translateX}, {translateY}],
          }}
        />
      </PanGestureHandler> */}
      <PanGestureHandler
        onGestureEvent={onGestureEvent}
        onHandlerStateChange={onHandlerStateChange}>
        <Animated.View
          style={[
            styles.item,
            {transform: [{translateX}, {translateY}]},
          ]}></Animated.View>
      </PanGestureHandler>
    </View>
  );
};

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <FlatItem />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: '#ecf0f1',
    // padding: 8,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  item: {
    width: itemHeight,
    height: itemHeight,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
});
