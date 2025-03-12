import { View, Text, TouchableOpacity, TextInput, Button,Linking } from 'react-native';
import React, { useState } from 'react';
import * as Clipboard from "expo-clipboard";

import Navbar from 'components/Navbar';
import axios from 'axios';

export default function Home() {
  const [originalUrl, setOriginal] = useState('');
  const [addUrl, setAddUrl] = useState(false);
  const [customUrl, setCoustomUrl] = useState('');
  const [shortUrlll, setshortUrlll] = useState('');

  const shortenLink = async()=>{
    try {
        const resp = await axios.post("http://192.168.191.141:8000/api/url/shorten",{originalUrl});
        setshortUrlll(resp.data.shortUrl);
        setOriginal("");
    } catch (error) {
        console.log(error)
    }

  }

  const copyToClipboard = async (text:string) => {
    await Clipboard.setStringAsync(text);
    console.log("object")
    
  };

  return (
    <View className=" ">
      <Navbar />

      <Text className="mt-[6vh] text-center text-4xl font-extrabold text-gray-900">
        Free Link Shortener
      </Text>

      <View className="m-6 mt-[5vh] max-w-md rounded-lg bg-white p-6 shadow-xl">
        <Text className="text-xl font-semibold text-gray-700">Paste the link here</Text>
        <View className="mt-3 flex flex-row items-center justify-between rounded-2xl bg-gray-100 p-2">
          <TextInput
            value={originalUrl}
            onChangeText={(newText) => setOriginal(newText)}
            placeholder="Enter your link"
            className=" "
          />
          <TouchableOpacity className="rounded-lg bg-green-700 px-4 py-3" onPress={shortenLink} >
            <Text className="text-center text-lg font-semibold text-white">Shorten</Text>
          </TouchableOpacity>
        </View>
        {!addUrl && (
          <TouchableOpacity
            onPress={() => {
              setAddUrl(!addUrl);
            }}>
            <Text className="mt-3">Add custom url</Text>
          </TouchableOpacity>
        )}
        {addUrl && (
          <View className="mt-4 flex flex-row items-center justify-between">
            <Text> Write Custome Url here</Text>
            <TouchableOpacity
              onPress={() => {
                setAddUrl(!addUrl);
              }}>
              <Text className="mt-3">Close</Text>
            </TouchableOpacity>
          </View>
        )}

        {addUrl && (
          <View className="mt-3 flex flex-row items-center justify-between rounded-2xl bg-gray-100 p-2">
            <TextInput
              value={customUrl}
              onChangeText={(newText) => setCoustomUrl(newText)}
              placeholder="Enter custom url here"
              className=" "
            />
          </View>
        )}
        {shortUrlll && (
          <View className="mt-3 flex flex-row items-center justify-between rounded-2xl p-2">
            <Text  onPress={() => Linking.openURL(`https://url-nqr.vercel.app/`+shortUrlll)}>{`https://url-nqr.vercel.app/`+shortUrlll}</Text>
            <TouchableOpacity className="bg-black rounded-3xl px-4 py-3" onPress={() => copyToClipboard(`https://url-nqr.vercel.app/` + shortUrlll)}
            >
            <Text className="text-center text-lg  font-semibold text-white">Copy</Text>
          </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}
