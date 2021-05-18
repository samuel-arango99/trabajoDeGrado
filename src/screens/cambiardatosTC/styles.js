import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

    
    row:{
        flexDirection:"row",
        justifyContent:'space-evenly',
        //paddingVertical:10,
        marginHorizontal: 20,
        marginTop:20,
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

    },
    contbutton:{
        //backgroundColor:'#fff',
        //width: 200,
        marginHorizontal: 25,
        height:40,
        //borderRadius: 10,
        justifyContent: 'center',
        alignItems:"center",
        marginTop:20,
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
        height:40,
        borderColor:'darkorange',
        borderRadius:5,
        width:'45%',
        paddingLeft:2,
        backgroundColor:'white'
    },
    values2:{
        flexDirection:"row",
        alignItems:'center',
        alignContent: 'center',
        justifyContent: 'space-evenly',
           
    }
});
export default styles;
