import {
  Image,
  PanResponder,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Draggable from 'react-native-draggable';
import {TextInput} from 'react-native-paper';
import AntIcons from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

const TextRender = ({
  selectedIndex,
  setselectedIndex,
  img,
  index,
  template,
  settemplate,
}) => {
  const textInputRef = useRef();
  const [text, settext] = useState('');
  const [size, setSize] = useState({width: img.width, height: img.height});
  const [fontSize, setfontSize] = useState(img.fontSize);
  const [contentEditable, setcontentEditable] = useState(false);
  const [width, setwidth] = useState(img.width);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (event, gesture) => {
      const newWidth = Math.max(50, size.width + gesture.dx);
      const newHeight = Math.max(50, size.height + gesture.dy);
      setfontSize(newWidth / 7);

      setSize({width: newWidth, height: newHeight});
    },
  });

  const handleDelete = () => {
    setselectedIndex(-2);
    // settemplate({...template, images: template.images.filter(i => i != img)});
    const templateCopy = {...template};
    templateCopy.images[index].zIndex = -1;
    templateCopy.images[index].opacity = 0;
    settemplate(templateCopy);
  };

  useEffect(() => {
    if (selectedIndex != index) {
      setcontentEditable(false);
    }
  }, [selectedIndex]);

  useEffect(() => {
    if (contentEditable) {
      textInputRef.current.focus();
    }
  }, [contentEditable]);

  useEffect(() => {
    settext(img.text);
  }, [img]);

  return (
    <Pressable style={{zIndex: img.zIndex}}>
      <Draggable disabled={selectedIndex == index} x={img.x} y={img.y}>
        <Pressable
          style={{
            width: 'auto',
            opacity: img.opacity == 0 ? 0 : 1,
            borderWidth: selectedIndex == index ? 2 : 0,
            borderColor: 'red',
            position: 'relative',
          }}
          onPress={() => {
            setselectedIndex(index);
          }}>
          {selectedIndex == index && (
            <View
              style={{
                position: 'absolute',
                top: -35,
                paddingHorizontal: 12,
                paddingVertical: 7,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 20,
                minWidth: 75,
                backgroundColor: 'white',
                elevation: 5,
                borderRadius: 15,
              }}>
              <Pressable onPress={() => setcontentEditable(true)}>
                <SimpleLineIcons name="pencil" color="black" size={16} />
              </Pressable>
              <Pressable onPress={handleDelete}>
                <AntIcons name="delete" color="black" size={16} />
              </Pressable>
            </View>
          )}

          {contentEditable ? (
            <TextInput
              ref={textInputRef}
              mode="outlined"
              outlineColor="transparent"
              activeOutlineColor="transparent"
              value={text}
              // multiline
              contentStyle={{
                fontFamily: img.fontFamily,
                fontSize: fontSize,
                color: img.color,
              }}
              onChangeText={mainText => {
                settext(mainText);
                // const templateCopy = {...template};
                // templateCopy.images[index].text = text;
                // settemplate(templateCopy);
              }}
              style={{
                backgroundColor: 'tranparent',
                // fontSize: img.fontSize,
                color: img.color,
                // fontFamily: img.fontFamily,
              }}></TextInput>
          ) : (
            <Text
              {...(selectedIndex == index ? panResponder.panHandlers : {})}
              style={{
                fontSize: fontSize,
                color: img.color,
                fontFamily: img.fontFamily,
                // width: size.width,
              }}>
              {text}
            </Text>
          )}
        </Pressable>
      </Draggable>
    </Pressable>
  );
};

export default TextRender;

const styles = StyleSheet.create({});
