import React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import HomeTab from './hometabN';
import InicioScreen from '../screens/inicio';
import RegistrarUsuarioScreen from '../screens/registrar';

const Stack= createStackNavigator();

//Aca se tiene el HOMETAB (barra de abajo), SearchPlaceScreen (barra de arriba lleva a otra screen) 
// y SearchFilterScreen despues de esto lleva a los filtros de busqueda
const Router = () =>{
    return(
        <NavigationContainer>
            <Stack.Navigator>

            <Stack.Screen name={"Inicio"}
                    component={InicioScreen}
                    options={{
                    headerShown:false,
                }}>
            </Stack.Screen>

            <Stack.Screen name={"Registrarme"}
                component={RegistrarUsuarioScreen}
                options={{
                    title: "Crear cuenta",
                }}>
            </Stack.Screen>

                
                {/*Con esto se crea cada screen */}

                <Stack.Screen name={"Home"}
                    component={HomeTab}
                    options={{
                        headerShown:false,
                    }}>
                </Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Router;