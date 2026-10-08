import React from 'react';
import { Text, View } from 'react-native';

export function Divider({ label }: { label: string }) {
  return (
    <View className="flex-row items-center gap-3">
      <View className="h-px flex-1 bg-divider" />
      <Text className="text-[11px] uppercase tracking-wider text-divider-label">{label}</Text>
      <View className="h-px flex-1 bg-divider" />
    </View>
  );
}
