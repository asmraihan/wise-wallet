import * as React from 'react';
import { Text, View } from 'react-native';
import { cn } from '~/lib/utils';

export default function ExpenseScreen() {
  const [singleValue, setSingleValue] = React.useState<string>();
  const [multipleValue, setMultipleValue] = React.useState<string[]>([]);
  return (
    <View className='flex-1 justify-center items-center p-6'>
      <Text className='text-foreground'>
      ExpenseScreen
      </Text>
    </View>
  );
}
