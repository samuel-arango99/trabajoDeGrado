import React, { useState } from 'react';
import { Text, View, Pressable, Button, Alert } from 'react-native';
import styles from './styles';
import gp from '../../../assets/data/session'
import { useNavigation } from '@react-navigation/native';

const DarCalificacionScreen = () => {

    const user = gp.userId()
    const rateUser = gp.userRate()

    const [calif, setCalif] = useState(0);

    const navigation = useNavigation();

    function sendCalification(cal) {

        Alert.alert("¿Está seguro de enviar la calificación?", "",
            [
                {
                    text: "Cancelar",
                    style: 'cancel'
                },
                {
                    text: "Enviar",
                    onPress: () => {
                        fetch('https://quickscan.asyncspot.com/app/models/TG/users.php', {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                action: 'addCalification',
                                calification: cal,
                                idCalificador: user,
                                idCalificado: rateUser
                            })
                        }).then((response) => response.json())
                            .then((responseJson) => {
                                //Alert.alert(responseJson)
                                if (responseJson.success == 1) {
                                    Alert.alert(responseJson.msg)
                                    navigation.goBack()
                                } else {
                                    Alert.alert(responseJson.msg)
                                }
                            }).catch((error) => {
                                console.error(error)
                            })
                    }
                }
            ])
    }

    return (
        <View style={{ justifyContent: 'space-between', height: '100%' }}>
            <View style={{ justifyContent: 'center', alignItems: 'center', height: '90%' }}>
                <View style={styles.row}>
                    <View style={{ width: '60%' }}>
                        <Text style={styles.title}>Califique al usuario del 1 al 5</Text>
                    </View>
                    <View style={styles.values}>
                        <Pressable onPress={() => setCalif(Math.max(0, calif - 1))}
                            style={styles.button}>
                            <Text style={styles.signtext}>-</Text>
                        </Pressable>
                        <Text style={styles.number}>{calif}</Text>
                        <Pressable onPress={() => setCalif(Math.min(5, calif + 1))}
                            style={styles.button}>
                            <Text style={styles.signtext}>+</Text>
                        </Pressable>
                    </View>
                </View>

            </View>


            <View style={{ marginBottom: 20, justifyContent: 'center', height: 50, marginHorizontal: 20 }}>
                <Button
                    onPress={sendCalification.bind(this, calif)}
                    color='darkorange'
                    title='Enviar calificación'
                >
                </Button>
            </View>
        </View>

    );
};

export default DarCalificacionScreen;