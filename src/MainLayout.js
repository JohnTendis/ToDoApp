import React, {useState, useContext} from 'react'
import {StyleSheet, View, Alert } from 'react-native'
import {Navbar} from './components/Navbar'

import { MainScreen } from './screens/MainScreen';
import { TodoScreen } from './screens/TodoScreen';
import { ScreenContext } from './context/screen/screenContext';

export const MainLayout = () => {

    const {todoId} = useContext(ScreenContext)
    return (
        <View style={styles.wrapper}>
            <Navbar title='Список дел'/>
            <View style={styles.container}>
                {todoId ? <TodoScreen/> : <MainScreen/>}
            </View>
        </View>
    ) 
}

const styles = StyleSheet.create({
    container: {
      flex:1,
      paddingHorizontal: 30,
      paddingVertical: 20
    },
    wrapper:{
        flex:1
    }
  });