import {StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import Avatar from '../../assets/images/avatar.png';
import global from '../../assets/styles/global';
import SearchCard from './SearchCard';
import {SearchContext} from '../../contexts/searchContext';
import {searchInfluencers} from '../../api/user';
import Loader from '../Loader';

const SearchResults = () => {
  const {name, platforms, categories} = useContext(SearchContext);
  const [loading, setloading] = useState(false);

  const [data, setdata] = useState([]);

  const filterData = () => {
    return data;
  };

  useEffect(() => {
    setloading(true);
    searchInfluencers({name, platforms, categories})
      .then(res => {
        setloading(false);
        setdata(res);
      })
      .catch(err => {
        setloading(false);
      });
  }, [name, platforms, categories]);

  return (
    <View>
      {loading ? (
        <View style={{marginTop: 50}}>
          <Loader size={20} color={'black'} />
        </View>
      ) : (
        <>
          {data.length === 0 && (
            <Text
              style={[{textAlign: 'center', marginTop: 50}, global.fontMedium]}>
              No results found
            </Text>
          )}
          <View style={{marginTop: 20}}>
            {filterData({data}).map(d => (
              <SearchCard search={d} />
            ))}
          </View>
        </>
      )}
    </View>
  );
};

export default SearchResults;

const styles = StyleSheet.create({});
