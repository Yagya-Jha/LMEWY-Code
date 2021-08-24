import AppLoading from 'expo-app-loading';
import * as React from 'react';
import {Text, TouchableOpacity, KeyboardAvoidingView, Image, View,Platform,Dimensions, StatusBar, TextInput, Alert, StyleSheet, ScrollView, FlatList} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Font from 'expo-font';
import db from '../Config';

let custom_font = {'customfont':require('../assets/customFont/WhaleITriedRegular.ttf')}

export default class ResolveDoubt extends React.Component{
    constructor(){
        super();
        this.state = {fontLoaded: false, answer: ''};
    }

    async loadFonts(){
        await Font.loadAsync(custom_font);
        this.setState({fontLoaded: true});
    }

    componentDidMount(){
        this.loadFonts();
    }

    render(){
        if(! this.state.fontLoaded){
            return <AppLoading />
        }else{
            let data = this.props.route.params.doubt;
            console.log(data);
            return(
                <View style = {styles.container}>
                    <SafeAreaView style = {styles.safeview}/>
                        <Text style = {styles.appTitleText}>Learning Made Easy With Yagya</Text>
                        <Text style = {styles.title}>Resolve Doubt</Text>
                        <View style = {styles.ques}>
                            <Text style = {{fontSize: RFValue(55), fontFamily: 'customfont', marginTop: 15, bottom: 5}}>{data}</Text>
                        </View>
                        <View>
                            <TextInput textAlign = "center" style = {styles.textInputStyle} placeholder = 'Answer' onChangeText = {(text)=>{this.setState({answer: text})}}></TextInput>
                        </View>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'skyblue',
        justifyContent: "center",
        alignItems:"center",
    },
    safeview: {
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
    },
    appTitleText: {
        fontSize: RFValue(30),
        fontFamily: 'customfont',
        textAlign: 'center'
    },
    title: {
        marginTop: 15,
        fontSize: RFValue(25),
        fontFamily: 'customfont',
    }
});