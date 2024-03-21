import {
  Dimensions,
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import Draggable from 'react-native-draggable';

const TemplatesPreview = ({templates, activeTemplate, setactiveTemplate}) => {
  const height = 70;
  const width = 300;
  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      <View style={{flexDirection: 'row', gap: 10}}>
        {templates.map((temp, index) => (
          <View
            style={{
              overflow: 'hidden',
              height: height,
              width: width,
              borderWidth: temp == activeTemplate ? 2 : 0,
              borderColor: 'red',
              position: 'relative',
              borderRadius: 7,
            }}>
            {temp.images.map((img, index) => (
              <Pressable style={{position: 'relative', zIndex: img.zIndex}}>
                <Draggable
                  disabled
                  x={(img.x / temp.width) * width}
                  y={(img.y / temp.height) * height}>
                  <Pressable
                    onPress={() => {
                      setTimeout(() => {
                        setactiveTemplate(JSON.parse(JSON.stringify(temp)));
                      }, 0);
                      setactiveTemplate(null);
                    }}
                    style={{
                      position: 'relative',
                      zIndex: img.zIndex,
                      width: (img.width / temp.width) * width,
                      height: (img.height / temp.height) * height,
                    }}>
                    {img.type == 'image' ? (
                      <Image
                        source={img.source}
                        style={{
                          width: '100%',
                          height: '100%',
                        }}
                      />
                    ) : (
                      <Text
                        style={{
                          fontSize: (img.fontSize / temp.height) * height,
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
              source={temp.background}
              style={{
                width: '100%',
                height: '100%',
                zIndex: -1,
              }}>
              <Pressable
                style={{width: '100%', height: '100%'}}
                onPress={() => {
                  setTimeout(() => {
                    setactiveTemplate(JSON.parse(JSON.stringify(temp)));
                  }, 0);
                  setactiveTemplate(null);
                }}></Pressable>
            </ImageBackground>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default TemplatesPreview;

const styles = StyleSheet.create({});
