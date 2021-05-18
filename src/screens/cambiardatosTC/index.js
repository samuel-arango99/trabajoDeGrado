//Agregar un bien/servicio
import React, { useState, useEffect } from 'react';
import { TextInput, View, Button, Alert } from 'react-native';
import styles from './styles.js';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useNavigation } from '@react-navigation/native';
import gp from '../../../assets/data/session.js'


const CambiarDatosTarjetaScreen = (props) => {

    const navigation = useNavigation();
    const card_id = gp.cardId()

    const [number, setNumber] = useState("")
    const [cvc, setCVC] = useState("")
    const [month, setMonth] = useState("")
    const [year, setYear] = useState("")

    const [newNumber, setNewNumber] = useState("")
    const [newCVC, setNewCVC] = useState("")
    const [newMonth, setNewMonth] = useState("")
    const [newYear, setNewYear] = useState("")

    useEffect(() => {

        const unsubscribe = navigation.addListener('focus', ()=>{
            fetch('https://quickscan.asyncspot.com/app/models/TG/creditCards.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                action: 'searchId',
                id: card_id
            })
        }).then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.success == 1) {
                    setNumber(responseJson.number)
                    setCVC(responseJson.cvc)
                    setMonth(responseJson.month)
                    setYear(responseJson.year)
                }
            }).catch((error) => {
                console.error(error)
            })
        })

        return unsubscribe
    });

    function editCard(newnumber, newcvc, newmonth, newyear) {

        const abortController = new AbortController()
        const signal = abortController.signal

        if (newnumber == "") {
            newnumber = number
        }
        if (newcvc == "") {
            newcvc = cvc
        }
        if (newmonth == "") {
            newmonth = month
        }
        if (newyear == "") {
            newyear = year
        }

        fetch('https://quickscan.asyncspot.com/app/models/TG/creditCards.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                action: 'edit',
                id: card_id,
                number: newnumber,
                cvc: newcvc,
                month: newmonth,
                year: newyear
            }),
            signal: signal
        }).then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.success == 1) {
                    Alert.alert(responseJson.msg)
                    navigation.navigate('tajeta')
                } else {
                    Alert.alert(responseJson.msg)
                }
            }).catch((error) => {
                console.error(error)
            })

        return function cleanup(){
            abortController.abort()
        }
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
                            placeholder={number}
                            placeholderTextColor="grey"
                            keyboardType="numeric"
                            onChangeText={num => setNewNumber(num)}>
                        </TextInput>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.values}>
                        <TextInput style={styles.datos}
                            placeholder={cvc}
                            placeholderTextColor="grey"
                            keyboardType="numeric"
                            onChangeText={cod => setNewCVC(cod)}>
                        </TextInput>
                    </View>
                </View>

                <View style={styles.row}>
                    <View style={styles.values2}>
                        <TextInput style={styles.datos2}
                            placeholder={month}
                            placeholderTextColor="grey"
                            keyboardType="numeric"
                            onChangeText={month => setNewMonth(month)}
                        >
                        </TextInput>
                        <TextInput style={styles.datos2}
                            placeholder={year}
                            placeholderTextColor="grey"
                            keyboardType="numeric"
                            onChangeText={year => setNewYear(year)}
                        >
                        </TextInput>
                    </View>
                </View>

                <View style={styles.contbutton}>
                    <Button
                        onPress={editCard.bind(this, newNumber, newCVC, newMonth, newYear)}
                        title='Editar tarjeta'
                        color='darkorange'
                    >
                    </Button>
                </View>
            </View>
        </KeyboardAwareScrollView>
    );
};
export default CambiarDatosTarjetaScreen;
