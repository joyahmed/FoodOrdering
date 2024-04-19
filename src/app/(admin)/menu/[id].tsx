import { useProductById } from '@/api/products';
import Button from '@/components/Button';
import { defaultPizzaImage } from '@/components/ProductListItem';
import Colors from '@/constants/Colors';
import { useCart } from '@/providers/CartProvider';
import products from '@assets/data/products';
import { FontAwesome } from '@expo/vector-icons';
import {
	Link,
	Stack,
	useLocalSearchParams,
	useRouter
} from 'expo-router';
import React, { useState } from 'react';
import {
	ActivityIndicator,
	Image,
	Pressable,
	StyleSheet,
	Text,
	View
} from 'react-native';

const sizes: PizzaSizeProps[] = ['S', 'M', 'L', 'XL'];

const ProductDetailScreen = () => {
	const { id: idString } = useLocalSearchParams();

	const id = parseFloat(
		typeof idString === 'string' ? idString : idString[0]
	);

	const { data: product, error, isLoading } = useProductById(id);
	const { addItem } = useCart();

	const router = useRouter();

	const [selectedSize, setSelectedSize] =
		useState<PizzaSizeProps>('M');

	const addToCart = () => {
		if (!product) return;
		addItem(product, selectedSize);
		router.push('/cart');
	};

	if (isLoading) return <ActivityIndicator />;

	if (error) return <Text>Failed to fetch products</Text>;

	return (
		<View style={styles.container}>
			<Stack.Screen
				options={{
					title: 'Menu',
					headerRight: () => (
						<Link href={`/(admin)/menu/create?id=${id}`} asChild>
							<Pressable>
								{({ pressed }) => (
									<FontAwesome
										name='pencil'
										size={25}
										color={Colors.light.tint}
										style={{
											marginRight: 15,
											opacity: pressed ? 0.5 : 1
										}}
									/>
								)}
							</Pressable>
						</Link>
					),
					headerTitleAlign: 'center'
				}}
			/>
			<Stack.Screen
				options={{
					title: product?.name,
					headerTitleAlign: 'center'
				}}
			/>
			<Image
				source={{ uri: product?.image || defaultPizzaImage }}
				style={styles.image}
			/>

			<Text style={styles.title}>Title: {product?.name}</Text>
			<Text style={styles.price}>Price: ${product?.price}</Text>
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
	title: {
		fontSize: 20,
		fontWeight: 'bold'
	},
	price: {
		fontSize: 18,
		fontWeight: 'bold'
	}
});

export default ProductDetailScreen;
