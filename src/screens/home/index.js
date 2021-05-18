import React, { useEffect } from 'react';
import { Text, View, ImageBackground, Pressable, Alert } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import gp from '../../../assets/data/session'


const HomeScreen = () => {

    const navigation = useNavigation();
    const user = gp.userId()

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            fetch('https://quickscan.asyncspot.com/app/models/TG/users.php', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                cache: false,
                body: JSON.stringify({
                    action: 'unreadNotifications',
                    user: user
                })
            }).then((response) => response.json())
                .then((responseJson) => {
                    if (responseJson.success == 1) {
                        Alert.alert("Tiene notificaciones nuevas sin leer!")
                    }
                }).catch((error) => {
                    console.error(error)
                })
        })

        return unsubscribe
    })

    return (
        <View>
            <ImageBackground source={require('../../../assets/images/buscar.jpg')} style={styles.image}>
                <Pressable
                    style={styles.searchbtn}
                    onPress={() => navigation.navigate('Search Place')}>
                    <Text style={styles.searchtextbtn}>¿Que desea buscar?</Text>
                </Pressable>

                <Text style={styles.title}>REDITUS</Text>
            </ImageBackground>
        </View>
    );
};

export default HomeScreen;