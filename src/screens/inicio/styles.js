import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container:{
        //backgroundColor:'darkorange', 
        width:'100%',
        height: '100%'
    },
    textcont:{
        justifyContent: 'center', 
        alignItems: 'center', 
        paddingTop:'50%',
        marginBottom: 20
    },
    row:{
        flexDirection:"row",
        //justifyContent:'space-between',
        marginHorizontal: 20,
        marginTop:10,
        justifyContent: "space-evenly",
    },
    button:{
        height:50,
        width: 150,
        borderRadius:30,
        justifyContent: "center",
        alignItems: "center",
        borderColor: 'darkorange',
        borderWidth:1.5,
        backgroundColor:'white'
    },
    msj:{
        fontSize:48,
        fontWeight: "bold",
        color: 'darkorange',
        width:'70%',
        marginBottom: 20
        
    },
    text:{
        fontSize:19,
        color:'black',
        fontWeight:"bold"
    },
    datos:{
        height:50,
        width:'100%',
        borderWidth:1.5,
        borderRadius:20,
        marginBottom:10,
        borderColor:'darkorange',
        paddingLeft:10
    },
    datos2:{
        justifyContent: 'center', 
        alignItems: 'center', 
        marginLeft:15,
        marginRight:15,
        marginTop:10
    }
});

export default styles;