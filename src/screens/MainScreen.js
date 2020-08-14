import React, {useContext, useEffect, useCallback} from 'react'
import {StyleSheet, View, FlatList, Text, Image, Button} from 'react-native'
import {AddTodo} from '../components/AddTodo'
import {Todo} from '../components/Todo' 
import { TodoContext } from '../context/todo/todoContext'
import { ScreenContext } from '../context/screen/screenContext'
import { AppLoader } from '../components/ui/AppLoader'
import { THEME } from '../theme'


export const MainScreen = () => {
    
    const {addTodo, removeTodo, todos, fetchTodos, loading, error} = useContext(TodoContext)
    const {changeScreen} = useContext(ScreenContext) 

    const loadTodos = useCallback(async () => await fetchTodos(), [fetchTodos])

    useEffect(()=>{
        loadTodos()
    }, [])

    if(loading){
        return <AppLoader/>
    }

    if(error){
        return <View style={styles.center}>
            <Text style={styles.error}>{error}</Text>
            <Button title='Повторить' onPress={fetchTodos}/>
            </View>
    }

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
    },
    center:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    error:{
        fontSize: 20,
        color: THEME.DANGER_COLOR
    }
})