import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Router from './src/navigation/router';

export default function App() {
  return ( 
    <>
      <StatusBar barStyle="dark-content"/>
      <Router></Router>
    </>
  );
};