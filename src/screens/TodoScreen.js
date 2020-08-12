import React, {useState} from 'react'
import {StyleSheet, View, Text, Button} from 'react-native'
import { THEME } from '../theme'
import { AppCard } from '../components/ui/AppCard'
import { EditModal } from '../components/EditModal'

export const TodoScreen = ({goBack, todo, removeTodo, onSaveTodo}) => {

    const [modal, setModal] = useState(false)

    const saveHandler = title => {
        onSaveTodo(todo.id, title)
        setModal(false)
    }

    return <View>
        <View>
            <EditModal value={todo.title} visible = {modal} onCancel={() => setModal(false)} onSave={saveHandler}/>
            <AppCard style={styles.card}>
                <Text style={styles.title}> {todo.title} </Text>
                <Button title='Редактировать' onPress={() => setModal(true)}/>
            </AppCard>
        </View>
        <View style={styles.buttons}>
            <View style={styles.button}>
                <Button title='Назад' color={THEME.GRAY_COLOR} onPress={goBack}/>
            </View>
            <View style={styles.button}>
                <Button title='Удалить' color={THEME.DANGER_COLOR} onPress={()=>{removeTodo(todo.id)}}/>
            </View>            
        </View>
    </View>
}

const styles = StyleSheet.create({
    'card':{
        marginBottom: 20,
        padding: 15
    },
    'title':{
        fontSize: 26
    },

    'buttons':{
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    'button':{
        width: '40%'
    }

})