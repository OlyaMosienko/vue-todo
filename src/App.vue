<script setup>
import { computed, reactive } from 'vue';
import TodoListItem from './components/TodoListItem.vue';

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
</script>

<template>
	<div class="container todo-app">
		<h1 class="title">Todo List</h1>

		<div class="todo-app__main">
			<ul class="todo-list">
				<li
					class="todo-list__item"
					:class="{ 'todo-list__item--completed': todo.completed }"
					v-for="(todo, index) in todos"
					:key="todo.id"
				>
					<TodoListItem v-bind="todo" @complete-todo.once="() => todo.completed = !todo.completed" @remove-todo="removeTodo(index)" />
				</li>
			</ul>
			<div class="todo-list__empty" v-if="!todos.length">
				<p>Список задач пуст</p>
			</div>
		</div>

		<div class="todo-app__footer" v-if="todos.length">
			<p class="todo-app__footer-text">
				Осталось {{ uncompletedTodos }} задания(й)
			</p>
			<button @click="clearCompleted" class="btn btn--clear">
				Удалить завершенные
			</button>
			<button @click="clearAll" class="btn btn--clear">Очистить список</button>
		</div>
	</div>
</template>

<style src="./App.css"></style>
