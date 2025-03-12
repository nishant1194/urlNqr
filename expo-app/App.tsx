 import { StatusBar } from 'expo-status-bar';
import {View ,Text} from 'react-native'

import './global.css';
import Home from 'pages/Home';
import Qr from 'pages/Qr';
import QrScanner from 'pages/QrScanner';

export default function App() {
  return (
    <>
       <Home />
       {/* <Qr /> */}
       {/* <QrScanner /> */}
     </>
  );
}
