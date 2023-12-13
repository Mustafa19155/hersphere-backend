import {StyleSheet} from 'react-native';

export default globalStyles = StyleSheet.create({
  container: {
    width: '90%',
    flex: 1,
    alignSelf: 'center',
    margin: 20,
  },
  grayColor: {
    color: '#ACA9A9',
  },
  gray2Color: {
    color: '#EEEEEE',
  },
  gray3Color: {
    color: 'rgba(35, 35, 35, 0.75)',
  },
  greenColor: {
    color: '#13B887',
  },
  blackColor: {
    color: 'black',
  },
  grayBack: {
    backgroundColor: '#ACA9A9',
  },
  gray2Back: {
    backgroundColor: '#EEEEEE',
  },
  greenBack: {
    backgroundColor: '#13B887',
  },
  greenBtn: {
    backgroundColor: '#13B887',
    borderRadius: 8,
    paddingVertical: 8,
  },
  greenBtnSm: {
    backgroundColor: '#13B887',
    borderRadius: 8,
    paddingVertical: 3,
  },
  disabledBtn: {
    opacity: 0.7,
    backgroundColor: 'gray',
    borderRadius: 8,
    paddingVertical: 8,
  },
  redButton: {
    backgroundColor: '#C20C0C',
    borderRadius: 8,
    paddingVertical: 8,
  },
  redBtnSm: {
    backgroundColor: '#C20C0C',
    borderRadius: 8,
    paddingVertical: 3,
  },
  redButtonText: {
    color: 'white',
    fontSize: 20,
  },
  redBtnTextSm: {
    color: 'white',
    fontSize: 12,
  },
  greenBtnText: {
    color: 'white',
    fontSize: 20,
  },
  greenBtnTextSm: {
    color: 'white',
    fontSize: 12,
  },
  greenBtnTextMd: {
    color: 'white',
    fontSize: 16,
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
    // fontFamily: 'DMSans-Bold',
    fontWeight: 'bold',
  },
  fontMedium: {
    fontWeight: '600',
  },
  textExtraSmall: {
    color: 'black',
    fontSize: 12,
  },
  textSmall: {
    color: 'black',
    fontSize: 16,
  },
  textNormal: {
    color: 'black',
    fontSize: 20,
  },
  textMedium: {
    color: 'black',
    fontSize: 24,
  },
  textLarge: {
    color: 'black',
    fontSize: 30,
  },
  textExtraLarge: {
    color: 'black',
    fontSize: 36,
  },
  //headings
  mainHeading: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
  },
});
