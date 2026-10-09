import { Image, Text, View } from 'react-native';

export function EchoHeader() {
  return (
    <View className="items-center gap-3.5">
      <Image
        source={require('../../../assets/images/echo-logo.png')}
        className="h-[59px] w-[72px]"
        resizeMode="contain"
      />
      <Text className="text-[22px] font-extrabold tracking-[3px] text-navy">ECHO</Text>
      <Text className="text-center text-[13px] italic leading-5 text-muted">
        Votre sanctuaire de lecture{'\n'}Votre lecture, amplifiée.
      </Text>
    </View>
  );
}
