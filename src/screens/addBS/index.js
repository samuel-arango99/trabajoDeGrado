//Agregar un bien/servicio
import React, { useState } from 'react';
import { TextInput, View, Button, Alert } from 'react-native';
import styles from './styles.js';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useNavigation } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import gp from '../../../assets/data/session.js'

const AgregarBienServicio = (props) => {

    const user = gp.userId();
    

    const navigation = useNavigation();
    const [type, setType] = useState("")
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [state, setState] = useState("")
    const [category, setCategory] = useState("")

    function addBS(tipo, nombre, desc, precio, categoria, estado) {

        var params = {
            type: tipo,
            name: nombre,
            description: desc,
            price: precio,
            category: categoria,
            state: estado,
            user: user,
            action: 'add'
        }

        fetch('https://quickscan.asyncspot.com/app/models/TG/BS.php', {
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
                    navigation.navigate('BS')
                } else {
                    Alert.alert(responseJson.msg)
                    navigation.navigate('AddBS')
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
            <View style={styles.container}>
                <View style={styles.row}>
                    {/*  <View>
                        <Text style={styles.title}>¿Es un bien ó un servicio?</Text>
                        <Text style={styles.subtitle}>Seleccione solo una opción</Text>
                    </View> */}
                    <View style={styles.values}>
                        <DropDownPicker
                            placeholder="¿Es un bien o un servicio?"
                            items={[
                                { label: 'Bien', value: 'Bien' },
                                { label: 'Servicio', value: 'Servicio' },
                            ]}
                            defaultValue={null}
                            containerStyle={{ height: 40, width: '100%' }}
                            style={{ backgroundColor: 'white', textAlign: 'center' }}
                            itemStyle={{
                                justifyContent: 'flex-start'
                            }}
                            dropDownStyle={{ backgroundColor: '#fafafa' }}
                            onChangeItem={item => setType(item.value)}
                        />
                    </View>
                </View>
                <View style={styles.row}>
                    {/* <View>
                        <Text style={styles.title}>Nombre</Text>
                        <Text style={styles.subtitle}>del Bien/servicio</Text>
                    </View> */}
                    <View style={styles.values}>
                        <TextInput style={styles.datos}
                            placeholder="Nombre del bien/servicio"
                            placeholderTextColor="grey"
                            onChangeText={nombre => setName(nombre)}>
                        </TextInput>
                    </View>
                </View>
                <View style={styles.row}>
                    {/*  <View>
                        <Text style={styles.title}>¿A que categoria pertenece?</Text>
                        <Text style={styles.subtitle}>Seleccione solo una opción</Text>
                    </View> */}
                    <View style={styles.values2}>
                        <DropDownPicker
                            placeholder="¿A que categoría pertenece?"
                            items={[
                                { label: 'Bien', value: 'Bien' },
                                { label: 'Movilidad', value: 'Movilidad' },
                                { label: 'Hogar', value: 'Hogar' },
                                { label: 'Vueltas', value: 'Vueltas' },
                                { label: 'Educación', value: 'Educación' },
                                { label: 'Mascotas', value: 'Mascotas' },
                                { label: 'Servicio tecnico', value: 'Servicio técnico' },
                                { label: 'Salud', value: 'Salud' },
                                { label: 'Cocina', value: 'Cocina' },
                                { label: 'Otro', value: 'Otro' }
                            ]}

                            defaultValue={null}
                            containerStyle={{ height: 40, width: '100%' }}
                            style={{ backgroundColor: 'white' }}
                            itemStyle={{
                                justifyContent: 'flex-start'
                            }}
                            dropDownStyle={{ backgroundColor: '#fafafa' }}
                            onChangeItem={item => setCategory(item.value)}
                        />
                    </View>
                </View>
                <View style={styles.row}>
                    {/*  <View>
                        <Text style={styles.title}>Descripción</Text>
                        <Text style={styles.subtitle}>del Bien/servicio</Text>
                    </View> */}
                    <View style={styles.values}>
                        <TextInput style={styles.datos2}
                            placeholder="Descripción de bien/servicio"
                            placeholderTextColor="grey"
                            multiline
                            onChangeText={desc => setDescription(desc)}>
                        </TextInput>
                    </View>
                </View>

                <View style={styles.row}>
                    {/* <View>
                        <Text style={styles.title}>Precio</Text>
                        <Text style={styles.subtitle}>del Bien/servicio</Text>
                    </View> */}
                    <View style={styles.values}>
                        <TextInput style={styles.datos}
                            placeholder="Precio de bien/servicio"
                            placeholderTextColor="grey"
                            keyboardType="numeric"
                            onChangeText={precio => setPrice(precio)}
                        >
                        </TextInput>
                    </View>
                </View>

                <View style={styles.row}>
                    {/* <View>
                        <Text style={styles.title}>¿Está actualmente disponbible?</Text>
                    </View> */}
                    <View style={styles.values}>
                        <DropDownPicker
                            items={[
                                { label: 'Si', value: 'Disponible' },
                                { label: 'No', value: 'Nodisponible' },
                            ]}
                            placeholder="¿Está actualmente disponbible?"
                            defaultValue={null}
                            containerStyle={{ height: 40, width: '100%' }}
                            style={{ backgroundColor: 'white' }}
                            itemStyle={{
                                justifyContent: 'flex-start'
                            }}
                            dropDownStyle={{ backgroundColor: '#fafafa' }}
                            onChangeItem={item => setState(item.value)}
                        />
                    </View>
                </View>

                <View style={styles.contbutton}>
                    <Button
                        onPress={addBS.bind(this, type, name, description, price, category, state)}
                        title='Agregar Bien/Servicio'
                        color='darkorange'
                    //style={styles.button}
                    >
                        {/*<Text style={styles.textbtn}>Agregar Bien/Servicio</Text>*/}
                    </Button>
                </View>
            </View>
        </KeyboardAwareScrollView>
    );
};
export default AgregarBienServicio;
