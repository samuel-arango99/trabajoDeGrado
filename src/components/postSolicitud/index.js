import React from 'react';
import { Text, View, Image } from 'react-native';
import styles from './styles.js';

const PostSolicitud = (props) => {

    const post = props.post;
    var estado = ""

    if(post.state==1){
        estado = "Pendiente de respuesta"
    }else if(post.state==2){
        estado = "Solicitud aprobada"
    }else if(post.state==3){
        estado = "Solicitud negada"
    }else{
        estado = "Solicitud finalizada"
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
            <Text style={styles.precio}>Categoría: {post.category}</Text>
            <Text style={styles.precio}>Precio: ${post.price}</Text>
            <Text style={styles.precio}>Solicitante: {post.requestUser}</Text>
            <Text style={styles.precio}>Correo: {post.email}</Text>
            <Text style={styles.precio}>teléfono: {post.phone}</Text>
            <Text style={styles.precio}>Calificación: {post.calification}</Text>
            <Text style={styles.precio}>Estado: {estado}</Text>
        </View>
    );
};

export default PostSolicitud;
