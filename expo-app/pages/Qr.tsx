import { View, Text, TouchableOpacity, TextInput, Image, Alert } from 'react-native';
import React, { useState } from 'react';
import * as Clipboard from 'expo-clipboard';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import * as Sharing from 'expo-sharing';
import Navbar from 'components/Navbar';
import axios from 'axios';

export default function Qr() {
  const [text, setText] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();

  const generateQRCode = async () => {
    try {
      const response = await axios.post('http://192.168.191.141:8000/api/qr/generate', { text });
      setQrCode(response.data.qrCode);  
      console.log("object")
    } catch (error) {
      console.log('Error generating QR Code:', error);
    }
  };

  const saveQRCodeToFile = async () => {
    if (!qrCode.startsWith('data:image')) {
      Alert.alert('Error', 'Invalid QR code format');
      return null;
    }

    try {
      const filename = `${FileSystem.documentDirectory}qrcode.png`;
      const base64Data = qrCode.split(',')[1]; // Extract Base64 content
      await FileSystem.writeAsStringAsync(filename, base64Data, { encoding: FileSystem.EncodingType.Base64 });
      return filename;
    } catch (error) {
      console.log('Error saving QR Code:', error);
      Alert.alert('Error', 'Failed to save QR Code.');
      return null;
    }
  };

  const downloadQRCode = async () => {
    const fileUri = await saveQRCodeToFile();
    if (!fileUri) return;

    try {
      if (!permissionResponse?.granted) {
        const permission = await requestPermission();
        if (!permission.granted) {
          Alert.alert('Permission Denied', 'Allow access to save the QR code.');
          return;
        }
      }

      await MediaLibrary.saveToLibraryAsync(fileUri);
      Alert.alert('Success', 'QR Code saved to gallery!');
    } catch (error) {
      console.log('Error downloading QR Code:', error);
      Alert.alert('Error', 'Failed to download QR Code.');
    }
  };

  const shareQRCode = async () => {
    const fileUri = await saveQRCodeToFile();
    if (!fileUri) return;

    try {
      if (!(await Sharing.isAvailableAsync())) {
        Alert.alert('Error', 'Sharing is not available on this device');
        return;
      }
      await Sharing.shareAsync(fileUri);
    } catch (error) {
      console.log('Error sharing QR Code:', error);
      Alert.alert('Error', 'Failed to share QR Code.');
    }
  };

  return (
    <View className="flex min-h-screen bg-gray-100 p-4">
      <Navbar />
      <Text className="mt-6 text-center text-4xl font-extrabold text-gray-900">
        Free QR Generator
      </Text>

      <View className=" mt-6 w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
        <Text className="text-xl font-semibold text-gray-700">Paste the link here</Text>

        <View className="mt-3 flex flex-row items-center justify-between rounded-2xl bg-gray-100 p-2">
          <TextInput
            value={text}
            onChangeText={(newText) => setText(newText)}
            placeholder="Enter your link"
            className="flex-1 p-3 text-lg"
          />
        </View>

        <TouchableOpacity className="mt-4 rounded-lg bg-green-700 px-4 py-3" onPress={generateQRCode}>
          <Text className="text-center text-lg font-semibold text-white">Generate QR</Text>
        </TouchableOpacity>

        {qrCode ? (
          <View className="mt-6 flex items-center">
            <Image source={{ uri: qrCode }} className="h-40 w-40 rounded-lg" />

            <TouchableOpacity className="mt-4 bg-gray-700 px-4 py-3 rounded-lg" onPress={downloadQRCode}>
              <Text className="text-white text-lg font-semibold">Download QR</Text>
            </TouchableOpacity>

            <TouchableOpacity className="mt-4 bg-blue-600 px-4 py-3 rounded-lg" onPress={shareQRCode}>
              <Text className="text-white text-lg font-semibold">Share QR</Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    </View>
  );
}
