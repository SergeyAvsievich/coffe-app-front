import { axiosInstance } from '@/config/axios.config';

export const getCoffees = () => {
	return axiosInstance.get('/coffee');
};
