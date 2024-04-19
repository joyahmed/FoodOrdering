import { useLocalSearchParams } from 'expo-router';

export const useParsedId = () => {
	const { id: idString } = useLocalSearchParams();

	const id = parseFloat(
		typeof idString === 'string' ? idString : idString[0]
	);

	return id;
};
