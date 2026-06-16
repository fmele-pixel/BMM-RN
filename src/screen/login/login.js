import { Text, View, Pressable, StyleSheet, TextInput } from "react-native"
import { useState, useEffect } from "react"
import { auth } from "../../firebase/config"

function Login(props) {

    const [email, setEmail] = useState("")
    const [contrasena, setContrasena] = useState("")
    const [errorLogin, setErrorLogin] = useState("")

    useEffect(() => {
        const desuscribir = auth.onAuthStateChanged(usuario => {
            if (usuario) {
                props.navigation.navigate("HomeMenu")
            }
        })
        return desuscribir
    }, [])

    function iniciarSesion(email, contrasena) {
        if (contrasena.length < 6){
            alert("La contraseña es muy corta")
            return
        }
        auth.signInWithEmailAndPassword(email, contrasena)
        .then(respuesta => {
            props.navigation.navigate("HomeMenu")
        })
        .catch(error => {
            if(error.code === "auth/invalid-email"){
                alert("Esta mal escrito el mail")
            }
            if(error.code === "auth/internal-error"){
                alert("Credenciales invalidas")
            }
            setErrorLogin("Credenciales invalidas")
        })
    }


    return (
        <View style={styles.container}>

    <Text style={styles.title}>Login</Text>

    <TextInput
        style={styles.inputStyle}
        placeholder="Ingresá tu email"
        keyboardType="email-address"
        value={email}
        onChangeText={text => setEmail(text)}
    />

    <TextInput
        style={styles.inputStyle}
        placeholder="Ingresá tu password"
        keyboardType="default"
        secureTextEntry={true}
        value={contrasena}
        onChangeText={text => setContrasena(text)}
    />

    <Pressable
        style={styles.clickeableForm}
        onPress={() => iniciarSesion(email, contrasena)}
    >
        <Text style={styles.textoBoton}>Iniciar sesión</Text>
    </Pressable>

    {errorLogin !== "" && (
        <Text style={styles.error}>{errorLogin}</Text>
    )}

    <Text style={styles.textoSecundario}>
        ¿No tenés cuenta?
    </Text>

    <Pressable
        style={styles.clickeable}
        onPress={() => props.navigation.navigate("Register")}
    >
        <Text style={styles.textoBoton}>Ir al registro</Text>
    </Pressable>

</View>
    )

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
        color: "#000",
    },

    texto: {
        width: 300,
        fontSize: 16,
        marginBottom: 5,
        color: "#000",
    },

    inputStyle: {
        width: 300,
        height: 45,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        backgroundColor: "#fff",
        paddingHorizontal: 10,
        marginVertical: 8,
    },

    clickeableForm: {
        width: 300,
        backgroundColor: "#285fa7",
        padding: 12,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 15,
    },

    clickeable: {
        width: 300,
        backgroundColor: "#ce5230",
        padding: 12,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 10,
    },

    textoBoton: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },

    error: {
        color: "red",
        marginTop: 10,
        width: 300,
        textAlign: "center",
    },
});

export default Login