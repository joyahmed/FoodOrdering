import {
	useDeleteProduct,
	useInsertProduct,
	useProductById,
	useProductList,
	useUpdateProduct
} from '@/api/products';
import Button from '@/components/Button';
import { defaultPizzaImage } from '@/components/ProductListItem';
import Colors from '@/constants/Colors';
import * as ImagePicker from 'expo-image-picker';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
	Alert,
	Image,
	StyleSheet,
	Text,
	TextInput,
	View
} from 'react-native';

const onCreateScreen = () => {
	const [name, setName] = useState('');
	const [price, setPrice] = useState('');
	const [errors, setErrors] = useState('');
	const [image, setImage] = useState<string | null>(null);

	const { id: idString } = useLocalSearchParams();
	const id = parseFloat(
		typeof idString === 'string' ? idString : idString?.[0]
	);
	const isUpdating = !!id;

	const { mutate: insertProduct } = useInsertProduct();
	const { mutate: updateProduct } = useUpdateProduct();
	const { data: updatingProduct } = useProductById(id);
	const { mutate: deleteProduct } = useDeleteProduct();

	const router = useRouter();

	useEffect(() => {
		if (updatingProduct) {
			setName(updatingProduct.name);
			setPrice(updatingProduct.price.toString());
			setImage(updatingProduct.image);
		}
	}, [updatingProduct]);

	const validateInput = () => {
		if (!name) {
			setErrors('Name is required');
			return false;
		}
		if (!price) {
			setErrors('Price is required');
			return false;
		}

		if (isNaN(parseFloat(price))) {
			setErrors('Price is not a number');
			return false;
		}

		return true;
	};

	const onSubmit = () => {
		if (isUpdating) {
			onUpdate();
		} else {
			onCreate();
		}
	};

	const onCreate = () => {
		if (!validateInput()) {
			return;
		}

		insertProduct(
			{ name, price: parseFloat(price), image },
			{
				onSuccess: () => {
					resetFields();
					Alert.alert(`${name} is successfully created!`);
					router.back();
				}
			}
		);

		resetFields();
	};

	const onUpdate = () => {
		if (!validateInput()) {
			return;
		}
		// console.warn('Updating product');

		updateProduct(
			{
				id,
				name,
				price: parseFloat(price),
				image
			},
			{
				onSuccess: () => {
					resetFields();
					Alert.alert(`${name} is successfully updated!`);
					router.back();
				}
			}
		);
	};

	const resetFields = () => {
		setName('');
		setPrice('');
	};

	const pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [4, 4],
			quality: 1
		});

		if (!result.canceled) {
			setImage(result.assets[0].uri);
		}
	};

	const onDelete = () => {
		deleteProduct(id, {
			onSuccess: () => {
				resetFields();
				Alert.alert(`${name} is successfully deleted!`);
				router.replace('/(admin)');
			}
		});
	};

	const confirmDelete = () => {
		Alert.alert(
			'Confirm',
			`Are you sure you want to delete this ${name}?`,
			[
				{
					text: 'Cancel'
				},
				{
					text: 'Delete',
					style: 'destructive',
					onPress: onDelete
				}
			]
		);
	};

	return (
		<View style={styles.container}>
			<Stack.Screen
				options={{
					title: isUpdating ? 'Update Product' : 'Create Product'
				}}
			/>

			<Image
				source={{ uri: image || defaultPizzaImage }}
				style={styles.image}
			/>
			<Text style={styles.textButton} onPress={pickImage}>
				Select Image
			</Text>
			<Text style={styles.label}>Name</Text>
			<TextInput
				value={name}
				onChangeText={setName}
				placeholder='Name'
				style={styles.input}
			/>

			<Text style={styles.label}>Price</Text>
			<TextInput
				value={price}
				onChangeText={setPrice}
				placeholder='9.99'
				style={styles.input}
				keyboardType='numeric'
			/>

			<Text style={{ color: 'red' }}>{errors}</Text>
			<Button
				text={isUpdating ? 'Update' : 'Create'}
				onPress={onSubmit}
			/>
			{isUpdating ? (
				<Text style={styles.textButton} onPress={confirmDelete}>
					Delete
				</Text>
			) : null}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		padding: 10
	},
	image: {
		width: '50%',
		aspectRatio: 1,
		alignSelf: 'center'
	},
	textButton: {
		alignSelf: 'center',
		fontWeight: 'bold',
		color: Colors.light.tint
	},
	label: {
		color: 'gray',
		fontSize: 16
	},
	input: {
		backgroundColor: 'white',
		padding: 10,
		borderRadius: 5,
		marginTop: 5,
		marginBottom: 20
	}
});

export default onCreateScreen;
