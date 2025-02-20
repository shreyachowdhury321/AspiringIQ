import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  ImageBackground,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Alert,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import MyStatusBar from '../../utils/MyStatusBar';
import normalize from '../../utils/helpers/normalize';
import {COLORS, Fonts, IMAGES} from '../../themes/Themes';
import {SelectList} from 'react-native-dropdown-select-list';
import {useState} from 'react';
import axios from 'axios';
import {registerUser} from '../../Redux/Slices/Ragisteraction';

const Register = props => {
  const [toggle, setToggle] = useState(false);
  const [toggle1, setToggle1] = useState(false);
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [board, setBoard] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [stream, setStream] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  // const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const BoardOptions = [
    {key: '1', value: 'CBSE'},
    {key: '2', value: 'WBSE'},
    {key: '3', value: 'ICSE'},
  ];
  const ClassOptions = [
    {key: '1', value: '9'},
    {key: '2', value: '10'},
    {key: '3', value: '11'},
    {key: '4', value: '12'},
  ];
  const StreamOptions = [
    {key: '1', value: 'Arts'},
    {key: '2', value: 'Humanities'},
    {key: '3', value: 'Commerce'},
    {key: '4', value: 'Science'},
    // {key: '5', value: ''},
    // {key: '6', value: ''},
    // {key: '7', value: '7'},
    // {key: '8', value: '8'},
    // {key: '9', value: '9'},
    // {key: '10', value: '10'},
  ];

  const handleRegister = () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      console.log('confirmpassword');
      return;
    }

    const formData = {
      fullName,
      phoneNumber,
      board,
      selectedClass,
      stream,
      email,
      password,
      confirmPassword,
    };

    dispatch(registerUser(formData));
    Alert.alert('ragistation sucess');
    // Dispatch the registration action
    console.log('formData', formData);
    props.navigation.navigate('Login');
  };

  return (
    <>
      <MyStatusBar backgroundColor={COLORS.litepurple} />
      <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
        <KeyboardAvoidingView style={{flex: 1}} behavior={'height'}>
          <ImageBackground
            source={IMAGES.Main}
            resizeMode="stretch"
            style={{flex: 1}}>
            <View
              style={{
                height: normalize(40),
                width: normalize(150),
                alignSelf: 'center',
                marginTop: normalize(10),
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: normalize(35),
              }}>
              <Text
                style={{
                  fontSize: normalize(14),
                  color: COLORS.purple,
                  fontFamily: Fonts.MontserratMedium,
                }}>
                Register
              </Text>
              <Text
                style={{
                  fontSize: normalize(13),
                  alignSelf: 'center',
                  color: COLORS.black,
                  fontFamily: Fonts.MontserratMedium,
                }}>
                Create new account
              </Text>
            </View>
            <View
              style={{
                height: normalize(50),
                width: normalize(280),
                alignSelf: 'center',
                alignItems: 'center',
                marginLeft: normalize(5),
              }}>
              <TextInput
                // multiline={true}
                show={fullName.length > 0 ? true : false}
                icon={true}
                marginTop={normalize(18)}
                height={normalize(45)}
                width={normalize(264)}
                textColor={COLORS.black}
                placeholder={'Full name'}
                placeholderTextColor={'#989898'}
                paddingLeft={normalize(30)}
                backgroundColor={'#FFFFFF'}
                borderRadius={normalize(5)}
                isheadertext={true}
                headertext={'fullName'}
                value={fullName}
                onChangeText={v => setFullName(v)}
                fontSize={normalize(14)}
                fontFamily={
                  Platform.OS === 'Android'
                    ? Fonts.MontserratMedium
                    : 'Montserrat_Medium'
                }
                borderWidth={normalize(1)}
                borderColor={COLORS.purple}
                paddingVertical={2}
              />
              <Image
                source={IMAGES.vector}
                resizeMode="contain"
                style={{
                  height: normalize(20),
                  width: normalize(20),
                  alignSelf: 'flex-start',
                  top: normalize(35),
                  position: 'absolute',
                  tintColor: COLORS.purple,
                  marginLeft: normalize(12),
                }}
              />
            </View>
            <View
              style={{
                height: normalize(50),
                width: normalize(280),
                alignSelf: 'center',
                alignItems: 'center',
              }}>
              <TextInput
                // multiline={true}
                show={phoneNumber.length > 0 ? true : false}
                icon={true}
                marginTop={normalize(18)}
                height={normalize(45)}
                width={normalize(265)}
                textColor={COLORS.black}
                placeholder={'Enter phone number '}
                placeholderTextColor={'#989898'}
                paddingLeft={normalize(35)}
                backgroundColor={'#FFFFFF'}
                borderRadius={normalize(5)}
                isheadertext={true}
                headertext={'phoneNumber'}
                value={phoneNumber}
                onChangeText={v => setPhoneNumber(v)}
                fontSize={normalize(14)}
                fontFamily={
                  Platform.OS === 'Android'
                    ? Fonts.MontserratMedium
                    : 'Montserrat_Medium'
                }
                borderWidth={normalize(1)}
                borderColor={COLORS.purple}
                keyboardType="number-pad"
              />
              <Image
                source={IMAGES.phone}
                resizeMode="contain"
                style={{
                  height: normalize(20),
                  width: normalize(20),
                  alignSelf: 'flex-start',
                  top: normalize(30),
                  position: 'absolute',
                  tintColor: COLORS.purple,
                  marginLeft: normalize(12),
                }}
              />
            </View>
            <TouchableOpacity
              style={{
                width: normalize(270),
                alignSelf: 'center',
                marginTop: normalize(20),
                borderWidth: normalize(1),
                borderColor: COLORS.depcolor,
                borderRadius: normalize(10),
              }}>
              <SelectList
                setSelected={setBoard}
                data={BoardOptions}
                save="value"
                defaultOption={{key: '1', value: 'Board'}}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: normalize(270),
                alignSelf: 'center',
                marginTop: normalize(10),
                borderWidth: normalize(1),
                borderColor: COLORS.depcolor,
                borderRadius: normalize(10),
              }}>
              <SelectList
                setSelected={setSelectedClass}
                data={ClassOptions}
                save="value"
                defaultOption={{key: '1', value: 'class'}}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: normalize(270),
                alignSelf: 'center',
                marginTop: normalize(10),
                borderWidth: normalize(1),
                borderColor: COLORS.depcolor,
                borderRadius: normalize(10),
              }}>
              <SelectList
                setSelected={setStream}
                data={StreamOptions}
                save="value"
                defaultOption={{key: '1', value: 'Stream'}}
              />
            </TouchableOpacity>
            <View
              style={{
                height: normalize(50),
                width: normalize(280),
                alignSelf: 'center',
                alignItems: 'center',
              }}>
              <TextInput
                // multiline={true}
                show={email.length > 0 ? true : false}
                icon={true}
                marginTop={normalize(10)}
                height={normalize(45)}
                width={normalize(265)}
                textColor={COLORS.black}
                placeholder={'Enter email id '}
                placeholderTextColor={'#989898'}
                paddingLeft={normalize(35)}
                backgroundColor={'#FFFFFF'}
                borderRadius={normalize(5)}
                isheadertext={true}
                headertext={'email'}
                value={email}
                onChangeText={v => setEmail(v)}
                fontSize={normalize(14)}
                fontFamily={
                  Platform.OS === 'Android'
                    ? Fonts.MontserratMedium
                    : 'Montserrat_Medium'
                }
                borderWidth={normalize(1)}
                borderColor={COLORS.purple}
                paddingVertical={2}
              />
              <Image
                source={IMAGES.mail}
                resizeMode="contain"
                style={{
                  height: normalize(20),
                  width: normalize(20),
                  alignSelf: 'flex-start',
                  top: normalize(21),
                  position: 'absolute',
                  tintColor: COLORS.purple,
                  marginLeft: normalize(13),
                }}
              />
            </View>
            <View
              style={{
                height: normalize(50),
                width: normalize(280),
                alignSelf: 'center',
                marginTop: normalize(10),
                alignItems: 'center',
              }}>
              <TextInput
                // multiline={true}
                show={password.length > 0 ? true : false}
                icon={true}
                height={normalize(45)}
                width={normalize(265)}
                textColor={COLORS.black}
                placeholder={'Password'}
                placeholderTextColor={'#989898'}
                paddingLeft={normalize(33)}
                backgroundColor={'#FFFFFF'}
                borderRadius={normalize(5)}
                isheadertext={true}
                headertext={'Password'}
                value={password}
                onChangeText={v => setPassword(v)}
                fontSize={normalize(14)}
                secureTextEntry={!toggle}
                fontFamily={
                  Platform.OS === 'Android'
                    ? Fonts.MontserratMedium
                    : 'Montserrat_Medium'
                }
                borderWidth={normalize(1)}
                borderColor={COLORS.purple}
                paddingVertical={1}
              />
              <Image
                source={IMAGES.lock}
                resizeMode="contain"
                style={{
                  height: normalize(18),
                  width: normalize(18),
                  alignSelf: 'flex-start',
                  top: normalize(13),
                  position: 'absolute',
                  tintColor: COLORS.purple,
                  marginLeft: normalize(12),
                }}
              />
              <TouchableOpacity onPress={() => setToggle(!toggle)}>
                <Image
                  source={toggle ? IMAGES.closeeye : IMAGES.openeye}
                  resizeMode="contain"
                  style={{
                    height: normalize(15),
                    width: normalize(15),
                    alignSelf: 'flex-end',
                    bottom: normalize(32),
                    tintColor: COLORS.Blue,
                    marginLeft: normalize(226),
                  }}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                height: normalize(50),
                width: normalize(280),
                alignSelf: 'center',
                alignItems: 'center',
              }}>
              <TextInput
                // multiline={true}
                show={confirmPassword.length > 0 ? true : false}
                icon={true}
                height={normalize(45)}
                width={normalize(265)}
                textColor={COLORS.black}
                placeholder={'Confirm password'}
                placeholderTextColor={'#989898'}
                paddingLeft={normalize(30)}
                backgroundColor={'#FFFFFF'}
                borderRadius={normalize(5)}
                isheadertext={true}
                headertext={'confirmPassword'}
                value={confirmPassword}
                onChangeText={v => setconfirmPassword(v)}
                fontSize={normalize(14)}
                secureTextEntry={!toggle1}
                fontFamily={
                  Platform.OS === 'Android'
                    ? Fonts.MontserratMedium
                    : 'Montserrat_Medium'
                }
                borderWidth={normalize(1)}
                borderColor={COLORS.purple}
                paddingVertical={1}
              />
              <Image
                source={IMAGES.lock}
                resizeMode="contain"
                style={{
                  height: normalize(18),
                  width: normalize(18),
                  alignSelf: 'flex-start',
                  top: normalize(13),
                  position: 'absolute',
                  tintColor: COLORS.purple,
                  marginLeft: normalize(13),
                }}
              />
              <TouchableOpacity onPress={() => setToggle1(!toggle1)}>
                <Image
                  source={toggle1 ? IMAGES.openeye : IMAGES.closeeye}
                  resizeMode="contain"
                  style={{
                    height: normalize(15),
                    width: normalize(15),
                    alignSelf: 'flex-end',
                    bottom: normalize(32),
                    tintColor: COLORS.Blue,
                    marginLeft: normalize(226),
                  }}
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={{
                width: normalize(225),
                height: normalize(40),
                alignItems: 'center',
                backgroundColor: COLORS.depcolor,
                justifyContent: 'center',
                alignSelf: 'center',
                borderRadius: normalize(10),
              }}
              onPress={() => {
                // props.navigation.navigate('Login');
                handleRegister();
              }}>
              <Text
                style={{
                  color: COLORS.white,
                  fontSize: normalize(14),
                  letterSpacing: normalize(1),
                  fontWeight: '900',
                  fontFamily:
                    Platform.OS === 'Android'
                      ? Fonts.MontserratMedium
                      : 'Montserrat_Medium',
                }}>
                Sign up
              </Text>
            </TouchableOpacity>
            <View
              style={{
                height: normalize(40),
                width: normalize(220),
                alignSelf: 'center',
                marginTop: normalize(5),
              }}>
              <Text
                style={{
                  fontSize: normalize(12),
                  alignSelf: 'center',
                  color: COLORS.liteblack,
                  fontFamily: Fonts.MontserratMedium,
                }}>
                Don't have an account?
              </Text>
              <TouchableOpacity
                onPress={() => props.navigation.navigate('Login')}>
                <Text
                  style={{
                    fontSize: normalize(12),
                    alignSelf: 'center',
                    fontWeight: '800',
                    color: COLORS.purple,
                    fontFamily: Fonts.MontserratMedium,
                  }}>
                  Login
                </Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};

export default Register;
