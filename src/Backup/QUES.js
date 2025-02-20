import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ImageBackground,
  SafeAreaView,
  KeyboardAvoidingView,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
} from 'react-native';
import MyStatusBar from '../../src/utils/MyStatusBar';
import { IMAGES, COLORS, Fonts } from '../../src/themes/Themes';
import normalize from '../../src/utils/helpers/normalize';
import Constants from 'expo-constants';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import { ProgressBar } from '@react-native-community/progress-bar-android';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const QuestionOne = props => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [select, setSelect] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [remainingTime, setRemainingTime] = useState(30);
  const totalTime = 30;
  const [attemptId, setAttemptId] = useState(null);
  const [currentQuiz, setCurrentQuiz] = useState({});
  // const[quizData,setQuizData]= useState(null);
  const [userData, setUserData] = useState({
    user_id: null,
    level: null,
    cat_id: null,
    attempt_id: 1,
    quiz_id: null,
  });

  // Dummy quiz data for testing purposes
  const quizData = [
    {
      quiz_id: '7',
      title: 'Which of the following is NOT a part of a plant cell?',
      correct_answer: '1',
    },
    {
      quiz_id: '8',
      title: 'Which part of the plant absorbs water and nutrients from the soil?',
      correct_answer: '1',
    },
    {
      quiz_id: '9',
      title: 'What is the main function of the leaves in a plant?',
      correct_answer: '8',
    },
    {
      quiz_id: '13',
      title: 'Which of these animals is a mammal?',
      correct_answer: 'Lion',
    },
    {
      quiz_id: '15',
      title: 'Which of the following is an example of a vertebrate?',
      correct_answer: 'Jellyfish',
    },  

    {
      quiz_id: '7',
      title: 'Which of the following is NOT a part of a plant cell?',
      correct_answer: '1',
    },
    {
      quiz_id: '8',
      title: 'Which part of the plant absorbs water and nutrients from the soil?',
      correct_answer: '1',
    },
    {
      quiz_id: '9',
      title: 'What is the main function of the leaves in a plant?',
      correct_answer: '8',
    },
    {
      quiz_id: '13',
      title: 'Which of these animals is a mammal?',
      correct_answer: 'Lion',
    },
    {
      quiz_id: '15',
      title: 'Which of the following is an example of a vertebrate?',
      correct_answer: 'Jellyfish',
    },
  ];

  const answerData = [
    { id: 1, name: '1', image: IMAGES.circle, image1: IMAGES.tikcircle },
    { id: 2, name: '8', image: IMAGES.circle, image1: IMAGES.tikcircle },
    { id: 3, name: 'Lion', image: IMAGES.circle, image1: IMAGES.tikcircle },
    { id: 4, name: 'Jellyfish', image: IMAGES.circle, image1: IMAGES.tikcircle },
  ];

  // Fetch data from AsyncStorage when the component mounts
  useEffect(() => {
    fetchQuizData();
    loadProgressFromStorage(); // Load saved progress from AsyncStorage
  }, []);

  // Fetch quiz data
  const fetchQuizData = async () => {
    try {
      const response = await axios.post(
        'https://zeewebvalley.com/quizup/super-admin/api/Controll/get_question/',
        { user_id: userData.user_id }
      );

      if (response.data.status === '200') {
        const quizDataFromApi = response.data.data;

        if (Array.isArray(quizDataFromApi) && quizDataFromApi.length > 0) {
          quizData(quizDataFromApi);
          setCurrentQuiz(quizDataFromApi[0]);
          setUserData(prevState => ({
            ...prevState,
            attempt_id: response.data.attend_id,
            cat_id: quizDataFromApi[0].cat_id,
            level: quizDataFromApi[0].level,
            quiz_id: quizDataFromApi[0].quiz_id,
          }));  
          console.log('data',quizDataFromApi);
        } else {
          Alert.alert('Error', 'No quiz data available.');
        }
      } else {
        // Alert.alert('Error', 'Failed to fetch quiz data.');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong while fetching the quiz.');
    }
  };

  // Load saved progress from AsyncStorage
  const loadProgressFromStorage = async () => {
    try {
      const savedIndex = await AsyncStorage.getItem('currentQuestionIndex');
      const savedAnswers = await AsyncStorage.getItem('selectedAnswers');

      if (savedIndex !== null) {
        setCurrentQuestionIndex(parseInt(savedIndex, 10));
      }
      if (savedAnswers !== null) {
        setSelectedAnswers(JSON.parse(savedAnswers));
      }
    } catch (error) {
      console.error('Error loading progress:', error);
    }
  };

  // Save current progress to AsyncStorage
  const saveProgressToStorage = async () => {
    try {
      await AsyncStorage.setItem(
        'currentQuestionIndex',
        currentQuestionIndex.toString()
      );
      await AsyncStorage.setItem(
        'selectedAnswers',
        JSON.stringify(selectedAnswers)
      );
    } catch (error) {
      console.error('Error saving progress:', error);
    }  
    console.log('data',answerData);
  };

  // Handle answer selection
  const handleAnswerSelect = (answer, index) => {
    setSelect(index);
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[currentQuestionIndex] = answer;
    setSelectedAnswers(updatedAnswers);
  };

  // Handle next question
  const handleNextQuestion = async () => {
    if (select === null) {
      Alert.alert('Warning', 'Please select an answer.');
      return;
    }

    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelect(null); // Reset selected answer for the next question
      setRemainingTime(totalTime); // Reset timer
      await saveProgressToStorage(); // Save progress  
      console.log('data',currentQuestionIndex);
    } else {
      submitQuiz();
    }
  };

  // Submit the quiz
  const submitQuiz = async () => {
    const currentQuestion = quizData[currentQuestionIndex];

    // Check if all necessary data is available before submitting
    if (
      !currentQuestion ||
      !userData.user_id ||
      !userData.attempt_id ||
      !userData.level ||
      !userData.cat_id
    ) {
      Alert.alert('Error', 'Missing data, please restart the quiz.');
      
    }

    const formData = {
      user_id: userData.user_id,
      attempt_id: userData.attempt_id,
      quiz_id: currentQuestion.quiz_id,
      level: userData.level,
      cat_id: userData.cat_id,
      attempt_option: selectedAnswers[currentQuestionIndex],
      correct_option: currentQuestion.correct_answer,
    };
        console.log('data',formData);
    try {
      const response = await axios.post(
        'https://zeewebvalley.com/quizup/super-admin/api/Controll/question_submit/',
        formData
      );

      if (response.data.status === '200') {
        Alert.alert('Success', 'Quiz submitted successfully!');
        await AsyncStorage.clear(); // Clear saved progress after submission
        props.navigation.navigate('ReportCardBeginer');
        console.log('data',formData);
      } else {
        // Alert.alert('Error', 'Failed to submit quiz.');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong while submitting the quiz.');
    }
  };

  const answerDataRenderItem = ({ item, index }) => (
    <TouchableOpacity
      onPress={() => handleAnswerSelect(item.name, index)}
      style={styles.answerContainer}
    >
      <Text style={styles.answerText}>{item.name}</Text>
      <View style={styles.imageContainer}>
        <Image
          source={select === index ? IMAGES.tikcircle : IMAGES.circle}
          resizeMode="contain"
          style={styles.answerImage}
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      <MyStatusBar backgroundColor={COLORS.litepurple} />
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={'height'}>
          <ImageBackground
            source={IMAGES.Main}
            resizeMode="stretch"
            style={{ flex: 1 }}
          >
            <View style={styles.timerContainer}>
              <CountdownCircleTimer
                isPlaying={isPlaying}
                duration={totalTime}
                colors={['#1EBD21']}
                colorsTime={[30]}
                size={100}
                onComplete={() => ({ shouldRepeat: true, delay: 1 })}
              >
                {({ remainingTime, animatedColor }) => (
                  <Text style={{ color: animatedColor, fontSize: 25 }}>
                    {Math.ceil(remainingTime)}
                  </Text>
                )}
              </CountdownCircleTimer>
            </View>
            <View style={styles.progressBarContainer}>
              <ProgressBar
                styleAttr="Horizontal"
                indeterminate={false}
                progress={(remainingTime / totalTime) * 100}
                width={290}
                height={120}
                max={100}
              />
            </View>
            <View style={styles.questionCounterContainer}>
              <Text style={styles.questionCounterText}>
                {currentQuestionIndex + 1} of {quizData.length}
              </Text>
            </View>

            <Text style={styles.questionText}>
              {quizData[currentQuestionIndex]?.title}
            </Text>
            <View style={styles.answerListContainer}>
              <FlatList
                vertical
                showsVerticalScrollIndicator={false}
                data={answerData}
                renderItem={answerDataRenderItem}
                keyExtractor={item => item.id.toString()}
              />
              <TouchableOpacity
                style={styles.nextButton}
                onPress={handleNextQuestion}
              >
                <Text style={styles.nextButtonText}>
                  {currentQuestionIndex === quizData.length - 1 ? 'Submit' : 'Next'}
                </Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  answerContainer: {
    height: normalize(45),
    width: normalize(223),
    backgroundColor: COLORS.white,
    alignSelf: 'center',
    marginTop: normalize(15),
    borderRadius: normalize(10),
    shadowColor: COLORS.black,
    shadowOffset: { height: normalize(2), width: normalize(3) },
    shadowOpacity: normalize(1),
    shadowRadius: normalize(4),
    elevation: normalize(5),
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  answerText: {
    fontSize: normalize(18),
    marginLeft: normalize(18),
    color: COLORS.black,
    marginTop: normalize(15),
    fontFamily: Fonts.MontserratMedium,
  },
  imageContainer: {
    height: normalize(20),
    width: normalize(20),
    alignSelf: 'flex-end',
    bottom: normalize(20),
    flexDirection: 'row',
    paddingRight: normalize(15),
    alignItems: 'center',
    justifyContent: 'center',
  },
  answerImage: {
    height: normalize(20),
    width: normalize(20),
  },
  timerContainer: {
    alignItems: 'flex-end',
    paddingTop: Constants.statusBarHeight,
    padding: normalize(8),
  },
  progressBarContainer: {
    height: normalize(16),
    width: normalize(290),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  questionCounterContainer: {
    height: normalize(30),
    width: normalize(120),
    alignSelf: 'flex-start',
    marginLeft: normalize(10),
  },
  questionCounterText: {
    alignSelf: 'center',
    fontSize: normalize(12),
    color: COLORS.black,
    fontWeight: '700',
    fontFamily: Fonts.MontserratMedium,
  },
  questionText: {
    alignSelf: 'center',
    marginTop: normalize(10),
    color: COLORS.black,
    fontSize: normalize(12),
    fontFamily: Fonts.MontserratMedium,
  },
  answerListContainer: {
    height: normalize(300),
    width: normalize(260),
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButton: {
    height: normalize(39),
    width: normalize(144),
    backgroundColor: COLORS.deepgreen,
    alignSelf: 'center',
    borderRadius: normalize(7),
    justifyContent: 'center',
    marginTop: normalize(10),
    bottom: normalize(10),
  },
  nextButtonText: {
    alignSelf: 'center',
    color: COLORS.white,
    fontSize: normalize(15),
    fontFamily: Fonts.MontserratMedium,
  },
});

export default QuestionOne;
