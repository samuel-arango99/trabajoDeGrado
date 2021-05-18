import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

    row:{
        flexDirection:"row",
        justifyContent:'space-between',
        paddingVertical:20,
        marginHorizontal: 20,
        //marginTop:20,
        //borderBottomWidth:1,
        //borderColor:'orange',
        
    },
    title:{
        fontWeight:'bold',
        fontSize:20
    },
    values:{
        flexDirection:"row",
        alignItems:"center"
    },
    button:{
        borderWidth:1,
        width:30,
        height:30,
        borderRadius:15,
        justifyContent:"center",
        alignItems:"center",
        borderColor:'grey',
        
    },
    number:{
        marginHorizontal:20,
        fontSize:16
    },
    signtext:{
        fontSize:20,
        color:'black'
    },
    
});
export default styles;