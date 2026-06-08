import React, { useState } from "react";
import {View, Text, TextInput, Pressable, StyleSheet} from "react-native";
import { auth } from "../../firebase/config";



export default function Register() {

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [register, setRegister] = useState(false);
    const [registerError, setRegisterError] = useState("");

    function onSubmit (email, pass) {
   auth.createUserWithEmailAndPassword(email, pass)
    .then( response => {
        setRegister(true); 
     })     
    .catch( error => {
        setRegisterError('Fallo en el registro.')
    })
 }


    return (
        <View style={styles.container}>

            <Text style={styles.title}>
                Registro
            </Text>

            <TextInput
                style={styles.input}
                placeholder="Ingresá tu email"
                keyboardType="email-address"
                value={email}
                onChangeText={(texto) => setEmail(texto)}
            />

            <TextInput
                style={styles.input}
                placeholder="Ingresá tu usuario"
                keyboardType="default"
                value={username}
                onChangeText={(texto) => setUsername(texto)}
            />

            <TextInput
                style={styles.input}
                placeholder="Ingresá tu password"
                keyboardType="default"
                secureTextEntry={true}
                value={password}
                onChangeText={(texto) => setPassword(texto)}
            />

            <Pressable
                style={styles.button}
                onPress={() => onSubmit(email, password)}
            >
                <Text style={styles.buttonText}>
                    Registrate
                </Text>
            </Pressable>

            <View style={styles.infoBox}>
                <Text>Email: {email}</Text>
                <Text>Username: {username}</Text>
                <Text>Password: {password}</Text>
            </View>

        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#f5f5f5",
    },

    title: {
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 30,
        color: "#000000",
    },

    input: {
        width: 300,
        height: 45,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        backgroundColor: "#fff",
        paddingHorizontal: 10,
        marginVertical: 8,
    },

    button: {
        width: 300,
        backgroundColor: "#28a745",
        padding: 12,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 15,
    },

    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },

    infoBox: {
        width: 300,
        marginTop: 25,
        padding: 10,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        backgroundColor: "#fff",
    },
});