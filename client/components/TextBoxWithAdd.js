import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import global from '../assets/styles/global';

const TextBoxWithAdd = ({tags, setTags}) => {
  const [text, setText] = useState('');

  const addTag = () => {
    if (text.trim() !== '') {
      setTags([...tags, text.trim()]);
      setText('');
    }
  };

  const removeTag = index => {
    const newTags = [...tags];
    newTags.splice(index, 1);
    setTags(newTags);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputsWrapper}>
        {tags.map((tag, index) => (
          <View key={index} style={styles.tag}>
            <TouchableOpacity
              onPress={() => removeTag(index)}
              style={styles.tagWrapper}>
              <Text style={{color: 'white'}}>{tag}</Text>
              <Icon name="close" size={16} color="white" />
            </TouchableOpacity>
          </View>
        ))}

        <TextInput
          placeholder="Skills..."
          value={text}
          onChangeText={setText}
          outlineColor="transparent"
          activeOutlineColor="transparent"
          style={[{height: 35}]}
          underlineColor="transparent"
          mode="outlined"
          onEndEditing={addTag}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: [
    global.gray2Back,
    {
      overflow: 'hidden',
      borderRadius: 5,
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
  ],
  tagWrapper: [{flexDirection: 'row', alignItems: 'center', gap: 5}],
  inputsWrapper: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 20,
    alignItems: 'center',
    width: '100%',
    borderRadius: 10,
    flexWrap: 'wrap',
  },
  tag: [
    global.greenBack,
    {
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 20,
      paddingVertical: 8,
      paddingHorizontal: 10,
      margin: 5,
    },
  ],
  input: {
    flex: 1,
    height: '100%',
    borderWidth: 0,
    borderColor: '#ccc',
    borderRadius: 20,
  },
});

export default TextBoxWithAdd;
