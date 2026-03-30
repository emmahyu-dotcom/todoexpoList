import React, { useState } from 'react';
import { StyleSheet, View, FlatList, Text, TextInput, Button } from 'react-native';
import { CheckBox } from '@rneui/themed';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'hsl(210, 43%, 92%)',
    padding: 20,
  },
  header: {
    backgroundColor: 'hsl(207, 26%, 55%)',
    padding: 12,
    borderRadius: 3,
    marginBottom: 10,
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'hsl(0, 0%, 100%)',
    textAlign: 'center',
  },
  listContainer: {
    backgroundColor: 'hsl(180, 6%, 97%)',
    borderRadius: 3,
    padding: 12,
    flex: 1,
  },
  input: {
    padding: 12,
    marginVertical: 10,
    borderRadius: 3,
    backgroundColor: 'hsl(0, 0%, 100%)',
    color: 'hsl(0, 0%, 0%)',
  },
});

export default function App() {
  const [tasks, setTasks] = useState([
    { 
      key: '1',
      completed: false,
      description: 'sort out presents',
    },
    { key: '2',
      completed: false,
      description: 'cook dinner',
    },
  ]);

  const [newTask, setNewTask] = useState('');

  const markCompleted = (key) => {
    setTasks(tasks.map(task =>
      task.key === key ? { ...task, completed: !task.completed } : task
    ));
  };

  const addTask = () => {
    if (newTask.trim() === '') return;
    setTasks([
      ...tasks,
      { key: (tasks.length + 1).toString(), description: newTask, completed: false }
    ]);
    setNewTask('');
  }

  const renderItem = ({ item }) => (
    <CheckBox
      title={item.description}
      checked={item.completed}
      onPress={() => markCompleted(item.key)}
      textStyle={item.completed ? { textDecorationLine: 'line-through', textDecorationStyle: 'solid' } : {}}
      />
  )

  return (
    <View style={styles.container}>
      
      <View style={styles.header}>
        <Text style={styles.headerText}>Welcome!</Text>
      </View>
      
      <View style={styles.listContainer}>
        <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
        />
      </View>

      <TextInput
        placeholder='New Task'
        value={newTask}
        onChangeText={setNewTask}
        style={styles.input}
      />

      <Button 
      title='Add'
      onPress={addTask}
      color='hsl(207, 26%, 55%)'
      />

    </View>
  );
}
