import React, {useState} from 'react'
import {View, StyleSheet, TextInput, Button, Alert} from 'react-native'
import { FontAwesome } from '@expo/vector-icons'

export const AddTodo = ({ onSubmit }) => {

    const [value, setValue] = useState('')

    const  pressHandler = () => {
        if(value.trim()){
            onSubmit(value)
            setValue('')
        } else {
            Alert.alert('Название дела не может быть пустым!')
        }
    }

    return (
        <View style={styles.block}>
            <TextInput style={styles.input} 
            onChangeText = {setValue}
            value={value}
            placeholder='Введите название дела'/>
            <FontAwesome.Button onPress={pressHandler} name='plus-square' size={24} color='white'>
                Добавить
            </FontAwesome.Button>
        </View>
    )
}

const styles = StyleSheet.create({
        block:{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
        },
        input:
        {
            width: '70%',
            borderStyle: 'solid',
            borderBottomWidth: 2,
            borderBottomColor: '#3949ab',
            padding: 10
        }
    })