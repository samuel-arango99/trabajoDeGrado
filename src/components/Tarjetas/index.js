import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, ImageBackground, Pressable, Image } from 'react-native';
import styles from './styles';

const Tarjeta = (props) =>{

    const tarjetas = props.t;
    return(
        <View style={styles.container}>
            <View style={styles.row}>
                <View style={{width:'30%', marginLeft:20}}>
                    <Image source={require('../../../assets/images/credit-card.png')} style={styles.image} />
                </View>
                <View style={{width:'70%'}}>
                    <Text style={styles.numero}>{tarjetas.num}</Text>
                    <Text style={styles.fv}> {tarjetas.fecha}</Text>
                </View>
            </View>
        </View>
    );
};

export default Tarjeta;
