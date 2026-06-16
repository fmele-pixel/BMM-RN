import { db, auth } from "../firebase/config"
import { Text, View, Pressable, FlatList, StyleSheet, TextInput } from "react-native"
import { useState } from "react"

function NewPost(props) {

    const [comentario, setComenatrio] = useState("")

    function Post() {
        if (comentario.length > 0) {
            db.collection("posts").add({
                owner: auth.currentUser.email,
                descripcionPost: comentario,
                createdAt: Date.now(),
                likes: []
            })
            props.navigation.navigate("NavegacionStack")
        }
        else {
            alert("El post debe contar con al menos un caracter")
        }

    }

    return (
        <View style={styles.container}>
            <View style={styles.containerForm}>
                <Text style={styles.titulo}>Escriba en el espacio debajo</Text>
                <TextInput style={styles.inputStyle}
                    keyboardType="default"
                    placeholder="Crea tu posteo"
                    onChangeText={(text) => setComenatrio(text)}
                    value={comentario}></TextInput>
                <Pressable style={styles.clickeable} onPress={() => Post()}><Text style={styles.textoBoton}>Publicar</Text></Pressable>
            </View>
        </View>
    )
}

export default NewPost