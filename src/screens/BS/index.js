import React, { useState, useEffect } from 'react';
import { Text, View, Pressable, FlatList, Alert } from 'react-native';
import Post from '../../components/post';
import styles from './styles';
import gp from '../../../assets/data/session.js'
import { useNavigation } from '@react-navigation/native';

const BienServicioScreen = () => {

    const user = gp.userId();


    const navigation = useNavigation();
    const [hasBS, setHasBS] = useState(false);
    const [BS, setBS] = useState([])

    useEffect(() => {

        const unsubscribe = navigation.addListener('focus', () => {
            fetch('https://quickscan.asyncspot.com/app/models/TG/BS.php', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    action: 'search',
                    user: user
                })
            }).then((response) => response.json())
                .then((responseJson) => {
                    if (responseJson.success == 1) {
                        setHasBS(true)
                        setBS(responseJson.data)
                        //console.log(responseJson.data)
                    }
                }).catch((error) => {
                    console.error(error)
                })
        })

        return unsubscribe
    });



    function QueHacerBSAlert(item) {
        var id = item.id;
        gp.productId(id);

        //Alert.alert(id)
        Alert.alert(
            "¿Desea editar o eliminar el bien/servicio?",
            "",
            [
                {
                    text: "Editar",
                    onPress: () => navigation.navigate('EditBS')
                },
                {
                    text: "Eliminar",
                    onPress: () => deleteBS(id)
                },
                {
                    text: 'Cancelar',
                    style: 'cancel'
                }
            ]
        )
    };

    function deleteBS(id) {
        Alert.alert(
            "¿Está seguro de que quiere eliminar este BS?",
            "",
            [
                {
                    text: "Cancelar",
                    style: 'cancel'
                },
                {
                    text: "Eliminar",
                    onPress: () => {
                        fetch('https://quickscan.asyncspot.com/app/models/TG/BS.php', {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                action: 'delete',
                                id: id
                            })
                        }).then((response) => response.json())
                            .then((responseJson) => {
                                //Alert.alert(responseJson)
                                if (responseJson.success == 1) {
                                    Alert.alert(responseJson.msg)
                                    navigation.navigate('Bien/Servicio')
                                } else {
                                    Alert.alert(responseJson.msg)
                                }
                            }).catch((error) => {
                                console.error(error)
                            })
                    }
                }
            ]
        )
    }

    if (hasBS) {

        return (

            <View style={styles.container}>

                <View style={{ alignItems: 'center', height: '6%', justifyContent: 'space-evenly', marginTop: '3%', flexWrap: 'wrap', alignContent: 'center', marginBottom: '4%' }}>
                    <Pressable onPress={() => navigation.navigate('AddBS')} style={styles.boton}>
                        <Text style={styles.textboton}>Agregar BS</Text>
                    </Pressable>
                    <Pressable onPress={() => navigation.navigate('SolicitudBS')} style={styles.boton}>
                        <Text style={styles.textboton}>Solicitudes</Text>
                    </Pressable>
                </View>
                <View style={{ height: '94%' }}>
                    <FlatList
                        data={BS}
                        renderItem={({ item }) => (
                            <Pressable onPress={QueHacerBSAlert.bind(this, item)}>
                                <Post post={item} />
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
            }}
            >
                <View style={{ alignItems: 'flex-end', height: '10%', justifyContent: 'center' }}>
                    <Pressable onPress={() => navigation.navigate('AddBS')} style={{
                        backgroundColor: '#fff',
                        width: 200, marginHorizontal: 25, height: 40, borderRadius: 10, justifyContent: 'center',
                        alignItems: "center", marginTop: 20, marginBottom: 0, borderWidth: 1, borderColor: 'darkorange'
                    }}
                    >
                        <Text style={{ fontSize: 16, fontWeight: "bold" }}>Agregar Bien/Servicio</Text>
                    </Pressable>
                    {/*<Pressable /*onPress={()=>  navigation.navigate('AddBS')} style={styles.boton2}>
                            <Text style={styles.textboton}>Editar Bien/Servicio</Text>
                        </Pressable>*/}
                </View>
                <View style={{ alignItems: 'center' }}>
                    <Text style={{ fontSize: 17, }}>Todavía no tiene ningun </Text>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'darkorange' }}>BIEN/SERVICiO</Text>
                    </View>
                    <Text style={{ fontSize: 17, }}>para prestar</Text>
                </View>
            </View>
        );
    }

};

export default BienServicioScreen;
