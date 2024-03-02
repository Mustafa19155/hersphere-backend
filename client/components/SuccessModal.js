import {Image, View} from 'react-native';
import {Modal, Portal, Text} from 'react-native-paper';
import global from '../assets/styles/global';
import TickIcon from '../assets/icons/tick-green.png';

const {useNavigation} = require('@react-navigation/native');

const SuccessModal = ({open, setopen, text}) => {
  const navigation = useNavigation();

  const containerStyle = {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 40,
    borderRadius: 10,
    width: '90%',
    alignSelf: 'center',
  };

  return (
    <Portal>
      <Modal
        visible={open}
        onDismiss={() => {
          setopen(false);
          navigation.goBack();
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
          <Image source={TickIcon} />
        </View>
      </Modal>
    </Portal>
  );
};

export default SuccessModal;
