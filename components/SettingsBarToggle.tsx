import { router } from 'expo-router';
import { Pressable, View } from 'react-native';
import { Menu } from '~/lib/icons/Menu';
import { cn } from '~/lib/utils';

export function SettingsBarToggle() {
  return (
    <Pressable
      onPress={() => {
        router.push('/sidebar');
      }}
      className='web:ring-offset-background web:transition-colors web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2'
    >
      {({ pressed }) => (
        <View
          className={cn(
            'flex-1 aspect-square justify-center items-center pt-0.5 pl-4',
            pressed && 'opacity-70'
          )}
        >
          <Menu className='text-foreground' size={24} strokeWidth={2.25} />
        </View>
      )}
    </Pressable>
  );
}
