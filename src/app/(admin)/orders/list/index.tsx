import { useAdminOrderList } from '@/api/orders';
import { useInsertOrderSubscription } from '@/api/orders/subscriptions';
import OrderListItem from '@/components/OrderListItem';
import { supabase } from '@/lib/supabase';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { ActivityIndicator, FlatList, Text } from 'react-native';

const OrderScreen = () => {
	const {
		data: orders,
		isLoading,
		error
	} = useAdminOrderList({ archived: false });

	useInsertOrderSubscription();

	if (isLoading) return <ActivityIndicator />;

	if (error) return <Text>Failed to fetch</Text>;

	return (
		<FlatList
			data={orders}
			renderItem={({ item }) => (
				<OrderListItem {...{ order: item }} />
			)}
			contentContainerStyle={{ gap: 10, padding: 10 }}
		/>
	);
};

export default OrderScreen;
