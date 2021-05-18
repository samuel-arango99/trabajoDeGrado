import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    titulocont:{
        marginTop:2,
        width:'100%',
        marginLeft:20
    },
    boton:{
        backgroundColor:'#fff',
        width: 200,
        marginHorizontal: 25,
        height:40,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems:"center",
        marginTop:15,
        marginBottom:15,
        borderWidth:1,
        borderColor:'darkorange'
    },
    textboton:{
        fontSize:16,
        fontWeight: "bold"
        
    },
    container:{
        //backgroundColor:'darkorange', 
        width:'100%',
        height: '100%',
        marginTop:20
    },
    textcont:{
        width:'100%',
        marginBottom:20,
        textAlign: "center",
        marginTop: 0
        
    },
    msj:{
        color:'darkorange',
        fontSize:30,
        fontWeight:"bold",
        textAlign: 'center'
        
    },
    row:{
        height:45,
        width:'90%',
        borderWidth:1.5,
        borderRadius:20,
        marginBottom:10,
        borderColor:'darkorange',
        textAlign: 'center',
    },
    title:{
        fontWeight:'bold',
        fontSize:20,
        color:'darkorange'
    },
    subtitle:{
        color:'grey',
        fontSize:15
    }, 
    values:{
    },
    button:{
        backgroundColor:'#fff',
        width: 200,
        marginHorizontal: 25,
        height:40,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems:"center",
        marginTop:15,
        marginBottom:15,
        borderWidth:1,
        borderColor:'darkorange'
        
    },
    textbtn:{
        fontSize:16,
        fontWeight: "bold",
        color:'black'
    },
    datos:{
        borderWidth:1,
        width:180,
        paddingLeft:2,
        backgroundColor:'white'
    },
    datoscont:{
        textAlign:'center',
        alignContent: 'center',
        alignItems: 'center'
    }
});

export default styles;