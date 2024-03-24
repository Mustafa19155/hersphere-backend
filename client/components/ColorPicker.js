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

const ColorPicker = ({open, setopen, onPress}) => {
  const colors = [
    'white',
    'black',
    'red',
    'green',
    'blue',
    'yellow',
    'purple',
    'orange',
    'pink',
    'cyan',
    'magenta',
    'teal',
    'lime',
    'brown',
    'navy',
    'olive',
    'maroon',
    'aquamarine',
    'coral',
    'gold',
    'indigo',
    'lavender',
  ];

  const containerStyle = {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 20,
    height: 350,
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
            }}>
            {colors.map((color, index) => (
              <Pressable key={index} onPress={() => onPress(color)}>
                <View
                  style={{
                    borderWidth: 1,
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: color,
                  }}
                />
              </Pressable>
            ))}
          </View>
        </ScrollView>
      </Modal>
    </Portal>
  );
};

export default ColorPicker;

const styles = StyleSheet.create({
  modal: {
    bottom: -8,
    justifyContent: 'flex-end',
  },
});
