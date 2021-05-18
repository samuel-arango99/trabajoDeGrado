import React, { useState } from 'react';
import { View, Text, Button, Alert } from "react-native";
import { TextInput } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import styles from './styles.js';
import { useNavigation } from '@react-navigation/native';


const RegistrarUsuarioScreen = () => {

    const navigation = useNavigation()

    const [names, setNames] = useState("")
    const [lastnames, setLastnames] = useState("")
    const [username, setUsername] = useState("");
    const [password1, setPassword1] = useState("")
    const [password2, setPassword2] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")


    function registerUser(nombres, apellidos, nombreusuario, cont1, cont2, correo, telefono, direccion) {

        var params = {
            names: nombres,
            lastnames: apellidos,
            username: nombreusuario,
            password1: cont1,
            password2: cont2,
            email: correo,
            phone: telefono,
            address: direccion
        }

        fetch('https://quickscan.asyncspot.com/app/models/TG/register.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        }).then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.success == 1) {
                    Alert.alert('Éxito!')
                    navigation.navigate('Inicio')
                } else {
                    Alert.alert("Hay errores en los datos! Revise que todo esté correcto")
                    navigation.navigate('Registrarme')
                }
            }).catch((error) => {
                console.error(error)
            })

    }

    return (

        <KeyboardAwareScrollView 
        style={{backgroundColor: 'white'}}
        resetScrollToCoords={{x:0,y:0}}
        contentContainerStyle={styles.container}
        scrollEnabled={false}
        >
            <View style={styles.textcont}>
                <Text style={styles.msj}>Crear cuenta</Text>
            </View>
            <View style={styles.datoscont}>
                <TextInput style={styles.row}
                    placeholder="Nombres"
                    placeholderTextColor="grey"
                    onChangeText={nombre => setNames(nombre)}>
                </TextInput>
                <TextInput style={styles.row}
                    placeholder="Apellidos"
                    placeholderTextColor="grey"
                    onChangeText={lastnames => setLastnames(lastnames)}>
                </TextInput>
                <TextInput style={styles.row}
                    placeholder="Nombre de usuario"
                    placeholderTextColor="grey"
                    onChangeText={username => setUsername(username)}>
                </TextInput>
                <TextInput style={styles.row}
                    placeholder="Contraseña"
                    placeholderTextColor="grey"
                    secureTextEntry={true}
                    onChangeText={password1 => setPassword1(password1)}>
                </TextInput>
                <TextInput style={styles.row}
                    placeholder="Confirmar contraseña"
                    placeholderTextColor="grey"
                    secureTextEntry={true}
                    onChangeText={password2 => setPassword2(password2)}>
                </TextInput>
                <TextInput style={styles.row}
                    placeholder="Correo electronico"
                    placeholderTextColor="grey"
                    onChangeText={email => setEmail(email)}>
                </TextInput>
                <TextInput style={styles.row}
                    placeholder="Teléfono"
                    placeholderTextColor="grey"
                    onChangeText={phone => setPhone(phone)}>
                </TextInput>
                <TextInput style={styles.row}
                    placeholder="Dirección"
                    placeholderTextColor="grey"
                    onChangeText={address => setAddress(address)}>
                </TextInput>
            </View>
            <View style={styles.contbutton}>
                <Button onPress={registerUser.bind(this, names, lastnames, username, password1, password2, email, phone, address)} style={styles.button} title="Crear usuario" />
            </View>
        </KeyboardAwareScrollView>
    );
};


export default RegistrarUsuarioScreen;