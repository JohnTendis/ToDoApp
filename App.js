import React, {useState} from 'react';
import { StyleSheet, Text, ScrollView, View, FlatList, Alert } from 'react-native';
import * as Font from 'expo-font'
import {Navbar} from './src/components/Navbar'
import { MainScreen } from './src/screens/MainScreen';
import { TodoScreen } from './src/screens/TodoScreen';
import { AppLoading } from 'expo';


async function loadApplication(){
  await Font.loadAsync({
    'furore': require('./assets/fonts/Furore.otf'),
    'jura': require('./assets/fonts/Jura-Regular.ttf'),
    'juraBold':require('./assets/fonts/Jura-Bold.ttf')

  })
}

export default function App() {
  const [isReady, setIsReady] = useState(false)
  const [todoId, setTodoId] = useState(null)
  const [todos, setTodos] = useState([])

  if(!isReady){
    return < AppLoading 
      startAsync={loadApplication} 
      onError={err => console.log(err)}
      onFinish={() => setIsReady(true)}
    />
  }

  const addTodo = (title) => {
    //const newTodo = {
    //  id: Date.now().toString(),
    //  title: title
    //}

    //setTodos(todos.concat([newTodo]))
    // setTodos ((prevTodos) => {
    //  return [
    //    ...prevTodos,
    //    newTodo
    //  ]
    //})

    setTodos(prev => [...prev, {
      id: Date.now().toString(),
      title
    }])
  }

  const removeTodo = id => {
    const todo = todos.find(t => t.id === id)    
    Alert.alert(
      'Удаление элемента',
      `Вы уверены что хотите удалить ${todo.title}?`,
      [
        {
          text: 'Отмена',
          style: 'cancel'
        },
        { text: 'Удалить', onPress: () => {
            setTodoId(null)
            setTodos(prev => prev.filter(todo => todo.id != id))
          }
        }
      ],
      { cancelable: false }
    );
  }

  const updateTodo = (id, title) => {
    setTodos(old => old.map(todo => {
      if(todo.id === id){
        todo.title = title
      }
      return todo
    }))
  }

  let content = (
    <MainScreen todos={todos} addTodo={addTodo} removeTodo={removeTodo} openTodo={(id)=>{
      setTodoId(id)
    }}/>
  ) 

  if (todoId){
    content = <TodoScreen 
      goBack={()=>setTodoId(null)} 
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
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 20
  },
});
