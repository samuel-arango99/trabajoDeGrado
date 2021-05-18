//Agregar un bien/servicio
import React, { useState } from 'react';
import { TextInput, View, Button, Alert } from 'react-native';
import styles from './styles.js';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import gp from '../../../assets/data/session.js'
import { useNavigation } from '@react-navigation/native';

const AddTarjetasScreen = (props) => {

    const user = gp.userId();

    const navigation = useNavigation();

    const [number, setNumber] = useState("")
    const [cvc, setCVC] = useState("")
    const [mesFecha, setMesFecha] = useState("")
    const [yearFecha, setYearFecha] = useState("")

    function addCard(numero, cvc, mes, year) {

        var params = {
            number: numero,
            cvc: cvc,
            month: mes,
            year: year,
            user: user,
            action: 'add'
        }
        fetch('https://quickscan.asyncspot.com/app/models/TG/creditCards.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        }).then((response) => response.json())
            .then((responseJson) => {
                //Alert.alert(responseJson)
                if (responseJson.success == 1) {
                    Alert.alert(responseJson.msg);
                    navigation.navigate('tajeta')
                    //console.log(responseJson.data)
                }else{
                    Alert.alert(responseJson.msg)
                }
            }).catch((error) => {
                console.log(error)
            })
    }

    return (
        <KeyboardAwareScrollView
            style={{ backgroundColor: 'white' }}
            resetScrollToCoords={{ x: 0, y: 0 }}
            enableOnAndroid={true}
            enableAutomaticScroll={(Platform.OS === 'ios')}
        >
            <View style={{ marginTop: 30 }}>
                <View style={styles.row}>
                    <View style={styles.values}>
                        <TextInput style={styles.datos}
                            placeholder=" Número de tarjeta"
                            placeholderTextColor="grey"
                            keyboardType="numeric"
                            onChangeText={num => setNumber(num)}>
                        </TextInput>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.values}>
                        <TextInput style={styles.datos}
                            placeholder=" CVC"
                            placeholderTextColor="grey"
                            keyboardType="numeric"
                            onChangeText={cod => setCVC(cod)}>
                        </TextInput>
                    </View>
                </View>

                <View style={styles.row}>
                    <View style={styles.values2}>
                        <TextInput style={styles.datos2}
                            placeholder="MM"
                            placeholderTextColor="grey"
                            keyboardType="numeric"
                            onChangeText={month => setMesFecha(month)}
                            value={mesFecha}>
                        </TextInput>
                        <TextInput style={styles.datos2}
                            placeholder="YY"
                            placeholderTextColor="grey"
                            keyboardType="numeric"
                            onChangeText={year => setYearFecha(year)}
                            value={yearFecha}>
                        </TextInput>
                    </View>
                </View>

                <View style={styles.contbutton}>
                    <Button
                        onPress={addCard.bind(this, number, cvc, mesFecha, yearFecha)}
                        title='Agregar tarjeta'
                        color='darkorange'
                    >
                    </Button>
                </View>
            </View>
        </KeyboardAwareScrollView>
    );
};
export default AddTarjetasScreen;
