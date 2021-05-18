import React, { useEffect, useState } from 'react';
import { Text, View, Pressable, FlatList, Alert } from 'react-native';
import Post from '../../components/postFinalizados';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import gp from '../../../assets/data/session.js'

const SolicitudesRecibidasScreen = (props) => {

    const navigation = useNavigation();
    const [hasSolicitudesFinalizadas, setHasSolicitudesFinalizadas] = useState(true);
    const [solicitudesFinalizadas, setSolicitudesFinalizadas] = useState("")
    const user = gp.userId()

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', ()=>{
            fetch('https://quickscan.asyncspot.com/app/models/TG/reservas.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                action: 'searchEndedRequests',
                id_user: user
            })
        }).then((response) => response.json())
            .then((responseJson) => {
                //Alert.alert(responseJson)
                if (responseJson.success == 1) {
                    setHasSolicitudesFinalizadas(true)
                    setSolicitudesFinalizadas(responseJson.data)
                }
            }).catch((error) => {
                console.error(error)
            })
        })

        return unsubscribe
    })

    const QueHacerSolicitudBSAlert = (item) => {
        const id_user = item.idUser
        Alert.alert("¿Desea calificar al usuario prestante?","",
        [
            {
                text: "No",
                style: 'cancel'
            },
            {
                text: "Calificar",
                onPress: ()=>{
                    gp.userRate(id_user)
                    navigation.navigate('CalificarUsuario')
                }
            }
        ])
    }

    if (hasSolicitudesFinalizadas) {
        return (
            <View style={styles.container}>
                <View style={{ height: '100%' }}>
                    <FlatList
                        keyExtractor={item => item.id.toString()}
                        data={solicitudesFinalizadas}
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
                    <Text style={{ fontSize: 17, }}>No tiene ningún </Text>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'darkorange' }}>SERVICIO FINALIZADO</Text>
                    </View>
                </View>
            </View>
        );
    };
}

export default SolicitudesRecibidasScreen;