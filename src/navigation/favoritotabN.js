import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import FavoritosScreen from '../screens/favoritos';


//Por defecto muesta BienServicioDefaultScreen, pero tambien muestra los resultados (BSPrestadotabN)

const Stack=createStackNavigator();

const Router = () =>{
    return(
        <Stack.Navigator>
            {/*
            <Stack.Screen name={"FavoritosTOP"}
                    component={FavortioTTab}
                    options={{
                        headerShown:false,
                    }}>
            </Stack.Screen>
            */}

            <Stack.Screen name={"Favoritos"}
                    component={FavoritosScreen}
                    options={{
                        headerShown:false,
                    }}>
            </Stack.Screen>

            

            
        </Stack.Navigator>
    );
};

export default Router;