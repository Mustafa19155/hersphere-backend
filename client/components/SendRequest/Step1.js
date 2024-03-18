import {StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {Button, Checkbox} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import global from '../../assets/styles/global';
import {RequestContext} from '../../contexts/requestContext';

const Step1 = () => {
  const {platforms, setplatforms, influencerData, setcurrentStep} =
    useContext(RequestContext);
  const [isValidStep, setisValidStep] = useState(false);

  useEffect(() => {
    if (platforms.length > 0) {
      setisValidStep(true);
    } else {
      setisValidStep(false);
    }
  }, [platforms]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'space-between',
      }}>
      <View>
        <Text style={[global.fontBold, global.textNormal]}>
          Choose Platform
        </Text>
        <View style={{gap: 20, marginVertical: 15}}>
          {influencerData.platforms.includes('instagram') && (
            <View style={styles.optWrapper}>
              <Checkbox
                status={
                  platforms.some(plat => plat == 'instagram')
                    ? 'checked'
                    : 'unchecked'
                }
                color="green"
                onPress={() =>
                  setplatforms(
                    platforms.find(pl => pl == 'instagram')
                      ? platforms.filter(pl => pl != 'instagram')
                      : [...platforms, 'instagram'],
                  )
                }
              />
              <Text style={styles.text}>Instagram</Text>
              <Icon name="logo-instagram" color="#bc2a8d" size={34} />
            </View>
          )}
          {influencerData.platforms.includes('facebook') && (
            <View style={styles.optWrapper}>
              <Checkbox
                status={
                  platforms.some(plat => plat == 'facebook')
                    ? 'checked'
                    : 'unchecked'
                }
                color="green"
                onPress={() =>
                  setplatforms(
                    platforms.find(pl => pl == 'facebook')
                      ? platforms.filter(pl => pl != 'facebook')
                      : [...platforms, 'facebook'],
                  )
                }
              />
              <Text style={styles.text}>Facebook</Text>
              <Icon name="logo-facebook" color="#4267B2" size={34} />
            </View>
          )}
          {influencerData.platforms.includes('youtube') && (
            <View style={styles.optWrapper}>
              <Checkbox
                status={
                  platforms.some(plat => plat == 'youtube')
                    ? 'checked'
                    : 'unchecked'
                }
                color="green"
                onPress={() =>
                  setplatforms(
                    platforms.find(pl => pl == 'youtube')
                      ? platforms.filter(pl => pl != 'youtube')
                      : [...platforms, 'youtube'],
                  )
                }
              />
              <Text style={styles.text}>Youtube</Text>
              <Icon name="logo-youtube" color="#FF0000" size={34} />
            </View>
          )}
        </View>
      </View>
      <Button
        disabled={!isValidStep}
        style={[global.greenBtn]}
        onPress={() => {
          setcurrentStep(step => step + 1);
        }}>
        <Text style={global.greenBtnText}>Continue</Text>
      </Button>
    </View>
  );
};

export default Step1;

const styles = StyleSheet.create({
  optWrapper: {
    backgroundColor: 'white',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    elevation: 5,
    padding: 8,
    marginHorizontal: 2,
    borderRadius: 10,
  },
  text: [global.textSmall, {fontWeight: 600, width: 80}],
});
