import {StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import Avatar from '../../assets/images/avatar.png';
import global from '../../assets/styles/global';
import SearchCard from './SearchCard';
import {SearchContext} from '../../contexts/searchContext';
import {searchInfluencers} from '../../api/user';

const SearchResults = () => {
  const {name, platforms, categories} = useContext(SearchContext);

  const [data, setdata] = useState([]);

  const filterData = () => {
    return data;
  };

  useEffect(() => {
    searchInfluencers({name, platforms, categories})
      .then(res => {
        console.log(res);
        setdata(res);
      })
      .catch(err => {
        console.log(err);
      });
  }, [name, platforms, categories]);

  return (
    <View>
      <View style={{marginTop: 20}}>
        {filterData({data}).map(d => (
          <SearchCard search={d} />
        ))}
      </View>
    </View>
  );
};

export default SearchResults;

const styles = StyleSheet.create({});
