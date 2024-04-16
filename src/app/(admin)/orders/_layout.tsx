import { Stack } from 'expo-router';
import React from 'react';

const OrderStack = () => {
	return (
		<Stack>
			{/* <Stack.Screen
				name='index'
				options={{ title: 'Orders', headerTitleAlign: 'center' }}
			/> */}
			<Stack.Screen
				name='list'
				options={{ title: 'list', headerShown: false }}
			/>
		</Stack>
	);
};

export default OrderStack;
