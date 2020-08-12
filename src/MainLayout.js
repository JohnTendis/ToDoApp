import React, {useState, useContext} from 'react'
import {StyleSheet, View, Alert } from 'react-native'
import {Navbar} from './components/Navbar'

import { MainScreen } from './screens/MainScreen';
import { TodoScreen } from './screens/TodoScreen';
import { TodoContext } from './context/todo/todoContext';
import { ScreenContext } from './context/screen/screenContext';

export const MainLayout = () => {
    const {todos, addTodo, removeTodo, updateTodo} = useContext(TodoContext)
    const {todoId, changeScreen} = useContext(ScreenContext)
    //const [todoId, setTodoId] = useState(null)
    // const [todos, setTodos] = useState([])

    // const removeTodo = id => {
    // const todo = todos.find(t => t.id === id)    
    // Alert.alert(
    //     'Удаление элемента',
    //     `Вы уверены что хотите удалить ${todo.title}?`,
    //     [
    //     {
    //         text: 'Отмена',
    //         style: 'cancel'
    //     },
    //     { text: 'Удалить', onPress: () => {
    //         setTodoId(null)
    //         setTodos(prev => prev.filter(todo => todo.id != id))
    //         }
    //     }
    //     ],
    //     { cancelable: false }
    // );
    // }

    let content = (
    <MainScreen todos={todos} addTodo={addTodo} removeTodo={removeTodo} openTodo={(id)=>{
        changeScreen(id)
    }}/>
    ) 

    if (todoId){
    content = <TodoScreen 
        goBack={()=>changeScreen(null)} 
        todo={todos.find(item => item.id == todoId)}
        removeTodo={removeTodo}
        onSaveTodo={updateTodo}
    />
    }

    return (
        <View>
            <Navbar title='Список дел'/>
            <View style={styles.container}>
                { content }
            </View>
        </View>
    ) 
    
}

const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 30,
      paddingVertical: 20
    },
  });