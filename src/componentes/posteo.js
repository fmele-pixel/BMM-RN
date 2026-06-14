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
                        ❤️ {likes.length} Me gusta
                    </Text>
                </Pressable>

                <Pressable onPress={() => navigation.navigate("Comentarios", { postId: id })}>
                    <Text style={styles.comentar}>💬 Comentar</Text>
                </Pressable>

            </View>

        </View>
    )
}



export default Posteo
