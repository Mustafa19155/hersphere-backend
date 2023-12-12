import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Animated} from 'react-native';
import {
  LongPressGestureHandler,
  PanGestureHandler,
  State,
  TapGestureHandler,
} from 'react-native-gesture-handler';
import Avatar from '../../assets/images/avatar.png';

let itemHeight = 100;

const Drag3 = () => {
  const [selected, setselected] = useState(false);
  const [disableDragging, setdisableDragging] = useState(false);

  let translateX = new Animated.Value(0);
  let translateY = new Animated.Value(0);
  let onGestureEvent = Animated.event([
    {
      nativeEvent: {
        translationX: translateX,
        translationY: translateY,
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
    <Pressable
      style={{width: '100%', height: '100%'}}
      onPress={() => setdisableDragging(false)}>
      <LongPressGestureHandler
        onActivated={e => {
          e.stopPropagation();
          setdisableDragging(true);
        }}>
        <PanGestureHandler
          onGestureEvent={!disableDragging ? onGestureEvent : () => {}}
          onHandlerStateChange={
            !disableDragging ? onHandlerStateChange : () => {}
          }>
          <Animated.View
            style={[
              styles.item,
              {transform: [{translateX}, {translateY}]},
              {
                borderWidth: !disableDragging ? 1 : 0,
                borderColor: 'black',
              },
            ]}>
            <Image source={Avatar} style={{height: '100%', width: '100%'}} />
          </Animated.View>
        </PanGestureHandler>
      </LongPressGestureHandler>
    </Pressable>
  );
};

export default Drag3;

const styles = StyleSheet.create({
  item: {
    width: itemHeight,
    height: itemHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
