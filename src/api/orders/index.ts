import { supabase } from '@/lib/supabase';
import { useAuth } from '@/providers/AuthProvider';
import {
	useMutation,
	useQuery,
	useQueryClient
} from '@tanstack/react-query';

export const useAdminOrderList = ({ archived = false }) => {
	const statuses = archived
		? ['Delivered']
		: ['New', 'Cooking', 'Delivering'];

	return useQuery({
		queryKey: ['orders', { archived }],

		queryFn: async () => {
			const { data, error } = await supabase
				.from('orders')
				.select('*')
				.in('status', statuses);
			if (error) {
				throw new Error(error.message);
			}
			return data;
		}
	});
};

export const useUserOrderList = () => {
	const { session } = useAuth();
	const id = session?.user.id;

	return useQuery({
		queryKey: ['orders', { userId: id }],

		queryFn: async () => {
			if (!id) return null;
			const { data, error } = await supabase
				.from('orders')
				.select('*')
				.eq('user_id', id);
			if (error) {
				throw new Error(error.message);
			}
			return data;
		}
	});
};

export const useOrderDetails = (id: number) => {
	return useQuery({
		queryKey: ['orders', id],

		queryFn: async () => {
			const { data, error } = await supabase
				.from('orders')
				.select('*, order_items(*, products(*))')
				.eq('id', id)
				.single();
			if (error) {
				throw new Error(error.message);
			}
			return data;
		}
	});
};

export const useInsertOrder = () => {
	const queryClient = useQueryClient();

	const { session } = useAuth();
	const userId = session?.user.id;

	return useMutation({
		async mutationFn(data: InsertTables<'orders'>) {
			const { data: newOrder, error } = await supabase
				.from('orders')
				.insert({ ...data, user_id: userId })
				.select()
				.single();

			if (error) throw new Error(error.message);

			return newOrder;
		},
		async onSuccess() {
			await queryClient.invalidateQueries({ queryKey: ['products'] });
		}
	});
};
