//Cuando pone bien/servicio en la bottom tab
//Mostrar bien/servicio de los usuarios, tambien puede agregar un nuevo bien servicio a prestar
import React, { useEffect, useState } from 'react';
import { Text, View, Pressable, FlatList, Alert } from 'react-native';
import Tarj from '../../components/Tarjetas';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import gp from '../../../assets/data/session.js'

const TarjetasScreen = () => {

    const user = gp.userId();


    const navigation = useNavigation();
    const [hasTarjetas, setHasTarjetas] = useState(false);
    const [cards, setCards] = useState("")

    useEffect(() => {

        const unsubscribe = navigation.addListener('focus', () => {
            fetch('https://quickscan.asyncspot.com/app/models/TG/creditCards.php', {
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
                        setHasTarjetas(true)
                        setCards(responseJson.data)
                        //console.log(responseJson.data)
                    }
                }).catch((error) => {
                    console.error(error)
                })
        })

        return unsubscribe

    });

    const QueHacerTarjAlert = (item) => {

        const id = item.id
        gp.cardId(id)
        Alert.alert(
            "¿Desea editar o eliminar la tarjeta?",
            "",
            [
                {
                    text: "Editar",
                    onPress: () => navigation.navigate('Edittarjeta')
                },
                {
                    text: "Eliminar",
                    onPress: () => {
                        fetch('https://quickscan.asyncspot.com/app/models/TG/creditCards.php', {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                action: 'delete',
                                id_card: id
                            })
                        }).then((response) => response.json())
                            .then((responseJson) => {
                                //Alert.alert(responseJson)
                                if (responseJson.success == 1) {
                                    Alert.alert(responseJson.msg)
                                    navigation.navigate('tajeta')
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
                    text: 'Cancelar',
                    style: "cancel"
                }
            ]
        );
    }

    if (hasTarjetas) {
        return (
            <View style={styles.container}>

                <View style={{ alignItems: 'center', height: '10%', justifyContent: 'center', alignContent: 'center' }}>
                    <Pressable onPress={() => navigation.navigate('addtajeta')} style={styles.boton}>
                        <Text style={styles.textboton}>Agregar tarjeta de crédito</Text>
                    </Pressable>
                    {/*<Pressable /*onPress={()=>  navigation.navigate('AddBS')} style={styles.boton2}>
                        <Text style={styles.textboton}>Editar Bien/Servicio</Text>
                    </Pressable>*/}
                </View>
                <View style={{ height: '90%' }}>
                    <FlatList
                        data={cards}
                        renderItem={({ item }) => (
                            <Pressable onPress={QueHacerTarjAlert.bind(this, item)}>
                                <Tarj t={item} />
                            </Pressable>
                        )}
                    >
                    </FlatList>
                    {/*<FlatList /*Aca van los datos de cada bien/servicio registrado por cada ususario
                        data={feed}
                        renderItem={({item}) => <Post post={item} />}>
                    </FlatList>*/}
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
                    <Pressable onPress={() => navigation.navigate('addtajeta')} style={{
                        backgroundColor: '#fff',
                        width: 200, marginHorizontal: 25, height: 40, borderRadius: 10, justifyContent: 'center',
                        alignItems: "center", marginTop: 20, marginBottom: 0, borderWidth: 1, borderColor: 'darkorange'
                    }}
                    >
                        <Text style={{ fontSize: 16, fontWeight: "bold" }}>Agregar tarjeta</Text>
                    </Pressable>
                    {/*<Pressable /*onPress={()=>  navigation.navigate('AddBS')} style={styles.boton2}>
                            <Text style={styles.textboton}>Editar Bien/Servicio</Text>
                        </Pressable>*/}
                </View>
                <View >
                    <Text style={{ fontSize: 17, marginTop: 20 }}>Todavía no ha registrado ninguna </Text>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'darkorange' }}>TARJETA</Text>
                    </View>
                </View>
            </View>
        );
    }

};

export default TarjetasScreen;