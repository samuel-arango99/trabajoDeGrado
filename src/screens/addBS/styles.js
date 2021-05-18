import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

    row:{
        flexDirection:"row",
        justifyContent:'space-between',
        paddingVertical:20,
        marginHorizontal: 20,
        marginTop:20,
        textAlign: "center"
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
        flexDirection:"row",
        alignItems:"center",
        textAlign: 'center',
        alignContent: 'center',
        marginBottom:20
    },
    values2:{
        flexDirection:"row",
        alignItems:"center",
        textAlign: 'center',
        alignContent: 'center',
        marginBottom:100
    },
    contbutton:{
        //backgroundColor:'#fff',
        //width: 200,
        marginHorizontal: 25,
        height:40,
        //borderRadius: 10,
        justifyContent: 'center',
        alignItems:"center",
        //marginTop:15,
        //marginBottom:15,
        //borderWidth:1,
        //borderColor:'darkorange'
        
    },
    textbtn:{
        fontSize:16,
        fontWeight: "bold"
    },
    datos:{
        borderWidth:1,
        borderColor:'darkorange',
        width:'100%',
        height:40,
        paddingLeft:2,
        borderRadius:5,
        backgroundColor:'white'
    },
    datos2:{
        borderWidth:1,
        height:100,
        borderColor:'darkorange',
        borderRadius:5,
        width:'100%',
        paddingLeft:2,
        backgroundColor:'white'
    },
    container: {
        textAlign: 'center',
        alignItems: 'center'
    }
});
export default styles;
