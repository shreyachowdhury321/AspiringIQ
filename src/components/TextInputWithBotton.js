import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  TextInput,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';
import PropTypes from 'prop-types';
import {COLORS, ICONS, IMAGES} from '../themes/Themes';
import normalize from '../utils/helpers/normalize';
 import {Fonts} from '../themes/Fonts';
export default function TextInputWithButton(props) {
  const inputRef = useRef(null);
  const [blurview, setblurview] = useState(false);
  const [headerTaxt, setHeaderTaxt] = useState(false);

  function onChangeText(text) {
    // props.value.length >= 0 ? setHeaderTaxt(true) : setHeaderTaxt(false);

    if (props.onChangeText) {
      props.onChangeText(text);
    }
  }

  function onPress() {
    if (props.onPress) {
      props.onPress();
    }
  }
  useEffect(() => {
    if (props.focus == true) {
      // Platform.OS === 'ios'
      //   ? inputRef.current.focus()
      //   : 
        setTimeout(() => inputRef.current.focus(), 600);
    }
  }, [props.focus]);
  return (
    <>
      <View
        style={{
          backgroundColor: props.backgroundColor,
          borderRadius: props.borderRadius,
          alignItems: 'flex-start',
          justifyContent: 'center',
          marginBottom: props.marginBottom,
          marginTop: props.marginTop,
          shadowColor: '#024BAD',
          shadowOffset: {width: 0, height: 3},
          shadowOpacity: props.show && props.isheadertext && 1 ,
          shadowRadius: 1,
          elevation:15
          
        }}>
      
        {props.show && props.isheadertext && (
          <Text
            style={{
               fontFamily: Fonts.PoppinsRegular,
              color: '#446189', //props.headertxtcolor,
              fontSize: props.headertxtsize,
              marginTop:normalize(5),
              marginBottom:normalize(-10),
              marginLeft: normalize(45),
            }}>
            {props.headertext}
          </Text>
        )}
        <View
          style={{
            flexDirection: 'row',
            width: props.width,
            alignItems: 'center',
            height: props.height,
            borderWidth: props.borderWidth,
            borderColor: props.borderColor, //props.viewbordercolor?props.viewbordercolor: '#C1C1C1',
            borderRadius: props.borderRadius,
            borderBottomColor: props.borderBottomColor,
            paddingHorizontal: normalize(10),
            justifyContent: 'space-between',
            // backgroundColor:'green'
          }}>
          {/* {props.isleftIconVisible && (
        <Image
          resizeMode="contain"
          source={props.leftIcon}
          style={{width: normalize(15), height: normalize(15)}}
        />
      )} */}
          {props.isleftIconVisible && (
            <TouchableOpacity
              // style={{backgroundColor:'red'}}
              // style={{backgroundColor:'red'}}
              onPress={() => onPress()}>
              <Image
                source={props.leftimage}
                resizeMode="contain"
                style={{
                  width:normalize(14), //props.leftimageheight,
                  height: normalize(16),//props.leftimagewidth,
                  tintColor: props.tintColor,
                  marginLeft: normalize(5),
                  marginRight: normalize(10),
                }}
              />
            </TouchableOpacity>
          )}

          <TextInput
            ref={inputRef}
            // onPressIn={() => {
            //   setHeaderTaxt(true);
            // }}

            style={[
              {
                flex: 1,
                paddingLeft: props.textInputLeft,
                textAlign: props.textAlign,
                letterSpacing: props.letterSpacing,
                color: props.textColor,
                fontFamily: props.fontFamily,
                fontSize: props.fontSize,
                paddingRight: normalize(0),
                shadowColor: props.shadowColor,
                shadowOffset: props.shadowOffset,
                shadowOpacity: props.shadowOpacity,
                shadowRadius: props.shadowRadius,
                
                // backgroundColor:'red'
                elevation: props.elevation,

                // fontWeight:props.fontWeight,
              },
            ]}
            maxLength={props.maxLength}
            // secureTextEntry={eyeVisible ? props.isSecure : !props.isSecure}
            multiline={props.multiline}
            autoCapitalize={props.autoCapitalize}
            placeholder= { props.placeholder}
            editable={props.editable}
            spellCheck={false}
            placeholderTextColor={props.placeholderTextColor}
            keyboardType={props.keyboardType}
            value={props.value}
            //fontWeight={props.fontWeight}
            onChangeText={text => {
              onChangeText(text);
            }}
            onBlur={() => {
              setblurview(false), console.log('hi');
            }}
            onFocus={() => setblurview(true)}
            secureTextEntry={props?.secureTextEntry}
          />
          {props.isRightIconVisible && (
            <TouchableOpacity
              // style={{backgroundColor:'red'}}
              // style={{backgroundColor:'red'}}
              onPress={() => onPress()}>
              <Image
                source={props.rightimage}
                resizeMode="contain"
                style={{
                  width: props.rightimageheight,
                  height: props.rightimagewidth,

                  tintColor: props.tintColor,
                  marginRight: normalize(10),
                  marginLeft: normalize(10),
                }}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </>
  );
}

TextInputWithButton.propTypes = {
  marginLeft: PropTypes.number,
  marginTop: PropTypes.number,
  maxLength: PropTypes.number,
  isSecure: PropTypes.bool,
  multiline: PropTypes.bool,
  autoCapitalize: PropTypes.string,
  placeholder: PropTypes.string,
  placeholderTextColor: PropTypes.string,
  keyboardType: PropTypes.string,
  value: PropTypes.string,
  onChangeText: PropTypes.func,
  color: PropTypes.string,
  letterSpacing: PropTypes.number,
  fontSize: PropTypes.number,
  editable: PropTypes.bool,
  borderColor: PropTypes.string,
  fontWeight: PropTypes.any,
  textAlign: PropTypes.string,
  onPress: PropTypes.func,
  search: PropTypes.bool,
  borderRadius: PropTypes.any,
  borderRadiusLeftRadius: PropTypes.any,
  borderBottomRadiusRightRadius: PropTypes.any,
  icon: PropTypes.any,
  iconleft: PropTypes.any,
  iconright: PropTypes.any,
  fontFamily: PropTypes.any,
  backgroundColor: PropTypes.any,
  width: PropTypes.any,
  height: PropTypes.any,
  marginBottom: PropTypes.number,
  borderWidth: PropTypes.number,
  leftIcon: PropTypes.string,
  rightIcon: PropTypes.string,
  isleftIconVisible: PropTypes.bool,
  isRightIconVisible: PropTypes.bool,
  textInputLeft: PropTypes.number,
  textColor: PropTypes.string,
  doller: PropTypes.bool,
  elevation: PropTypes.number,
  shadowRadius: PropTypes.number,
  shadowOpacity: PropTypes.number,
  shadowOffset: PropTypes.object,
  shadowColor: PropTypes.string,
  viewbordercolor: PropTypes.string,
  rightimage: PropTypes.string,
  leftimage: PropTypes.string,
  rightimageheight: PropTypes.number,
  rightimagewidth: PropTypes.number,

  leftimage: PropTypes.string,
  leftimageheight: PropTypes.number,
  leftimagewidth: PropTypes.number,
  secureTextEntry: PropTypes.string,
  isheadertext: PropTypes.bool,
  headertext: PropTypes.string,
  headertxtcolor: PropTypes.string,
  headertxtsize: PropTypes.number,
  tintColor: PropTypes.string,
  borderBottomColor: PropTypes.string,
};

TextInputWithButton.defaultProps = {
  // shadowColor: '',
  shadowOffset: null,
  shadowRadius: 0,
  shadowOpacity: 0,
  elevation: 0,
  marginTop: 0,
  maxLength: 40,
  isSecure: false,
  multiline: false,
  autoCapitalize: 'none',
  placeholder: '',
  placeholderTextColor: COLORS.black,
  keyboardType: 'default',
  value: '',
  onChangeText: null,
  color: COLORS.black,
  editable: true,
  borderColor: '#DDDDDD',
  onFocus: null,
  onBlur: null,
  letterSpacing: 0,
  fontSize: normalize(12),
  textAlign: 'left',
  caretHidden: false,
  borderRadius: normalize(5),
  icon: null,
  iconleft: null,
  borderBottomColor: null,
  // fontFamily: Fonts.RobotoRegular,
  fontWeight: '400',
  backgroundColor: '',
  search: false,
  width: '100%',
  height: normalize(42),
  borderRadiusRightRadius: normalize(10),
  borderBottomRadiusRightRadius: normalize(10),
  marginBottom: normalize(15),
  borderWidth: 0,
  leftIcon: '',
  rightIcon: '',
  isleftIconVisible: false,
  isRightIconVisible: false,
  textInputLeft: 0,
  textColor: COLORS.black,
  doller: false,
  // rightimage:Icons.Show,
  rightimageheight: normalize(20),
  rightimagewidth: normalize(20),
  leftimageheight: normalize(20),
  leftimagewidth: normalize(20),
  isheadertext: false,
  headertxtcolor: '#848484',
  headertxtsize: normalize(12),
};
