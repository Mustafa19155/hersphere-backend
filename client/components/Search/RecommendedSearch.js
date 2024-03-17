import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Avatar from '../../assets/images/avatar.png';
import global from '../../assets/styles/global';
import SearchCard from './SearchCard';
import {getRecommendedInfluencers} from '../../api/user';

const RecommendedSearch = () => {
  const [loading, setloading] = useState(false);
  const [data, setdata] = useState([
    // {
    //   name: 'Ayesha Rehman',
    //   description: 'Interior Designer Planner',
    //   image: Avatar,
    //   rating: 5.0,
    //   platforms: ['facebook', 'instagram', 'youtube'],
    // },
    // {
    //   name: 'Ayesha Rehman',
    //   description: 'Interior Designer Planner',
    //   image: Avatar,
    //   rating: 3.5,
    //   platforms: ['facebook', 'youtube'],
    // },
    // {
    //   name: 'Ayesha Rehman',
    //   description: 'Interior Designer Planner',
    //   image: Avatar,
    //   rating: 2.5,
    //   platforms: ['facebook', 'instagram', 'youtube'],
    // },
  ]);

  const getInfluencers = async () => {
    setloading(true);
    getRecommendedInfluencers()
      .then(res => {
        setdata(res);
        setloading(false);
      })
      .catch(err => {
        setloading(false);
      });
  };

  useEffect(() => {
    getInfluencers();
  }, []);

  return (
    <View>
      <Text style={[global.textSmall, global.fontBold]}>
        Recommended Influencers
      </Text>
      <View style={{marginTop: 20}}>
        {data.map(d => (
          <SearchCard search={d} />
        ))}
      </View>
    </View>
  );
};

export default RecommendedSearch;

const styles = StyleSheet.create({});
