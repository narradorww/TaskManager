import React, { useEffect } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';

const SplashScreen: React.FC = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timeout = setTimeout(() => {
      // @ts-expect-error: navigation.replace aceita string mas types podem não reconhecer 'Main'
      navigation.replace('Main');
    }, 2000);
    return () => clearTimeout(timeout);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Animatable.Text
        animation="fadeInDown"
        duration={800}
        style={styles.title}
        testID="splash-title">
        Task Manager
      </Animatable.Text>
      <Animatable.Text
        animation="fadeIn"
        delay={600}
        duration={700}
        style={styles.subtitle}
        testID="splash-subtitle">
        by Rodrigo Alexandre feat Capitani Group
      </Animatable.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: Platform.OS === 'ios' ? 'Montserrat-Bold' : 'Montserrat-Bold',
    fontSize: 36,
    color: '#222',
    marginBottom: 16,
    letterSpacing: 1.2,
  },
  subtitle: {
    fontFamily:
      Platform.OS === 'ios' ? 'Montserrat-Regular' : 'Montserrat-Regular',
    fontSize: 16,
    color: '#666',
    letterSpacing: 0.8,
  },
});

export default SplashScreen;
