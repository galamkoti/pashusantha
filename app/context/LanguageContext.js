import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState(null); // Use null as the initial value for better async handling
    const [translations, setTranslations] = useState({});
    const [languageLoading, setLanguageLoading] = useState(true);

    // Load language from AsyncStorage on mount
    useEffect(() => {
        const loadLanguage = async () => {
            try {
                const storedLanguage = await AsyncStorage.getItem("pashupanta_lang");
                if (storedLanguage) {
                    setLanguage(storedLanguage);
                } else {
                    setLanguage('en'); // Default language
                }
            } catch (error) {
                console.error('Error loading language:', error);
            } finally {
                setLanguageLoading(false);
            }
        };
        loadLanguage();
    }, []);

    // Fetch translations when language changes
    useEffect(() => {
        const fetchTranslations = async () => {
            if (!language) return; // Ensure language is set before fetching
            try {
                setLanguageLoading(true);
                const response = await axios.get(`https://pashupanta-backend-production.up.railway.app/language?lng=${language}`);
                setTranslations(response.data);
            } catch (error) {
                console.error('Error fetching translations:', error);
            } finally {
                setLanguageLoading(false);
            }
        };
        fetchTranslations();
    }, [language]);

    // Change language and update AsyncStorage
    const changeLanguage = async (lang) => {
        try {
            await AsyncStorage.setItem("pashupanta_lang", lang);
            setLanguage(lang);
        } catch (error) {
            console.error("Error saving language:", error);
        }
    };

    return (
        <LanguageContext.Provider value={{ language, translations, languageLoading, changeLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    return useContext(LanguageContext);
};
