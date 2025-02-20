import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import MyStatusBar from '../../utils/MyStatusBar';
import {COLORS, IMAGES, Fonts} from '../../themes/Themes';
import normalize from '../../utils/helpers/normalize';

const ReportCard = props => {
  const [scoreData, setScoreData] = useState({
    totalQuestions: null,
    correctAnswers: null,
    wrongAnswers: null,
  });
  const [userId, setUserId] = useState('59'); // Example User ID, update as needed
  const [attempid, setAttemptId] = useState('2'); // Example Attempt ID, update as needed
  const [level, setLevel] = useState('Beginner'); // Example Level, update as needed

  useEffect(() => {
    // Fetch data only if all required parameters are set
    if (!userId || !attempid || !level) {
      console.error('User ID, Attempt ID, or Level not set!');
      console.log('data',scoreData);
      
    }

    const fetchData = async () => {
      // Create a FormData instance
      const formData = new FormData();
      formData.append('user_id', userId);
      formData.append('attemp_id', attempid);
      formData.append('level', level);

      try {
        const response = await axios.post(
          'https://zeewebvalley.com/quizup/super-admin/api/Controll/test_complete/',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        );

        // Check if the response status is 200 (successful)
        if (response.data.status === '200') {
          const {total_question, right_ans, wrong_ans} = response.data.data;
          setScoreData({
            totalQuestions: total_question,
            correctAnswers: right_ans,
            wrongAnswers: wrong_ans,
          });
        } else {
          console.error('Error fetching data:', response.data.message);
        }
      } catch (error) {
        console.error('API call error:', error);
      }
    };

    fetchData();
  }, [userId, attempid, level]); // Ensure the effect runs whenever userId, attempid, or level changes

  return (
    <>
      <MyStatusBar backgroundColor={COLORS.litepurple} />
      <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
        <KeyboardAvoidingView style={{flex: 1}} behavior={'height'}>
          <ImageBackground
            source={IMAGES.Report}
            resizeMode="cover"
            style={{flex: 1}}>
            <View
              style={{
                height: normalize(40),
                width: normalize(200),
                alignSelf: 'center',
                marginTop: normalize(25),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: normalize(18),
                  color: COLORS.white,
                  fontFamily: Fonts.MontserratMedium,
                }}>
                Congratulations!
              </Text>
            </View>
            <View
              style={{
                height: normalize(250),
                width: normalize(265),
                backgroundColor: COLORS.white,
                alignSelf: 'center',
                marginTop: normalize(160),
                borderRadius: normalize(10),
                alignItems: 'center',
                borderWidth: normalize(1),
                borderColor: COLORS.litepurple,
              }}>
              <Image
                source={IMAGES.trophystar}
                resizeMode="contain"
                style={{
                  height: normalize(200),
                  width: normalize(200),
                  bottom: normalize(150),
                }}
              />
              <View
                style={{
                  height: normalize(40),
                  width: normalize(190),
                  bottom: normalize(150),
                  alignSelf: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: normalize(12),
                    color: COLORS.black,
                    fontFamily: Fonts.MontserratMedium,
                  }}>
                  You've completed the test.
                </Text>
                <Text
                  style={{
                    fontSize: normalize(12),
                    color: COLORS.black,
                    fontFamily: Fonts.MontserratMedium,
                  }}>
                  You've scored {scoreData.correctAnswers * 10} points
                </Text>
              </View>

              {/* Total Questions */}
              <View
                style={{
                  height: normalize(130),
                  width: normalize(255),
                  bottom: normalize(135),
                }}>
                <View
                  style={{
                    height: normalize(100),
                    width: normalize(250),
                    alignSelf: 'center',
                  }}>
                  <View
                    style={{
                      height: normalize(2),
                      width: normalize(250),
                      backgroundColor: COLORS.litepurple,
                      alignSelf: 'center',
                      marginTop: normalize(20),
                      borderRadius: normalize(20),
                    }}
                  />

                  {/* Total Questions */}
                  <View
                    style={{
                      height: normalize(60),
                      width: normalize(70),
                      alignSelf: 'flex-start',
                      marginTop: normalize(10),
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: normalize(13),
                        alignSelf: 'center',
                        color: COLORS.black,
                        fontFamily: Fonts.MontserratMedium,
                      }}>
                      Total
                    </Text>
                    <Text
                      style={{
                        fontSize: normalize(15),
                        color: COLORS.purple,
                        alignSelf: 'center',
                        fontFamily: Fonts.MontserratMedium,
                      }}>
                      Questions
                    </Text>
                    <View
                      style={{
                        height: normalize(20),
                        width: normalize(60),
                        alignSelf: 'center',
                        flexDirection: 'row',
                      }}>
                      <Image
                        source={IMAGES.letterq}
                        resizeMode="contain"
                        style={{
                          height: normalize(14),
                          width: normalize(14),
                          marginLeft: normalize(10),
                          marginTop: normalize(2),
                        }}
                      />
                      <View
                        style={{
                          height: normalize(20),
                          width: normalize(40),
                          alignSelf: 'center',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            fontSize: normalize(12),
                            alignSelf: 'center',
                            marginRight: normalize(10),
                            fontFamily: Fonts.MontserratMedium,
                          }}>
                          {scoreData.totalQuestions}
                        </Text>
                      </View>
                    </View>
                  </View>

                  {/* Correct Answers */}
                  <View
                    style={{
                      height: normalize(60),
                      width: normalize(70),
                      alignSelf: 'center',
                      alignItems: 'center',
                      bottom: normalize(62),
                    }}>
                    <Text
                      style={{
                        fontSize: normalize(13),
                        alignSelf: 'center',
                        color: COLORS.black,
                        fontFamily: Fonts.MontserratMedium,
                      }}>
                      Answered
                    </Text>
                    <Text
                      style={{
                        fontSize: normalize(14),
                        color: COLORS.deepgreen,
                        alignSelf: 'center',
                        fontFamily: Fonts.MontserratMedium,
                      }}>
                      Correct
                    </Text>
                    <View
                      style={{
                        height: normalize(20),
                        width: normalize(60),
                        alignSelf: 'center',
                        flexDirection: 'row',
                      }}>
                      <Image
                        source={IMAGES.cheaktik}
                        resizeMode="contain"
                        style={{
                          height: normalize(14),
                          width: normalize(14),
                          marginLeft: normalize(10),
                          marginTop: normalize(2),
                        }}
                      />
                      <View
                        style={{
                          height: normalize(20),
                          width: normalize(40),
                          alignSelf: 'center',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            fontSize: normalize(12),
                            alignSelf: 'center',
                            marginRight: normalize(10),
                            fontFamily: Fonts.MontserratMedium,
                          }}>
                          {scoreData.correctAnswers}
                        </Text>
                      </View>
                    </View>
                  </View>

                  {/* Wrong Answers */}
                  <View
                    style={{
                      height: normalize(60),
                      width: normalize(70),
                      alignSelf: 'flex-end',
                      // marginTop: normalize(10),
                      alignItems: 'center',
                      bottom:normalize(115)
                    }}>
                    <Text
                      style={{
                        fontSize: normalize(13),
                        alignSelf: 'center',
                        color: COLORS.black,
                        fontFamily: Fonts.MontserratMedium,
                      }}>
                      Answered
                    </Text>
                    <Text
                      style={{
                        fontSize: normalize(12),
                        color: COLORS.litered,
                        alignSelf: 'center',
                        fontFamily: Fonts.MontserratMedium,
                      }}>
                      Wrong
                    </Text>
                    <View
                      style={{
                        height: normalize(20),
                        width: normalize(60),
                        alignSelf: 'center',
                        flexDirection: 'row',
                      }}>
                      <Image
                        source={IMAGES.cross}
                        resizeMode="contain"
                        style={{
                          height: normalize(14),
                          width: normalize(14),
                          marginLeft: normalize(10),
                          marginTop: normalize(2),
                        }}
                      />
                      <View
                        style={{
                          height: normalize(20),
                          width: normalize(40),
                          alignSelf: 'center',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            fontSize: normalize(12),
                            alignSelf: 'center',
                            marginRight: normalize(10),
                            fontFamily: Fonts.MontserratMedium,
                          }}>
                          {scoreData.wrongAnswers}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>

            <TouchableOpacity
              style={{
                height: normalize(45),
                width: normalize(220),
                backgroundColor: COLORS.purple,
                alignSelf: 'center',
                marginTop: normalize(10),
                borderRadius: normalize(12),
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => {
                props.navigation.navigate('Leaderboard');
              }}>
              <Text
                style={{
                  fontSize: normalize(14),
                  color: COLORS.white,
                  fontFamily: Fonts.MontserratMedium,
                }}>
                View Leaderboard
              </Text>
            </TouchableOpacity>
          </ImageBackground>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};

export default ReportCard;
