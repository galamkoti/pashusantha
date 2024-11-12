import React, { createContext, useState, useEffect, useContext } from "react";
import * as Location from 'expo-location';
import { Alert, Linking } from "react-native";

const locationContext = createContext();


export const LocationProvider = ({ children }) => {
    const [location, setLocation] = useState(null);
    const [locationError, setLocationError] = useState(null);
    const [loadingLocation, setLoadingLocation] = useState(null);
    const [locationName, setLocationName] = useState(null);
    const [formattedAddress,setFormattedAddress]=useState(null);
    const fetchLocation = async () => {
        try {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permisssion Denied', 'Location permission is required to use this feature',[
                    {
                        text:"CANCEL",
                        style:"cancel"
                    },
                    {
                        text:"Go Settings",
                        onPress: () => Linking.openSettings(),
                    }
                ]);
                setLocationError('Location Permission Denied');
                setLoadingLocation(false);
                return;
            }
            //if permission given then below will execute
            const userLocation = await Location.getCurrentPositionAsync();
            const { latitude, longitude } = userLocation.coords;

            setLocation({
                latitude,
                longitude,
            });

            // Reverse geocode to get the address
            const address = await Location.reverseGeocodeAsync({
                latitude,
                longitude
            });
            console.log("a", address)
            if (address.length > 0) {
                const addressDetails = address[0];
                const formattedAddress = ` ${addressDetails.district || ''}`;
                console.log("add", formattedAddress)
                setLocationName(formattedAddress);
                const addressToSaveInPost= ` ${addressDetails.formattedAddress || ''}`;
                setFormattedAddress(addressToSaveInPost);
            }
            else {
                setLocationName('No address found for this location');
            }
            setLoadingLocation(false);
        } catch (error) {
            setLocationError(error.message || 'Error Fetching Location');
            setLoadingLocation(false);
        }
    }
    useEffect(() => {
        fetchLocation();
    }, [])
    return (
        <locationContext.Provider value={{ location, loadingLocation, locationError, fetchLocation, locationName ,formattedAddress}}>
            {children}
        </locationContext.Provider>
    )
}

export const useLocation = () => {
    return useContext(locationContext);
}