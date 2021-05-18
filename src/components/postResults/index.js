import React from 'react';
import { Text, View, Image } from 'react-native';
import styles from './styles';

const PostResult = (props) => {

    const post = props.post;

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

        </View>
    );
};

export default PostResult;
