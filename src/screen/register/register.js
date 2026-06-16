import React, { useState } from "react";
import {View, Text, TextInput, Pressable, StyleSheet} from "react-native";
import { auth, db } from "../../firebase/config";

export default function Register(props) {

    const [email, setEmail] = useState("");
    const [usuario, setUsuario] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [registrado, setRegistrado] = useState(false);
    const [errorRegistro, setErrorRegistro] = useState("");

    function registrarUsuario() {
        if (email === "" || usuario === "" || contrasena === "") {
            setErrorRegistro("Completá todos los campos.");
            return;
        }
        auth.createUserWithEmailAndPassword(email, contrasena)
            .then(respuesta => {
                return db.collection("users").add({
                    owner: respuesta.user.email,
                    name: usuario,
                    createdAt: Date.now(),
                });
            })
            .then(() => {
                setRegistrado(true);
                setErrorRegistro("");
                props.navigation.navigate("Login");
            })
            .catch(error => {
                setErrorRegistro(error.message);
            });
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
                value={usuario}
                onChangeText={(texto) => setUsuario(texto)}
            />

            <TextInput
                style={styles.input}
                placeholder="Ingresá tu password"
                keyboardType="default"
                secureTextEntry={true}
                value={contrasena}
                onChangeText={(texto) => setContrasena(texto)}
            />

            <Pressable
                style={styles.button}
                onPress={registrarUsuario}
            >
                <Text style={styles.buttonText}>
                    Registrate
                </Text>
            </Pressable>

            {errorRegistro !== "" && (
                <Text style={{ color: "red", marginTop: 10 }}>
                    {errorRegistro}
                </Text>
            )}

            {registrado && (
                <Text style={{ color: "green", marginTop: 10 }}>
                    Registro exitoso
                </Text>
            )}

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
});