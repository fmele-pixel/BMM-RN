import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, Pressable } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { db, auth } from '../firebase/config';

const Tab = createBottomTabNavigator()

function Comentarios(props) {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    function Post() {
        if (newComment.length > 0) {
            db.collection("coments").add({
                postId: props.route.params.params.id,
                owner: auth.currentUser.email,
                descripcion: newComment,
                createdAt: Date.now(),
                likes: []
            })
            comments.push(newComment)
            props.navigation.navigate("Home")
        } else {
            alert("El post debe contar con al menos un caracter")
        }
    }

    useEffect(() => {
        db.collection("coments").where("postId", "==", props.route.params.params.id).onSnapshot(
            docs => {
                let comentarios = []
                docs.forEach(doc => {
                    comentarios.push({
                        id: doc.id,
                        comentariosUsus: doc.data()
                    })
                })
                setComments(comentarios)
            }
        )
    }, [])




    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Comenta: </Text>
            <TextInput style={styles.inputStyle}
                keyboardType="default"
                placeholder="Comentario"
                onChangeText={(text) => setNewComment(text)}
                value={newComment}></TextInput>
            <Pressable style={styles.clickeable} onPress={() => Post()}><Text style={styles.texto}>Enviar comentario</Text></Pressable>
            <view style={styles.seccionComentarios}>
                <Text style={styles.texto}>Comentarios previos:</Text>
                <FlatList
                    style={styles.comentario}
                    data={comments}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => <Text style={styles.textoComent}>{item.comentariosUsus.descripcion}</Text>}
                />
            </view>
        </View>

    )
}

export default Comentarios