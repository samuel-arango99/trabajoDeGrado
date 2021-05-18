import React, { useEffect, useState } from 'react';
import { Text, View, Pressable, FlatList, Alert } from 'react-native';
import Post from '../../components/postSolicitud';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import gp from '../../../assets/data/session.js'

const SolicitudServicioScreen = (props) => {

    const navigation = useNavigation();
    const [hasSolicitudes, setHasSolicitudes] = useState(true);
    const [solicitudes, setSolicitudes] = useState("")
    const user = gp.userId()

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', ()=>{
            fetch('https://quickscan.asyncspot.com/app/models/TG/BS.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                action: 'searchRequestedProducts',
                id_user: user
            })
        }).then((response) => response.json())
            .then((responseJson) => {
                //Alert.alert(responseJson)
                if (responseJson.success == 1) {
                    setHasSolicitudes(true)
                    setSolicitudes(responseJson.data)
                }
            }).catch((error) => {
                console.error(error)
            })
        })

        return unsubscribe
    })

    const QueHacerSolicitudBSAlert = (item) => {

        const abortController = new AbortController()
        const signal = abortController.signal

        var id_reserva = item.idReserva
        var id_bien = item.bien
        var requestUser = item.idUser
        var productName = item.name

        var estado = item.state

        if (estado == 4) {
            Alert.alert("Esta solicitud ya fue finalizada, ¿desea calificar al usuario solicitante?", "", [
                {
                    text: "Sí",
                    onPress: () => {
                        gp.userRate(requestUser)
                        navigation.navigate('CalificarESPECIFICOusuario')
                    }
                },
                {
                    text: "No",
                    style: 'cancel'
                }
            ])
        } else if (estado == 3) {
            Alert.alert("Esta solicitud ya fue negada", "", [
                {
                    text: "Cerrar",
                    style: 'cancel'
                }
            ])
        } else if (estado == 2) {
            Alert.alert("Esta solicitud ya fue aceptada, ¿desea marcar el préstamo como finalizado?", "", [
                {
                    text: "Sí",
                    onPress: () => {
                        fetch('https://quickscan.asyncspot.com/app/models/TG/reservas.php', {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                action: 'endRequest',
                                id_reserva: id_reserva,
                                bien: id_bien,
                                user: requestUser,
                                name: productName
                            }),
                            signal: signal
                        }).then((response) => response.json())
                            .then((responseJson) => {
                                //Alert.alert(responseJson)
                                if (responseJson.success == 1) {
                                    Alert.alert(responseJson.msg)
                                    navigation.navigate('SolicitudBS')
                                } else {
                                    Alert.alert(responseJson.msg)
                                }
                            }).catch((error) => {
                                console.error(error)
                            })

                        return () => abortController.abort()
                    }
                },
                {
                    text: "No",
                    style: 'cancel'
                }
            ])
        } else {
            Alert.alert(
                "¿Desea aceptar la solicitud?",
                "",
                [
                    {
                        text: "No",
                        onPress: () => {
                            fetch('https://quickscan.asyncspot.com/app/models/TG/reservas.php', {
                                method: 'POST',
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    action: 'denyRequest',
                                    id_reserva: id_reserva,
                                    bien: id_bien,
                                    user: requestUser,
                                    name: productName
                                }),
                                signal: signal
                            }).then((response) => response.json())
                                .then((responseJson) => {
                                    //Alert.alert(responseJson)
                                    if (responseJson.success == 1) {
                                        Alert.alert(responseJson.msg)
                                        navigation.navigate('SolicitudBS')
                                    } else {
                                        Alert.alert(responseJson.msg)
                                    }
                                }).catch((error) => {
                                    console.error(error)
                                })

                            return () => abortController.abort()
                        }
                    },
                    {
                        text: "Sí",
                        onPress: () => {
                            fetch('https://quickscan.asyncspot.com/app/models/TG/reservas.php', {
                                method: 'POST',
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    action: 'acceptRequest',
                                    id_reserva: id_reserva,
                                    bien: id_bien,
                                    user: requestUser,
                                    name: productName
                                }),
                                signal: signal
                            }).then((response) => response.json())
                                .then((responseJson) => {
                                    //Alert.alert(responseJson)
                                    if (responseJson.success == 1) {
                                        Alert.alert(responseJson.msg)
                                    } else {
                                        Alert.alert(responseJson.msg)
                                    }
                                }).catch((error) => {
                                    console.error(error)
                                })

                            return () => abortController.abort()
                        }
                    },
                    {
                        text: "Decidir luego",
                        style: 'cancel'
                    }
                ]
            )
        }
    }

    if (hasSolicitudes) {
        return (

            <View style={styles.container}>
                <View style={{ height: '100%' }}>
                    <FlatList
                        keyExtractor={item => item.id.toString()}
                        data={solicitudes}
                        renderItem={({ item }) => (
                            <Pressable onPress={QueHacerSolicitudBSAlert.bind(this, item)}>
                                <Post post={item} />
                            </Pressable>
                        )}
                    >
                    </FlatList>
                </View>
            </View >
        );
    } else {
        return (
            <View style={{
                marginTop: 30,
                height: '100%',
                width: '100%',
                justifyContent: "center",
                alignItems: "center"
            }}
            >
                <View style={{ alignItems: 'center' }}>
                    <Text style={{ fontSize: 17, }}>Todavía no tiene ninguna </Text>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'darkorange' }}>SOLICITUD DE SERVICIO</Text>
                    </View>
                    <Text style={{ fontSize: 17, }}>para prestar</Text>
                </View>
            </View>
        );
    };
}

export default SolicitudServicioScreen;