import React, {useState} from 'react';
import {View, StyleSheet, PanResponder} from 'react-native';

const DraggableComponent = () => {
  const [position, setPosition] = useState({x: 0, y: 0});

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (event, gesture) => {
      setPosition({
        x: gesture.dx,
        y: gesture.dy,
      });
    },
    onPanResponderRelease: () => {
      // Handle release if needed
    },
  });

  return (
    <View
      style={[
        styles.draggableComponent,
        {transform: [{translateX: position.x}, {translateY: position.y}]},
      ]}
      {...panResponder.panHandlers}
    />
  );
};

const styles = StyleSheet.create({
  draggableComponent: {
    width: 100,
    height: 100,
    backgroundColor: 'blue',
  },
});

export default DraggableComponent;
