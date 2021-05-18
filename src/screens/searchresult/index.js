import React, { useState, useEffect } from 'react';
import { Text, View, Pressable, FlatList, Alert } from 'react-native';
import PostResult from '../../components/postResults';
import gp from '../../../assets/data/session.js'
import { useNavigation } from '@react-navigation/native';


const SearchResultScreen = () => {


    const user = gp.userId()

    const navigation = useNavigation();

    const searchWord = gp.searchWord()

    const [hasResults, setHasResults] = useState(false)
    const [results, setResults] = useState("")

    useEffect(() => {
        //Alert.alert(id_product)
        const unsubscribe = navigation.addListener('focus', ()=>{
            fetch('https://quickscan.asyncspot.com/app/models/TG/BS.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                action: 'searchWord',
                id_user: user,
                search: searchWord
            })
        }).then((response) => response.json())
            .then((responseJson) => {
                //Alert.alert(responseJson)
                if (responseJson.success == 1) {
                    setHasResults(true)
                    setResults(responseJson.data)
                    //console.log(responseJson.data)
                }
            }).catch((error) => {
                console.error(error)
            })
        })
        
        return unsubscribe
    });


    function FavoritoContratar(item) {

        const id_product = item.id;
        Alert.alert(
            "¿Desea añadir a favoritos o contratar el Bien/Servicio?",
            "",
            [
                {
                    text: "Añadir a favoritos",
                    onPress: () => {
                        fetch('https://quickscan.asyncspot.com/app/models/TG/BS.php', {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                action: 'addFavorite',
                                id_user: user,
                                idProduct: id_product
                            })
                        }).then((response) => response.text())
                            .then((responseJson) => {
                                //Alert.alert(responseJson)
                                if (responseJson.success == 1) {
                                    Alert.alert(responseJson.msg)
                                    //console.log(responseJson.data)
                                } else {
                                    Alert.alert(responseJson.msg)
                                }
                            }).catch((error) => {
                                console.error(error)
                            })
                    }
                },
                {
                    text: "Contratar",
                    onPress: () => {
                        var params = {
                            action: 'addProduct',
                            id_user: user,
                            id_bien: id_product
                        }
                        fetch('https://quickscan.asyncspot.com/app/models/TG/reservas.php', {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(params)
                        }).then((response) => response.json())
                            .then((responseJson) => {
                                //Alert.alert(responseJson)
                                if (responseJson.success == 1) {
                                    Alert.alert(responseJson.msg)
                                    //console.log(responseJson.data)
                                } else {
                                    Alert.alert(responseJson.msg)
                                }
                            }).catch((error) => {
                                console.error(error)
                            })
                    }
                },
                {
                    text: 'Cancelar',
                    style: 'cancel'
                }
            ]);
    }

    if (hasResults) {
        return (
            <View >
                <FlatList
                    data={results}
                    renderItem={({ item }) => (
                        <Pressable onPress={FavoritoContratar.bind(this, item)}>
                            <PostResult post={item} />
                        </Pressable>
                    )}
                >

                </FlatList>
            </View>
        );
    } else {
        return (
            <View style={{
                marginTop: 30,
                height: '100%',
                width: '100%',
                justifyContent: "center",
                alignItems: "center"
            }}
            >
                <View style={{ alignItems: 'flex-end', height: '10%', justifyContent: 'center' }}>
                    <Pressable onPress={() => navigation.navigate('Search Place')} style={{
                        backgroundColor: '#fff',
                        width: 200, marginHorizontal: 25, height: 40, borderRadius: 10, justifyContent: 'center',
                        alignItems: "center", marginTop: 20, marginBottom: 0, borderWidth: 1, borderColor: 'darkorange'
                    }}
                    >
                        <Text style={{ fontSize: 16, fontWeight: "bold" }}>Volver a buscar</Text>
                    </Pressable>
                </View>
                <View >
                    <Text style={{ fontSize: 17, marginTop: 20 }}>Su búsqueda no arrojó ningún resultado</Text>
                </View>
            </View>
        );
    }

};

export default SearchResultScreen;
