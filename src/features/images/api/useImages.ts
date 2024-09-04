import { client } from '@/lib/hono';
import { useQuery } from '@tanstack/react-query';

export const useImages = () => {
	return useQuery({
		queryKey: ['images'],
		queryFn: async () => {
			const response = await client.api.image.$get();

			if (!response.ok) {
				throw new Error('Failed to fetch images');
			}

			const {data} = await response.json();

			return data;
		},
	});
};