import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  Modal,
  TextInput,
  StyleSheet,
  FlatList,
  Alert,
} from 'react-native';
import axios from 'axios';

const QuizComponent = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [level, setLevel] = useState('Intermediate'); // Set default level
  const [catId, setCatId] = useState('7'); // Set default category ID
  const [userId, setUserId] = useState('59'); // Set default user ID

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await axios.post(
        'https://zeewebvalley.com/quizup/super-admin/api/Controll/get_question/',
        {
          level,
          cat_id: catId,
          user_id: userId,
        },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );
      // Set questions from the response
      setQuestions(response.data.data);
    } catch (error) {
      console.error('Error fetching questions:', error);
      Alert.alert(
        'Error',
        'Failed to fetch questions. Please try again later.',
      );
    }
  };

  const handleOptionSelect = (questionId, optionIndex) => {
    setSelectedOption({questionId, optionIndex});
    setShowModal(true);
  };

  const renderQuestion = ({item}) => {
    return (
      <View style={styles.questionContainer}>
        <Text style={styles.questionTitle}>{item.title}</Text>
        {item.answer &&
          item.answer.map((option, index) => (
            <Button
              key={option.qa_id}
              title={option.answer}
              onPress={() => handleOptionSelect(item.quiz_id, index)}
            />
          ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Quiz Questions</Text>
      <FlatList
        data={questions}
        renderItem={renderQuestion}
        keyExtractor={item => item.quiz_id}
        contentContainerStyle={styles.list}
      />
      <Modal visible={showModal} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Your Selected Option: {selectedOption?.optionIndex + 1}</Text>
            <Text>
              Correct Answer:{' '}
              {
                questions.find(q => q.quiz_id === selectedOption?.questionId)
                  ?.correct_answer
              }
            </Text>
            <Button title="Close" onPress={() => setShowModal(false)} />
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
  list: {
    paddingBottom: 20,
  },
  questionContainer: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    elevation: 2,
  },
  questionTitle: {
    fontSize: 18,
    marginBottom: 10,
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
