import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  FlatList,
  Alert,
  LayoutAnimation,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TodoItem from '../../components/Molecule/TodoItem';

const TODOS_KEY = 'my_todos';

const MainPage = () => {
  const [input, setInput] = useState('');
  const [todos, setTodos] = useState([]);

  const storeTodos = async todos => {
    try {
      await AsyncStorage.setItem(TODOS_KEY, JSON.stringify(todos));
    } catch (e) {
      console.error('Failed to save the data to the storage', e);
    }
  };

  const loadTodos = async () => {
    try {
      const storedTodos = await AsyncStorage.getItem(TODOS_KEY);
      if (storedTodos) {
        setTodos(JSON.parse(storedTodos));
      }
    } catch (e) {
      console.error('Failed to load todos from storage', e);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  useEffect(() => {
    storeTodos(todos);
  }, [todos]);

  const handleButtonAdd = () => {
    if (input.trim() === '') {
      Alert.alert('Error', 'Please enter a todo');
      return;
    }

    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    const newTodo = {
      id: todos.length + 1,
      title: input,
    };
    setTodos([...todos, newTodo]);
    setInput('');
  };

  const handleDelete = id => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const filteredTodos = todos.filter(todo => todo.id !== id);
    setTodos(filteredTodos);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={input}
        onChangeText={text => setInput(text)}
        placeholder="Add a new todo"
        placeholderTextColor="#6200ee"
      />

      <TouchableOpacity style={styles.addButton} onPress={handleButtonAdd}>
        <Text style={styles.addButtonText}>Add</Text>
      </TouchableOpacity>

      {/* Render todo list */}
      <FlatList
        data={todos}
        renderItem={({item}) => (
          <TodoItem item={item} onDelete={handleDelete} />
        )}
        keyExtractor={item => item.id.toString()}
        nestedScrollEnabled={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#6200ee',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 10,
    fontSize: 16,
    color: '#6200ee',
  },
  addButton: {
    backgroundColor: '#6200ee',
    borderRadius: 8,
    paddingVertical: 12,
    marginTop: 12,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default MainPage;
