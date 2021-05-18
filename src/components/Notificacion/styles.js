import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container:{
        //marginVertical: 20,
        marginHorizontal:4

    },
    row:{
        //flexDirection:"row",
        justifyContent:'space-between',
        paddingVertical:20,
        marginHorizontal: 20,
        borderBottomWidth:1,
        borderColor:'darkorange',
        width:'100%'
        //marginTop:20,
        //borderTopWidth:3,
        //borderColor:'darkorange',
        //backgroundColor:'thistle'
    },
    
    fecha:{
        marginVertical:10,
        fontSize:20,
        color:'darkorange',
        fontWeight:"bold",
    },
    msj:{
        fontSize:16,
        lineHeight:20,
    },
    

});
export default styles;