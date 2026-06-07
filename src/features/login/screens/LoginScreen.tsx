import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Typography from '../../../components/shared/Typography';
import { useAppContext } from '../../../context/AppContext';
import FormInput from '../components/FormInput';
import { MOCK_CREDENTIALS } from '../types';

interface FormErrors {
  email?: string;
  password?: string;
  general?: string;
}

export default function LoginScreen() {
  const { dispatch } = useAppContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  const validate = (): boolean => {
    const next: FormErrors = {};
    if (!email.trim()) {
      next.email = 'El email es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      next.email = 'El email no es válido';
    }
    if (!password) {
      next.password = 'La contraseña es requerida';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleLogin = () => {
    if (!validate()) return;

    setLoading(true);
    // Simula latencia de red
    setTimeout(() => {
      if (
        email.trim().toLowerCase() === MOCK_CREDENTIALS.email &&
        password === MOCK_CREDENTIALS.password
      ) {
        dispatch({ type: 'LOGIN' });
      } else {
        setErrors({ general: 'Email o contraseña incorrectos' });
        setLoading(false);
      }
    }, 800);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Typography style={styles.logo}>📰</Typography>
            <Typography style={styles.brand}>Conexa News</Typography>
            <Typography style={styles.subtitle}>Iniciá sesión para continuar</Typography>
          </View>

          <View style={styles.card}>
            <FormInput
              label="Email"
              value={email}
              onChangeText={t => {
                setEmail(t);
                setErrors(e => ({ ...e, email: undefined, general: undefined }));
              }}
              placeholder="admin@conexanews.com"
              keyboardType="email-address"
              error={errors.email}
              editable={!loading}
            />
            <FormInput
              label="Contraseña"
              value={password}
              onChangeText={t => {
                setPassword(t);
                setErrors(e => ({ ...e, password: undefined, general: undefined }));
              }}
              placeholder="••••••••"
              secureTextEntry
              error={errors.password}
              editable={!loading}
            />

            {errors.general ? (
              <View style={styles.alertBox}>
                <Typography style={styles.alertText}>{errors.general}</Typography>
              </View>
            ) : null}

            <Pressable
              style={({ pressed }) => [
                styles.button,
                (pressed || loading) && styles.buttonPressed,
              ]}
              onPress={handleLogin}
              disabled={loading}>
              {loading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Typography style={styles.buttonText}>Ingresar</Typography>
              )}
            </Pressable>

            <View style={styles.hint}>
              <Typography style={styles.hintText}>Demo: </Typography>
              <Typography style={styles.hintValue}>
                {MOCK_CREDENTIALS.email} / {MOCK_CREDENTIALS.password}
              </Typography>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  flex: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logo: {
    fontSize: 56,
    marginBottom: 8,
  },
  brand: {
    fontSize: 28,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    color: '#6B7280',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
  },
  alertBox: {
    backgroundColor: '#FEF2F2',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FECACA',
    padding: 12,
    marginBottom: 16,
  },
  alertText: {
    fontSize: 13,
    color: '#DC2626',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#4F46E5',
    borderRadius: 12,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  buttonPressed: {
    opacity: 0.75,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  hint: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    flexWrap: 'wrap',
  },
  hintText: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  hintValue: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '600',
  },
});
