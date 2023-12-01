import {StyleSheet} from 'react-native';

export default globalStyles = StyleSheet.create({
  container: {
    width: '90%',
    flex: 1,
    alignSelf: 'center',
    margin: 20,
  },
  greenColor: {
    color: '#13B887',
  },
  blackColor: {
    color: 'black',
  },
  greenBack: {
    backgroundColor: '#13B887',
  },
  greenBtn: {
    backgroundColor: '#13B887',
    borderRadius: 8,
    paddingVertical: 8,
  },
  disabledBtn: {
    opacity: 0.7,
    backgroundColor: 'gray',
    borderRadius: 8,
    paddingVertical: 8,
  },
  redButton: {
    backgroundColor: 'red',
    borderRadius: 8,
    paddingVertical: 8,
  },
  redButtonText: {
    color: 'white',
    fontSize: 20,
  },
  greenBtnText: {
    color: 'white',
    fontSize: 20,
  },
  whiteBtn: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 8,
    paddingVertical: 8,
  },
  whiteBtnText: {
    color: 'black',
    fontSize: 20,
  },
  fontBold: {
    fontWeight: 'bold',
  },
  textExtraSmall: {
    fontSize: 12,
  },
  textSmall: {
    fontSize: 16,
  },
  textNormal: {
    fontSize: 20,
  },
  textLarge: {
    fontSize: 30,
  },
  textExtraLarge: {
    fontSize: 36,
  },
  //headings
  mainHeading: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
  },
});
