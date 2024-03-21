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
import AntIcons from 'react-native-vector-icons/AntDesign';

const ImageRender = ({
  selectedIndex,
  setselectedIndex,
  img,
  index,
  template,
  settemplate,
}) => {
  const [showUpperBar, setshowUpperBar] = useState(false);
  const [size, setSize] = useState({width: img.width, height: img.height});

  const handleShowUpperBar = () => {
    setshowUpperBar(true);
  };

  const selectImage = async () => {
    const result = await launchImageLibrary();
    if (!result.didCancel) {
      const templateCopy = {...template};
      templateCopy.images[index].source = result.assets[0].uri;
      settemplate(templateCopy);
      setshowUpperBar(false);
    }
  };

  const handleZIndex = async () => {
    const templateCopy = {...template};
    templateCopy.images[index].zIndex = templateCopy.images[index].zIndex + 1;
    settemplate(templateCopy);
    setshowUpperBar(false);
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (event, gesture) => {
      const newWidth = Math.max(50, size.width + gesture.dx);
      const newHeight = Math.max(50, size.height + gesture.dy);
      setSize({width: newWidth, height: newHeight});
    },
  });

  return (
    <Pressable style={{position: 'relative', zIndex: img.zIndex}}>
      <Draggable disabled={selectedIndex == index} x={img.x} y={img.y}>
        <Pressable
          style={{
            borderWidth: selectedIndex == index ? 2 : 0,
            opacity: img.opacity == 0 ? 0 : 1,
            borderColor: 'red',
            position: 'relative',
            zIndex: img.zIndex,
          }}
          onPress={() => {
            setselectedIndex(index);
            setshowUpperBar(false);
          }}
          onLongPress={handleShowUpperBar}>
          {/* {selectedIndex == index && (
            <View
              style={{
                position: 'absolute',
                top: -35,
                paddingHorizontal: 12,
                paddingVertical: 7,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 20,
                backgroundColor: 'white',
                elevation: 5,
                borderRadius: 15,
              }}>
              <Pressable onPress={selectImage}>
                <AntIcons name="plus" color="black" size={16} />
              </Pressable>
            </View>
          )} */}
          <Image
            {...(selectedIndex == index ? panResponder.panHandlers : {})}
            source={
              typeof img.source == 'number' ? img.source : {uri: img.source}
            }
            style={{width: size.width, height: size.height}}
          />
        </Pressable>
      </Draggable>
    </Pressable>
  );
};

export default ImageRender;

const styles = StyleSheet.create({});
