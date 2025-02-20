import React, { useState, useEffect } from 'react';
import { View, Text, Button, Modal, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import axios from 'axios';

const QuizComponent = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [showResultModal, setShowResultModal] = useState(false);

  const [level, setLevel] = useState('Intermediate');
  const [catId, setCatId] = useState('7');
  const [userId, setUserId] = useState('59');

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
      setQuestions(response.data.data.slice(0, 6)); // Limit to 6 questions
    } catch (error) {
      console.error('Error fetching questions:', error);
      Alert.alert('Error', 'Failed to fetch questions. Please try again later.');
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      calculateResults();
    }
  };

  const handleAnswerSelection = (questionId, selectedAnswerIndex) => {
    setSelectedAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[currentQuestionIndex] = {
        questionId,
        selectedAnswerIndex,
      };
      return updatedAnswers;
    });
  };

  const calculateResults = () => {
    let correctCount = 0;
    selectedAnswers.forEach((answer, index) => {
      const question = questions.find((q) => q.quiz_id === answer.questionId);
      if (question && question.correct_answer === answer.selectedAnswerIndex) {
        correctCount++;
      }
    });
    Alert.alert('Quiz Completed', `You got ${correctCount} out of ${questions.length} correct!`);
    setShowResultModal(true);
  };

  const renderQuestion = () => {
    const currentQuestion = questions[currentQuestionIndex];

    if (!currentQuestion) return null;

    return (
      <View style={styles.questionContainer}>
        <Text style={styles.questionTitle}>{currentQuestion.title}</Text>

        <View style={styles.optionsContainer}>
          {currentQuestion.answer && currentQuestion.answer.map((option, index) => (
            <TouchableOpacity
              key={option.qa_id}
              style={styles.optionButton}
              onPress={() => handleAnswerSelection(currentQuestion.quiz_id, index)}
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
          ))}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Quiz</Text>
      {renderQuestion()}
      <Button title="Next" onPress={handleNextQuestion} />

      <Modal visible={showResultModal} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>You've completed the quiz!</Text>
            <Text>
              Your score: {selectedAnswers.filter((a, i) => questions[i].correct_answer === a.selectedAnswerIndex).length}{' '}
              out of {questions.length}
            </Text>
            <Button title="Close" onPress={() => setShowResultModal(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
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
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 2,
  },
  questionTitle: {
    fontSize: 20,
    marginBottom: 15,
  },
  optionsContainer: {
    marginTop: 10,
  },
  optionButton: {
    padding: 12,
    marginVertical: 6,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    elevation: 1,
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
    borderColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  radioButtonSelected: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: '#007AFF',
  },
  optionText: {
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
});

export default QuizComponent;