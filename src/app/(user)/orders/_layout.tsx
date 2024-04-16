import Colors from '@/constants/Colors';
import { FontAwesome } from '@expo/vector-icons';
import { Link, Stack } from 'expo-router';
import React from 'react';
import { Pressable } from 'react-native';

const OrderStack = () => {
	return (
		<Stack>
			<Stack.Screen name='index' options={{ title: 'Orders' }} />
		</Stack>
	);
};

export default OrderStack;
