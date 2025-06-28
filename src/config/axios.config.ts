import { PREFIX } from './urlPath';
import axios from 'axios';

export const axiosInstance = axios.create({
	baseURL: PREFIX,
	headers: {
		'Content-Type': 'application/json',
	},
});
