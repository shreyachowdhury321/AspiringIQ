import React, { useState, useEffect } from 'react';
import { View, Text, Button, Modal, TextInput, Alert, StyleSheet } from 'react-native';
import axios from 'axios';

const QuizComponent = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [option, setOption] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch questions when the component mounts
  useEffect(() => {
    // Optionally, fetch questions here if needed without user input
  }, []);

  const fetchQuestions = async (title, option) => {
    setLoading(true);
    try {
      console.log('Title:', title, 'Option:', option); // Check the inputs
      const response = await axios.post(
        'https://zeewebvalley.com/quizup/super-admin/api/Controll/get_question/',
        {
          title,
          option,
          level: 'Beginners',
          cat_id: 7,
          user_id: 59,
        }
      );

      console.log('API Response:', response.data); // Log the response

      if (response.data && response.data.data && Array.isArray(response.data.data)) {
        setQuestions(response.data.data);
      } else {
        setQuestions([]);
        Alert.alert('No questions found');
      }
    } catch (error) {
      console.error('Error fetching questions:', error);
      Alert.alert('Error fetching questions: ' + error.message); // Alert user about the error
      setQuestions([]); // Clear questions on error
    } finally {
      setLoading(false);
    }
  };

  const handleOptionSelect = (optionId) => {
    setSelectedOption(optionId);
    setShowModal(true);
  };

  const handleTitleChange = (text) => {
    setTitle(text);
  };

  const handleOptionChange = (text) => {
    setOption(text);
  };

  const handleFetchQuestions = () => {
    if (!title || !option) {
      Alert.alert('Please enter both Title and Option.');
      return; // Prevent fetching if inputs are empty
    }
    fetchQuestions(title, option);
  };

  return (
    <View style={styles.container}>
      <Text>Enter Title:</Text>
      <TextInput
        value={title}
        onChangeText={handleTitleChange}
        style={styles.input}
      />
      <Text>Enter Option:</Text>
      <TextInput
        value={option}
        onChangeText={handleOptionChange}
        style={styles.input}
      />
      <Button title="Fetch Questions" onPress={handleFetchQuestions} />
      {loading ? (
        <Text>Loading...</Text>
      ) : questions.length > 0 ? (
        questions.map((question) => (
          <View key={question.quiz_id}>
            <Text style={styles.questionText}>{question.title}</Text>
            {question.answer.map((option) => (
              <Button
                key={option.qa_id}
                title={option.answer}
                onPress={() => handleOptionSelect(option.qa_id)}
              />
            ))}
          </View>
        ))
      ) : (
        <Text>No questions fetched yet.</Text>
      )}
      <Modal visible={showModal} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Your Selected Option: {selectedOption}</Text>
            {questions.find((q) => q.quiz_id === selectedOption)?.answer.find(
              (a) => a.qa_id === selectedOption
            )?.answer}
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
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  questionText: {
    fontSize: 16,
    marginVertical: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
});

export default QuizComponent;
