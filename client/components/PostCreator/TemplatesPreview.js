import {
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
  const size = 70;

  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      <View style={{flexDirection: 'row', gap: 10}}>
        {templates.map((temp, index) => (
          <View
            style={{
              overflow: 'hidden',
              height: size,
              width: size,
              backgroundColor: 'red',
              borderWidth: temp == activeTemplate ? 2 : 0,
              borderColor: 'red',
              position: 'relative',
              borderRadius: 7,
            }}>
            {temp.images.map(img => (
              <Pressable style={{position: 'relative', zIndex: img.zIndex}}>
                <Draggable
                  disabled
                  x={(img.x / temp.width) * size}
                  y={(img.y / temp.height) * size}>
                  <Pressable
                    style={{
                      position: 'relative',
                      zIndex: img.zIndex,
                      width: (img.width / temp.width) * size,
                      height: (img.height / temp.height) * size,
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
                          fontSize: (img.fontSize / temp.width) * size,
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
                onPress={() =>
                  setactiveTemplate(JSON.parse(JSON.stringify(temp)))
                }></Pressable>
            </ImageBackground>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default TemplatesPreview;

const styles = StyleSheet.create({});
