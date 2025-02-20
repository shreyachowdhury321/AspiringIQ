import {
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  ImageBackground,
  Image,
  TextInput,
  TouchableOpacity,
  onDayPress,
  selectedDate,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import MyStatusBar from '../../utils/MyStatusBar';
import {COLORS, IMAGES, Fonts} from '../../themes/Themes';
import normalize from '../../utils/helpers/normalize';
import DatePicker from 'react-native-date-picker';
import ImagePicker from 'react-native-image-crop-picker';
import {useDispatch, useSelector} from 'react-redux';
import {updateProfile} from '../../Redux/Slices/Profileaction';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = props => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [dateofbirth, setDateofbirth] = useState('');
  const [toggle, setToggle] = useState('');
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [imageUri, setImageUri] = useState(null);

  const dispatch = useDispatch();
  
  useEffect(() => {
    // Fetch user details from AsyncStorage on component mount
    const loadUserData = async () => {
      try {
        const storedName = await AsyncStorage.getItem('user_name');
        const storedPhone = await AsyncStorage.getItem('user_phone');
        const storedEmail = await AsyncStorage.getItem('user_email');
        const storedDob = await AsyncStorage.getItem('user_dob');
        const storeImage = await AsyncStorage.getItem('user_image');

        if (storedName) setName(storedName);
        if (storedPhone) setPhone(storedPhone);
        if (storedEmail) setEmail(storedEmail);
        if (storedDob) setDateofbirth(storedDob);
        if (storeImage) setImageUri(storeImage);
      } catch (error) {
        console.error('Error fetching user data:', error);
        console.log('data',StorageManager);
      }
    };

    loadUserData();
  }, []);

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      compressImageMaxWidth: normalize(300),
      compressImageMaxHeight: normalize(400),
      cropping: true,
      compressImageQuality: 0.7,
    })
      .then(image => {
        setImageUri(image.path);
      })
      .catch(error => {
        console.log('Error selecting image:', error);
      });
  };

  const handleConfirm = selectedDate => {
    setOpen(false);
    setDate(selectedDate);
    setDateofbirth(selectedDate.toDateString());
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleUpdateProfile = async () => {
    try {
      const profileData = { name, phone, email, dateofbirth, imageUri };
  
      // Save the updated data to AsyncStorage
      await AsyncStorage.setItem('user_name', name);
      await AsyncStorage.setItem('user_phone', phone);
      await AsyncStorage.setItem('user_email', email);
      await AsyncStorage.setItem('user_dob', dateofbirth);
  
      // Handle imageUri: if it's null, we remove the stored image
      if (imageUri) {
        await AsyncStorage.setItem('user_image', imageUri);
      } else {
        await AsyncStorage.removeItem('user_image');  // Remove image if not set
      }
  
      console.log('setitem', profileData);
      props.navigation.navigate('Home');
  
      // Dispatch the action to update the profile in Redux
      dispatch(updateProfile(profileData))
        .unwrap()
        .then(response => {
          Alert.alert('Success', 'Profile updated successfully!');
        
        })
        .catch(error => {
          // Alert.alert('Error', error.message);
        });
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };
  

  return (
    <>
      <MyStatusBar backgroundColor={COLORS.litepurple} />
      <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
        <KeyboardAvoidingView style={{flex: 1}} behavior={'height'}>
          <ImageBackground
            source={IMAGES.Main}
            resizeMode="stretch"
            style={{
              flex: 1,
            }}>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('Home');
              }}
              style={{
                height: normalize(30),
                width: normalize(30),
                // backgroundColor:'red',
                alignSelf: 'center',
                marginTop: normalize(20),
                marginRight: normalize(130),
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={IMAGES.backbutton}
                resizeMode="contain"
                style={{
                  height: normalize(15),
                  width: normalize(12),
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                height: normalize(100),
                width: normalize(100),
                // backgroundColor: 'red',
                alignSelf: 'center',
                marginTop: normalize(90),
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: normalize(1),
              }}
              onPress={choosePhotoFromLibrary}>
              <Image
                source={{uri: imageUri}}
                resizeMode="contain"
                style={{
                  height: normalize(100),
                  width: normalize(100),
                }}
              />
            </TouchableOpacity>
            <View
              style={{
                height: normalize(50),
                width: normalize(280),
                //  backgroundColor:'red',
                alignSelf: 'center',
                // marginTop: normalize(),
                alignItems: 'center',
              }}>
              <TextInput
                multiline={true}
                show={name.length > 0 ? true : false}
                icon={true}
                marginTop={normalize(15)}
                height={normalize(45)}
                width={normalize(265)}
                textColor={COLORS.black}
                placeholder={'Name'}
                placeholderTextColor={'#989898'}
                paddingLeft={normalize(30)}
                backgroundColor={'#FFFFFF'}
                borderRadius={normalize(5)}
                //   fontFamily={Fonts.PoppinsMedium}
                isheadertext={true}
                headertext={'name'}
                value={name}
                //   isleftIconVisible={true}
                marginBottom={normalize(2)}
                //   leftimage={ICONS.user}
                onChangeText={v => setName(v)}
                // alignSelf={'center'}
                fontSize={normalize(14)}
                secureTextEntry={toggle ? false : true}
                fontFamily={
                  Platform.OS == 'Android'
                    ? Fonts.MontserratMedium
                    : 'Montserrat_Medium'
                }
                borderWidth={normalize(1)}
                borderColor={COLORS.purple}
              />

              <TouchableOpacity
                onPress={() => {
                  setToggle(!toggle);
                }}>
                <Image
                  source={toggle ? IMAGES.cross : IMAGES.cheaktik}
                  resizeMode="contain"
                  style={{
                    height: normalize(18),
                    width: normalize(18),
                    alignSelf: 'flex-end',
                    //   backgroundColor:'red',
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
                //  backgroundColor:'red',
                alignSelf: 'center',
                alignItems: 'center',
              }}>
              <TextInput
                multiline={true}
                show={phone.length > 0 ? true : false}
                icon={true}
                marginTop={normalize(20)}
                height={normalize(45)}
                width={normalize(265)}
                textColor={COLORS.black}
                placeholder={'Phone'}
                placeholderTextColor={'#989898'}
                paddingLeft={normalize(30)}
                backgroundColor={'#FFFFFF'}
                borderRadius={normalize(5)}
                //   fontFamily={Fonts.PoppinsMedium}
                isheadertext={true}
                headertext={'phone'}
                value={phone}
                //   isleftIconVisible={true}
                marginBottom={normalize(2)}
                //   leftimage={ICONS.user}
                onChangeText={v => setPhone(v)}
                // alignSelf={'center'}
                fontSize={normalize(14)}
                // secureTextEntry={toggle ? false : true}
                fontFamily={
                  Platform.OS == 'Android'
                    ? Fonts.MontserratMedium
                    : 'Montserrat_Medium'
                }
                borderWidth={normalize(1)}
                borderColor={COLORS.purple}
                keyboardType="number-pad"
              />
               <TouchableOpacity>
                <Image
                  source={IMAGES.edit}
                  resizeMode="contain"
                  style={{
                    height: normalize(18),
                    width: normalize(18),
                    alignSelf: 'flex-end',
                    //   backgroundColor:'red',
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
                //  backgroundColor:'red',
                alignSelf: 'center',
                // marginTop: normalize(),
                alignItems: 'center',
              }}>
              <TextInput
                multiline={true}
                show={email.length > 0 ? true : false}
                icon={true}
                marginTop={normalize(25)}
                height={normalize(45)}
                width={normalize(265)}
                textColor={COLORS.black}
                placeholder={'Email'}
                placeholderTextColor={'#989898'}
                paddingLeft={normalize(30)}
                backgroundColor={'#FFFFFF'}
                borderRadius={normalize(5)}
                //   fontFamily={Fonts.PoppinsMedium}
                isheadertext={true}
                headertext={'email'}
                value={email}
                //   isleftIconVisible={true}
                marginBottom={normalize(2)}
                //   leftimage={ICONS.user}
                onChangeText={v => setEmail(v)}
                // alignSelf={'center'}
                fontSize={normalize(14)}
                // secureTextEntry={toggle ? false : true}
                fontFamily={
                  Platform.OS == 'Android'
                    ? Fonts.MontserratMedium
                    : 'Montserrat_Medium'
                }
                borderWidth={normalize(1)}
                borderColor={COLORS.purple}
                paddingVertical={2}
              />

              <TouchableOpacity>
                <Image
                  source={IMAGES.edit}
                  resizeMode="contain"
                  style={{
                    height: normalize(18),
                    width: normalize(18),
                    alignSelf: 'flex-end',
                    //   backgroundColor:'red',
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
                //  backgroundColor:'red',
                alignSelf: 'center',
                // marginTop: normalize(),
                alignItems: 'center',
              }}>
              <TextInput
                show={dateofbirth.length > 0 ? true : false}
                icon={true}
                marginTop={normalize(25)}
                height={normalize(45)}
                width={normalize(265)}
                textColor={COLORS.black}
                placeholder={'Date of birth'}
                placeholderTextColor={'#989898'}
                paddingLeft={normalize(30)}
                backgroundColor={'#FFFFFF'}
                borderRadius={normalize(5)}
                //   fontFamily={Fonts.PoppinsMedium}
                isheadertext={true}
                headertext={'dateofbirth'}
                value={dateofbirth}
                //   isleftIconVisible={true}
                marginBottom={normalize(2)}
                //   leftimage={ICONS.user}
                onChangeText={v => setDateofbirth(v)}
                // alignSelf={'center'}
                fontSize={normalize(14)}
                // secureTextEntry={toggle ? false : true}
                fontFamily={
                  Platform.OS == 'Android'
                    ? Fonts.MontserratMedium
                    : 'Montserrat_Medium'
                }
                borderWidth={normalize(1)}
                borderColor={COLORS.purple}
              />
              {/* {selectedDate
                  ? moment(selectedDate).format('DD/MM/YYYY')
                  : 'Choose Date'} */}
              <TouchableOpacity
                onPress={() => {
                  setOpen(!open);
                }}>
                <Image
                  source={IMAGES.calendar}
                  resizeMode="contain"
                  style={{
                    height: normalize(18),
                    width: normalize(18),
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
                height: normalize(45),
                width: normalize(220),
                backgroundColor: COLORS.purple,
                alignSelf: 'center',
                marginTop: normalize(28),
                borderRadius: normalize(12),
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => {
                // props.navigation.navigate('Home')
                handleUpdateProfile();
              }}>
              <Text style={{fontSize: normalize(14), color: COLORS.white}}>
                Update Profile
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                height: normalize(30),
                width: normalize(50),
                // backgroundColor:'red',
                alignSelf: 'center',
                marginTop: normalize(20),
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => {
                props.navigation.navigate('Login');
              }}>
              <Text style={{fontSize: normalize(12), color: COLORS.purple}}>
                Logout
              </Text>
            </TouchableOpacity>
          </ImageBackground>
        </KeyboardAvoidingView>
      </SafeAreaView>
      <DatePicker
        modal
        open={open}
        date={date}
        // date={dateofbirth}
        mode="date"
        maximumDate={new Date()}
        // onConfirm={date => {
        //   setOpen(false);
        //   setDate(date);
        // }}
        // onCancel={() => {
        //   setOpen(false);
        // }}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </>
  );
};

export default Profile;
