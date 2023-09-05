import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

const TagInput = () => {
  const [tags, setTags] = useState([]);
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
              <Text>{tag}</Text>
              <Icon name="close" size={16} />
            </TouchableOpacity>
          </View>
        ))}
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={newText => setText(newText)}
          onSubmitEditing={addTag}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tagWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  inputsWrapper: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    // minHeight: 60,
    borderWidth: 1,
    width: '100%',
    borderColor: '#a9a9a9',
    borderRadius: 10,
    flexWrap: 'wrap',
  },
  tag: {
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#e0e0e0',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    margin: 5,
  },
  input: {
    flex: 1,
    height: '100%',
    borderWidth: 0,
    borderColor: '#ccc',
    borderRadius: 20,
  },
});

export default TagInput;
