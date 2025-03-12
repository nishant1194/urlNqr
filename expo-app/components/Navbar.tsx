import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';

export default function Navbar() {
  return (
    <View
      className="my-[50] flex flex-row items-center justify-between p-4 bg-white rounded-lg w-[100vw]"
      style={{
        elevation: 3, 
        shadowColor: 'black',  
        shadowOffset: { width: 0, height: 8 },  
        shadowOpacity: 0.3,  
        shadowRadius: 4, 
      }}>
      <Text className="text-3xl font-bold">Short.ly</Text>
      <TouchableOpacity className="rounded-3xl bg-black px-6 py-3">
        <Text className="text-base font-extrabold font-bold text-white">ABOUT ME</Text>
      </TouchableOpacity>
    </View>
  );
}
