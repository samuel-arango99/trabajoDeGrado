import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
    container:{
        width:'100%',
        height:'100%',
        marginTop:30,
        //justifyContent:'space-between'
    },
    titulocont:{
        height:100,
        width:'100%',
        justifyContent:"center",
        alignItems:"center",
        marginTop:20
    },
    titulo:{
        fontWeight:"bold",
        fontSize:40,
        color:'darkorange',
    },
    row:{
        flexDirection:"row",
        justifyContent:'space-between',
        paddingVertical:20,
        marginHorizontal: 20,
        borderBottomWidth:1,
        borderColor:'darkorange',
        //marginTop:20,
        //borderTopWidth:3,
        //borderColor:'darkorange',
        //backgroundColor:'thistle'
    },
    foto:{
        width:83,
        height:100
    },
    values:{
        width:'70%'
    },
    datoscontainer:{
        alignItems:"flex-end"
        
    },
    datos:{
        fontSize:20,
    }
});

export default styles;
