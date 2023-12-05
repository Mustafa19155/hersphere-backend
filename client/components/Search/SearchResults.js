import {StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import Avatar from '../../assets/images/avatar.png';
import global from '../../assets/styles/global';
import SearchCard from './SearchCard';
import {SearchContext} from '../../contexts/searchContext';

const SearchResults = () => {
  const {name, platforms, categories} = useContext(SearchContext);

  const [data, setdata] = useState([
    {
      name: 'Ayesha Rehman',
      description: 'Interior Designer Planner',
      image: Avatar,
      rating: 5.0,
      platforms: ['facebook', 'instagram', 'youtube'],
      targetAudience: ['category 1', 'category 2'],
    },
    {
      name: 'Ayesha Rehman',
      description: 'Interior Designer Planner',
      image: Avatar,
      rating: 3.5,
      platforms: ['facebook', 'youtube'],
      targetAudience: ['category 1', 'category 5'],
    },
    {
      name: 'Ayesha Rehman',
      description: 'Interior Designer Planner',
      image: Avatar,
      rating: 2.5,
      platforms: ['facebook', 'instagram', 'youtube'],
      targetAudience: ['category 1', 'category 2'],
    },
    {
      name: 'Ayesha Rehman',
      description: 'Interior Designer Planner',
      image: Avatar,
      rating: 5.0,
      platforms: ['facebook', 'instagram', 'youtube'],
      targetAudience: ['category 1', 'category 2'],
    },
    {
      name: 'Ayesha Rehman',
      description: 'Interior Designer Planner',
      image: Avatar,
      rating: 3.5,
      platforms: ['facebook', 'youtube'],
      targetAudience: ['category 1', 'category 4'],
    },
    {
      name: 'Ayesha Rehman',
      description: 'Interior Designer Planner',
      image: Avatar,
      rating: 2.5,
      platforms: ['facebook', 'instagram', 'youtube'],
      targetAudience: ['category 1', 'category 2'],
    },
    {
      name: 'Ayesha Rehman',
      description: 'Interior Designer Planner',
      image: Avatar,
      rating: 5.0,
      platforms: ['facebook', 'instagram', 'youtube'],
      targetAudience: ['category 1', 'category 2'],
    },
    {
      name: 'Ayesha Rehman',
      description: 'Interior Designer Planner',
      image: Avatar,
      rating: 3.5,
      platforms: ['facebook', 'youtube'],
      targetAudience: ['category 1', 'category 3'],
    },
    {
      name: 'Ayesha Rehman',
      description: 'Interior Designer Planner',
      image: Avatar,
      rating: 2.5,
      platforms: ['facebook', 'instagram', 'youtube'],
      targetAudience: ['category 1', 'category 2'],
    },
  ]);

  const filterData = () => {
    return data
      .filter(item => item.name.toLowerCase().includes(name.toLowerCase()))

      .filter(item =>
        platforms.every(platform => item.platforms.includes(platform)),
      )

      .filter(
        item =>
          !categories ||
          categories.every(target => item.targetAudience.includes(target)),
      );
  };

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
