<script setup>
import { ref } from 'vue';

const newTodoText = ref('');

const emit = defineEmits(['add-todo']);

const onSubmit = () => {
	if (!newTodoText.value.trim()) {
		return;
	}

	emit('add-todo', newTodoText.value);
	newTodoText.value = '';
};
</script>

<template>
	<form class="form" @submit.prevent="onSubmit">
		<div class="form__group form__group--todo">
			<input
				class="form-control"
				type="text"
				placeholder="Новая задача"
				v-model="newTodoText"
			/>
			<button class="btn btn--add-todo" type="submit">Добавить</button>
		</div>
	</form>
</template>

<style>
.form {
	display: block;
	margin-bottom: 2rem;
}

.form__group {
	display: flex;
	width: 100%;
}

.form-control {
	flex: 1;
	padding: 10px;
	border: 1px solid #ccc;
	border-radius: 5px 0 0 5px;
}

.form-control:focus {
	outline: none;
	border-color: #6574cd;
}
</style>
