import { View, Text, Pressable, StyleSheet } from "react-native";

export default function Profile({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mi Perfil</Text>

      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.textButton}>Desloguearse</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:"center",
    alignItems:"center"
  },
  title:{
    fontSize:24,
    marginBottom:20
  },
  button:{
    backgroundColor:"red",
    padding:10,
    borderRadius:5
  },
  textButton:{
    color:"#fff"
  }
});