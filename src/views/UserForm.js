import React, { useContext, useState } from "react"
import { StyleSheet, Text, TextInput, View, Button } from "react-native"
import UsersContext from "../context/UsersContext"

export default ({ route, navigation }) => {
    const [user, setUser] = useState(route.params ? route.params : {})
    const { dispatch } = useContext(UsersContext)

    return (
        <View style={styles.form}>
            <Text>Nome</Text>
            <TextInput
                onChangeText={name => setUser({ ...user, name })}
                placeholder='Informe o seu nome'
                value={user.name}
                style={styles.input}
            />
            <Text>E-mail</Text>
            <TextInput
                onChangeText={email => setUser({ ...user, email })}
                placeholder='Informe o seu e-mail'
                value={user.email}
                style={styles.input}
            />
            <Text>Avatar</Text>
            <TextInput
                onChangeText={avatarUrl => setUser({ ...user, avatarUrl })}
                placeholder='Informe a url do seu avatar'
                value={user.avatarUrl}
                style={styles.input}
            />
            <Button
                title='Salvar'
                onPress={() => {
                    dispatch({
                        type: user.id ? 'updateUser' : 'createUser',
                        payload: user
                    })
                    navigation.goBack()
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    form: {
        padding: 12,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginVertical: 10,
        borderRadius: 5,
    },
})