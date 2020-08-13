import React, {useContext} from 'react'
import {StyleSheet, View, FlatList, Text, Image} from 'react-native'
import {AddTodo} from '../components/AddTodo'
import {Todo} from '../components/Todo' 
import { TodoContext } from '../context/todo/todoContext'
import { ScreenContext } from '../context/screen/screenContext'

export const MainScreen = () => {
    
    const {addTodo, removeTodo, todos} = useContext(TodoContext)
    const {changeScreen} = useContext(ScreenContext) 

    let content = (<FlatList
        data = {todos}
        renderItem = {({item}) => (<Todo todo={item} onRemove={removeTodo} onOpen={changeScreen}/>)}
        keyExtractor = {(item) => (item.id.toString())}
    />)
    
    if (todos.length === 0) {
        content = (<View style={styles.imgWrap}>
            <Image style={styles.img} source = {require('../../assets/no-items.png')}/>
        </View>)
    }

    return (
        <View>
            <AddTodo onSubmit={addTodo}/>
            {content}
        </View>
    )
}

const styles = StyleSheet.create({
    imgWrap:{
        alignItems: 'center',
        justifyContent:'center',
        padding: 10,
        height: 300,
        marginTop: 80
    },
    img: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    }
})