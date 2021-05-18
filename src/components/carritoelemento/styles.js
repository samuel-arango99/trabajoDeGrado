import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container:{
        marginVertical: 5,
        marginHorizontal:10,
        borderBottomWidth:1,
        borderColor:'darkorange'

    },
    image:{
        width:'100%',
        aspectRatio: 3 / 2, //Para dimension de imagen horizaontal y vertical
        resizeMode:"cover",
        borderRadius: 10,
    },
    nombre:{
        marginVertical:10,
        fontSize:25,
        color:'darkorange',
        fontWeight:"bold",
    },
    desc:{
        fontSize:18,
        lineHeight:20,
    },
    precio:{
        fontSize:18,
        color:'black',
        fontWeight:"bold",
        marginVertical:10
    }

});
export default styles;