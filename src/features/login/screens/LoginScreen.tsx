import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import Typography from '../../../components/shared/Typography';
import Button from '../../../components/shared/Button';
import { useAppContext } from '../../../context/AppContext';
import { useTheme } from '../../../theme';
import FormInput from '../components/FormInput';
import { MOCK_CREDENTIALS } from '../types';

interface FormErrors {
  email?: string;
  password?: string;
  general?: string;
}

export default function LoginScreen() {
  const { dispatch } = useAppContext();
  const { colors } = useTheme();
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
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.input }]}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Typography bold variant="h1">
              Conexa News
            </Typography>
          </View>

          <View style={[styles.card, { backgroundColor: colors.surface }]}>
            <FormInput
              label="Email"
              value={email}
              onChangeText={t => {
                setEmail(t);
                setErrors(e => ({
                  ...e,
                  email: undefined,
                  general: undefined,
                }));
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
                setErrors(e => ({
                  ...e,
                  password: undefined,
                  general: undefined,
                }));
              }}
              placeholder="••••••••"
              secureTextEntry
              error={errors.password}
              editable={!loading}
            />

            {errors.general && (
              <Typography color={colors.danger} variant="h7">
                {errors.general}
              </Typography>
            )}

            <Button
              label="Ingresar"
              onPress={handleLogin}
              loading={loading}
              disabled={loading}
            />

            <View style={styles.hint}>
              <Typography color={colors.textTertiary} variant='h7'>
                Demo:{' '}
              </Typography>
              <Typography
                color={colors.textSecondary}
                bold
                variant='h7'
              >
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
  card: {
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
  },
  alertBox: {
    borderRadius: 8,
    borderWidth: 1,
    padding: 12,
    marginBottom: 16,
  },
  hint: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    flexWrap: 'wrap',
  },
});
