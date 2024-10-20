import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

const SubscriptionPage = () => {
  const router = useRouter();

  // Proceed to payment button handler
  const handleProceedToPayment = () => {
    router.push('common/payment'); // Navigate to payment page
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>

        {/* Subscription Benefits Container */}
        <View style={styles.benefitsContainer}>
          <Text style={styles.title}>Subscription Benefits Are Here</Text>

          <View style={styles.benefitItem}>
            <Text style={styles.benefitText}>🌟 Your Post (Animal/Crops) will be displayed on top of the posts</Text>
          </View>

          <View style={styles.benefitItem}>
            <Text style={styles.benefitText}>📞 Get more frequent calls from buyers</Text>
          </View>

          <View style={styles.benefitItem}>
            <Text style={styles.benefitText}>📍 Get frequent info about sellers and buyers near you</Text>
          </View>

          <View style={styles.benefitItem}>
            <Text style={styles.benefitText}>💼 Get 1 Free consultation per month</Text>
          </View>
        </View>

        {/* Subscription Price and Payment Button */}
        <View style={styles.paymentContainer}>
          <Text style={styles.priceText}>$99/month</Text>
          <Pressable style={styles.paymentButton} onPress={handleProceedToPayment}>
            <Text style={styles.paymentButtonText}>Proceed to Payment</Text>
          </Pressable>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2', // Light background
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: '',
    alignItems: 'center',
    padding: 20,
  },
  benefitsContainer: {
    backgroundColor: '#ffffff', // White container for benefits
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 30,
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#333',
  },
  benefitItem: {
    marginBottom: 15,
  },
  benefitText: {
    fontSize: 16,
    color: '#555',
    lineHeight: 22,
  },
  paymentContainer: {
    alignItems: 'center',
    width: '100%',
  },
  priceText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#007bff', // Blue color for the price
    marginBottom: 20,
  },
  paymentButton: {
    backgroundColor: '#28a745', // Green color for payment button
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 10,
  },
  paymentButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default SubscriptionPage;
