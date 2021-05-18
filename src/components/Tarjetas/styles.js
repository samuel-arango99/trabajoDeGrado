import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container:{
        //marginVertical: 20,
        marginHorizontal:4

    },
    row:{
        flexDirection:"row",
        //justifyContent:'space-between',
        paddingVertical:20,
        marginHorizontal: 0,
        borderBottomWidth:1,
        borderColor:'darkorange',
        width:'100%',
        alignItems:'center',
        alignContent: 'center',
        textAlign: 'center'
        //marginTop:20,
        //borderTopWidth:3,
        //borderColor:'darkorange',
        //backgroundColor:'thistle'
    },
    image:{
        width:83,
        height:70
        //aspectRatio: 3 / 2, //Para dimension de imagen horizaontal y vertical
        //resizeMode:"cover",
        //borderRadius: 10,
    },
    numero:{
        marginVertical:10,
        fontSize:20,
        color:'darkorange',
        fontWeight:"bold",
    },
    cvc:{
        fontSize:15,
        lineHeight:20,
    },
    fv:{
        fontSize:15,
        color:'black',
        fontWeight:"bold",
        marginVertical:10
    }

});
export default styles;