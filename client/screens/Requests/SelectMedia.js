import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getPromotion} from '../../api/promotion';
import global from '../../assets/styles/global';
import {useNavigation} from '@react-navigation/native';

const SelectMedia = ({route}) => {
  const [loading, setloading] = useState(false);
  const [request, setrequest] = useState(null);

  const navigation = useNavigation();

  const {id} = route.params;

  const handleGet = () => {
    setloading(true);
    getPromotion({id})
      .then(res => {
        setrequest(res);
        setloading(false);
      })
      .catch(err => {
        setloading(false);
      });
  };

  useEffect(() => {
    handleGet();
  }, []);

  return (
    <View>
      {request && (
        <View style={{gap: 10}}>
          <Text style={[global.gray3Color]}>
            Begin your creative journey professionally. Select from our curated
            media, integrate your unique materials, or customize with our
            intuitive PostCreator feature.
          </Text>
          <View style={{gap: 10}}>
            {!request.allowInfluencerToAddData ? (
              <TouchableOpacity
                onPress={() => navigation.navigate('UploadAndPost', {id})}
                style={[
                  global.gray2Back,
                  {padding: 20, borderRadius: 10, alignItems: 'center'},
                ]}>
                <Text>Use Provided Media</Text>
              </TouchableOpacity>
            ) : (
              <>
                <TouchableOpacity
                  onPress={() => navigation.navigate('UploadAndPost', {id})}
                  style={[
                    global.gray2Back,
                    {padding: 20, borderRadius: 10, alignItems: 'center'},
                  ]}>
                  <Text>Use Your Material</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.navigate('PostCreator', {id})}
                  style={[
                    global.gray2Back,
                    {padding: 20, borderRadius: 10, alignItems: 'center'},
                  ]}>
                  <Text>Customize with Post Creator</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      )}
    </View>
  );
};

export default SelectMedia;

const styles = StyleSheet.create({});
