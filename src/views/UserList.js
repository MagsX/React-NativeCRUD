import React, { useContext } from "react"
import { Alert, FlatList, View } from "react-native"
import { ListItem, Avatar, Button, Icon } from 'react-native-elements'
import UsersContext from "../context/UsersContext"

export default props => {

    const { state, dispatch } = useContext(UsersContext)

    function confirmUserDelete(user) {
        Alert.alert('Excluir Usuário', 'Deseja realmente excluir este usuário?', [
            {
                text: 'Sim',
                onPress() {
                    dispatch({
                        type: 'deleteUser',
                        payload: user,
                    })
                }
            },
            {
                text: 'Não'
            }
        ])
    }

    function getActions(user) {
        return (
            <>
                <Button
                    type="clear"
                    onPress={() => props.navigation.navigate('UserForm', user)}
                    icon={<Icon name='edit' color='orange' />}
                />
                <Button
                    type="clear"
                    onPress={() => confirmUserDelete(user)}
                    icon={<Icon name='delete' color='red' />}
                />
            </>
        )
    }

    function getUserItem({ item: user }) {
        return (
            <ListItem key={user.id} bottomDivider>
                <Avatar source={{ uri: user.avatarUrl }} />
                <ListItem.Content>
                    <ListItem.Title>{user.name}</ListItem.Title>
                    <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
                </ListItem.Content>
                {getActions(user)}
            </ListItem>
        )
    }

    return (
        <View>
            <FlatList
                keyExtractor={user => user.id.toString()}
                data={state.users}
                renderItem={getUserItem}
            />
        </View>
    )
}
