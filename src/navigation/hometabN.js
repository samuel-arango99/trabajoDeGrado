import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import buscartab from './buscartabN';
import BStab from './BStabN';
import favoritotab from './favoritotabN';
import perfiltab from './perfiltabN';
import CarritoTab from './CarritoTab';

import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';

//Barra de abajo
//En Buscar.. se trabja con buscartab
const Tab = createBottomTabNavigator();

const HomeTab = () =>{
    return(
        <Tab.Navigator tabBarOptions={{
            activeTintColor:'darkorange'
        }}>
            <Tab.Screen
                name="Buscar"
                component={buscartab}
                options={{
                    tabBarIcon: ({color}) => (
                        <Fontisto name="search" size={25} color={color} />
                    )
                }}
            ></Tab.Screen>
            <Tab.Screen
                name="Favoritos"
                component={favoritotab}
                options={{
                    tabBarIcon: ({color}) => (
                        <FontAwesome name="heart-o" size={25} color={color} />
                    )
                }}
            ></Tab.Screen>
            <Tab.Screen
                name="Bien/Servicio"
                component={BStab}
                options={{
                    tabBarIcon: ({color}) => (
                        <Octicons name="tools" size={25} color={color} /> 
                    )
                }}
            ></Tab.Screen>
            <Tab.Screen
                name="Carrito"
                component={CarritoTab}
                options={{
                    tabBarIcon: ({color}) => (
                        <AntDesign name="shoppingcart" size={25} color={color} />
                    )
                }}
            ></Tab.Screen>
            <Tab.Screen
                name="Perfil"
                component={perfiltab}
                options={{
                    tabBarIcon: ({color}) => (
                        <EvilIcons name="user" size={25} color={color} />
                    )
                }}
            ></Tab.Screen>
        </Tab.Navigator>
    );
};

export default HomeTab;