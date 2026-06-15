import { View, Text, Pressable, StyleSheet, Image } from "react-native"
import { auth, db } from "../firebase/config"

function Posteo({ id, posteoUsu, navigation }) {

    const likes = posteoUsu.likes || []
    const yaLikeo = likes.includes(auth.currentUser.email)

    function handleLike() {
        if (yaLikeo) {
            db.collection("posts").doc(id).update({
                likes: likes.filter(email => email !== auth.currentUser.email)
            })
        } else {
            db.collection("posts").doc(id).update({
                likes: [...likes, auth.currentUser.email]
            })
        }
    }

    return (
        <View style={styles.card}>

            <Text style={styles.owner}>{posteoUsu.owner}</Text>

            <Text style={styles.descripcion}>{posteoUsu.descripcionPost}</Text>

            {posteoUsu.image && (
                <Image source={{ uri: posteoUsu.image }} style={styles.imagen} />
            )}

            <View style={styles.acciones}>

                <Pressable onPress={handleLike}>
                    <Text style={[styles.like, yaLikeo && styles.likeActivo]}>
                        {likes.length} Me gusta
                    </Text>
                </Pressable>

                <Pressable onPress={() => navigation.navigate("Comentarios", { postId: id })}>
                    <Text style={styles.comentar}>Comentar</Text>
                </Pressable>

            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        borderRadius: 8,
        padding: 14,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: "#e0e0e0",
    },
    owner: {
        fontWeight: "bold",
        fontSize: 14,
        color: "#333",
        marginBottom: 6,
    },
    descripcion: {
        fontSize: 15,
        color: "#444",
        marginBottom: 10,
    },
    imagen: {
        width: "100%",
        height: 200,
        borderRadius: 6,
        marginBottom: 10,
    },
    acciones: {
        flexDirection: "row",
        justifyContent: "space-between",
        borderTopWidth: 1,
        borderTopColor: "#f0f0f0",
        paddingTop: 10,
    },
    like: {
        fontSize: 14,
        color: "#888",
    },
    likeActivo: {
        color: "#e74c3c",
        fontWeight: "bold",
    },
    comentar: {
        fontSize: 14,
        color: "#3048ce",
    },
})

export default Posteo
