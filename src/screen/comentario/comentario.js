import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, Pressable } from 'react-native';
import { db, auth } from "../../firebase/config";

function Comentarios(props) {
    const [comentarios, setComentarios] = useState([]);
    const [nuevoComentario, setNuevoComentario] = useState('');

    function enviarComentario() {
        if (nuevoComentario.length > 0) {
            db.collection("coments").add({
                postId: props.route.params.params.id,
                owner: auth.currentUser.email,
                descripcion: nuevoComentario,
                createdAt: Date.now(),
                likes: []
            })
            setNuevoComentario('')
            props.navigation.navigate("Home")
        } else {
            alert("El comentario debe contar con al menos un caracter")
        }
    }

    useEffect(() => {
        db.collection("coments").where("postId", "==", props.route.params.params.id).onSnapshot(
            docs => {
                let lista = []
                docs.forEach(doc => {
                    lista.push({
                        id: doc.id,
                        datos: doc.data()
                    })
                })
                setComentarios(lista)
            }
        )
    }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Comenta: </Text>
            <TextInput style={styles.inputStyle}
                keyboardType="default"
                placeholder="Comentario"
                onChangeText={(text) => setNuevoComentario(text)}
                value={nuevoComentario}></TextInput>
            <Pressable style={styles.clickeable} onPress={() => enviarComentario()}><Text style={styles.texto}>Enviar comentario</Text></Pressable>
            <View style={styles.seccionComentarios}>
                <Text style={styles.subtitulo}>Comentarios previos:</Text>
                <FlatList
                    style={styles.comentario}
                    data={comentarios}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => <Text style={styles.textoComent}>{item.datos.descripcion}</Text>}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#f5f5f5",
    },
    titulo: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#000",
        marginBottom: 10,
    },
    inputStyle: {
        height: 45,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        backgroundColor: "#fff",
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    clickeable: {
        backgroundColor: "#3048ce",
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: "center",
        marginBottom: 16,
    },
    texto: {
        color: "#fff",
        fontWeight: "bold",
    },
    seccionComentarios: {
        flex: 1,
    },
    subtitulo: {
        fontWeight: "bold",
        color: "#333",
        marginBottom: 8,
    },
    comentario: {
        marginTop: 8,
    },
    textoComent: {
        backgroundColor: "#fff",
        color: "#444",
        padding: 10,
        borderRadius: 6,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: "#e0e0e0",
    },
})

export default Comentarios
