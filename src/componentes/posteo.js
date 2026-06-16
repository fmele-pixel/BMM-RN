import { useEffect, useState } from "react"
import { db, auth } from "../firebase/config"
import { View, Text, Pressable } from "react-native"
import firebase from "firebase"
import { StyleSheet } from "react-native"

function Posteo(props) {
    const [cantidadLikes, setCantidadLikes] = useState(0)
    const [meGusta, setMeGusta] = useState(false)

    useEffect(() => {
        const listaLikes = props.posteoUsu.likes || []
        setCantidadLikes(listaLikes.length)
        if (auth.currentUser !== null && listaLikes.includes(auth.currentUser.email)) {
            setMeGusta(true)
        } else {
            setMeGusta(false)
        }
    }, [props.posteoUsu])

    function darLike() {
        if (auth.currentUser === null){
            alert("tenes que iniciar sesion para likear")
            return
        }
        db.collection("posts")
            .doc(props.id)
            .update({
                likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
            })
            .then(() => {
                setCantidadLikes(cantidadLikes + 1)
                setMeGusta(true)
            })
    }
    function quitarLike() {
        if (auth.currentUser === null){
            alert("tenes que iniciar sesion para likear")
            return
        }
        db.collection("posts")
            .doc(props.id)
            .update({
                likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
            })
            .then(() => {
                setCantidadLikes(cantidadLikes - 1)
                setMeGusta(false)
            })
    }
    
    
    return (
        <View style={styles.container}>
            
            <Text style={styles.autor}>Hecho por: {props.posteoUsu.owner}</Text>
            <Text style={styles.descripcion}>{props.posteoUsu.descripcionPost}</Text>
            <View style={styles.seccionLikes}>{
                meGusta === true ?
                <Pressable onPress={() => quitarLike()} style={styles.botonLike}><Text style={styles.emoji}>👎</Text></Pressable>

                :
                <Pressable onPress={() => darLike() }style={styles.botonLike}><Text style={styles.emoji}>👍</Text></Pressable>
            }
            <Text>Likes: {cantidadLikes}</Text>
            </View>
            <Pressable style={styles.comentario} onPress={() => props.navigation.navigate("Comentario", {params:{id:props.id}})}><Text style={styles.textComentario}>💬 Ver comentarios</Text></Pressable>
        </View>
    )


}

const styles = StyleSheet.create({
    container: {
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    autor: {
        fontWeight: "bold",
        marginBottom: 4,
    },
    descripcion: {
        marginBottom: 8,
    },
    seccionLikes: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        marginBottom: 8,
    },
    botonLike: {
        padding: 6,
    },
    emoji: {
        fontSize: 20,
    },
    comentario: {
        paddingVertical: 6,
    },
    textComentario: {
        color: "#3048ce",
    },
})

export default Posteo
