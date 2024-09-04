import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {deleteIcon, editIcon} from '../Atom/SVG';

const TodoItem = ({item, onDelete}) => {
  return (
    <View style={styles.todoItem}>
      <Text style={styles.todoText}>{item.title}</Text>

      <TouchableOpacity
        onPress={() => onDelete(item.id)}
        style={styles.iconButton}>
        <SvgXml xml={deleteIcon} width={24} height={24} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  todoItem: {
    backgroundColor: '#6200ee',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 20,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  todoText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '800',
    flex: 1,
  },
  iconButton: {
    marginLeft: 10,
  },
});

export default TodoItem;
