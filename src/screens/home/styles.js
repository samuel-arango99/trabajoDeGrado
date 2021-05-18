import { StyleSheet, TouchableWithoutFeedback, Dimensions } from "react-native";

const styles = StyleSheet.create({
    image: {
        width: 760,
        height: '100%',
        resizeMode: 'cover',
        justifyContent: "flex-end"
    },
    title: {
        fontSize:90,
        fontWeight: "bold",
        color: 'black',
        width:'70%',
        marginLeft: 25,
    },
    btn: {
        backgroundColor:'#fff',
        width: 200,
        marginLeft: 25,
        height:40,
        borderRadius: 10,
        justifyContent:'center',
        alignItems:"center",
        marginTop:15,
        marginBottom:15,
    },
    textbtn:{
        fontSize:16,
        fontWeight: "bold"
        
    },
    searchbtn: {
        backgroundColor:'#fff',
        width: Dimensions.get('screen').width - 20,
        height:60,
        borderRadius: 30,
        marginHorizontal:10,
        flexDirection:"row",
        justifyContent:'center',
        alignItems:"center",
        position:"absolute",
        top:50,
        zIndex:100,
    },
    searchtextbtn:{
        fontSize:20,
        fontWeight: "bold"
        
    },
   
});

export default styles;