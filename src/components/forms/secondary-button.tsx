import React from 'react';
import { Pressable, Text } from 'react-native';

interface SecondaryButtonProps {
  label: string;
  onPress: () => void;
  disabled?: boolean;
}

export function SecondaryButton({ label, onPress, disabled }: SecondaryButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      className={`items-center justify-center rounded-[10px] border-[1.5px] border-navy py-3.5 ${
        disabled ? 'opacity-50' : 'active:opacity-70'
      }`}
    >
      <Text className="text-sm font-semibold text-navy">{label}</Text>
    </Pressable>
  );
}
