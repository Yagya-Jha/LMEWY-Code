import AppLoading from 'expo-app-loading';
import * as React from 'react';
import {Text, TouchableOpacity, KeyboardAvoidingView, Image, View,Platform,Dimensions, StatusBar, TextInput, Alert, StyleSheet, ScrollView, FlatList, Touchable} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Font from 'expo-font';
import firebase from 'firebase'
import db from '../Config';
import ResolveDoubt from './ResolveDoubt'

let custom_font = {'customfont':require('../assets/customFont/WhaleITriedRegular.ttf')}

export default class HelpingHand extends React.Component{
    constructor(){
        super();
        this.state = {fontLoaded: false, doubts: []};
    }

    async loadFonts(){
        await Font.loadAsync(custom_font);
        this.setState({fontLoaded: true});
    }

    getDoubtData = ()=>{
        let doubtref = db.collection("Doubts").onSnapshot((snapshot)=>{
            let doubtlist = snapshot.docs.map(document => document.data())
            this.setState({doubts: doubtlist});
        });
    }

    componentDidMount(){
        this.loadFonts();
        this.getDoubtData();
    }

    keyextractor = (item, index)=> index.toString();

    renderItem({item}){
        return(
            <View style = {{marginTop: 20}}>
                <Text style = {{fontSize:23, fontFamily: 'customfont'}}>{item.doubt}</Text>
                <TouchableOpacity
                    style = {{backgroundColor: 'lightgray',alignSelf: 'center', width: '50%'}}
                        onPress = {()=>{this.props.navigation.navigate('ResolveDoubtScreen', {doubt: "5 + 5"})}}>
                        <Text style = {{fontSize:25, fontFamily: 'customfont'}}>+answer</Text>
                </TouchableOpacity>
            </View>
        );
    }

    fetchMoredoubts = async()=>{

    }
    render(){
        if(! this.state.fontLoaded){
            return <AppLoading />
        }else{
            console.log(this.props.navigation);
          return(
            <View style = {styles.container}>
                <View style = {styles.topcontainer}>
                    <SafeAreaView style = {styles.safeview}/>
                    <Text style = {styles.appTitleText}>Learning Made Easy With Yagya</Text>
                    <Text style = {styles.title}>Helping Hand</Text>
                    <TouchableOpacity style = {styles.aad} onPress = {()=> this.props.navigation.navigate('PostDoubtScreen')}>
                        <Text style = {{fontSize: RFValue(18),color: '#03006b', fontFamily: 'customfont'}}>Ask a doubt</Text>
                    </TouchableOpacity>
                </View>
                <View style = {styles.discussion}>
                    <Text style = {{fontSize:20, fontFamily: 'customfont'}}>Doubts:</Text>
                    <FlatList 
                    keyExtractor = {this.keyextractor}
                    data = {this.state.doubts}
                    renderItem = {this.renderItem}
                    refreshing = {true}
                    />
                </View>
            </View>
    );
}
}
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        alignSelf: 'center'
    },
    discussion:{
        width: '100%',
        height:'100%',
        backgroundColor: 'white',
    },
    topcontainer: {
        backgroundColor: 'skyblue',
        justifyContent: "center",
        alignItems:"center",
        width: '100%',
        height: '35%'
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
        fontSize: RFValue(35),
        fontFamily: 'customfont',
    },
    aad: {
        backgroundColor: 'white',
        marginTop: 50,
        bottom: 30,
        alignItems: 'center',
        width: '85%',
        borderRadius: 30,
        height: RFValue(30)
    },
});