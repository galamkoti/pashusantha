import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const LanguageContext = createContext();

const fetchTranslationsFromAPI = async (lang) => {
    try {
        const response = await axios.get(`https://pashupanta-backend-production.up.railway.app/language?lng=${lang}`);
        const data = response.data;
        return data;
    } catch (error) {
        console.error('Error fetching translations:', error);
        return {};
    }
}
export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('en');
    const [translations, setTranslations] = useState({});
    const [languageLoading, setLanguageLoading] = useState(false);
    useEffect(() => {
        const loadLanguage = async () => {
            try {
                const languagefetched = await AsyncStorage.getItem("pashupanta_lang");
                if (languagefetched) {
                    setLanguage(languagefetched)
                }
            } catch (error) {
                console.error('Error loading language:', error);
            }
        }
        loadLanguage();
    }, [])

    useEffect(() => {
        const fetchTranslations = async () => {
            const translationsData = await fetchTranslationsFromAPI(language);
            setTranslations(translationsData);
            setLanguageLoading(false);
        }
        fetchTranslations();
    }, [language])

    const changeLanguage = async (lang) => {
        try {
            await AsyncStorage.setItem("pashupanta_lang", lang);
            setLanguage(lang);

        } catch (error) {
            console.log("Error saving Language", error);
        }
    }

    return (
        <LanguageContext.Provider value={{language,translations,languageLoading,changeLanguage}}>
            {children}
        </LanguageContext.Provider>
    )
}

export const useLanguage = () =>{
    return useContext(LanguageContext);
}