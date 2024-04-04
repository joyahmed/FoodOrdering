import Button from '@/components/Button';
import { defaultPizzaImage } from '@/components/ProductListItem';
import products from '@assets/data/products';
import { Stack, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import {
	Image,
	Pressable,
	StyleSheet,
	Text,
	View
} from 'react-native';

const sizes = ['S', 'M', 'L', 'XL'];

const ProductDetailScreen = () => {
	const { id } = useLocalSearchParams();
	const [selectedSize, setSelectedSize] = useState('M');

	const product = products.find(p => p.id.toString() === id);

	const addToCart = () => {
		console.warn('Adding to Cart', selectedSize);
	};

	if (!product) return <Text>Product not found</Text>;

	return (
		<View style={styles.container}>
			<Stack.Screen
				options={{
					title: product.name,
					headerTitleAlign: 'center'
				}}
			/>
			<Image
				source={{ uri: product.image || defaultPizzaImage }}
				style={styles.image}
			/>

			<Text>Select Size</Text>
			<View style={styles.sizes}>
				{sizes.map(size => (
					<Pressable
						key={size}
						onPress={() => {
							setSelectedSize(size);
						}}
						style={[
							styles.size,
							{
								backgroundColor:
									selectedSize === size ? 'gainsboro' : 'white'
							}
						]}
					>
						<Text
							style={[
								styles.sizeText,
								{ color: selectedSize === size ? 'black' : 'gray' }
							]}
						>
							{size}
						</Text>
					</Pressable>
				))}
			</View>

			<Text style={styles.price}>Price: ${product.price}</Text>

			<Button onPress={addToCart} text='Add to Cart' />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
		flex: 1,
		padding: 10
	},
	image: { width: '100%', aspectRatio: 1 },
	price: {
		fontSize: 18,
		fontWeight: 'bold',
		marginTop: 'auto'
	},
	sizes: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginVertical: 10
	},
	size: {
		backgroundColor: 'gainsboro',
		width: 50,
		aspectRatio: 1,
		borderRadius: 25,
		alignItems: 'center',
		justifyContent: 'center'
	},
	sizeText: {
		fontSize: 20,
		fontWeight: '500'
	}
});

export default ProductDetailScreen;
