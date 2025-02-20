import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Splash from '../screens/Default/Splash';
import Login from '../screens/Auth/Login';
import Register from '../screens/Auth/Register';
import Home from '../screens/Main/Home';
import Level from '../screens/Main/Level';
import Questions from '../screens/Main/Questions';
import ReportCard from '../screens/Main/ReportCard';
import Questions1 from '../screens/Main/Questions1';
// import dropdown from '../components/dropdown';
import Leaderboard from '../screens/Main/Leaderboard';
import Profile from '../screens/Main/Profile';
import Startquiz from '../screens/Main/Startquiz';
import Questions2 from '../screens/Main/Questions2';
// import Quiz from '../../src/Question/Quizapi/QuizApi';
import QuestionsOne from '../../src/Question/QuestionsOne';
import QuestionsTwo from '../../src/Question/QuestionTwo';
import QuestionsThree from '../../src/Question/QuestionThree';
import StartQuizOne from '../../src/Startquiz/StartquizOne';
import StartQuizTwo from '../../src/Startquiz/StartquizTwo';
import StartQuizThree from '../../src/Startquiz/StartquizThree';
import ReportCardBeginer from '../../src/ReportCard/ReportCardBegineer';
import ReportCardIntermedeate from '../../src/ReportCard/ReportCardIntermmedeate';
import ReportCardAdvanced from '../../src/ReportCard/ReportcardAdvanced';





const Stack = createStackNavigator();

export default function StackNav() {
  const authScreens = {
    Splash: Splash,
    Login: Login,
    Register: Register,
    Home: Home,
    Level: Level,
    Questions: Questions,
    QuestionsOne:QuestionsOne,
    QuestionsTwo:QuestionsTwo,
    QuestionsThree:QuestionsThree,
    StartQuizOne:StartQuizOne,
    StartQuizTwo:StartQuizTwo,
    StartQuizThree:StartQuizThree,
    ReportCardBeginer:ReportCardBeginer,
    ReportCardIntermedeate:ReportCardIntermedeate,
    ReportCardAdvanced:ReportCardAdvanced,
  
    //  progressbar:progressbar
    ReportCard: ReportCard,
    Questions1: Questions1,
    Startquiz: Startquiz,
    Leaderboard: Leaderboard,
    Profile: Profile,
    Questions2: Questions2,
   
  };

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{headerShown: false}}
          // initialRouteName={'Splash'}
        >
          {Object.entries({
            ...authScreens,
          }).map(([name, component]) => (
            <Stack.Screen name={name} component={component} key={name} />
          ))}
          {/* <Stack.Screen name={Signin} component={Signin} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
