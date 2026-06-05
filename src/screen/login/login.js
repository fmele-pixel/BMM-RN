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
            <Text>Formulario de Login</Text>
            <Text style={styles.texto}>Ingrese su Email</Text>
            <TextInput  style={styles.inputStyle}
            keyboardType="email-address"
                placeholder="email"
                onChangeText={text => setEmail(text)}
                value={email}></TextInput>
            <Text style={styles.texto}>Ingrese su Password</Text>
            <TextInput style={styles.inputStyle}
             keyboardType="default"
                placeholder="Password"
                secureTextEntry={true}
                onChangeText={text => setPassword(text)}
                value={password}></TextInput>
            <Pressable style={styles.clickeableForm} onPress={() => onSubmit(email, password)}><Text style={styles.textoBoton}>Iniciar Sesion</Text></Pressable>
            <Text>No tenes cuenta?</Text>
            <Pressable style={styles.clickeable} onPress={() => props.navigation.navigate("register")}><Text style={styles.texto}>Ir al registro</Text></Pressable>
            <br></br>
            <Pressable style={styles.clickeable} onPress={() => props.navigation.navigate("HomeMenu")}><Text style={styles.texto}>Ir al Menu</Text></Pressable>
        </View>
    )

}
const styles = StyleSheet.create({
    container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20
},

inputStyle: {
    width: 300,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    paddingHorizontal: 10,
    marginVertical: 10
},

clickeable: {
    width: 300,
    backgroundColor: "#3048ce",
    padding: 10,
    borderRadius: 4,
    alignItems: "center",
    marginTop: 10
},

clickeableForm: {
    width: 300,
    backgroundColor: "#28a745",
    padding: 10,
    borderRadius: 4,
    alignItems: "center",
    marginTop: 10
}
})

export default Login