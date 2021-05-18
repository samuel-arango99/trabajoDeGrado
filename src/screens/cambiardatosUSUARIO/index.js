//Cuando pone bien/servicio en la bottom tab
//Mostrar bien/servicio de los usuarios, tambien puede agregar un nuevo bien servicio a prestar
import React, { useEffect, useState } from 'react';
import { Text, TextInput, View, Button, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import styles from './styles';
import gp from '../../../assets/data/session.js'
import { useNavigation } from '@react-navigation/native';

const CambiarDatosUsuarioScreen = () => {

    const user = gp.userId()

    function editUser(newNames, newLastnames, newUsername, newEmail, newPhone, newAddress) {

        if (newNames == "") {
            newNames = names;
        }
        if (newLastnames == "") {
            newLastnames = lastnames
        }
        if (newEmail == "") {
            newEmail = email
        }
        if (newPhone == "") {
            newPhone = phone
        }
        if (newAddress == "") {
            newAddress = address
        }
        if(newUsername == ""){
            newUsername = username
        }

        var params = {
            names: newNames,
            lastnames: newLastnames,
            username: newUsername,
            id: user,
            email: newEmail,
            phone: newPhone,
            address: newAddress,
            action: 'edit'
        }

        fetch('https://quickscan.asyncspot.com/app/models/TG/users.php', {
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
                    Alert.alert(responseJson.msg)
                    navigation.goBack()
                } else {
                    if (responseJson.success == 2) {
                        Alert.alert(responseJson.msg)
                        navigation.navigate('CambiardatosU')
                    } else {
                        Alert.alert("Hay errores en los datos!")
                        navigation.navigate('CambiardatosU')
                    }
                }
            }).catch((error) => {
                console.error(error)
            })
    }

    const [names, setNames] = useState('')
    const [lastnames, setLastnames] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [username, setUsername] = useState('')

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            fetch('https://quickscan.asyncspot.com/app/models/TG/users.php', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: user,
                    action: 'search'
                })
            }).then((response) => response.json())
                .then((responseJson) => {
                    if (responseJson.success == 1) {
                        setNames(responseJson.names)
                        setLastnames(responseJson.lastnames);
                        setEmail(responseJson.email);
                        setPhone(responseJson.phone);
                        setAddress(responseJson.address);
                        setUsername(responseJson.username)
                    } else {
                    }
                }).catch((error) => {
                    console.error(error)
                })
        })

        return unsubscribe
    })


    const navigation = useNavigation();

    const [newNames, setNewNames] = useState('')
    const [newLastnames, setNewLastnames] = useState('')
    const [newUsername, setNewUsername] = useState('')
    const [newEmail, setNewEmail] = useState('')
    const [newPhone, setNewPhone] = useState('')
    const [newAddress, setNewAddress] = useState('')

    return (

        <KeyboardAwareScrollView
            style={{ backgroundColor: 'white' }}
            resetScrollToCoords={{ x: 0, y: 0 }}
            contentContainerStyle={styles.container}
            scrollEnabled={false}
        >
            <View style={styles.textcont}>
                <Text style={styles.msj}>Editar cuenta</Text>
            </View>
            <View style={styles.datoscont}>
                <TextInput style={styles.row}
                    placeholder={names}
                    placeholderTextColor="grey"
                    onChangeText={nombre => setNewNames(nombre)}>
                </TextInput>
                <TextInput style={styles.row}
                    placeholder={lastnames}
                    placeholderTextColor="grey"
                    onChangeText={lastnames => setNewLastnames(lastnames)}>
                </TextInput>
                <TextInput style={styles.row}
                    placeholder={username}
                    placeholderTextColor="grey"
                    onChangeText={username => setNewUsername(username)}>
                </TextInput>
                <TextInput style={styles.row}
                    placeholder={email}
                    placeholderTextColor="grey"
                    onChangeText={email => setNewEmail(email)}>
                </TextInput>
                <TextInput style={styles.row}
                    placeholder={phone}
                    placeholderTextColor="grey"
                    onChangeText={phone => setNewPhone(phone)}>
                </TextInput>
                <TextInput style={styles.row}
                    placeholder={address}
                    placeholderTextColor="grey"
                    onChangeText={newAddress => setNewAddress(newAddress)}>
                </TextInput>
            </View>
            <View style={styles.contbutton}>
                <Button onPress={editUser.bind(this, newNames, newLastnames, newUsername, newEmail, newPhone, newAddress)} style={styles.button} title="Editar usuario" />
            </View>
        </KeyboardAwareScrollView>
    );
};

export default CambiarDatosUsuarioScreen;
