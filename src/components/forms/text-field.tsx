import React from 'react';
import { Text, TextInput, TextInputProps, View } from 'react-native';

interface TextFieldProps extends TextInputProps {
  label: string;
  error?: string | null;
}

export function TextField({ label, error, ...inputProps }: TextFieldProps) {
  return (
    <View className="gap-2">
      <Text className="text-[11px] font-bold uppercase tracking-wider text-ink">{label}</Text>
      <View
        className={`rounded-[10px] border bg-white px-3.5 ${error ? 'border-danger' : 'border-input-border'}`}
      >
        <TextInput
          className="py-3.5 text-sm text-ink"
          placeholderTextColor="#A39C8C"
          autoCapitalize="none"
          {...inputProps}
        />
      </View>
      {error ? <Text className="text-xs text-danger">{error}</Text> : null}
    </View>
  );
}
