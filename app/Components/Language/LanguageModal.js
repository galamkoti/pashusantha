import { View, Text, Modal, StyleSheet, FlatList, TouchableOpacity, Image, Dimensions,Platform } from 'react-native'
import React, { useState } from 'react'

const {height,width}=Dimensions.get('window');
const LanguageModal = ({langmodalVisible,setLangModalVisible,onSelectLang}) => {
    const [selectedLanguageIndex,setSelectedLanguageIndex]=useState(0);
    const [languages,setLanguages]=useState([
        {id:'1',name:'English',selected:true},
        {id:'2',name:'हिंदी',selected:false},
        {id:'3',name:'తెలుగు',selected:false},
        {id:'4',name:'தமிழ்',selected:false},
        {id:'5',name:'മലയാളം',selected:false},
        {id:'6',name:'ಕನ್ನಡ',selected:false},
        {id:'7',name:'ਪੰਜਾਬੀ',selected:false},
    ]);
    const onSelectLanguage =(index) =>{
        const tempLanguages=languages;
        tempLanguages.map((item,ind)=>{
            if(index==ind){
                if(item.selected==true){
                    item.selected=false
                }else{
                    item.selected=true
                }
                setSelectedLanguageIndex(index);
            }
            else{
                item.selected=false
            }
        });
        let temp=[];
        tempLanguages.map(item=>{
            temp.push(item);
        })
        setLanguages(temp);
    }
    return (
    <Modal 
    animationType='slide' 
    transparent={true}
    visible={langmodalVisible}
    onRequestClose={()=>{
        setLangModalVisible(!langmodalVisible);
    }}
    >
        <View style={styles.centeredView}>
            <View style={styles.modalView}>
                <Text style={styles.selectLangText}>Select Language</Text>
                <View style={styles.LanguagesListView}>
                <FlatList 
                data={languages}
                renderItem={({item,index})=>{
                    return (
                        <TouchableOpacity style={[styles.languageNameContainer,{borderColor:item.selected==true?'blue':'black'}]} onPress={()=>{
                            onSelectLanguage(index)
                        }}>
                            {item.selected==true?(
                                 <Image source={require('../../../assets/languages/radio-selected.png')} style={[styles.SelectIcon,{tintColor:'blue'}]}/>
                            ):(
                                 <Image source={require('../../../assets/languages/radio-button.png')} style={styles.SelectIcon}/>
                            )}
                           
                            <Text style={[styles.languageName,{color:item.selected==true?'blue':'black'}]}>{item.name}</Text>
                        </TouchableOpacity>
                    );
                }}
                keyExtractor={(item)=>item.id}
                showsVerticalScrollIndicator={false}
                />
                </View>
                <View style={styles.cancelApplyView}>
                <TouchableOpacity style={styles.cancelBtn} onPress={()=>{
                    setLangModalVisible(false);
                }}>
                    <Text style={styles.cancelBtnText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.applyBtn} onPress={()=>{
                    setLangModalVisible(false);
                    onSelectLang(selectedLanguageIndex);
                }}>
                    <Text style={styles.applyBtnText}>Apply</Text>
                </TouchableOpacity>
            </View>
            </View>
            
        </View>
    </Modal>
  )
}

export default LanguageModal

const styles=StyleSheet.create({
    centeredView:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        marginTop:22,
        backgroundColor:'rgba(0,0,0,0.5)'
    },
    modalView:{
        width:width - 40,
        height: Platform.OS=='web'?height*0.75:height / 2,
        margin:20,
        backgroundColor:'white',
        borderRadius:20,
        padding:35,
        alignItems:'center',
        shadowColor:'#000',
        shadowOffset:{
            width:0,
            height:2,
        },
        shadowOpacity:0.25,
        shadowRadius:4,
        elevation:5
    },
    selectLangText:{
        fontSize:18,
        fontWeight:'600'
    },
    languageName:{
        fontSize:18,
        fontWeight:'400',
    },
    LanguagesListView:{
        width:'90%',
    },
    languageNameContainer:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'flex-start',
        width:'90%',
        borderRadius:10,
        borderWidth:0.5,
        borderColor:'lightgray',
        marginTop:10,
        padding:10
    },
    SelectIcon:{
        height:20,
        width:20
    },
    cancelApplyView:{
        flexDirection:'row',
        justifyContent:'space-evenly',
        alignItems:'flex-start',
        marginTop:20,
        marginBottom:20,
        alignItems:'center'
    },
    cancelBtn:{
        width: 100,
        height: 40,
        backgroundColor:'white',
        borderWidth:0.5,
        borderRadius:5,
        borderColor:'blue',
        justifyContent:'center',
        alignItems:'center',
        marginRight:10
    },
    applyBtn:{
        width: 100,
        height: 40,
        backgroundColor:'blue',
        borderRadius:5,
        borderWidth:0.5,
        borderColor:'white',
        justifyContent:'center',
        alignItems:'center',
        marginLeft:10
    },
    cancelBtnText:{
        fontSize: 20,
        fontWeight: '400',
        color:'blue',
    },
    applyBtnText:{
        fontSize: 20,
        fontWeight: '400',
        color:'white',
    }
})