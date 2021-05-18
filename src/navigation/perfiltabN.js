import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PerfilScreen from '../screens/perfil';
import TarjetasScreen from '../screens/Tarjetas';
import AddTarjetasScreen from '../screens/addTarjeta';
import CambiarDatosTarjetaScreen from '../screens/cambiardatosTC';
import NotificacionesScreen from '../screens/notificacion';
import DarCalificacionScreen from '../screens/darcalificacion';
import CambiarDatosUsuarioScreen from '../screens/cambiardatosUSUARIO';



//Por defecto muesta Pagina de inicio, pero tambien muestra los resultados (SearchResultTabN)
//Si paso de los resultados y me devuelvo, vuelvo a la pagina de inicio

const Stack=createStackNavigator();

const Router = () =>{
    return(
        <Stack.Navigator>
            <Stack.Screen name={"perfil"} 
                    component={PerfilScreen}
                    options={{
                        headerShown: false
                    }}
            >
            </Stack.Screen>

            {/*Agregar datos de tarjeta*/}
            <Stack.Screen name={"tajeta"} 
                    component={TarjetasScreen}
                    options={{
                        title:'Sus tarjetas de crédito',
                    }}
            >
            </Stack.Screen>

            <Stack.Screen name={"addtajeta"} 
                    component={AddTarjetasScreen}
                    options={{
                        title:'Ingrese los datos',
                    }}
            >
            </Stack.Screen>

            <Stack.Screen name={"Edittarjeta"} 
                    component={CambiarDatosTarjetaScreen}
                    options={{
                        title:'Ingrese los datos',
                    }}
            >
            </Stack.Screen>

            {/*Notificaciones */}       
            <Stack.Screen name={"notificaciones"} 
                    component={NotificacionesScreen}
                    options={{
                        title:'Historial de notificaciones',
                    }}
            >
            </Stack.Screen>
                
            {/*Cambiar datos de usuario*/}
            <Stack.Screen name={"CambiardatosU"} 
                    component={CambiarDatosUsuarioScreen}
                    options={{
                        title:'Realice los cambios que desee',
                    }}
            >
            </Stack.Screen>
        </Stack.Navigator>
    );
};

export default Router;