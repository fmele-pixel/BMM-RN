import { Text, View, Pressable, Image, FlatList, StyleSheet, TextInput } from "react-native"
import HomeMenu from "../../componentes/HomeMenu"
import { useState } from "react"
import { auth } from "../../firebase/config"

function Login(props) {
    
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [login, setLogin] = useState(false)
    const [loginError, setLoginError] = useState("")

    function onSubmit(email, password) {
        if (password.length < 8){
            alert("La contrase;a es muy corta")
            return
        }
        auth.signInWithEmailAndPassword(email, password)
        .then(response => {
            setLogin(true)
            props.navigation.navigate("HomeMenu")
        })
        .catch(error => {
            console.log(error);
            
            if(error.code === "auth/invalid-email"){
                alert("Esta mal escrito el mail")
            }
            if(error.code === "auth/internal-error"){
                alert("Credenciales invalidas")
            }
            setLoginError("Credenciales invalidas")
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
        secureTextEntry={true}
        value={password}
        onChangeText={text => setPassword(text)}
    />

    <Pressable
        style={styles.clickeableForm}
        onPress={() => onSubmit(email, password)}
    >
        <Text style={styles.textoBoton}>Iniciar sesión</Text>
    </Pressable>

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
});

export default Login