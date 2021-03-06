import React, {useReducer, useContext} from 'react'
import {Alert} from 'react-native'
import {TodoContext} from './todoContext'
import {todoReducer} from './todoReducer'
import { ADD_TODO, UPDATE_TODO, REMOVE_TODO, SHOW_LOADER, HIDE_LOADER, CLEAR_ERROR, SHOW_ERROR, FETCH_TODOS} from '../types'
import { ScreenContext } from '../screen/screenContext'


export const TodoState = ({children}) => {
    const initialState = {
        todos:[],
        loading: false,
        error: null
    }
    
    const {changeScreen} = useContext(ScreenContext)
    const [state, dispatch] = useReducer(todoReducer, initialState)

    const addTodo = async title =>{
        const resp = await fetch(
            'https://rn-todo-app-53c28.firebaseio.com/todos.json', 
            {
                method: 'POST',
                header: {'Content-Type': 'application/json'},
                body: JSON.stringify({title})
            }
        )
    
        const data = await resp.json()
        dispatch({type: ADD_TODO, title, id: data.name})
    }

    const removeTodo = id => {
        const todo = state.todos.find(t => t.id === id)

        Alert.alert(
            'Удаление элемента',
            `Вы уверены что хотите удалить ${todo.title}?`,
            [
            {
                text: 'Отмена',
                style: 'cancel'
            },
            { text: 'Удалить', onPress: () => {
                changeScreen(null)
                dispatch({type: REMOVE_TODO, id})
                }
            }
            ],
            { cancelable: false }
        );
    }

    const showLoader = () => dispatch({type:SHOW_LOADER})
    const hideLoader = () => dispatch({type:HIDE_LOADER})
       
    const showError = error => dispatch({type:SHOW_ERROR, error})
    const clearError = () => dispatch({type:CLEAR_ERROR})

    const fetchTodos = async () => {
        try {
            showLoader()
            clearError()
            
            const resp = await fetch( 'https://rn-todo-app-53c28.firebaseio.com/todos.json', 
            {
                method: 'GET',
                header: {'Content-Type': 'application/json'},
            })

            const data = await resp.json()
            const todos = Object.keys(data).map(key => ({...data[key], id: key}))
            dispatch({type:FETCH_TODOS, todos})
        } catch (error) {
            showError('Упс...')
            console.log(error)
        } finally {
            hideLoader()
        }
    }

    const updateTodo = (id, title) => dispatch({type: UPDATE_TODO, id, title})

    return (
    <TodoContext.Provider 
        value={{
            todos:state.todos, 
            loading: state.loading,
            error: state.error,
            addTodo, 
            removeTodo, 
            updateTodo, 
            fetchTodos
            }}
        >
            {children}
    </TodoContext.Provider>)
}