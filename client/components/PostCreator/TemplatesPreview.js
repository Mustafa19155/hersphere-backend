import {
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import Draggable from 'react-native-draggable';

const TemplatesPreview = ({templates, activeTemplate, setactiveTemplate}) => {
  return (
    <View>
      {templates.map((temp, index) => (
        <View
          style={{
            overflow: 'hidden',
            height: 100,
            width: 100,
            backgroundColor: 'red',
            borderWidth: temp == activeTemplate ? 2 : 0,
            borderColor: 'red',
            position: 'relative',
          }}>
          {temp.images.map(img => (
            <Pressable style={{position: 'relative', zIndex: img.zIndex}}>
              <Draggable
                disabled
                x={(img.x / temp.width) * 100}
                y={(img.y / temp.height) * 100}>
                <Pressable
                  style={{
                    position: 'relative',
                    zIndex: img.zIndex,
                    width: (img.width / temp.width) * 100,
                    height: (img.height / temp.height) * 100,
                  }}>
                  {img.type == 'image' ? (
                    <Image
                      source={{uri: img.source}}
                      style={{
                        width: '100%',
                        height: '100%',
                      }}
                    />
                  ) : (
                    <Text
                      numberOfLines={1}
                      style={{
                        fontSize: (img.fontSize / temp.width) * 100,
                        color: img.color,
                      }}>
                      {img.text}
                    </Text>
                  )}
                </Pressable>
              </Draggable>
            </Pressable>
          ))}
          <ImageBackground
            source={{uri: temp.background}}
            style={{
              width: '100%',
              height: '100%',
              zIndex: -1,
            }}>
            <Pressable
              style={{width: '100%', height: '100%'}}
              onPress={() => setactiveTemplate(temp)}></Pressable>
          </ImageBackground>
        </View>
      ))}
    </View>
  );
};

export default TemplatesPreview;

const styles = StyleSheet.create({});
