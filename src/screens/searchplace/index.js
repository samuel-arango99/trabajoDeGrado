import React, { useEffect, useState } from 'react';
import { Text, TextInput, View, Pressable, FlatList, Button, Alert } from 'react-native';
import styles from './styles.js';
import { useNavigation } from '@react-navigation/native';
import gp from '../../../assets/data/session.js'

const SearchPlaceScreen = () => {

    const [inputText, setInputText] = useState('');
    const user = gp.userId();

    const navigation = useNavigation();
    const [hasHistory, setHasHistory] = useState(false)
    const [history, setHistory] = useState("")

    function addSearchWordToHistory(search) {

        fetch('https://quickscan.asyncspot.com/app/models/TG/users.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: user,
                action: 'addSearchHistory',
                word: search
            })
        }).then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.success == 1) {
                    gp.searchWord(search)
                    navigation.navigate('SearchResults')
                } else {
                    Alert.alert(responseJson.msg)
                }
            }).catch((error) => {
                console.error(error)
            })
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            fetch('https://quickscan.asyncspot.com/app/models/TG/users.php', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user: user,
                    action: 'searchHistory'
                })
            }).then((response) => response.json())
                .then((responseJson) => {
                    if (responseJson.success == 1) {
                        setHasHistory(true)
                        setHistory(responseJson.data)
                    }
                }).catch((error) => {
                    console.error(error)
                })
        })

        return unsubscribe
    })

    if (hasHistory) {
        return (
            <View style={styles.container}>
                <View style={{ height: '93%' }}>
                    <TextInput style={styles.textinput}
                        placeholder="¿Que bien/servicio desea contratar?"
                        placeholderTextColor='grey'
                        value={inputText}
                        onChangeText={text => setInputText(text)}>
                    </TextInput>

                    <FlatList
                        data={history} //Aca debe mostrar es el historial de busqueda
                        renderItem={({ item }) => (
                            <Pressable
                                onPress={() => {
                                    gp.searchWord(item.texto)
                                    navigation.navigate('SearchResults')
                                }}
                                style={styles.row}
                            >
                                <Text style={styles.locationtext}>{item.texto}</Text>
                            </Pressable>
                        )}
                    >
                    </FlatList>
                </View>
                <View style={{ height: 50, marginHorizontal: 10 }}>
                    <Button
                        onPress={addSearchWordToHistory.bind(this, inputText)}
                        title='Buscar'
                        color='darkorange'
                    >
                    </Button>
                </View>
            </View>

        );
    } else {
        return (
            <View style={styles.container}>
                <View style={{ height: '93%' }}>
                    <TextInput style={styles.textinput}
                        placeholder="¿Que bien/servicio desea contratar?"
                        placeholderTextColor='grey'
                        value={inputText}
                        onChangeText={text => setInputText(text)}>
                    </TextInput>
                </View>
                <View style={{ height: 50, marginHorizontal: 10 }}>
                    <Button
                        onPress={addSearchWordToHistory.bind(this, inputText)}
                        title='Buscar'
                        color='darkorange'
                    >
                    </Button>
                </View>
            </View>

        );
    }
};

export default SearchPlaceScreen;
