import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Platform, Text, View } from 'react-native';

const CartScreen = () => {
	return (
		<View>
			<Text>CartScreen</Text>

			<StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
		</View>
	);
};

export default CartScreen;
