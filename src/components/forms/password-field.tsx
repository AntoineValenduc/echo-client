import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useState } from 'react';
import { Pressable, Text, TextInput, TextInputProps, View } from 'react-native';

interface PasswordFieldProps extends Omit<TextInputProps, 'secureTextEntry'> {
  label: string;
  error?: string | null;
}

export function PasswordField({ label, error, ...inputProps }: PasswordFieldProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <View className="gap-2">
      <Text className="text-[11px] font-bold uppercase tracking-wider text-ink">{label}</Text>
      <View
        className={`flex-row items-center gap-2 rounded-[10px] border bg-white px-3.5 ${
          error ? 'border-danger' : 'border-input-border'
        }`}
      >
        <TextInput
          className="flex-1 py-3.5 text-sm text-ink"
          placeholderTextColor="#A39C8C"
          autoCapitalize="none"
          secureTextEntry={!isVisible}
          {...inputProps}
        />
        <Pressable
          onPress={() => setIsVisible((prev) => !prev)}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel={isVisible ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
        >
          <Ionicons name={isVisible ? 'eye-off-outline' : 'eye-outline'} size={18} color="#A39C8C" />
        </Pressable>
      </View>
      {error ? <Text className="text-xs text-danger">{error}</Text> : null}
    </View>
  );
}
