import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';

const TextsPreview = ({template, settemplate}) => {
  const [fontNames, setFontNames] = useState([
    'DMSans',
    'RubikBubbles',
    'Whisper',
  ]);

  const handleAddText = ({font}) => {
    settemplate({
      ...template,
      images: [
        ...template.images,
        {
          x: 20,
          y: 20,
          zIndex: 999,
          height: Dimensions.get('screen').height / 7,
          width: Dimensions.get('screen').width / 3,
          text: font,
          fontFamily: font,
          fontSize: Dimensions.get('screen').width / 15,
          color: 'black',
          type: 'text',
        },
      ],
    });
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{flexDirection: 'row', flexWrap: 'wrap', gap: 10}}>
        {fontNames.map(font => (
          <Pressable
            onPress={() => handleAddText({font})}
            style={{
              width: '30%',
              borderWidth: 1,
              borderRadius: 4,
              padding: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontFamily: font}}>{font}</Text>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
};

export default TextsPreview;

const styles = StyleSheet.create({});
