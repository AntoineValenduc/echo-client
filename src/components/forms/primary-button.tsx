import React from 'react';
import { ActivityIndicator, Pressable, Text } from 'react-native';

interface PrimaryButtonProps {
  label: string;
  onPress: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  variant?: 'login' | 'register';
}

const VARIANT_BG: Record<'login' | 'register', string> = {
  login: 'bg-login-green',
  register: 'bg-register-slate',
};

export function PrimaryButton({ label, onPress, isLoading, disabled, variant = 'login' }: PrimaryButtonProps) {
  const isDisabled = disabled || isLoading;

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      className={`items-center justify-center rounded-[10px] py-[15px] ${VARIANT_BG[variant]} ${
        isDisabled ? 'opacity-50' : 'active:opacity-85'
      }`}
    >
      {isLoading ? (
        <ActivityIndicator color="#FFFFFF" />
      ) : (
        <Text className="text-sm font-bold uppercase tracking-wider text-white">{label}</Text>
      )}
    </Pressable>
  );
}
