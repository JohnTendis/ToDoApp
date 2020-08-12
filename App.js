import React, {useState} from 'react';
import * as Font from 'expo-font'

import { AppLoading } from 'expo';
import { MainLayout } from './src/MainLayout';
import { TodoState } from './src/context/todo/TodoState';
import { ScreenState } from './src/context/screen/ScreenState';


async function loadApplication(){
  await Font.loadAsync({
    'furore': require('./assets/fonts/Furore.otf'),
    'jura': require('./assets/fonts/Jura-Regular.ttf'),
    'juraBold':require('./assets/fonts/Jura-Bold.ttf')

  })
}

export default function App() {
  const [isReady, setIsReady] = useState(false)


  if(!isReady){
    return < AppLoading 
      startAsync={loadApplication} 
      onError={err => console.log(err)}
      onFinish={() => setIsReady(true)}
    />
  }

  return ( 
    <ScreenState>   
      <TodoState>
        <MainLayout/>
      </TodoState>
    </ScreenState>)
}