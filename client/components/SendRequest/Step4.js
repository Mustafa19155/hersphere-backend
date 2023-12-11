import {StyleSheet, Text, View} from 'react-native';
import React, {useContext, useState} from 'react';
import global from '../../assets/styles/global';
import {Checkbox, TextInput} from 'react-native-paper';
import {RequestContext} from '../../contexts/requestContext';

const Step4 = ({isValidStep, setisValidStep}) => {
  const {paymentMethod, setpaymentMethod} = useContext(RequestContext);

  const [cards, setcards] = useState([
    {
      number: '1234 1234 1234 1234',
      cvv: 123,
      expiry: '12/23',
    },
    {
      number: '1234 1234 1234 1234',
      cvv: 123,
      expiry: '12/23',
    },
  ]);

  const [activeCard, setactiveCard] = useState(cards[0]);

  return (
    <View>
      <Text style={[global.fontBold, global.textNormal]}>Billing Details</Text>
      <View style={{gap: 15}}>
        <View style={styles.optWrapper}>
          <Text style={[global.textSmall, global.fontBold]}>Total payment</Text>
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
        <View style={styles.checkboxWrapper}>
          <Checkbox
            onPress={() => setpaymentMethod('wallet')}
            status={paymentMethod == 'wallet' ? 'checked' : 'unchecked'}
            color="green"
          />
          <Text style={[{fontWeight: '600'}, global.textSmall]}>
            Pay with wallet
          </Text>
        </View>
        <View style={styles.checkboxWrapper}>
          <Checkbox
            onPress={() => setpaymentMethod('card')}
            status={paymentMethod == 'card' ? 'checked' : 'unchecked'}
            color="green"
          />
          <Text style={[{fontWeight: '600'}, global.textSmall]}>
            Pay with card
          </Text>
        </View>
        {paymentMethod == 'card' && (
          <View style={{gap: 10, marginBottom: 20, marginHorizontal: 20}}>
            {cards.map(card => (
              <View
                style={{
                  flexDirection: 'row',
                  gap: 5,
                  elevation: 5,
                  backgroundColor: 'white',
                  borderRadius: 10,
                  paddingVertical: 6,
                }}>
                <Checkbox
                  onPress={() => setactiveCard(card)}
                  status={activeCard == card ? 'checked' : 'unchecked'}
                  color="green"
                />
                <View style={{gap: 10}}>
                  <Text style={[global.fontBold, global.textSmall]}>
                    {card.number
                      .substring(0, card.number.length - 4)
                      .split('')
                      .map(a => (
                        <Text>. </Text>
                      ))}
                    {card.number.substring(
                      card.number.length - 4,
                      card.number.length,
                    )}
                  </Text>
                  <Text style={[global.fontBold, global.textSmall]}>
                    Expiry Date . . / . .
                  </Text>
                  <Text style={[global.fontBold, global.textSmall]}>
                    CVV . . .
                  </Text>
                </View>
              </View>
            ))}
          </View>
        )}
      </View>
    </View>
  );
};

export default Step4;

const styles = StyleSheet.create({
  optWrapper: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 5,
    marginTop: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 2,
    borderRadius: 10,
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
});
