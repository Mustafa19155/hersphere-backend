import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  PanResponder,
  TouchableOpacity,
  Image,
  Pressable,
} from 'react-native';
import Avatar from '../../assets/images/avatar.png';
import Draggable from 'react-native-draggable';
import {Text} from 'react-native-paper';

const ResizableView = () => {
  const [isSelected, setIsSelected] = useState(false);
  const [size, setSize] = useState({width: 100, height: 100});

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (event, gesture) => {
      //   if (isSelected) {
      const newWidth = Math.max(50, size.width + gesture.dx);
      const newHeight = Math.max(50, size.height + gesture.dy);
      setSize({width: newWidth, height: newHeight});
      //   }
    },
  });

  return (
    <TouchableOpacity style={styles.container}>
      <View
        {...panResponder.panHandlers}
        style={[
          styles.resizableBox,
          {
            width: size.width,
            height: size.height,
            position: 'relative',
            overflow: 'hidden',
          },
        ]}>
        <Image source={Avatar} style={{height: '100%', width: '100%'}} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  resizableBox: {
    backgroundColor: 'lightblue',
    borderWidth: 1,
    borderColor: 'blue',
  },
});

export default ResizableView;
