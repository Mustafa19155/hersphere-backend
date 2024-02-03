import {StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {Button} from 'react-native-paper';
import global from '../../assets/styles/global';
import {getAllWorkplaces} from '../../api/workplace';

const Marketplace = () => {
  const navigation = useNavigation();
  const [loading, setloading] = useState(false);
  const [workplaces, setworkplaces] = useState([]);

  const handleGetWorkplaces = () => {
    setloading(true);
    getAllWorkplaces()
      .then(res => {
        setloading(false);
        setworkplaces(res);
      })
      .catch(err => {
        setloading(false);
      });
  };

  useFocusEffect(
    useCallback(() => {
      handleGetWorkplaces();
    }, []),
  );

  return (
    <View style={{gap: 10}}>
      <View style={{flexDirection: 'row', gap: 10, justifyContent: 'flex-end'}}>
        <Button
          style={[global.greenBtnSm, {width: 110, alignSelf: 'flex-end'}]}
          onPress={() => navigation.navigate('CreateWorkplace')}>
          <Text style={[global.greenBtnTextSm]}>New Workplace</Text>
        </Button>
        <Button
          style={[global.greenBtnSm, {width: 110, alignSelf: 'flex-end'}]}
          onPress={() => navigation.navigate('CreateJob')}>
          <Text style={[global.greenBtnTextSm]}>Post Job</Text>
        </Button>
      </View>
      <Text style={[global.textLarge]}>My Workplaces</Text>
      <View style={{gap: 10}}>
        {workplaces.map(place => (
          <View>
            <Text>{place.name}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Marketplace;

const styles = StyleSheet.create({});
