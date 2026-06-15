import { Text, View, Pressable, StyleSheet, FlatList } from "react-native";
import { useState, useEffect } from "react";
import { auth, db } from "../../firebase/config";
import Posteo from "../../componentes/posteo";
export default function Profile({ navigation }) {

  const [posteo, setPosteo] = useState([]);
  const [nombre, setNombre] = useState("");

  function logout() {
    auth.signOut()
      .then(() => {
        navigation.navigate("Login");
      })
      .catch(error => {
        console.log(error);
      });
  }

  useEffect(() => {
    db.collection("posts")
      .where("owner", "==", auth.currentUser.email)
      .onSnapshot(docs => {

        let posteos = [];

        docs.forEach(doc => {
          posteos.push({
            id: doc.id,
            posteoUsuario: doc.data()
          });
        });

        setPosteo(posteos);
      });
  }, []);

  useEffect(() => {
    db.collection("users")
      .where("owner", "==", auth.currentUser.email)
      .onSnapshot(docs => {
        docs.forEach(doc => {
          setNombre(doc.data().name);
        });
      });
  }, []);

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Mi Perfil</Text>

      <Text>{nombre}</Text>
      <Text>{auth.currentUser.email}</Text>

      <FlatList
        data={posteo}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <Posteo
            id={item.id}
            posteoUsu={item.posteoUsuario}
            navigation={navigation}
          />
        )}
      />

      <Pressable
        style={styles.button}
        onPress={logout}
      >
        <Text style={styles.textButton}>
          Desloguearse
        </Text>
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
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20
  },
  button:{
    backgroundColor:"#3048ce",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6
  },
  textButton:{
    color:"#fff"
  }
});

