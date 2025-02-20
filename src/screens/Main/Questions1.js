import {
  View,
  Text,
  ImageBackground,
  SafeAreaView,
  KeyboardAvoidingView,
  Image,
  TouchableOpacity,
  FlatList,
  question,
  choices,
  StyleSheet,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import MyStatusBar from '../../utils/MyStatusBar';
import {COLORS, IMAGES, Fonts} from '../../themes/Themes';
import normalize from '../../utils/helpers/normalize';
import Constants from 'expo-constants';
import {CountdownCircleTimer} from 'react-native-countdown-circle-timer';
import {ProgressBar} from '@react-native-community/progress-bar-android';

const Questions = props => {
  const [isPlaying, setIsPlaying] = React.useState(true);
  const [toggle, setToggle] = useState(false);
  // const [progress, setProgress] = useState(0);
  const [select, setSelet] = useState(false);

  const [remainingTime, setRemainingTime] = useState(30);
  const totalTime = 30;

  const answerData = [
    {
      id: 1,
      name: 'Succession',
      image: IMAGES.circle,
      image1: IMAGES.tikcircle,
      image2: IMAGES.content,
    },

    {
      id: 2,
      name: 'Food Chain',
      image: IMAGES.circle,
      image1: IMAGES.tikcircle,
      //   image2: IMAGES.content,
    },

    {
      id: 3,
      name: 'Nutrient Cycling',
      image: IMAGES.circle,
      image1: IMAGES.tikcircle,
      //   image2: IMAGES.content,
    },
    {
      id: 4,
      name: 'All of these',
      image: IMAGES.circle,
      image1: IMAGES.tikcircle,
      //   image2: IMAGES.content,
    },
  ];
  const answerData_renderItem = ({item, index}) => {
    return (
      <>
        <TouchableOpacity
          onPress={() => {
            setToggle(!toggle);
            setSelet(index);
          }}
          style={{
            height: normalize(35),
            width: normalize(210),
            backgroundColor: COLORS.white,
            alignSelf: 'center',
            marginTop: normalize(10),
            borderRadius: normalize(25),
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
      </>
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
                progress={0.2}
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
                height: normalize(360),
                width: normalize(275),
                // backgroundColor: 'red',
                alignSelf: 'center',
                // marginTop: normalize(4),
                borderRadius: normalize(30),
                borderWidth: normalize(2),
                borderColor: COLORS.litepurple,
              }}> */}
            <Text
              style={{
                alignSelf: 'center',
                marginTop: normalize(10),
                color: COLORS.black,
                fontSize: normalize(12),
                fontFamily: Fonts.MontserratMedium,
              }}>
              3. Which ecological process is depicted in the image below ?
            </Text>
            <View
              style={{
                height: normalize(100),
                width: normalize(225),
                // backgroundColor:'green',
                alignSelf: 'center',
                // marginTop:normalize(10),
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={IMAGES.content}
                resizeMode="contain"
                style={{
                  height: normalize(100),
                  width: normalize(100),
                }}
              />
            </View>
            <FlatList
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
                height: normalize(40),
                width: normalize(110),
                backgroundColor: COLORS.deepgreen,
                alignSelf: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                bottom: normalize(24),
                borderRadius: normalize(10),
              }}
              onPress={() => {
                props.navigation.navigate('Questions2');
              }}>
              <Text
                style={{
                  alignSelf: 'center',
                  fontSize: normalize(12),
                  color: COLORS.white,
                  fontFamily: Fonts.MontserratMedium,
                }}>
                Next
              </Text>
            </TouchableOpacity>

            {/* </View> */}
          </ImageBackground>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};

export default Questions;
