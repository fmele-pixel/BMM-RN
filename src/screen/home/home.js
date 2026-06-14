import { Text, View, Pressable, Image, FlatList, StyleSheet } from "react-native"
import { useEffect, useState } from "react"
import { db, auth } from "../../firebase/config";
import Posteo from "../../componentes/posteo"


function Home(props) {
  const [comentario, setComentario] = useState([])
  useEffect(() => {
    db.collection("posteo").onSnapshot(
      docs => {
        let posteos = []
        docs.forEach(doc => {
          posteos.push({
            id: doc.id,
            posteoUsuario: doc.data()
          })
        })
        setComentario(posteos)

      }
    )
  }, [])

  return (

    <View>
      <Text>Pagina de inicio</Text>
      <FlatList
        data={comentario}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => <Posteo id={item.id} posteoUsu={item.posteoUsuario} navigation={props.navigation} />}
      />


    </View>
  )

}
const styles = StyleSheet.create({
  container: {
    display: "flex",
    padding: 10,
    flex: 1,
    width: "100%",
    alignContent: "center",
    flexWrap: "wrap",
    textAlign: "center"
  },
  clickeable: {
    padding: 4,
    backgroundColor: "#3048ce",
    marginBottom: 10,
    borderRadius: 4,
    textAlign: "center"
  },
  texto: {
    fontWeight: "bold",
    textAlign: "center"
  }
})

export default Home
