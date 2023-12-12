import {
  Image,
  PanResponder,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Draggable from 'react-native-draggable';
import global from '../../assets/styles/global';
import {launchImageLibrary} from 'react-native-image-picker';
import {TextInput} from 'react-native-paper';

const TextRender = ({
  selectedIndex,
  setselectedIndex,
  img,
  index,
  template,
  settemplate,
}) => {
  const [size, setSize] = useState({width: img.width, height: img.height});
  const [contentEditable, setcontentEditable] = useState(false);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (event, gesture) => {
      //   setcontentEditable(true);
      //   if (isSelected) {
      const newWidth = Math.max(50, size.width + gesture.dx);
      const newHeight = Math.max(50, size.height + gesture.dy);
      setSize({width: newWidth, height: newHeight});
      //   }
    },
  });

  useEffect(() => {
    if (selectedIndex != index) {
      setcontentEditable(false);
    }
  }, [selectedIndex]);

  return (
    <Pressable style={{zIndex: img.zIndex}}>
      <Draggable
        disabled={selectedIndex == index}
        x={img.x}
        y={img.y}
        onDragRelease={e => {
          console.log(
            'pageX, pageY = ' +
              e.nativeEvent.pageX +
              ', ' +
              e.nativeEvent.pageY,
          );
          console.log(
            'locX, locY = ' +
              e.nativeEvent.locationX +
              ', ' +
              e.nativeEvent.locationY,
          );
        }}>
        <Pressable
          style={{
            width: 'auto',
            // height: size.height,
            borderWidth: selectedIndex == index ? 2 : 0,
            borderColor: 'red',
            position: 'relative',
          }}
          onPress={() => {
            console.log('A');
            setselectedIndex(index);
          }}>
          {contentEditable ? (
            <TextInput
              mode="outlined"
              outlineColor="transparent"
              activeOutlineColor="transparent"
              value={img.text}
              multiline
              onChangeText={text => {
                const templateCopy = {...template};
                templateCopy.images[index].text = text;
                settemplate(templateCopy);
              }}
              style={{
                backgroundColor: 'tranparent',
                fontSize: size.width / 10,
                color: img.color,
              }}></TextInput>
          ) : (
            <Text
              {...(selectedIndex == index ? panResponder.panHandlers : {})}
              style={{
                fontSize: size.width / 10,
                color: img.color,
              }}>
              {img.text}
            </Text>
          )}
        </Pressable>
      </Draggable>
    </Pressable>
  );
};

export default TextRender;

const styles = StyleSheet.create({});
