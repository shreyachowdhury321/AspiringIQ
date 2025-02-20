import {
  View,
  Text,
  ImageBackground,
  SafeAreaView,
  KeyboardAvoidingView,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import MyStatusBar from '../../utils/MyStatusBar';
import normalize from '../../utils/helpers/normalize';
import {COLORS, Fonts, IMAGES} from '../../themes/Themes';
import {useEffect} from 'react';

const Level = props => {
  return (
    <>
      <MyStatusBar backgroundColor={COLORS.litepurple} />
      <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
        <KeyboardAvoidingView style={{flex: 1}} behavior={'height'}>
          <ImageBackground
            source={IMAGES.Main}
            resizeMode="stretch"
            style={{
              flex: 1,
            }}>
            <View
              style={{
                height: normalize(100),
                width: normalize(100),
                // backgroundColor:'red',
                alignSelf: 'center',
                marginTop: normalize(100),
              }}>
              <Image
                source={IMAGES.light}
                resizeMode="contain"
                style={{
                  height: normalize(120),
                  width: normalize(120),
                }}
              />
            </View>
            <Text
              style={{
                alignSelf: 'center',
                marginTop: normalize(20),
                fontSize: normalize(12),
                color: COLORS.black,
                marginLeft: normalize(10),
                fontWeight: '800',
                fontFamily: Fonts.MontserratMedium,
              }}>
              Choose Level
            </Text>
            <TouchableOpacity
              style={{
                height: normalize(50),
                width: normalize(220),
                backgroundColor: COLORS.purple,
                alignSelf: 'center',
                marginTop: normalize(15),
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: normalize(15),
              }}
              onPress={() => {
                props.navigation.navigate('StartQuizOne');
              }}>
              <Text
                style={{
                  fontSize: normalize(18),
                  fontWeight: '800',
                  color: COLORS.white,
                  fontFamily: Fonts.MontserratMedium,
                }}>
                Beginners
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                height: normalize(50),
                width: normalize(220),
                backgroundColor: COLORS.yellow,
                alignSelf: 'center',
                marginTop: normalize(15),
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: normalize(15),
              }}
              onPress={() => {
                props.navigation.navigate('StartQuizTwo');
              }}>
              <Text
                style={{
                  fontSize: normalize(18),
                  fontWeight: '800',
                  color: COLORS.white,
                  fontFamily: Fonts.MontserratMedium,
                }}>
                Intermediate
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                height: normalize(50),
                width: normalize(220),
                backgroundColor: COLORS.depcolor,
                alignSelf: 'center',
                marginTop: normalize(15),
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: normalize(15),
              }}
              onPress={() => {
                props.navigation.navigate('StartQuizThree');
              }}>
              <Text
                style={{
                  fontSize: normalize(18),
                  fontWeight: '800',
                  color: COLORS.white,
                  fontFamily: Fonts.MontserratMedium,
                }}>
                Advanced
              </Text>
            </TouchableOpacity>
          </ImageBackground>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};

export default Level;


