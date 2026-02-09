<script setup>
import { computed, onMounted, reactive } from 'vue';
import TodoFooter from './components/TodoFooter.vue';
import TodoList from './components/TodoList.vue';
import TodoForm from './components/TodoForm.vue';
import { useFetch } from './composables/useFetch';
import { TODO_URL } from './constants/url';

const { isLoading, error, request } = useFetch();

const todos = reactive([]);
const fetchTodos = async () => {
	const data = await request(TODO_URL);
	todos.splice(0, todos.length, ...data);
};

const addTodo = (text) => {
	request(TODO_URL, {
		method: 'POST',
		body: {
			id: Date.now().toString(),
			text: text,
			completed: false,
		}
	}).then(fetchTodos)
};

const removeTodo = async (id) => request(`${TODO_URL}/${id}`, {
		method: 'DELETE'
	}).then(fetchTodos);

const uncompletedTodos = computed(() => todos.filter((todo) => !todo.completed).length);

const onCompliteTodo = async (todo) => {
	request(`${TODO_URL}/${todo.id}`, {
		method: 'PUT',
		body: {
			...todo,
			completed: true
		}
	}).then(fetchTodos)
}

const clearCompleted = async () => {
	for (let i = todos.length - 1; i >= 0; i--) {
		if (todos[i].completed) {
			await removeTodo(todos[i].id)
		}
	}
};

const clearAll = async () => {
	for (let i = todos.length - 1; i >= 0; i--) {
		await removeTodo(todos[i].id)
	}
};


onMounted(() => fetchTodos());
</script>

<template>
	<div class="container todo-app">
		<h1 class="title">Todo List</h1>

		<TodoForm @add-todo="addTodo" />

		<div v-show="isLoading">Задачи загружаются...</div>
		<div v-if="error" class="error">{{ error }}</div>

		<template v-if="!error && !isLoading">
			<TodoList :todos="todos" @remove-todo="removeTodo" @complete-todo="onCompliteTodo" />

			<TodoFooter
			v-if="todos.length"
			:remaining="uncompletedTodos"
			@clear-completed="clearCompleted"
			@clear-all="clearAll"
			/>
		</template>
	</div>
</template>

<style src="./App.css"></style>
