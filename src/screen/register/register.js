import React, { useState } from "react";
import {View, Text, TextInput, Pressable, StyleSheet} from "react-native";
import { auth } from "../../firebase/config";


export default function Register() {

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

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
                onPress={onSubmit}
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

