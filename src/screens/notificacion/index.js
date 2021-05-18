//Cuando pone bien/servicio en la bottom tab
//Mostrar bien/servicio de los usuarios, tambien puede agregar un nuevo bien servicio a prestar
import React, { useEffect, useState } from 'react';
import { Text, View, Pressable, FlatList } from 'react-native';
import Notif from '../../components/Notificacion';
import styles from './styles';
import gp from '../../../assets/data/session.js'
import { useNavigation } from '@react-navigation/native';

const NotificacionesScreen = (props) => {

    const navigation = useNavigation();
    const [hasNotifiacion, setHasNotificacion] = useState(false)
    const [notifications, setNotifications] = useState("")
    const user = gp.userId()

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            fetch('https://quickscan.asyncspot.com/app/models/TG/users.php', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user: user,
                    action: 'showNotifications'
                })
            }).then((response) => response.json())
                .then((responseJson) => {
                    if (responseJson.success == 1) {
                        setHasNotificacion(true)
                        setNotifications(responseJson.data)
                    }
                }).catch((error) => {
                    console.error(error)
                })
        })
        return unsubscribe
    })

    if (hasNotifiacion) {
        return (

            <View style={styles.container}>
                <View style={{ height: '100%' }}>
                    <FlatList
                        data={notifications}
                        renderItem={({ item }) => (
                            <Pressable>
                                <Notif notification={item} />
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
                    <Text style={{ fontSize: 17, }}>Todavía no tiene ninguna</Text>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'darkorange' }}>NOTIFICACIÓN</Text>
                    </View>
                </View>
            </View>
        );
    }

};

export default NotificacionesScreen;
