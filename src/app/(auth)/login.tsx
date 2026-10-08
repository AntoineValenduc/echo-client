import { Link, router } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

import { EchoHeader } from '@/components/branding/echo-header';
import { Divider } from '@/components/forms/divider';
import { PasswordField } from '@/components/forms/password-field';
import { PrimaryButton } from '@/components/forms/primary-button';
import { SecondaryButton } from '@/components/forms/secondary-button';
import { TextField } from '@/components/forms/text-field';
import { useAuth } from '@/context/auth-context';
import { ApiError } from '@/services/api/client';
import { validateEmail, validatePassword } from '@/utils/validation';

export default function LoginScreen() {
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string | null; password?: string | null }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async () => {
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    setErrors({ email: emailError, password: passwordError });
    if (emailError || passwordError) return;

    setFormError(null);
    setIsSubmitting(true);
    try {
      await login({ email, password });
      router.replace('/');
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) {
        setFormError('Email ou mot de passe incorrect.');
      } else {
        setFormError('Une erreur est survenue. Réessaie dans un instant.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScrollView
      className="flex-1 bg-cream"
      contentContainerClassName="flex-grow justify-center gap-6 p-6"
      keyboardShouldPersistTaps="handled"
    >
      <EchoHeader />

      <View className="gap-4">
        <TextField
          label="Email"
          value={email}
          onChangeText={setEmail}
          error={errors.email}
          keyboardType="email-address"
        />
        <PasswordField label="Mot de passe" value={password} onChangeText={setPassword} error={errors.password} />
        {/* NB: route /forgot-password pas encore créée — hors périmètre de ce ticket */}
        <Link href="/forgot-password" className="self-end text-xs text-ink underline">
          Mot de passe oublié ?
        </Link>
      </View>

      {formError ? <Text className="text-sm text-danger">{formError}</Text> : null}

      <View className="gap-5">
        <PrimaryButton label="Se connecter" onPress={handleSubmit} isLoading={isSubmitting} variant="login" />
        <Divider label="OU" />
        <SecondaryButton label="Continuer avec Google" onPress={() => {}} />
      </View>

      <Text className="text-center text-sm text-muted">
        Pas encore membre ?{' '}
        <Link href="/register" className="font-bold text-navy underline">
          S&apos;inscrire
        </Link>
      </Text>
    </ScrollView>
  );
}
