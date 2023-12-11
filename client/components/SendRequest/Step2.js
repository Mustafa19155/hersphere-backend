import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityBase,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import {RequestContext} from '../../contexts/requestContext';
import {Checkbox, TextInput} from 'react-native-paper';
import global from '../../assets/styles/global';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const Step2 = ({isValidStep, setisValidStep}) => {
  const {
    category,
    setcategory,
    description,
    setdescription,
    likes,
    setlikes,
    comments,
    setcomments,
    days,
    setdays,
    allowInfluencerToAddData,
    setallowInfluencerToAddData,
  } = useContext(RequestContext);

  const categories = [
    {
      name: 'category 1',
    },
    {
      name: 'category 2',
    },
    {
      name: 'category 3',
    },
    {
      name: 'category 4',
    },
    {
      name: 'category 5',
    },
    {
      name: 'category 6',
    },
    {
      name: 'category 7',
    },
  ];

  useEffect(() => {
    if (category && description) {
      if (
        parseInt(likes) >= 25 &&
        parseInt(comments) >= 25 &&
        parseInt(days) >= 2
      ) {
        setisValidStep(true);
      } else {
        setisValidStep(false);
      }
    }
  }, [category, description, allowInfluencerToAddData, likes, comments, days]);

  return (
    <View>
      <Text>Enter the details</Text>
      <Picker
        selectedValue={category}
        style={{
          height: 50,
          width: '100%',
          backgroundColor: '#EEEEEE',
        }}
        onValueChange={(itemValue, itemIndex) => setcategory(itemValue)}>
        {categories.map(cat => (
          <Picker.Item label={cat.name} value={cat.name} />
        ))}
      </Picker>
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setdescription}
        multiline={true}
        numberOfLines={5}
        underlineColor="transparent"
        activeUnderlineColor="transparent"
        mode="flat"
        style={[global.gray2Back, {borderRadius: 10, marginVertical: 10}]}
      />
      <View style={styles.likesWrapepr}>
        <View style={styles.likesSubWrapper}>
          <Text style={[global.textExtraSmall, {fontWeight: 600}]}>
            No. of likes
          </Text>
          <TextInput
            value={likes}
            onChangeText={text => setlikes(text.replace(/[^0-9]/g, ''))}
            keyboardType="phone-pad"
            underlineColor="transparent"
            activeUnderlineColor="transparent"
            mode="flat"
            style={[global.gray2Back, {borderRadius: 10}]}
          />
        </View>
        <View style={styles.likesSubWrapper}>
          <Text style={[global.textExtraSmall, {fontWeight: 600}]}>
            No. of comments
          </Text>
          <TextInput
            value={comments}
            onChangeText={text => setcomments(text.replace(/[^0-9]/g, ''))}
            underlineColor="transparent"
            activeUnderlineColor="transparent"
            mode="flat"
            style={[global.gray2Back, {borderRadius: 10}]}
          />
        </View>
        <View style={styles.likesSubWrapper}>
          <Text style={[global.textExtraSmall, {fontWeight: 600}]}>
            No. of days
          </Text>
          <TextInput
            value={days}
            onChangeText={text => setdays(text.replace(/[^0-9]/g, ''))}
            underlineColor="transparent"
            activeUnderlineColor="transparent"
            mode="flat"
            style={[global.gray2Back, {borderRadius: 10}]}
          />
        </View>
      </View>
      <View style={styles.optWrapper}>
        <Text style={[global.textSmall, global.fontBold]}>
          Total payment will be
        </Text>
        <TextInput
          disabled
          value="$ 25"
          underlineColor="transparent"
          activeUnderlineColor="transparent"
          mode="flat"
          style={[
            global.gray2Back,
            {
              height: 45,
              width: 84,
              justifyContent: 'center',
              alignItems: 'center',
            },
          ]}
        />
      </View>
    </View>
  );
};

export default Step2;

const styles = StyleSheet.create({
  optWrapper: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 2,
    borderRadius: 10,
  },
  likesWrapepr: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  likesSubWrapper: {
    gap: 7,
    width: '30%',
  },
  checkboxWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    elevation: 5,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
  },
  imagePicker: {
    borderWidth: 1,
    height: 100,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'dashed',
  },
});
