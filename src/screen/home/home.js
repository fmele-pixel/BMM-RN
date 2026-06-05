import { View, Text, Pressable } from 'react-native';

export default function Home() {

  const handlePress = () => {
    console.log('me clickearon');
  };

  return (
    <View>
      <Text>Hola Mundo</Text>

      <Pressable onPress={handlePress}>
        <Text>clickeame</Text>
      </Pressable>
    </View>
  );
}