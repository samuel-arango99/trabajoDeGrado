//Cuando pone bien/servicio en la bottom tab
//Mostrar bien/servicio de los usuarios, tambien puede agregar un nuevo bien servicio a prestar
import React, { useEffect, useState } from 'react';
import { Text, View, Pressable, FlatList, Alert, Button } from 'react-native';
import Carro from '../../components/carritoelemento';
import styles from './styles';
import gp from '../../../assets/data/session.js'
import { useNavigation } from '@react-navigation/native';

const CarritoScreen = (props) => {

    const navigation = useNavigation();
    const [hasProductos, setHasProductos] = useState(false);
    const [productos, setProductos] = useState("")
    const [total, setTotal] = useState("")
    const user = gp.userId()

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            fetch('https://quickscan.asyncspot.com/app/models/TG/reservas.php', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    action: 'checkReserva',
                    id_user: user
                })
            }).then((response) => response.json())
                .then((responseJson) => {
                    //Alert.alert(responseJson)
                    if (responseJson.success == 1) {
                        setHasProductos(true)
                        setProductos(responseJson.data)
                        setTotal(responseJson.total)
                    }
                }).catch((error) => {
                    console.error(error)
                })
        })

        return unsubscribe
    })

    const CambioCarritoAlert = (item) => {
        var id_bien = item.id;
        var id_reserva = item.id_reserva;

        Alert.alert(
            "¿Desea borrar el bien/servicio del carrito?",
            "",
            [
                {
                    text: "No",
                    style: "cancel"
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
                                action: 'deleteProduct',
                                id: id_bien,
                                id_reserva: id_reserva
                            })
                        }).then((response) => response.json())
                            .then((responseJson) => {
                                //Alert.alert(responseJson)
                                if (responseJson.success == 1) {
                                    Alert.alert(responseJson.msg)
                                    navigation.navigate('Carrito')
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
    };

    const finalizarCompra = () => {

        Alert.alert("¿Desea finalizar la compra?", "",
            [
                {
                    text: 'Finalizar',
                    onPress: () => {
                        fetch('https://quickscan.asyncspot.com/app/models/TG/reservas.php', {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                action: 'endReserva',
                                user: user
                            })
                        }).then((response) => response.json())
                            .then((responseJson) => {
                                //Alert.alert(responseJson)
                                if (responseJson.success == 1) {
                                    Alert.alert(responseJson.msg)
                                    navigation.navigate('Carrito')
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
                    style: 'cancel'
                }
            ])
    }

    if (hasProductos) {
        return (
            <View style={styles.container}>

                <View style={{ height: '85%', marginTop: 20 }}>
                    <FlatList
                        data={productos}
                        renderItem={({ item }) => (
                            <Pressable onPress={CambioCarritoAlert.bind(this, item)}>
                                <Carro post={item} />
                            </Pressable>
                        )}
                    >
                    </FlatList>
                </View>

                <View style={{ height: '15%', marginHorizontal: 10, justifyContent: 'flex-end' }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>Total a pagar: ${total}</Text>
                    </View>
                    <View style={{ marginBottom: 30 }}>
                        <Button
                            onPress={finalizarCompra.bind(this)}
                            title='Finalizar pedido'
                            color='darkorange'
                        >
                        </Button>
                    </View>
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
                <View>
                    <Text style={{ fontSize: 17, }}>Todavía no tiene ningun bien/servicio en el </Text>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'darkorange' }}>CARRITO</Text>
                    </View>
                </View>
            </View>
        );
    }

};

export default CarritoScreen;
