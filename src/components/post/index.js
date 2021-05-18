import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, ImageBackground, Pressable, Image } from 'react-native';
import styles from './styles';

const Post = (props) => {

    const post = props.post;
    if(post.state==1){
        var estado = "Disponible"
    }else{
        var estado = "No disponible"
    }

    if(post.category == "Bien"){
        var image = require('../../../assets/images/bien.png');
    }else{
        var image = require('../../../assets/images/service.png');
    }
    return (
        <View style={styles.container}>
            <Image style={styles.image} source={image}></Image>

            <Text style={styles.nombre}>{post.name} </Text>
            <Text style={styles.precio} /*numberOfLines={2}*/>
                Descripción: {post.description}
            </Text>
            <Text style={styles.precio}>Estado: {estado}</Text>
            <Text style={styles.precio}>Categoría: {post.category}</Text>
            <Text style={styles.precio}>Precio: ${post.price}</Text>

        </View>
    );
};

export default Post;
