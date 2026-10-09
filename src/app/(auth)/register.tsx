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
import { validateEmail, validatePassword, validatePasswordMatch, validateUsername } from '@/utils/validation';

export default function RegisterScreen() {
  const { register } = useAuth();

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{
    email?: string | null;
    username?: string | null;
    password?: string | null;
    confirmPassword?: string | null;
  }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async () => {
    const emailError = validateEmail(email);
    const usernameError = validateUsername(username);
    const passwordError = validatePassword(password);
    const confirmPasswordError = validatePasswordMatch(password, confirmPassword);
    setErrors({
      email: emailError,
      username: usernameError,
      password: passwordError,
      confirmPassword: confirmPasswordError,
    });
    if (emailError || usernameError || passwordError || confirmPasswordError) return;

    setFormError(null);
    setIsSubmitting(true);
    try {
      await register({ email, username, password });
      router.replace('/');
    } catch (error) {
      if (error instanceof ApiError && error.status === 409) {
        setFormError("Cet email ou ce nom d'utilisateur est déjà utilisé.");
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
        <TextField label="Nom d'utilisateur" value={username} onChangeText={setUsername} error={errors.username} />
        <PasswordField label="Mot de passe" value={password} onChangeText={setPassword} error={errors.password} />
        <PasswordField
          label="Confirmer le mot de passe"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          error={errors.confirmPassword}
        />
      </View>

      {formError ? <Text className="text-sm text-danger">{formError}</Text> : null}

      <View className="gap-5">
        <PrimaryButton label="S'inscrire" onPress={handleSubmit} isLoading={isSubmitting} variant="register" />
        <Divider label="OU" />
        <SecondaryButton label="Continuer avec Google" onPress={() => {}} />
      </View>

      <Text className="text-center text-sm text-muted">
        Déjà membre ?{' '}
        <Link href="/login" className="font-bold text-navy underline">
          Se connecter
        </Link>
      </Text>
    </ScrollView>
  );
}
