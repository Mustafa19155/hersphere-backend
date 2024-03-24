import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {Button, Modal, Portal} from 'react-native-paper';
import global from '../../assets/styles/global';

const ConfirmModal = ({open, setopen, text, onconfirm}) => {
  const containerStyle = {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 40,
    borderRadius: 10,
    width: '90%',
    alignSelf: 'center',
  };

  const [apiCalled, setapiCalled] = useState(false);

  const handleConfirm = () => {
    setapiCalled(true);
    onconfirm();
  };

  return (
    <Portal>
      <Modal
        visible={open}
        onDismiss={() => {
          setopen(false);
        }}
        contentContainerStyle={containerStyle}>
        <View style={{gap: 25, alignItems: 'center'}}>
          <Text
            style={[
              global.blackColor,
              global.textNormal,
              {textAlign: 'center'},
            ]}>
            {text}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            gap: 10,
            justifyContent: 'center',
            marginTop: 20,
          }}>
          <TouchableOpacity
            disabled={apiCalled}
            onPress={() => setopen(false)}
            style={[
              {
                borderWidth: 1,
                borderColor: 'black',
                width: '50%',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
                paddingVertical: 15,
              },
            ]}>
            <Text>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={apiCalled}
            onPress={handleConfirm}
            style={[
              global.greenBtn,
              {width: '50%', justifyContent: 'center', alignItems: 'center'},
            ]}>
            <Text style={[global.greenBtnText]}>
              {apiCalled ? 'Loading...' : 'Continue'}
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </Portal>
  );
};

export default ConfirmModal;

const styles = StyleSheet.create({});
