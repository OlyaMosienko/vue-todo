import { ref } from 'vue';

export const useFetch = () => {
	const isLoading = ref(false);
	const error = ref('');

	const request = async (url, options = {}) => {
		isLoading.value = true;
		error.value = '';

		try {
			const response = await fetch(url, {
				...options,
				body: options.body ? JSON.stringify(options.body) : null,
				headers:
					options.method === 'GET' || options.method === 'DELETE'
						? null
						: { 'Content-Type': 'application/json' },
			});

			if (!response.ok) {
				throw new Error('Fetch error');
			}

			return await response.json();
		} catch (err) {
			error.value = err.message;
		} finally {
			isLoading.value = false;
		}
	};

	return { isLoading, error, request };
};
