import { db, auth } from "../../firebase/config"
import { Text, View, Pressable, StyleSheet, TextInput } from "react-native"
import { useState } from "react"

function NuevoPosteo(props) {

    const [descripcion, setDescripcion] = useState("")

    function publicar() {
        if (descripcion.length === 0) {
            alert("El post debe contar con al menos un caracter")
            return
        }
        db.collection("posts").add({
            owner: auth.currentUser.email,
            descripcionPost: descripcion,
            createdAt: Date.now(),
            likes: [],
        })
        setDescripcion("")
        props.navigation.navigate("Inicio")
    }

    return (
        <View style={styles.container}>
            <View style={styles.containerForm}>
                <Text style={styles.titulo}>Nuevo posteo</Text>

                <TextInput
                    style={styles.inputStyle}
                    keyboardType="default"
                    placeholder="Escribí algo..."
                    multiline
                    onChangeText={(text) => setDescripcion(text)}
                    value={descripcion}
                />

                <Pressable style={styles.clickeable} onPress={() => publicar()}>
                    <Text style={styles.textoBoton}>Publicar</Text>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
    containerForm: {
        padding: 20,
        marginTop: 20,
    },
    titulo: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#000",
        marginBottom: 10,
    },
    inputStyle: {
        minHeight: 80,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        backgroundColor: "#fff",
        padding: 10,
        textAlignVertical: "top",
        marginVertical: 10,
    },
    clickeable: {
        backgroundColor: "#3048ce",
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: "center",
    },
    textoBoton: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
})

export default NuevoPosteo
