import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container:{
        margin: 20,
        borderColor: 'orange',
        borderWidth: 2,
        borderRadius:15
    },
    image:{
        width:'80%',
        height: 200,
        resizeMode:"cover",
        borderRadius: 10,
        alignSelf: 'center',
        marginTop:10
    },
    nombre:{
        marginVertical:10,
        fontSize:25,
        color:'darkorange',
        fontWeight:"bold",
        textAlign: 'center'
    },
    desc:{
        fontSize:18,
        lineHeight:20,
    },
    precio:{
        fontSize:18,
        color:'black',
        fontWeight:"bold",
        marginVertical:2,
        textAlign: 'center'
    }

});
export default styles;