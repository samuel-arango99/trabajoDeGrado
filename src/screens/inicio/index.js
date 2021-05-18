import React, { useState } from 'react';
import { View, Text, Alert, Button } from "react-native";
import { TextInput } from 'react-native-gesture-handler';
import styles from './styles.js';
import gp from '../../../assets/data/session.js'
import { useNavigation } from '@react-navigation/native';

const InicioScreen = () => {

    
    const navigation = useNavigation();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const loginFn = (usuario, contrasena) => {

        var params = JSON.stringify({
            username: usuario,
            password: contrasena
        });
        fetch('https://quickscan.asyncspot.com/app/models/TG/login.php',{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            cache: false,
            body: params
        }).then((response) => response.json())
        .then((responseJson) => {
            //console.log(responseJson)
            if(responseJson.success==1){
                //AsyncStorage.setItem('user', username)
                navigation.navigate('Home')
                gp.userId(responseJson.user)
            }else{
                Alert.alert(responseJson.msg)
                //navigation.navigate('Inicio')
            }
        }).catch((error) => {
            console.error(error)
        })
    }

    return (
        <View style={styles.container}>

            <View style={styles.textcont}>
                <Text style={styles.msj}>Bienvenido!</Text>
            </View>
            <View style={styles.datos2}>
                <TextInput style={styles.datos}
                    placeholder="Nombre de usuario"
                    onChangeText={username => setUsername(username)}
                    placeholderTextColor="grey">
                </TextInput>
                <TextInput style={styles.datos}
                    onChangeText={password => setPassword(password)}
                    placeholder="Contraseña"
                    placeholderTextColor="grey"
                    secureTextEntry={true}>
                </TextInput>
            </View>
            <View style={styles.row}>
                <Button onPress={loginFn.bind(this, username, password)} style={styles.button} title="Iniciar Sesión" color="orange" />
                <Button onPress={() => navigation.navigate('Registrarme')} title="Crear cuenta" color="orange" />
            </View>
        </View>
    );
};

export default InicioScreen;