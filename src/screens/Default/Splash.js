import {View, Text, ImageBackground, Image} from 'react-native';
import React from 'react';
import {useEffect} from 'react';
import {COLORS, Fonts, IMAGES} from '../../themes/Themes';
import MyStatusBar from '../../utils/MyStatusBar';
import normalize from '../../utils/helpers/normalize';
import {SafeAreaView} from 'react-native';

const Splash = props => {
  useEffect(() => {
    setTimeout(() => {
      props.navigation.navigate('Register');
    }, 2000);
  }, []);
  return (
    <>
      <MyStatusBar backgroundColor={COLORS.purple} />
      <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
        <ImageBackground
          source={IMAGES.Splashscreen}
          resizeMode="cover"
          style={{
            flex: 1,
          }}>
          <View
            style={{
              height: normalize(200),
              width: normalize(200),
              // backgroundColor:'red',
              alignSelf: 'center',
              marginTop: normalize(10),
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              source={IMAGES.learing}
              resizeMode="contain"
              style={{
                height: normalize(100),
                width: normalize(100),
              }}
            />
          </View>
          <View
            style={{
              height: normalize(180),
              width: normalize(190),
              //  backgroundColor:'green',
              alignSelf: 'center',
              marginTop: normalize(22),
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              source={IMAGES.mindit}
              resizeMode="contain"
              style={{
                height: normalize(250),
                width: normalize(250),
              }}
            />
          </View>
          <View
            style={{
              height: normalize(60),
              width: normalize(260),
              //   backgroundColor: 'red',
              alignSelf: 'center',
              marginTop: normalize(100),
            }}>
            <Text
              style={{
                alignSelf: 'center',
                fontSize: normalize(15),
                color: COLORS.white,
                fontFamily:Fonts.MontserratMedium
              }}>
              Elevate your education,
            </Text>
            <Text
              style={{
                alignSelf: 'center',
                fontSize: normalize(20),
                color: COLORS.white,
                fontWeight: '800',
                fontFamily:Fonts.MontserratMedium
              }}>
              One Question at a time!
            </Text>
          </View>
        </ImageBackground>
      </SafeAreaView>
    </>
  );
};

export default Splash;
