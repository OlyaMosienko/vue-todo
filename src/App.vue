<script setup>
import { computed, reactive } from 'vue';
import TodoFooter from './components/TodoFooter.vue';
import TodoList from './components/TodoList.vue';
import TodoForm from './components/TodoForm.vue';

const todos = reactive([
	{ id: 1, text: 'Изучить компоненты Vue.js', completed: false },
	{ id: 2, text: 'Создать TodoList приложение', completed: false },
	{ id: 3, text: 'Похвалить себя за отличную работу', completed: false },
]);

const removeTodo = (id) => {
	todos.splice(id, 1);
};

const clearCompleted = () => {
	for (let i = todos.length - 1; i >= 0; i--) {
		if (todos[i].completed) {
			todos.splice(i, 1);
		}
	}
};

const clearAll = () => {
	todos.splice(0, todos.length);
};

const uncompletedTodos = computed(() => {
	return todos.filter((todo) => !todo.completed).length;
});

const addTodo = (text) => {
	if (text.trim()) {
		todos.push({
			id: Date.now(),
			text: text.trim(),
			completed: false,
		});
	}
};
</script>

<template>
	<div class="container todo-app">
		<h1 class="title">Todo List</h1>

		<TodoForm @add-todo="addTodo" />

		<TodoList :todos="todos" @remove-todo="removeTodo" />

		<TodoFooter
			v-if="todos.length"
			:remaining="uncompletedTodos"
			@clear-completed="clearCompleted"
			@clear-all="clearAll"
		/>
	</div>
</template>

<style src="./App.css"></style>
