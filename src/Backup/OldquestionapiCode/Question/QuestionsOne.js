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
// Import navigation

const QuizComponent = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [selectedOptionName, setSelectedOptionName] = useState('');
  const [quizCompleted, setQuizCompleted] = useState(false);

  const [level, setLevel] = useState('Beginners');
  const [catId, setCatId] = useState('7');
  const [userId, setUserId] = useState('59');

  const navigation = useNavigation(); // Initialize navigation

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
      
      // Assuming `options` are inside each question in `data`
      const formattedQuestions = response.data.data.map((question) => ({
        ...question,
        options: question.options || [], // Default to an empty array if options are missing
      }));
      
      setQuestions(formattedQuestions);
    } catch (error) {
      console.error('Error fetching questions:', error);
      Alert.alert(
        'Error',
        'Failed to fetch questions. Please try again later.'
      );
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOptionName('');
    } else {
      calculateResults();
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

  const calculateResults = () => {
    let correctCount = 0;
    selectedAnswers.forEach((answer, index) => {
      const question = questions[index];
      if (question && question.options[answer.selectedAnswerIndex]?.correct === "1") {
        correctCount++;
      }
    });
    setQuizCompleted(true);
    Alert.alert(
      'Quiz Completed',
      `You got ${correctCount} out of ${questions.length} correct!`,
      [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Leaderboard'), // Navigate to Leaderboard page
        }
      ]
    );
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

  return (
    <SafeAreaView style={styles.container}>
          <ImageBackground
            source={IMAGES.Main}
            resizeMode="stretch"
            style={{ flex: 1 }}
          >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.header}>Quiz</Text>
        {renderQuestion()}
        {!quizCompleted ? (
          <Button
            title={currentQuestionIndex === questions.length - 1 ? "Finish" : "Next"}
            onPress={handleNextQuestion}
            disabled={!selectedOptionName}
          />
        ) : null}
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
    marginBottom: 20,
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
});

export default QuizComponent;
