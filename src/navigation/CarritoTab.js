import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import CarritoScreen from '../screens/carrito';



//Por defecto muesta Pagina de inicio, pero tambien muestra los resultados (SearchResultTabN)
//Si paso de los resultados y me devuelvo, vuelvo a la pagina de inicio

const Stack=createStackNavigator();

const Router = () =>{
    return(
        <Stack.Navigator>
            <Stack.Screen name={"Carrito"} 
                    component={CarritoScreen}
                    options={{
                        headerShown: false
                    }}
            >
            </Stack.Screen>


        </Stack.Navigator>
    );
};

export default Router;