import React from 'react';
import {Modal, Portal} from 'react-native-paper';
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
import Draggable from 'react-native-draggable';
import global from '../../assets/styles/global';
import CapitalizeFirst from '../../utils/CapitalizeFirst';

const Templates = ({open, setopen, templates, setactiveTemplate}) => {
  const height = Dimensions.get('window').width / 2.7;
  const width = Dimensions.get('window').width / 2.4;

  const containerStyle = {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 20,
    height: Dimensions.get('window').height - 100,
  };

  return (
    <Portal>
      <Modal
        style={styles.modal}
        visible={open}
        onDismiss={() => setopen(null)}
        contentContainerStyle={containerStyle}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              flexDirection: 'row',
              gap: 20,
              flexWrap: 'wrap',
              justifyContent: 'space-between',
            }}>
            {templates.map((temp, index) => (
              <View style={{height: height + 70}}>
                <View style={{position: 'absolute', top: height + 25}}>
                  <Text style={[global.fontMedium, global.text14]}>
                    {temp.name}
                  </Text>
                  <Text style={[global.textExtraSmall, global.gray3Color]}>
                    {CapitalizeFirst(temp.type)} Post
                  </Text>
                </View>

                <View
                  style={{
                    overflow: 'hidden',
                    height: height + 25,
                    width: width,
                    position: 'relative',
                    borderRadius: 7,
                  }}>
                  {temp.images.map((img, index) => (
                    <Pressable
                      style={{position: 'relative', zIndex: img.zIndex}}>
                      <Draggable
                        disabled
                        x={(img.x / temp.width) * width}
                        y={(img.y / temp.height) * height}>
                        <Pressable
                          onPress={() => {
                            setTimeout(() => {
                              setactiveTemplate(
                                JSON.parse(JSON.stringify(temp)),
                              );
                            }, 0);
                            setopen(null);
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
                      borderRadius: 10,
                      overflow: 'hidden',
                      zIndex: -1,
                      position: 'relative',
                    }}>
                    <Pressable
                      style={{
                        width: '100%',
                        height: '85%',
                      }}
                      onPress={() => {
                        setTimeout(() => {
                          setactiveTemplate(JSON.parse(JSON.stringify(temp)));
                        }, 0);
                        setopen(null);
                        setactiveTemplate(null);
                      }}></Pressable>
                  </ImageBackground>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </Modal>
    </Portal>
  );
};

export default Templates;

const styles = StyleSheet.create({
  modal: {
    bottom: -8,
    justifyContent: 'flex-end',
  },
});
