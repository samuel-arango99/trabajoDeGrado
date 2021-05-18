import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/home';
import SearchResultScreen from '../screens/searchresult';
import SearchPlaceScreen from '../screens/searchplace';

//Por defecto muesta Pagina de inicio, pero tambien muestra los resultados (SearchResultTabN)
//Si paso de los resultados y me devuelvo, vuelvo a la pagina de inicio

const Stack=createStackNavigator();

const Router = () =>{
    return(
        <Stack.Navigator>
            <Stack.Screen name={"Home"} //antes decia inicio, por si se daña
                    component={HomeScreen}
                    options={{
                        headerShown: false
                    }}
            >
            </Stack.Screen>

            <Stack.Screen name={"Search Place"}
                    component={SearchPlaceScreen}
                    options={{
                        title: "Buscar bien/servicio"
                    }}>
            </Stack.Screen>

            <Stack.Screen name={'SearchResults'}
                component={SearchResultScreen}
                options={{
                    title:'Escoge tu bien/servicio a contratar',
                }}>  
                </Stack.Screen>

            
        </Stack.Navigator>
    );
};

export default Router;