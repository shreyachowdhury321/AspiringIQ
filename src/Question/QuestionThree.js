import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Alert,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { IMAGES, COLORS, Fonts } from '../../src/themes/Themes';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import { ProgressBar } from '@react-native-community/progress-bar-android';
import Constants from 'expo-constants';

const QuizComponent = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [selectedOptionName, setSelectedOptionName] = useState('');
  const [quizCompleted, setQuizCompleted] = useState(false);

  const [level, setLevel] = useState('Advanced');
  const [catId, setCatId] = useState('8');
  const [userId, setUserId] = useState('59');
  const [remainingTime, setRemainingTime] = useState(30);
  const totalTime = 30;
  const [isPlaying, setIsPlaying] = useState(true);
  const navigation = useNavigation(); 

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await axios.post(
        'https://zeewebvalley.com/quizup/super-admin/api/Controll/get_question/',
        { level, cat_id: catId, user_id: userId },
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
      );
      console.log('API Response:', response.data);

      const formattedQuestions = response.data.data.map((question) => ({
        ...question,
        options: question.options || [],
      }));
      
      setQuestions(formattedQuestions);
    } catch (error) {
      console.error('Error fetching questions:', error);
      Alert.alert('Error', 'Failed to fetch questions. Please try again later.');
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOptionName('');
    } else {
      submitQuizAnswers();
    }
  };

  const handleAnswerSelection = (questionId, selectedAnswerIndex, optionName) => {
    setSelectedAnswers(prevAnswers => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[currentQuestionIndex] = {
        questionId,
        selectedAnswerIndex,
      };
      return updatedAnswers;
    });

    setSelectedOptionName(optionName);
  };

  const submitQuizAnswers = async () => {
    const attemptId = 1; // You can update this to track the attempt ID dynamically if needed
    const selectedAnswer = selectedAnswers[currentQuestionIndex];
    const currentQuestion = questions[currentQuestionIndex];
    const selectedOption = currentQuestion.options[selectedAnswer.selectedAnswerIndex];

    const formData = new FormData();
    formData.append('user_id', userId);
    formData.append('attemp_id', attemptId);
    formData.append('quiz_id', currentQuestion.quiz_id);
    formData.append('level', level);
    formData.append('attemp_option', selectedOption.qa_id); // Assuming qa_id is used to identify selected options
    formData.append('correct_option', selectedOption.correct); // Assuming 'correct' holds the correct answer flag
    console.log(formData,'answer');
    try {
      const response = await axios.post(
        'https://zeewebvalley.com/quizup/super-admin/api/Controll/question_submit/',
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      if (response.data.status === '200') {
        console.log('Answer submitted successfully', response.data);
        setQuizCompleted(true);
        Alert.alert(
          'Quiz Completed',
          `Your answer has been submitted successfully!`,
          [
            { text: 'OK', onPress: () => navigation.navigate('Leaderboard') },
          ]
        );
      } else {
        Alert.alert('Submission Error', 'There was an issue submitting your answer.');
      }
    } catch (error) {
      console.error('Error submitting answer:', error);
      Alert.alert('Error', 'Failed to submit your answer. Please try again later.');
    }
  };

  const renderOptions = options => {
    if (!Array.isArray(options) || options.length === 0) {
      return <Text>No options available for this question.</Text>;
    }

    return options.map((option, index) => (
      <TouchableOpacity
        key={option.qa_id}
        style={[
          styles.optionButton,
          selectedAnswers[currentQuestionIndex]?.selectedAnswerIndex === index
            ? styles.selectedOption
            : null,
        ]}
        onPress={() =>
          handleAnswerSelection(
            questions[currentQuestionIndex].quiz_id,
            index,
            option.answer,
          )
        }
      >
        <View style={styles.radioButtonContainer}>
          <View style={styles.radioButton}>
            {selectedAnswers[currentQuestionIndex]?.selectedAnswerIndex === index && (
              <View style={styles.radioButtonSelected} />
            )}
          </View>
          <Text style={styles.optionText}>{option.answer}</Text>
        </View>
      </TouchableOpacity>
    ));
  };

  const renderQuestion = () => {
    const currentQuestion = questions[currentQuestionIndex];

    if (!currentQuestion) return null;

    return (
      <View style={styles.questionContainer}>
        <Text style={styles.questionTitle}>{currentQuestion.title}</Text>

        <View style={styles.optionsContainer}>
          {renderOptions(currentQuestion.options)}
        </View>

        {selectedOptionName ? (
          <Text style={styles.selectedOptionText}>
            You selected: {selectedOptionName}
          </Text>
        ) : null}
      </View>
    );
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers([]);
    setSelectedOptionName('');
    setQuizCompleted(false);
  };

  return (
    <SafeAreaView style={styles.container}>
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
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.header}>Quiz</Text>
          {renderQuestion()}
          {!quizCompleted ? (
            <Button
              title={currentQuestionIndex === questions.length - 1 ? "Finish" : "Next"}
              onPress={handleNextQuestion}
              disabled={!selectedOptionName}
            />
          ) : (
            <Button title="Restart Quiz" onPress={restartQuiz} />
          )}
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 90,
    textAlign: 'center',
  },
  questionContainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    elevation: 2,
  },
  questionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  optionsContainer: {
    marginTop: 10,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginVertical: 6,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    elevation: 1,
  },
  selectedOption: {
    backgroundColor: '#e0e0e0',
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioButton: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  radioButtonSelected: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: '#000000',
  },
  optionText: {
    fontSize: 16,
    flex: 1,
  },
  selectedOptionText: {
    fontSize: 16,
    marginTop: 10,
    color: '#007BFF',
  },
  timerContainer: {
    alignItems: 'flex-end',
    paddingTop: Constants.statusBarHeight,
    padding: 8,
  },
  progressBarContainer: {
    height: 16,
    width: 290,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
});

export default QuizComponent;
