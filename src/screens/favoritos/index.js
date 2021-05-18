//Cuando pone bien/servicio en la bottom tab
//Mostrar bien/servicio de los usuarios, tambien puede agregar un nuevo bien servicio a prestar
import React, { useState, useEffect } from 'react';
import { Text, View, Pressable, FlatList, Alert } from 'react-native';
import PostResult from '../../components/postResults';
import styles from './styles';
import gp from '../../../assets/data/session.js'
import { useNavigation } from '@react-navigation/native';

const FavoritosScreen = (props) => {

    const navigation = useNavigation();
    const [hasFavoritos, setHasFavoritos] = useState(false)
    const [favorites, setFavorites] = useState("")

    const user = gp.userId()

    useEffect(() => {
        //Alert.alert(id_product)
        const unsubscribe = navigation.addListener('focus', () => {
            fetch('https://quickscan.asyncspot.com/app/models/TG/BS.php', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    action: 'favorites',
                    id_user: user
                })
            }).then((response) => response.json())
                .then((responseJson) => {
                    //Alert.alert(responseJson)
                    if (responseJson.success == 1) {
                        setHasFavoritos(true)
                        setFavorites(responseJson.data)
                        //console.log(responseJson.data)
                    }
                }).catch((error) => {
                    console.error(error)
                })
        })

        return unsubscribe
    });

    const QueHacerFavoritoAlert = (item) => {

        var id = item.id;
        Alert.alert(
            "¿Desea eliminar o contratar el bien/servicio?",
            "",
            [
                {
                    text: "Eliminar de favortivos",
                    onPress: () => {
                        fetch('https://quickscan.asyncspot.com/app/models/TG/BS.php', {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                action: 'deleteFavorite',
                                id_user: user,
                                id_bien: id
                            })
                        }).then((response) => response.json())
                            .then((responseJson) => {
                                //Alert.alert(responseJson)
                                if (responseJson.success == 1) {
                                    Alert.alert(responseJson.msg)
                                    navigation.navigate('Favoritos')
                                    //console.log(responseJson.data)
                                } else {
                                    Alert.alert(responseJson.msg)
                                }
                            }).catch((error) => {
                                console.error(error)
                            })
                    }
                },
                {
                    text: "Contratar",
                    onPress: () => {
                        fetch('https://quickscan.asyncspot.com/app/models/TG/reservas.php', {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                action: 'addProduct',
                                id_user: user,
                                id_bien: id
                            })
                        }).then((response) => response.json())
                            .then((responseJson) => {
                                //Alert.alert(responseJson)
                                if (responseJson.success == 1) {
                                    Alert.alert(responseJson.msg)
                                    //console.log(responseJson.data)
                                } else {
                                    Alert.alert(responseJson.msg)
                                }
                            }).catch((error) => {
                                console.error(error)
                            })
                    }
                },
                {
                    text: "Cancelar",
                    style: 'cancel'
                }
            ]
        );
    }

    if (hasFavoritos) {
        return (
            <View style={styles.container}>
                <View>
                    <FlatList
                        data={favorites}
                        renderItem={({ item }) => (
                            <Pressable onPress={QueHacerFavoritoAlert.bind(this, item)}>
                                <PostResult post={item} />
                            </Pressable>
                        )}
                    >

                    </FlatList>
                </View>
            </View>
        );
    } else {
        return (
            <View style={{
                marginTop: 30,
                height: '100%',
                width: '100%',
                justifyContent: "center",
                alignItems: "center"
            }}>
                <View >
                    <Text style={{ fontSize: 17, }}>Todavía no tiene ningun bien/servicio en </Text>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'darkorange' }}>FAVORITOS</Text>
                    </View>
                </View>
            </View>
        );
    }

};

export default FavoritosScreen;