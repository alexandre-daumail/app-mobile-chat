import { StyleSheet } from 'react-native';


export default StyleSheet.create({
  flex: {
    flex: 1, 
  },
  flexRow: {
    flexDirection: 'row',
  },
  flexColumn: {
    flexDirection: 'column',
  },
  flexCenter: {
    justifyContent: 'center',
    alignItems: 'center', 
  },
  flexStartCenter: {
    justifyContent: 'flex-start',
    alignItems: "center",
  },
  flexBetweenCenter: {
    justifyContent: 'space-between',
    alignItems: "center",
  },

  alignCenter: {
    alignItems: 'center', 
  },

  width100: {
    width: '100%',
  },
  width90: {
    width: '90%',
    marginHorizontal: '5%',
  },
  width80: {
    width: '80%',
  },
  width70: {
    width: '70%',
  },

  mauto: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  mv8: {
    marginVertical: 8,
  },
  mv12: {
    marginVertical: 12,
  },
  mv15: {
    marginVertical: 15,
  },
  mv25: {
    marginVertical: 25,
  },
  mt10: {
    marginTop: 10,
  },
  mt12: {
    marginTop: 12,
  },
  mt40: {
    marginTop: 40,
  },
  mh10: {
    marginHorizontal: 10,
  },

  p10: {
    padding: 10,
  },
  pv10: {
    paddingVertical: 10,
  },
  ph10: {
    paddingHorizontal: 10,
  },
  pv40: {
    paddingVertical: 40,
  },
  paddingBorder: {
    padding: 10,
    borderWidth: 1,
  },
  paddingInput : {
    padding: 10,
    borderBottomWidth: 1,
  },
  paddingPasswordInput : {
    paddingLeft: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  paddingBorder20: {
    padding: 20,
    borderWidth: 1,
    borderColor: '#F1F1F1',
  },
  border: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#000000',
  },
  borderRadius5: {
    borderRadius: 5,
  },
  borderRadius10: {
    borderRadius: 10,
  },
  borderRadius50: {
    borderRadius: 50,
  },

  textWhite: {
    color: '#FFFFFF',
  },
  textBlack: {
    color: '#000000',
  },

  chatFromBg: {
    backgroundColor: 'tomato',
    borderColor: 'tomato',
  },
  chatToBg: {
    backgroundColor: '#000000',
    borderColor: '#000000',
  },

  rounded30x30: {
    height: 25,
    width: 25,
    borderRadius: 100,
  },
  rounded35x35: {
    height: 35,
    width: 35,
    borderRadius: 150,
  },
  rounded50x50: {
    height: 50,
    width: 50,
    borderRadius: 200,
  },

  boxShadow: {
    shadowColor: '#171717',
    shadowOffset: {width: 2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});