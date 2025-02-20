import {
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  ImageBackground,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import MyStatusBar from '../../utils/MyStatusBar';
import { IMAGES, COLORS, Fonts } from '../../themes/Themes';
import normalize from '../../utils/helpers/normalize';

const Startquiz = (props) => {
  // State for managing loading, error, and quiz data
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [quizData, setQuizData] = useState(null);

  // Function to fetch quiz data
  const fetchQuizData = async () => {
    setLoading(true); // Start loading
    setError(null); // Reset any previous errors

    const formData = new FormData();
    formData.append('level', 'Beginner');
    formData.append('cat_id', '7');
    formData.append('user-id', '14'); 
    console.log('data',formData)

    try {
      const response = await fetch('https://zeewebvalley.com/quizup/super-admin/api/Controll/get_question/', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          'Cookie': 'ci_session=ac0850c46d43f4278a429f316803db9e35958143',
        },
        body: formData,
      });

      if (!response.ok) {
        // If the response is not okay, throw an error
        throw new Error('Failed to fetch quiz data');
      }

      const data = await response.json();
      setQuizData(data); // Store the quiz data
      setLoading(false); // Stop loading
      console.log('data',formData)

    } catch (error) {
      setLoading(false); // Stop loading in case of error
      setError(error.message); // Set error message
    }
  };

  // Fetch quiz data when the component mounts
  useEffect(() => {
    fetchQuizData();
  }, []);

  return (
    <>
      <MyStatusBar backgroundColor={COLORS.litepurple} />
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={'height'}>
          <ImageBackground
            source={IMAGES.Main}
            resizeMode="stretch"
            style={{ flex: 1 }}>
            
            {/* Quiz Image */}
            <View
              style={{
                height: normalize(100),
                width: normalize(100),
                alignSelf: 'center',
                marginTop: normalize(100),
              }}>
              <Image
                source={IMAGES.onlap}
                resizeMode="contain"
                style={{
                  height: normalize(120),
                  width: normalize(120),
                }}
              />
            </View>

            {/* Loading Spinner */}
            {loading && (
              <ActivityIndicator size="large" color={COLORS.depcolor} />
            )}

            {/* Error Message */}
            {error && (
              <View style={{ marginTop: 20 }}>
                <Text style={{ color: 'red', textAlign: 'center' }}>
                  {error}
                </Text>
              </View>
            )}

            {/* Quiz Instructions */}
            {!loading && !error && quizData && (
              <View
                style={{
                  height: normalize(45),
                  width: normalize(200),
                  alignSelf: 'center',
                  marginTop: normalize(35),
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontSize: normalize(13),
                    color: COLORS.black,
                    alignSelf: 'center',
                    marginTop: normalize(20),
                    fontWeight: '700',
                    fontFamily: Fonts.MontserratMedium,
                  }}>
                  Your quiz will have 10 questions.
                </Text>
                <Text
                  style={{
                    fontSize: normalize(13),
                    color: COLORS.black,
                    marginTop: normalize(10),
                    fontWeight: '800',
                    fontFamily: Fonts.MontserratMedium,
                  }}>
                  Each question carries 10 points.
                </Text>
                <Text
                  style={{
                    fontSize: normalize(12),
                    color: COLORS.black,
                    marginTop: normalize(10),
                    fontWeight: '700',
                    fontFamily: Fonts.MontserratMedium,
                  }}>
                  All the best!
                </Text>
              </View>
            )}

            {/* Start Quiz Button */}
            {!loading && !error && quizData && (
              <TouchableOpacity
                style={{
                  height: normalize(45),
                  width: normalize(180),
                  backgroundColor: COLORS.depcolor,
                  alignSelf: 'center',
                  marginTop: normalize(50),
                  borderRadius: normalize(10),
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => {
                  props.navigation.navigate('Questions', { quizData });
                }}>
                <Text
                  style={{
                    fontSize: normalize(18),
                    color: COLORS.white,
                    fontWeight: '600',
                    fontFamily: Fonts.MontserratMedium,
                  }}>
                  Start Quiz
                </Text>
              </TouchableOpacity>
            )}
          </ImageBackground>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};

export default Startquiz;
