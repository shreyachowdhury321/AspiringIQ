import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  ImageBackground,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import MyStatusBar from '../../utils/MyStatusBar';
import {IMAGES, COLORS, Fonts} from '../../themes/Themes';
import normalize from '../../utils/helpers/normalize';

const Leaderboard = ({userId = 59, navigation}) => {
  const [loading, setLoading] = useState(true);
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [userRank, setUserRank] = useState(null);
  const [userPoints, setUserPoints] = useState(null);
  const [userImage, setUserImage] = useState(null);

  const fetchLeaderboardData = async () => {
    const url =
      'https://zeewebvalley.com/quizup/super-admin/api/Controll/ranking/';
    const formData = new FormData();
    formData.append('user_id', userId);

    try {
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.status === '200') {
        // Extract user information from the result
        setUserRank(result.user_rank || 'N/A');
        setUserPoints(result.user_point || 'N/A');
        setUserImage(result.user_img || IMAGES.defaultUser); // Default image if null
        // Extract leaderboard data
        setLeaderboardData(result.data || []);
      } else {
        console.error('Failed to fetch leaderboard:', result.message);
      }
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboardData();
  }, [userId]); //

  const renderListItem = ({item}) => (
    <View
      style={{
        height: normalize(35),
        width: normalize(240),
        backgroundColor: COLORS.white,
        alignSelf: 'center',
        marginTop: normalize(20),
        flexDirection: 'row',
        borderRadius: normalize(10),
      }}>
      <Image
        source={{uri: item.image || IMAGES.defaultUser}}
        resizeMode="contain"
        style={{
          height: normalize(40),
          width: normalize(40),
          marginRight: normalize(10),
          borderRadius: normalize(20),
        }}/>
      <Text
        style={{
          fontSize: normalize(12),
          color: COLORS.black,
          fontFamily: Fonts.MontserratMedium,
          marginTop: normalize(8),
        }}>
        {item.name || 'Anonymous'}
      </Text>
      <Text
        style={{
          fontSize: normalize(12),
          color: COLORS.black,
          fontFamily: Fonts.MontserratMedium,
          textAlign: 'center',
          flex: 0.6,
          marginTop: normalize(10),
        }}>
        {item.rank}
      </Text>
      <Text
        style={{
          fontSize: normalize(12),
          color: COLORS.black,
          fontFamily: Fonts.MontserratMedium,
          textAlign: 'center',
          flex: 0.6,
          marginTop: normalize(10),
        }}>
        {item.point}
      </Text>
    </View>
  );

  return (
    <>
      <MyStatusBar backgroundColor={COLORS.litepurple} />
      <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
        <KeyboardAvoidingView style={{flex: 1}} behavior="height">
          <ImageBackground
            source={IMAGES.fullscreen}
            resizeMode="stretch"
            style={{flex: 1}}>
            {/* Header Section */}
            <View
              style={{
                height: normalize(20),
                width: normalize(230),
                alignSelf: 'center',
                marginTop: normalize(30),
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                onPress={() => navigation.navigate('Home')}
                style={{
                  height: normalize(20),
                  width: normalize(20),
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={IMAGES.home}
                  resizeMode="contain"
                  style={{
                    height: normalize(18),
                    width: normalize(18),
                  }}
                />
              </TouchableOpacity>
              <View
                style={{
                  marginLeft: normalize(15),
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontSize: normalize(15),
                    fontWeight: '700',
                    color: COLORS.white,
                    fontFamily: Fonts.MontserratMedium,
                  }}>
                  Leaderboard
                </Text>
              </View>
            </View>

            {/* Monthly Ranking Button */}
            <TouchableOpacity
              style={{
                height: normalize(35),
                width: normalize(230),
                backgroundColor: COLORS.depcolor,
                alignSelf: 'center',
                marginTop: normalize(20),
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: normalize(10),
              }}>
              <Text
                style={{
                  fontSize: normalize(16),
                  fontWeight: '600',
                  color: COLORS.white,
                  fontFamily: Fonts.MontserratMedium,
                }}>
                Monthly Ranking
              </Text>
            </TouchableOpacity>

            {/* User Info */}
            {userRank && userPoints && userImage && (
              <View
                style={{
                  height: normalize(30),
                  width: normalize(250),
                  backgroundColor: COLORS.white,
                  alignSelf: 'center',
                  marginTop: normalize(15),
                  flexDirection: 'row',
                  borderRadius: normalize(12),
                }}>
                <Image
                  source={{uri: userImage}}
                  resizeMode="contain"
                  style={{
                    height: normalize(40),
                    width: normalize(40),
                    borderRadius: normalize(20),
                    margin: normalize(5),
                  }}
                />
                <Text
                  style={{
                    fontSize: normalize(12),
                    color: COLORS.black,
                    fontFamily: Fonts.MontserratMedium,
                    marginLeft: normalize(10),
                  }}>
                  Rank: {userRank} | Points: {userPoints}
                </Text>
              </View>
            )}
              {/* Leaderboard List */}
            {loading ? (
              <ActivityIndicator size="large" color={COLORS.depcolor} />
            ) : (
              <FlatList
                showsVerticalScrollIndicator={false}
                data={leaderboardData}
                renderItem={renderListItem}
                keyExtractor={item => item.rank.toString()}
              />
            )}
          </ImageBackground>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};

export default Leaderboard;
