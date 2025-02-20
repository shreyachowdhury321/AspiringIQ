import {
  View,
  Text,
  ImageBackground,
  SafeAreaView,
  KeyboardAvoidingView,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import MyStatusBar from '../../utils/MyStatusBar';
import {COLORS, IMAGES, Fonts} from '../../themes/Themes';
import normalize from '../../utils/helpers/normalize';
import Constants from 'expo-constants';
import {CountdownCircleTimer} from 'react-native-countdown-circle-timer';
import {ProgressBar} from '@react-native-community/progress-bar-android';

const Questions2 = props => {
  const [isPlaying, setIsPlaying] = React.useState(true);
  const [toggle, setToggle] = useState(false);
  // const [progress, setProgress] = useState(0);
  const [select, setSelet] = useState(false);
  const [remainingTime, setRemainingTime] = useState(30);
  const totalTime = 30;

  const answerData = [
    {
      id: 1,
      name: ' True',
      image: IMAGES.circle,
      image1: IMAGES.tikcircle,
    },

    {
      id: 2,
      name: ' False',
      image: IMAGES.circle,
      image1: IMAGES.tikcircle,
    },
  ];
  const answerData_renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setToggle(!toggle);
          setSelet(index);
        }}
        style={{
          height: normalize(45),
          width: normalize(223),
          backgroundColor: COLORS.white,
          alignSelf: 'center',
          marginTop: normalize(15),
          borderRadius: normalize(10),
          shadowColor: COLORS.black,
          shadowOffset: {
            height: normalize(2),
            width: normalize(3),
          },
          shadowOpacity: normalize(1),
          shadowRadius: normalize(4),
          elevation: normalize(5),
          alignItems: 'flex-start',
          justifyContent: 'center',
          // borderWidth:normalize(1)
        }}>
        <Text
          style={{
            fontSize: normalize(18),
            marginLeft: normalize(18),
            color: COLORS.black,
            marginTop: normalize(15),
            fontFamily: Fonts.MontserratMedium,
          }}>
          {item.name}
        </Text>
        <View
          style={{
            height: normalize(20),
            width: normalize(20),
            //  backgroundColor:'red',
            alignSelf: 'flex-end',
            bottom: normalize(20),
            alignItems: 'center',
            justifyContent: 'center',
            // secureTextEntry:{toggle?false : true}
            flexDirection: 'row',
            paddingRight: normalize(15),
          }}>
          <Image
            source={select == index ? IMAGES.tikcircle : IMAGES.circle}
            resizeMode="contain"
            style={{
              height: normalize(20),
              width: normalize(20),
            }}
          />
        </View>
      </TouchableOpacity>
    );
  };
  // progress bar...
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (progress < 1) {
  //       setProgress(prevProgress => prevProgress + 0.1);
  //     } else {
  //       clearInterval(interval);
  //     }
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, [progress]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (remainingTime > 0) {
        setRemainingTime(remainingTime - 1);
      } else {
        clearInterval(timer);
        // Timer finished, you can perform any action here
      }
    }, 1000);

    return () => clearInterval(timer); // Cleanup on unmount or when timer is stopped
  }, [remainingTime]);

  // Calculate minutes and seconds from remaining time
  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;

  // Calculate progress percentage
  const progress = (remainingTime / totalTime) * 100;

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
                // flex: 1,
                // justifyContent: 'center',
                alignItems: 'flex-end',
                paddingTop: Constants.statusBarHeight,
                // backgroundColor: '#ecf0f1',
                padding: normalize(8),
              }}>
              <CountdownCircleTimer
                //  percent={progress}
                //  radius={30}
                isPlaying={isPlaying}
                duration={totalTime}
                colors={['#1EBD21']}
                colorsTime={[30]}
                // radius={30}
                size={100}
                onComplete={() => ({shouldRepeat: true, delay: 1})}
                // onComplete={() => [true, 0]}
                updateInterval={1}>
                {({remainingTime, animatedColor}) => (
                  <Text style={{color: animatedColor, fontSize: 25}}>
                    {Math.ceil(remainingTime)}
                  </Text>
                )}
              </CountdownCircleTimer>
            </View>
            <View
              style={{
                height: normalize(16),
                width: normalize(290),
                //  backgroundColor: 'red',
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
              }}>
              <ProgressBar
                styleAttr="Horizontal"
                indeterminate={false}
                progress={0.3}
                width={290}
                height={120}
              />
            </View>
            <View
              style={{
                height: normalize(30),
                width: normalize(120),
                // backgroundColor:'red',
                alignSelf: 'flex-start',
                marginLeft: normalize(10),
              }}>
              <Text
                style={{
                  alignSelf: 'center',
                  fontSize: normalize(12),
                  color: COLORS.black,
                  fontWeight: '700',
                  fontFamily: Fonts.MontserratMedium,
                }}>
                01 of 30
              </Text>
            </View>

            {/* <View
                style={{
                  height: normalize(330),
                  width: normalize(275),
                  // backgroundColor: 'red',
                  alignSelf: 'center',
                  marginTop: normalize(20),
                  borderRadius: normalize(30),
                  borderWidth: normalize(2),
                  borderColor: COLORS.litepurple,
                }}> */}
            <Text
              style={{
                alignSelf: 'center',
                marginTop: normalize(10),
                color: COLORS.black,
                fontSize: normalize(9),
                fontFamily: Fonts.MontserratMedium,
              }}>
              3. An element's atomic number is equal to the number of protons in
              its nucleus.
            </Text>
            <View
              style={{
                height: normalize(300),
                width: normalize(260),
                // backgroundColor: 'green',
                alignSelf: 'center',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <FlatList
                vertical
                showsVerticalScrollIndicator={false}
                style={{
                  // width: '100%',
                  // marginLeft: normalize(10),
                  //   marginTop: normalize(15),
                  alignSelf: 'center',
                }}
                contentContainerStyle={
                  {
                    // marginBottom: normalize(10),
                  }
                }
                data={answerData}
                renderItem={answerData_renderItem}
                keyExtractor={item => item.id}
              />

              <TouchableOpacity
                style={{
                  height: normalize(39),
                  width: normalize(144),
                  backgroundColor: COLORS.deepgreen,
                  alignSelf: 'center',
                  borderRadius: normalize(7),
                  justifyContent: 'center',
                  marginTop: normalize(10),
                  //  backgroundColor:'pink'
                  bottom: normalize(10),
                }}
                onPress={() => {
                  props.navigation.navigate('ReportCard');
                }}>
                <Text
                  style={{
                    alignSelf: 'center',
                    color: COLORS.white,
                    fontSize: normalize(15),
                    fontFamily: Fonts.MontserratMedium,
                  }}>
                  Next
                </Text>
              </TouchableOpacity>
            </View>
            {/* </View> */}
          </ImageBackground>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};

export default Questions2;
