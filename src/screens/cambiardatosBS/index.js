//Agregar un bien/servicio
import React, { useState, useEffect } from 'react';
import { TextInput, View, Button, Alert } from 'react-native';
import styles from './styles.js';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import gp from '../../../assets/data/session.js'
import { useNavigation } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';

const CambiarDatosBSScreen = () => {

    const navigation = useNavigation();
    const id_product = gp.productId();
    const user = gp.userId();

    const [nombre, setNombre] = useState("")
    const [cat, setCat] = useState("")
    const [desc, setDesc] = useState("")
    const [price, setPrice] = useState("")
    const [state, setState] = useState("")

    const [newNombre, setNewNombre] = useState("")
    const [newCat, setNewCat] = useState("")
    const [newDesc, setNewDesc] = useState("")
    const [newPrice, setNewPrice] = useState("")
    const [newState, setNewState] = useState("")

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
                action: 'searchId',
                id: id_product
            })
        }).then((response) => response.json())
            .then((responseJson) => {
                //Alert.alert(responseJson)
                if (responseJson.success == 1) {
                    setNombre(responseJson.name)
                    setCat(responseJson.category)
                    setDesc(responseJson.description)
                    setPrice(responseJson.price)
                    setState(responseJson.state)
                    //console.log(responseJson.data)
                }
            }).catch((error) => {
                console.error(error)
            })
        })

        return unsubscribe
    });

    function editBS(name, category, description, newPrice, newState) {

        if (name == "") {
            name = nombre;
        }
        if (category == "") {
            category = cat
        }
        if (description == "") {
            description = desc
        }
        if (newPrice == "") {
            newPrice = price
        }
        if (newState == "") {
            newState = state
        }
        //Alert.alert(newState)
        fetch('https://quickscan.asyncspot.com/app/models/TG/BS.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                action: 'edit',
                id: id_product,
                name: name,
                category: category,
                description: description,
                price: newPrice,
                state: newState
            })
        }).then((response) => response.json())
            .then((responseJson) => {
                //Alert.alert(responseJson)
                if (responseJson.success == 1) {
                    Alert.alert(responseJson.msg)
                    gp.productId("")
                    navigation.goBack()
                    //console.log(responseJson.data)
                } else {
                    Alert.alert(responseJson.msg);
                }
            }).catch((error) => {
                console.error(error)
            })
    }

    return (
        <KeyboardAwareScrollView
            style={{ backgroundColor: 'white' }}
            resetScrollToCoords={{ x: 0, y: 0 }}
            //contentContainerStyle={styles.container}
            enableOnAndroid={true}
            enableAutomaticScroll={(Platform.OS === 'ios')}
        //scrollEnabled={false}
        >
            <View>
                <View style={styles.row}>
                    <View style={styles.values}>
                        <TextInput style={styles.datos}
                            placeholder={nombre}
                            placeholderTextColor="grey"
                            onChangeText={(n) => setNewNombre(n)}
                        >
                        </TextInput>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.values2}>
                        <DropDownPicker
                            placeholder={cat}
                            items={[
                                { label: 'Bien', value: 'Bien' },
                                { label: 'Movilidad', value: 'Movilidad' },
                                { label: 'Hogar', value: 'Hogar' },
                                { label: 'Vueltas', value: 'Vueltas' },
                                { label: 'Educación', value: 'Educación' },
                                { label: 'Mascotas', value: 'Mascotas' },
                                { label: 'Servicio técnico', value: 'Servicio técnico' },
                                { label: 'Salud', value: 'Salud' },
                                { label: 'Cocina', value: 'Cocina' },
                                { label: 'Otro', value: 'Otro' },
                            ]}

                            defaultValue={cat}
                            containerStyle={{ height: 40, width: '100%' }}
                            style={{ backgroundColor: 'white' }}
                            itemStyle={{
                                justifyContent: 'flex-start'
                            }}
                            dropDownStyle={{ backgroundColor: '#fafafa' }}
                            onChangeItem={(item) => setNewCat(item)}
                        />
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.values}>
                        <TextInput style={styles.datos2}
                            //multiline={true}
                            textAlignVertical='top'
                            placeholder={desc}
                            placeholderTextColor="grey"
                            onChangeText={des => setNewDesc(des)}>
                        </TextInput>
                    </View>
                </View>

                <View style={styles.row}>
                    <View style={styles.values}>
                        <TextInput style={styles.datos}
                            placeholder={price}
                            placeholderTextColor="grey"
                            keyboardType="numeric"
                            onChangeText={p => setNewPrice(p)}
                        >
                        </TextInput>
                    </View>
                </View>

                <View style={styles.row}>
                    <View style={styles.values}>
                        <DropDownPicker
                            items={[
                                { label: 'Sí', value: 'Disponible' },
                                { label: 'No', value: 'Nodisponible' },
                            ]}
                            placeholder={state}
                            defaultValue={state}
                            containerStyle={{ height: 40, width: '100%' }}
                            style={{ backgroundColor: 'white' }}
                            itemStyle={{
                                justifyContent: 'flex-start'
                            }}
                            dropDownStyle={{ backgroundColor: '#fafafa' }}
                            onChangeItem={i => setNewState(i)}
                        />
                    </View>
                </View>

                <View style={styles.contbutton}>
                    <Button
                        onPress={editBS.bind(this, newNombre, newCat, newDesc, newPrice, newState)}
                        title='Guardar cambios'
                        color='darkorange'
                    >
                    </Button>
                </View>
            </View>
        </KeyboardAwareScrollView>
    );
};
export default CambiarDatosBSScreen;
