import React, {useState} from 'react'
import {View, StyleSheet, TextInput, Button, Modal, Alert} from 'react-native'
import { THEME } from '../theme'

export const EditModal = ({visible, onCancel, value, onSave}) => {

    const [title, setTitle] = useState(value)

    const saveHandler = () => {
        let titleLen = title.trim().length
        if(titleLen < 3)
        {
            Alert.alert('Ошибка!', `Минимальная длина названия 3 символа. Сейчас ${titleLen} символов`)
        } else {
            onSave(title)
        }
    }

    const cancelHandler = () => {
        setTitle(value)
        onCancel()
    }

    return (
        <Modal visible={visible} animationType='slide' transparent={false}>
            <View style={styles.wrap}>
                <TextInput 
                    value = {title}
                    onChangeText = {setTitle}
                    style={styles.input} 
                    placeholder= 'Введите новое название'/>
                <View style={styles.btns}>
                    <Button title='Отменить' onPress={cancelHandler} color={THEME.DANGER_COLOR}/> 
                    <Button title='Сохранить' onPress={saveHandler}/>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    wrap: {
        flex: 1,
        justifyContent:'center',
        alignItems: 'center'        
    },
    btns:{
        width: '100%',
        flexDirection:'row',
        justifyContent:'space-around',
        marginTop: 10
    },
    input:{
        padding: 10,
        borderBottomColor: THEME.MAIN_COLOR,
        borderBottomWidth: 2,
        width:'80%'
    }

}) 