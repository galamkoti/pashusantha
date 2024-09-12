import AsyncStorage from '@react-native-async-storage/async-storage';

export const getSelectedLangFromAsync = async () => {
    try {
        const stringifiedIndex = await AsyncStorage.getItem('LANGUAGE_VIKRAI');
        if (stringifiedIndex !== null) {
            const index = JSON.parse(stringifiedIndex);
            console.log("Retrieved language index:", index);
            return index;
        } else {
            console.log("No language index found.");
            return null;
        }
    } catch (error) {
        console.error("Failed to retrieve the language index:", error);
        return null;
    }
};

// You can also add other related functions here if needed, like saveSelectedLangInAsync.
export const saveSelectedLangInAsync = async (index) => {
    try {
        const stringifiedIndex = JSON.stringify(index);
        await AsyncStorage.setItem('LANGUAGE_VIKRAI', stringifiedIndex);
        console.log("Language index saved successfully.");
    } catch (error) {
        console.error("Failed to save the language index:", error);
    }
};
