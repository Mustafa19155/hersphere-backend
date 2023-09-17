//  import React, {useState} from 'react';
// import {Button, Text, View} from 'react-native-paper';
// import Modal from 'react-native-modal';
// import {RadioButton} from 'react-native-paper';

// function SocialPageChooseModal({open, onconfirm, data}) {
//   const [checked, setchecked] = useState(0);
//   return (
//     <View style={{flex: 1}}>
//       <Modal isVisible={open}>
//         <View style={{flex: 1}}>
//           {data.map((page, index) => (
//             <View>
//               <RadioButton
//                 value={page.name}
//                 status={checked == index}
//                 onPress={() => setchecked(index)}
//               />
//               {/* <Text>{page.name}</Text>
//               <Text>{page.followers_count}</Text>
//               <Text>{page.totalPosts}</Text> */}
//             </View>
//           ))}
//           <Button onPress={onconfirm}>Confirm</Button>
//         </View>
//       </Modal>
//     </View>
//   );
// }

// export default SocialPageChooseModal;

import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {Modal, Portal, Text, Button, RadioButton} from 'react-native-paper';

export default function SocialPageChooseModal({open, onconfirm, data, type}) {
  const [checked, setchecked] = useState(0);
  const containerStyle = {backgroundColor: 'white', padding: 20};

  return (
    <Portal>
      <Modal
        dismissable={false}
        visible={open}
        contentContainerStyle={containerStyle}>
        <Text style={styles.mainHeading}>Please select a page to continue</Text>
        {data.map((page, index) => (
          <View style={styles.optionWrapper}>
            <RadioButton
              status={checked == index ? 'checked' : 'unchecked'}
              onPress={() => setchecked(index)}
            />
            <Text style={styles.heading}>{page.name}</Text>
            {/* <Text>{page.followers_count}</Text>
            <Text>{page.totalPosts}</Text> */}
          </View>
        ))}
        <Button
          style={styles.button}
          onPress={() => onconfirm(data[checked], type)}>
          <Text style={{color: 'white'}}>Continue</Text>
        </Button>
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  mainHeading: {
    fontSize: 22,
    marginBottom: 20,
  },
  heading: {
    fontSize: 20,
  },
  optionWrapper: {
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  button: {
    marginTop: 30,
    backgroundColor: '#2A52C1',
    width: '100%',
  },
});
