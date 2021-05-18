import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import BienServicioScreen from '../screens/BS';
import AgregarBienServicio from '../screens/addBS';
import CambiarDatosBSScreen from '../screens/cambiardatosBS';
import SolicitudServicioScreen from '../screens/solicitudservicio';
import DarCalificacionScreen from '../screens/darcalificacion'



//Por defecto muesta BienServicioDefaultScreen, pero tambien muestra los resultados (BSPrestadotabN)

const Stack=createStackNavigator();

const Router = () =>{
    return(
        <Stack.Navigator>
            <Stack.Screen name={"BS"}
                    component={BienServicioScreen}
                    options={{
                        headerShown:false,
                    }}>
            </Stack.Screen>

            <Stack.Screen name={"AddBS"}
                    component={AgregarBienServicio}
                    options={{
                        title: "Agregar bien/servicio que desea prestar"
                    }}>
            </Stack.Screen>

            <Stack.Screen name={"EditBS"}
                    component={CambiarDatosBSScreen}
                    options={{
                        title: "Realice los cambios que desee"
                    }}>
            </Stack.Screen>

            <Stack.Screen name={"SolicitudBS"}
                    component={SolicitudServicioScreen}
                    options={{
                        title: "Seleccione la solicitud"
                    }}>
            </Stack.Screen>

            <Stack.Screen name={"CalificarESPECIFICOusuario"} 
                    component={DarCalificacionScreen}
                    options={{
                        title:'Ingrese la calificación',
                    }}
            >
            </Stack.Screen>

        </Stack.Navigator>
    );
};

export default Router;