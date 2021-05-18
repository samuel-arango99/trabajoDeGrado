import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, ImageBackground, Pressable, Image } from 'react-native';
import styles from './styles';

const Notificaciones = (props) =>{

    const notification = props.notification
    return(
        <View style={styles.container}>
            <View style={styles.row}>
                
                
                    <Text style={styles.fecha}>{notification.fecha}</Text>
                    <Text style={styles.msj} >
                        {notification.mensaje}
                    </Text>
                    
            </View>
        </View>
    );
};

export default Notificaciones;
