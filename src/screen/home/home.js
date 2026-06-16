import { View, FlatList, StyleSheet } from "react-native"
import { useEffect, useState } from "react"
import { db } from "../../firebase/config"
import Posteo from "../../componentes/posteo"

function Home(props) {
  const [posteos, setPosteos] = useState([])

  useEffect(() => {
    db.collection("posts")
      .orderBy("createdAt", "desc")
      .onSnapshot(docs => {
        let lista = []
        docs.forEach(doc => {
          lista.push({
            id: doc.id,
            posteoUsuario: doc.data()
          })
        })
        setPosteos(lista)
      })
  }, [])

  return (
    <View style={styles.container}>
      <FlatList
        data={posteos}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <Posteo
            id={item.id}
            posteoUsu={item.posteoUsuario}
            navigation={props.navigation}
          />
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingVertical: 8,
  },
})

export default Home
