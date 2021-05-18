//Cuando pone perfil en la bottom tab
import React, { useEffect, useState } from 'react';
import { Text, View, Pressable, Image, Alert } from 'react-native';
import styles from './styles.js';
import { useNavigation } from '@react-navigation/native';
import gp from '../../../assets/data/session.js'

const GetProfileInfo = (props) => {

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const navigation = useNavigation()

    useEffect(() => {

        const unsubscribe = navigation.addListener('focus', () => {
            fetch('https://quickscan.asyncspot.com/app/models/TG/profileInfo.php', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userid: props.userid
                })
            }).then((response) => response.json())
                .then((responseJson) => {
                    if (responseJson.success == 1) {
                        setFullName(responseJson.fullName);
                        setEmail(responseJson.email);
                        setPhone(responseJson.phone);
                        setAddress(responseJson.address);
                    } else {
                    }
                }).catch((error) => {
                    //console.error(error)
                })
        })
        return unsubscribe
    })

    return (
        <View style={styles.values}>
            <Text style={styles.datos}>{fullName}</Text>
            <Text style={styles.datos}>{email}</Text>
            <Text style={styles.datos}>{phone}</Text>
            <Text style={styles.datos}>{address}</Text>
        </View>
    );
}

const PerfilScreen = () => {

    const navigation = useNavigation();
    const user = gp.userId()

    const EliminarCuentaAlert = () => Alert.alert(
        "¿Está seguro que desea elimar la cuenta?",
        "",
        [
            {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
            },
            { text: "Eliminar", onPress: deleteProfile() }
        ]
    );

    function deleteProfile() {
        fetch('https://quickscan.asyncspot.com/app/models/TG/creditCards.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: user
            })
        }).then((response) => response.text())
            .then((responseJson) => {
                Alert.alert(responseJson)
                /*if (responseJson.success == 1) {
                    gp.userId("");
                    Alert.alert(responseJson.msg);
                    navigation.navigate('Inicio');
                    //console.log(responseJson.data)
                }*/
            }).catch((error) => {
                console.error(error)
            })
    }

    return (
        <View style={styles.container}>
            {/*<View style={styles.titulocont}>
                <Text style={styles.titulo}>Perfil</Text>
             </View>*/}
            <View>
                <View style={styles.row}>
                    <View>
                        <Image source={require('../../../assets/images/perfil.png')} style={styles.foto} />
                    </View>
                    <GetProfileInfo userid={user} />
                </View>
            </View>

            <View style={styles.row}>
                <Pressable onPress={() => navigation.navigate("tajeta")}>
                    <Text style={styles.datos}>Agregar tarjeta de credito</Text>
                </Pressable>
            </View>
            <View style={styles.row}>
                <Pressable onPress={() => navigation.navigate('CambiardatosU')}>
                    <Text style={styles.datos}>Cambiar datos de usuario</Text>
                </Pressable>
            </View>
            <View style={styles.row}>
                <Pressable onPress={() => navigation.navigate('notificaciones')}>
                    <Text style={styles.datos}>Historial notificaciones</Text>
                </Pressable>
            </View>
            <View style={styles.row}>
                <Pressable onPress={() => navigation.navigate('solicitudesFinalizadas')}>
                    <Text style={styles.datos}>Historial de solicitudes finalizadas</Text>
                </Pressable>
            </View>
            <View style={styles.row}>
                <Pressable onPress={EliminarCuentaAlert}>
                    <Text style={styles.datos}>Eliminar cuenta</Text>
                </Pressable>
            </View>
            <View style={styles.row}>
                <Pressable onPress={() => {
                    navigation.navigate('Inicio')
                    gp.userId(null)
                }}>
                    <Text style={styles.datos}>Cerrar sesión</Text>
                </Pressable>
            </View>
        </View>
    );
};

export default PerfilScreen;
