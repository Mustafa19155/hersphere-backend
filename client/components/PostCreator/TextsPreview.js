// import {
//   Dimensions,
//   Pressable,
//   ScrollView,
//   StyleSheet,
//   Text,
//   View,
// } from 'react-native';
// import React, {useEffect, useState} from 'react';

// const TextsPreview = ({template, settemplate}) => {
//   const [fontNames, setFontNames] = useState([
//     'DMSans',
//     'RubikBubbles',
//     'Whisper',
//   ]);

//   const handleAddText = ({font}) => {
//     settemplate({
//       ...template,
//       images: [
//         ...template.images,
//         {
//           x: 20,
//           y: 20,
//           zIndex: 999,
//           height: Dimensions.get('screen').height / 7,
//           width: Dimensions.get('screen').width / 3,
//           text: font,
//           fontFamily: font,
//           fontSize: Dimensions.get('screen').width / 15,
//           color: 'black',
//           type: 'text',
//         },
//       ],
//     });
//   };

//   return (
//     <ScrollView
//       showsHorizontalScrollIndicator={false}
//       horizontal={true}
//       style={{backgroundColor: 'red'}}>
//       {/* <View
//         style={{
//           flexDirection: 'row',
//           gap: 30,
//         }}> */}
//       {fontNames.map((font, index) => (
//         <Pressable
//           onPress={() => handleAddText({font})}
//           style={{
//             width: '100%',
//             height: 65,
//             borderWidth: 1,
//             borderRadius: 4,
//             padding: 10,
//             justifyContent: 'center',
//             alignItems: 'center',
//           }}>
//           <Text style={{fontFamily: font}}>{font}</Text>
//         </Pressable>
//       ))}
//       {/* </View> */}
//     </ScrollView>
//   );
// };

// export default TextsPreview;

// const styles = StyleSheet.create({});

import {
  Dimensions,
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Draggable from 'react-native-draggable';
import AntDesigns from 'react-native-vector-icons/AntDesign';

const TemplatesPreview = ({template, settemplate, setcurrentShow}) => {
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
    <View style={{gap: 10}}>
      <TouchableWithoutFeedback onPress={() => setcurrentShow(null)}>
        <AntDesigns name="left" size={15} />
      </TouchableWithoutFeedback>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={{flexDirection: 'row', gap: 10}}>
          {fontNames.map((font, index) => (
            <View
              style={{
                width: 150,
                height: 65,
                borderWidth: 1,
                borderRadius: 4,
                padding: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Pressable onPress={() => handleAddText({font: font})}>
                <Text style={{fontFamily: font}}>{font}</Text>
              </Pressable>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default TemplatesPreview;

const styles = StyleSheet.create({});
