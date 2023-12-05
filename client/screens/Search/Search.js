import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {TextInput} from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import global from '../../assets/styles/global';
import FilterIcon from '../../assets/icons/filter.png';
import FilterModal from '../../components/Search/FilterModal';
import {SearchContext} from '../../contexts/searchContext';
import RecommendedSearch from '../../components/Search/RecommendedSearch';
import SearchResults from '../../components/Search/SearchResults';

const Search = () => {
  const [filterModalOpen, setfilterModalOpen] = useState(false);

  const {name, setname, platforms, categories} = useContext(SearchContext);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <FilterModal open={filterModalOpen} setopen={setfilterModalOpen} />
      <View style={{flexDirection: 'row', gap: 5}}>
        <View style={styles.searchWrapper}>
          <Icon name="search1" size={20} />
          <TextInput
            placeholder="Search"
            mode="flat"
            underlineColor="transparent"
            activeUnderlineColor="transparent"
            // left={<TextInput.Icon icon="eye" />}
            value={name}
            style={{backgroundColor: 'transparent', width: '100%'}}
            onChangeText={setname}
          />
        </View>
        <Pressable
          onPress={() => setfilterModalOpen(true)}
          style={[
            global.greenBack,
            {
              paddingVertical: 10,
              paddingHorizontal: 20,
              borderRadius: 15,
              justifyContent: 'center',
            },
          ]}>
          <Image source={FilterIcon} />
        </Pressable>
      </View>
      <View style={{marginTop: 20}}>
        {name == '' && platforms.length == 0 && categories.length == 0 ? (
          <RecommendedSearch />
        ) : (
          <SearchResults />
        )}
      </View>
    </ScrollView>
  );
};

export default Search;

const styles = StyleSheet.create({
  searchWrapper: [
    global.gray2Back,
    {
      width: '80%',
      borderRadius: 15,
      paddingHorizontal: 10,
      flexDirection: 'row',
      alignItems: 'center',
    },
  ],
});
