import React, { useReducer, useEffect, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import normalize from '../../utils/helpers/normalize';
import MyStatusBar from '../../utils/MyStatusBar';
import { COLORS, IMAGES, Fonts } from '../../themes/Themes';

const ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  SET_SUBJECTS: 'SET_SUBJECTS',
  SET_ERROR: 'SET_ERROR',
  SET_USER_ID: 'SET_USER_ID',
  SET_PROFILE_IMAGE: 'SET_PROFILE_IMAGE',
  SET_RANKING_DATA: 'SET_RANKING_DATA', // For rank and points
};

// Reducer to handle state changes
const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_LOADING:
      return { ...state, loading: true, error: null };
    case ACTIONS.SET_SUBJECTS:
      return { ...state, loading: false, paperData: action.payload, error: null };
    case ACTIONS.SET_ERROR:
      return { ...state, loading: false, error: action.payload };
    case ACTIONS.SET_USER_ID:
      return { ...state, userId: action.payload };
    case ACTIONS.SET_PROFILE_IMAGE:
      return { ...state, userProfileImage: action.payload };
    case ACTIONS.SET_RANKING_DATA:
      return { ...state, userRank: action.payload.rank, userPoints: action.payload.points };
    default:
      return state;
  }
};

const Home = props => {
  // Initial state
  const initialState = {
    paperData: [],
    loading: true,
    error: null,
    userId: null,
    userProfileImage: null,
    userRank: null,
    userPoints: null,
  };

  // Set up state with reducer
  const [state, dispatch] = useReducer(reducer, initialState);

  // State for additional loading management
  const [loading, setLoading] = useState(true);

  // Fetch subjects from API
  const fetchSubjects = async () => {
    try {
      dispatch({ type: ACTIONS.SET_LOADING });
      const response = await fetch(
        'https://zeewebvalley.com/quizup/super-admin/api/Controll/subject/'
      );
      const result = await response.json();

      if (result.status === '200') {
        const subjects = result.data.map(item => ({
          id: item.cat_id,
          image: { uri: item.cat_image },
          name: item.cat_name,
        }));

        await AsyncStorage.setItem('subjects', JSON.stringify(subjects));
        dispatch({ type: ACTIONS.SET_SUBJECTS, payload: subjects });
      } else {
        throw new Error('Failed to fetch subjects');
      }
    } catch (error) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
    }
  };

  // Fetch leaderboard data (rank and points)
  const fetchLeaderboardData = async userId => {
    const url = 'https://zeewebvalley.com/quizup/super-admin/api/Controll/ranking/';
    const formData = new FormData();
    formData.append('user_id', userId);

    try {
      setLoading(true);
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      if (result.status === '200' && result.data.length > 0) {
        const userData = result.data[0];
        dispatch({
          type: ACTIONS.SET_RANKING_DATA,
          payload: {
            rank: userData.rank || 'N/A',
            points: userData.point || '0',
          },
        });
      } else {
        dispatch({ type: ACTIONS.SET_ERROR, payload: 'No ranking data available' });
      }
    } catch (error) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: 'Error fetching leaderboard: ' + error.message });
    } finally {
      setLoading(false);
    }
  };

  // Load user ID and fetch leaderboard based on userId
  const loadUserIdFromStorage = async () => {
    try {
      const storedUserId = await AsyncStorage.getItem('userId');
      if (storedUserId) {
        dispatch({ type: ACTIONS.SET_USER_ID, payload: storedUserId });
        fetchLeaderboardData(storedUserId); // Fetch leaderboard when userId is available
      }
    } catch (error) {
      console.error('Error loading userId:', error);
    }
  };

  // Load subjects from storage or fetch from API
  const loadSubjectsFromStorage = async () => {
    try {
      const storedSubjects = await AsyncStorage.getItem('subjects');
      if (storedSubjects) {
        dispatch({ type: ACTIONS.SET_SUBJECTS, payload: JSON.parse(storedSubjects) });
      } else {
        fetchSubjects(); // Fetch subjects if not in storage
      }
    } catch (error) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
    }
  };

  // useEffect to load data on component mount
  useEffect(() => {
    loadSubjectsFromStorage();
    loadUserIdFromStorage();
  }, []);

  // Render individual paper data item
  const paperData_renderItem = ({ item }) => (
    <View style={{ flexDirection: 'column' }}>
      <TouchableOpacity
        style={{
          height: normalize(145),
          width: normalize(145),
          borderRadius: normalize(15),
          justifyContent: 'space-between',
          alignItems: 'center',
          alignSelf: 'center',
          marginTop: normalize(10),
        }}
        onPress={() => {
          props.navigation.navigate('Level');
        }}>
        <Image
          source={item.image}
          resizeMode="contain"
          style={{ height: normalize(140), width: normalize(140) }}
        />
      </TouchableOpacity>
      <Text
        numberOfLines={1}
        style={{
          fontSize: normalize(11),
          color: COLORS.black,
          alignSelf: 'center',
          fontFamily: Fonts.MontserratMedium,
          fontWeight: '900',
        }}>
        {item.name}
      </Text>
    </View>
  );

  // Separator for list items
  const Separator = () => <View style={{ marginVertical: normalize(2) }} />;

  // Render loading or error states
  if (state.loading) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  if (state.error) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Error: {state.error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <>
      <MyStatusBar backgroundColor={COLORS.litepurple} />
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={'height'}>
          <View
            style={{
              height: normalize(200),
              width: normalize(320),
              backgroundColor: COLORS.purple,
              borderRadius: normalize(10),
            }}>
            <View
              style={{
                height: normalize(85),
                width: normalize(320),
                marginTop: normalize(25),
              }}>
              <View
                style={{
                  height: normalize(60),
                  width: normalize(320),
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  style={{
                    height: normalize(60),
                    width: normalize(60),
                    alignSelf: 'flex-start',
                  }}
                  onPress={() => {
                    props.navigation.navigate('Profile');
                  }}>
                  <Image
                    source={{ uri: state.userProfileImage || IMAGES.defaultImage }}
                    resizeMode="contain"
                    style={{
                      height: normalize(50),
                      width: normalize(50),
                      borderRadius: normalize(25),
                      alignSelf: 'center',
                    }}
                  />
                </TouchableOpacity>
                <View
                  style={{
                    height: normalize(58),
                    width: normalize(100),
                    marginRight: normalize(50),
                  }}>
                  <Text
                    style={{
                      fontSize: normalize(18),
                      color: COLORS.yellow,
                      fontFamily: Fonts.MontserratMedium,
                    }}>
                    Hello,
                  </Text>
                  <Text
                    style={{
                      fontSize: normalize(15),
                      color: COLORS.white,
                      fontFamily: Fonts.MontserratMedium,
                      fontWeight: '800',
                    }}>
                    Emily
                  </Text>
                </View>
                <View
                  style={{
                    height: normalize(60),
                    width: normalize(100),
                    alignSelf: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image
                    source={IMAGES.normalbell}
                    resizeMode="contain"
                    style={{
                      height: normalize(20),
                      width: normalize(20),
                    }}
                  />
                </View>
              </View>
            </View>
            <View
              style={{
                height: normalize(65),
                width: normalize(300),
                backgroundColor: COLORS.white,
                alignSelf: 'center',
                flexDirection: 'row',
                borderRadius: normalize(10),
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: normalize(12),
                  color: COLORS.black,
                  marginLeft: normalize(10),
                  fontWeight: '700',
                }}>
                Your Rank: {state.userRank || 'N/A'} {' '}
                {state.userPoints ? `Points: ${state.userPoints}` : ''}
              </Text>
            </View>
          </View>

          <View style={{ flex: 1, alignSelf: 'center', alignItems: 'center' }}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={state.paperData}
              renderItem={paperData_renderItem}
              keyExtractor={item => item.id}
              ItemSeparatorComponent={Separator}
              numColumns={2}
            />
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};

export default Home;
