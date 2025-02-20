import React, {useReducer, useEffect, useState,} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  Image,
  TouchableOpacity,
  FlatList,
  Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import normalize from '../../utils/helpers/normalize';
import MyStatusBar from '../../utils/MyStatusBar';
import {COLORS, IMAGES, Fonts} from '../../themes/Themes';
import axios from 'axios';
import ImagePicker from 'react-native-image-crop-picker';
import { useSelector } from 'react-redux';
import { launchImageLibrary } from 'react-native-image-picker';


const ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  SET_SUBJECTS: 'SET_SUBJECTS',
  SET_ERROR: 'SET_ERROR',
  SET_USER_ID: 'SET_USER_ID',
  SET_PROFILE_DATA: 'SET_PROFILE_DATA',
  SET_RANKING_DATA: 'SET_RANKING_DATA',
  SET_IMAGE_URL: 'SET_IMAGE_URL',
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_LOADING:
      return {...state, loading: true, error: null};
    case ACTIONS.SET_SUBJECTS:
      return {...state, loading: false, paperData: action.payload, error: null};
    case ACTIONS.SET_ERROR:
      return {...state, loading: false, error: action.payload};
    case ACTIONS.SET_USER_ID:
      return {...state, userId: action.payload};
    case ACTIONS.SET_PROFILE_DATA:
      return {
        ...state,
        profileImageUrl: action.payload.imageUrl,
        userName: action.payload.name,
      };
    case ACTIONS.SET_IMAGE_URL:
      return {...state, profileImageUrl: action.payload};
    case ACTIONS.SET_RANKING_DATA:
      return {
        ...state,
        userRank: action.payload.rank,
        userPoints: action.payload.points,
      };
    default:
      return state;
  }
};

const Home = props => {
  const initialState = {
    paperData: [],
    loading: true,
    error: null,
    userId: null,
    profileImageUrl: null,
    userName: 'Raman',userRank: null,
    userPoints: null,
  };

   const [state, dispatch] = useReducer(reducer, initialState);
  const [points, setPoints] = useState(0);
  const [profileImageUrl, setProfileImageUrl] = useState(null); // Local state
  // const dispatch = useDispatch();
  // const {userId, profileImage} = useSelector(state => state.user); // Redux state (assuming user data is in Redux)
  const [imageUri, setImageUri] = React.useState(null); 

  const selectImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo', // Can also be 'video' or 'mixed'
        selectionLimit: 1,  // Limit to 1 file
      },
      response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          console.log('Error: ', response.errorMessage);
        } else {
          const uri = response.assets[0]?.uri;
          setImageUri(uri);
        }
      }
    );
  };
const updateProfileImage = async () => {
    try {
        if (!state.userId) {
            Alert.alert('Error', 'User ID not found. Please log in again.');
            props.navigation.navigate('Profile')
        }

        const result = await launchImageLibrary({
            mediaType: 'photo',
            maxWidth: 300,
            maxHeight: 300,
            quality: 0.8,
        });

        if (result.didCancel) {
            console.log('User cancelled image picker');
            
        }

        if (result.assets && result.assets.length > 0) {
            const image = result.assets[0];

            const formData = new FormData();
            formData.append('User_id', state.userId); // Use userId from state
            formData.append('image', {
                uri: image.uri,
                type: image.type,
                name: `profile_${state.userId}.jpg`,
            });

            const response = await axios.post(
                'https://zeewebvalley.com/quizup/super-admin/api/Controll/profile_image',
                formData,
                { headers: { 'Content-Type': 'multipart/form-data' } }
            );

            if (response.data.status === '200') {
                dispatch({ type: ACTIONS.SET_IMAGE_URL, payload: response.data.user_img });
                setProfileImageUrl(response.data.user_img);
                props.navigation.navigate('Profile');
            } else {
                Alert.alert('Error', 'Failed to update profile image.');
            }
        } else {
            Alert.alert('Error', 'No image selected!');
        }
    } catch (error) {
        console.error('Error updating profile image:', error.message || error);
        Alert.alert('Error', 'Failed to update profile image.');
    }
};


 
  // Fetch ranking data
  useEffect(() => {
    const fetchRankingData = async () => {
      try {
        const response = await axios.get(
          'https://zeewebvalley.com/quizup/super-admin/api/Controll/ranking/',
        );
        if (response.data?.data?.length > 0) {
          const {point} = response.data.data[0];
          setPoints(point);
          console.log('point', points);
        }
      } catch (error) {
        console.error('Error fetching ranking data:', error);
      }
    };

    fetchRankingData();
  }, []);

  const fetchSubjects = async () => {
    try {
      dispatch({type: ACTIONS.SET_LOADING});
      const response = await fetch(
        'https://zeewebvalley.com/quizup/super-admin/api/Controll/subject/',
      );
      const result = await response.json();

      if (result.status === '200') {
        const subjects = result.data.map(item => ({
          id: item.cat_id,
          image: {uri: item.cat_image},
          name: item.cat_name,
        }));

        await AsyncStorage.setItem('subjects', JSON.stringify(subjects));
        dispatch({type: ACTIONS.SET_SUBJECTS, payload: subjects});
      } else {
        throw new Error('Failed to fetch subjects');
      }
    } catch (error) {
      dispatch({type: ACTIONS.SET_ERROR, payload: error.message});
    }
  };

  const loadUserIdFromStorage = async () => {
    try {
      const storedUserId = await AsyncStorage.getItem('userId');
      if (storedUserId) {
        dispatch({type: ACTIONS.SET_USER_ID, payload: storedUserId});
      }
    } catch (error) {
      console.error('Error loading userId:', error);
    }
  };

  useEffect(() => {
    loadSubjectsFromStorage();
    loadUserIdFromStorage();
  }, []);

  const loadSubjectsFromStorage = async () => {
    try {
      const storedSubjects = await AsyncStorage.getItem('subjects');
      if (storedSubjects) {
        dispatch({
          type: ACTIONS.SET_SUBJECTS,
          payload: JSON.parse(storedSubjects),
        });
      } else {
        fetchSubjects();
      }
    } catch (error) {
      dispatch({type: ACTIONS.SET_ERROR, payload: error.message});
    }
  };

  // LOAD DATA ON COMPONENT MOUNT

  const paperData_renderItem = ({item}) => (
    <View style={{flexDirection: 'column'}}>
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
          style={{height: normalize(140), width: normalize(140)}}
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

  if (state.loading) {
    return (
      <SafeAreaView
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  if (state.error) {
    return (
      <SafeAreaView
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Error: {state.error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <>
      <MyStatusBar backgroundColor={COLORS.litepurple} />
      <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
        <KeyboardAvoidingView style={{flex: 1}} behavior="height">
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
                  onPress={updateProfileImage} // Now this function is accessible
                >
                  <Image
                    source={
                      state.profileImageUrl
                        ? {uri: state.profileImageUrl}
                        : IMAGES.Amelica
                    }
                    resizeMode="contain"
                    style={{
                      height: normalize(50),
                      width: normalize(50),
                      borderRadius: normalize(25),
                      alignSelf: 'center',
                      borderWidth: normalize(2),
                      borderColor: COLORS.black,
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
                    {state.userName}
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
                    style={{height: normalize(20), width: normalize(20)}}
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
                Points: {points}
              </Text>
            </View>
          </View>

          <View style={{flex: 1, alignSelf: 'center', alignItems: 'center'}}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={state.paperData}
              renderItem={paperData_renderItem}
              keyExtractor={item => item.id}
              numColumns={2}
            />
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};

export default Home;
