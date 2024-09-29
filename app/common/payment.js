import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
// import RazorpayCheckout from 'react-native-razorpay';
import { SafeAreaView } from 'react-native-safe-area-context';

const PaymentPage = () => {
  // Handle Razorpay payment
  const handlePayment = () => {
    const options = {
      description: 'Subscription Payment',
      image: 'https://your-logo-url.com/logo.png', // You can add your logo here
      currency: 'INR',
      key: 'rzp_test_your_api_key_here', // Replace with your Razorpay API key
      amount: '9900', // Amount in paise (99 INR)
      name: 'Your App Name',
      prefill: {
        email: 'example@example.com',
        contact: '9999999999',
        name: 'John Doe'
      },
      theme: { color: '#F37254' }, // Customize theme color
    };

    RazorpayCheckout.open(options)
      .then((data) => {
        // Handle payment success
        Alert.alert('Success', `Payment ID: ${data.razorpay_payment_id}`);
      })
      .catch((error) => {
        // Handle payment error
        Alert.alert('Error', `Error: ${error.code} | ${error.description}`);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.paymentContainer}>
        <Text style={styles.title}>Proceed to Payment</Text>

        <Text style={styles.description}>
          Complete your subscription for just ₹99.00 per month and enjoy premium features.
        </Text>

        <TouchableOpacity style={styles.paymentButton} onPress={handlePayment}>
          <Text style={styles.paymentButtonText}>Pay ₹99.00</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    padding: 20,
  },
  paymentContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 5,
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#666',
  },
  paymentButton: {
    backgroundColor: '#F37254', // Razorpay theme color
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 8,
  },
  paymentButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default PaymentPage;
