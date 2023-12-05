import React, {useContext, useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import {Pressable, StyleSheet, View} from 'react-native';
import {Button, Modal, Portal, Text} from 'react-native-paper';
import DynamicTextBoxList from '../profileSetup/TextBoxList';
import Icon from 'react-native-vector-icons/Ionicons';
import global from '../../assets/styles/global';
import {SearchContext} from '../../contexts/searchContext';

const FilterModal = ({open, setopen}) => {
  const containerStyle = {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 20,
  };

  const [category, setcategory] = useState('');
  const [targetAudience, settargetAudience] = useState([]);

  const {setname, setplatforms, setcategories} = useContext(SearchContext);

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

  const [platformsAvailable, setplatformsAvailable] = useState([
    {
      name: 'Instagram',
      icon: 'logo-instagram',
      color: '#bc2a8d',
      active: false,
    },
    {name: 'facebook', icon: 'logo-facebook', color: '#4267B2', active: false},
    {name: 'youtube', icon: 'logo-youtube', color: '#FF0000', active: false},
  ]);

  const handleUpdateFilters = () => {
    setplatforms(
      platformsAvailable.filter(pl => pl.active == true).map(p => p.name),
    );
    setcategories(targetAudience);
    setopen(false);
  };

  return (
    <>
      <Portal>
        <Modal
          style={styles.modal}
          visible={open}
          onDismiss={() => setopen(false)}
          contentContainerStyle={containerStyle}>
          <Text style={[global.textMedium, {fontWeight: 'bold'}]}>
            Select Filters
          </Text>
          <View>
            <Text
              style={[
                styles.target,
                {fontWeight: 'bold', marginTop: 20, marginBottom: 10},
              ]}>
              Target Audience
            </Text>
            <Picker
              selectedValue={category}
              style={{
                height: 50,
                width: '100%',
                backgroundColor: '#EEEEEE',
              }}
              onValueChange={(itemValue, itemIndex) => {
                setcategory(itemValue);
                if (!targetAudience.find(ta => ta == itemValue)) {
                  settargetAudience([...targetAudience, itemValue]);
                }
              }}>
              {categories.map(cat => (
                <Picker.Item label={cat.name} value={cat.name} />
              ))}
            </Picker>
            <DynamicTextBoxList
              tags={targetAudience}
              setTags={settargetAudience}
            />
          </View>
          <View>
            <Text style={{fontWeight: 'bold', marginTop: 20, marginBottom: 10}}>
              Platforms
            </Text>
            <View style={styles.platsWrapper}>
              {platformsAvailable.map(plat => (
                <Pressable
                  onPress={() => {
                    const platsCopy = [...platformsAvailable];
                    const platFound = platsCopy.find(
                      pl => pl.name == plat.name,
                    );
                    platFound.active = !platFound.active;
                    setplatformsAvailable(platsCopy);
                  }}
                  style={
                    plat.active
                      ? styles.activePlatFilter
                      : styles.inactivePlatFilter
                  }>
                  <Text
                    style={{
                      color: plat.active ? 'white' : 'black',
                      fontWeight: '600',
                    }}>
                    {plat.name}
                  </Text>
                  <Icon name={plat.icon} color={plat.color} size={20} />
                </Pressable>
              ))}
            </View>
            <Button style={global.greenBtn} onPress={handleUpdateFilters}>
              <Text style={[global.greenBtnText]}>Apply</Text>
            </Button>
          </View>
        </Modal>
      </Portal>
    </>
  );
};

export default FilterModal;

const styles = StyleSheet.create({
  modal: {
    bottom: -8,
    justifyContent: 'flex-end',
  },
  activePlatFilter: [
    global.greenBack,
    {
      width: '48%',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 4,
      paddingVertical: 9,
      borderRadius: 20,
    },
  ],
  inactivePlatFilter: [
    {
      width: '48%',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 4,
      paddingVertical: 9,
      borderWidth: 1,
      borderRadius: 20,
    },
  ],
  platsWrapper: {
    marginBottom: 50,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
});
