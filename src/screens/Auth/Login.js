import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  Image,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Alert,
  token,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {loginUserAction} from '../../Redux/Reducer/AuthReducer'; // Import your Redux action
import MyStatusBar from '../../utils/MyStatusBar';
import normalize from '../../utils/helpers/normalize';
import {COLORS, Fonts, IMAGES} from '../../themes/Themes';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = props => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [toggle, setToggle] = useState(false);
  const [userid,setuserid] = useState('')
  const dispatch = useDispatch();
  // const {loading, error, token} = useSelector((state) => state.auth); // Accessing state from redux

  // This function handles the login logic
  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Error', 'Username or password cannot be empty');
      return;
    }
    const loginData = {username, password};

    // Dispatching login action
    dispatch(loginUserAction(loginData));
    console.log('data', loginData);
    props.navigation.navigate('Home');
  };

  // Storing token in asyncStorage once the user successfully logs in
  useEffect(() => {
    if (token) {
      // Save token in asyncStorage
      AsyncStorage.setItem('userToken', token);
      // Navigate to Home screen
      
    }
  }, [token]);

  return (
    <>
      <MyStatusBar backgroundColor={COLORS.litepurple} />
      <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
        <KeyboardAvoidingView style={{flex: 1}} behavior={'height'}>
          <ImageBackground
            source={IMAGES.Main}
            resizeMode="stretch"
            style={{flex: 1}}>
            <View style={{alignSelf: 'center', marginTop: normalize(40)}}>
              <Image
                source={IMAGES.Learning_cuate}
                resizeMode="contain"
                style={{
                  height: normalize(200),
                  width: normalize(200),
                  alignSelf: 'center',
                }}
              />
            </View>

            {/* Login Fields */}
            <View style={{alignSelf: 'center', marginTop: normalize(50)}}>
              <Text
                style={{
                  color: COLORS.purple,
                  alignSelf: 'center',
                  fontSize: normalize(15),
                  fontWeight: '800',
                }}>
                Login
              </Text>
              <Text
                style={{
                  alignSelf: 'center',
                  fontSize: normalize(13),
                  color: COLORS.black,
                }}>
                Login to your account
              </Text>
            </View>

            {/* Username Input */}
            <View style={{alignSelf: 'center', marginTop: normalize(10)}}>
              <TextInput
                value={username}
                onChangeText={v => setUsername(v)}
                placeholder="Username"
                style={{
                  borderWidth: normalize(1),
                  borderColor: COLORS.purple,
                  borderRadius: normalize(5),
                  paddingLeft: normalize(25),
                  height: normalize(50),
                  width: normalize(280),
                  backgroundColor: COLORS.white,
                  color: COLORS.black,
                }}
                placeholderTextColor="#989898"
              />
            </View>

            {/* Password Input */}
            <View style={{alignSelf: 'center', marginTop: normalize(10)}}>
              <TextInput
                value={password}
                onChangeText={v => setPassword(v)}
                placeholder="Password"
                secureTextEntry={!toggle}
                style={{
                  borderWidth: normalize(1),
                  borderColor: COLORS.purple,
                  borderRadius: normalize(5),
                  paddingLeft: normalize(25),
                  height: normalize(50),
                  width: normalize(280),
                  backgroundColor: COLORS.white,
                  color: COLORS.black,
                }}
                placeholderTextColor="#989898"
              />
              <TouchableOpacity
                onPress={() => {
                  setToggle(!toggle);
                }}>
                <Text style={{color: COLORS.purple}}>
                  {toggle ? 'Hide' : 'Show'}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Login Button */}
            <TouchableOpacity
              onPress={handleLogin}
              style={{
                width: normalize(245),
                height: normalize(45),
                alignItems: 'center',
                backgroundColor: COLORS.depcolor,
                justifyContent: 'center',
                alignSelf: 'center',
                borderRadius: normalize(10),
                marginTop: normalize(24),
              }}>
              <Text
                style={{
                  color: COLORS.white,
                  fontSize: normalize(14),
                  letterSpacing: normalize(1),
                  fontWeight: '900',
                }}>
                Continue
              </Text>
            </TouchableOpacity>

            {/* SignUp Link */}
            <View
              style={{
                alignSelf: 'center',
                marginTop: normalize(20),
                alignItems: 'center',
              }}>
              <Text style={{fontSize: normalize(12), color: COLORS.liteblack}}>
                Don't have an Account?
              </Text>
              <TouchableOpacity
                onPress={() => props.navigation.navigate('Register')}>
                <Text
                  style={{
                    fontSize: normalize(12),
                    fontWeight: '800',
                    color: COLORS.purple,
                  }}>
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};

export default Login;
