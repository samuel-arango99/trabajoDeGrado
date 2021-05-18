import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, ImageBackground, Pressable, Image } from 'react-native';
import styles from './styles';

const Carrito = (props) =>{

    const carrito = props.post;
    return(
        <View style={styles.container}>

            <Text style={styles.nombre}>{carrito.name} </Text>
            <Text style={styles.desc} numberOfLines={2}>
                {carrito.description}
            </Text>
            <Text style={styles.precio}>${carrito.price} </Text>
        
        </View>
    );
};

export default Carrito;
