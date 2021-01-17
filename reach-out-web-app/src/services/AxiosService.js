import axios from 'axios';

const createAxiosInstance = (baseURL) => {
	/**
	 * Create an Axios instance
	 */
	const axiosInstance = axios.create({
		timeout: 60000,
		baseURL: baseURL,
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
			'Access-Control-Allow-Headers': '*'
		}
	});

	return axiosInstance;
};

export const AxiosService = async (method, uri, params, onSuccess, onError, baseUrl = 'http://localhost:1330') => {
	const axios = createAxiosInstance(baseUrl);
	try{
		const response = await axios[method](uri, params);
		return onSuccess(response);
	} catch(error) {
		return onError(error);
	}
};
