import React from "react";
import { View, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Stack, useNavigation } from 'expo-router';
import { useEffect } from 'react';
import { FlashList } from '@shopify/flash-list';
import { useScrollToTop } from "@react-navigation/native";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { ChevronRight } from "~/lib/icons/ChevronRight";
import NativeDatePicker from "~/components/common/datepicker";

export default function ReportsByDateScreen() {
  const scrollRef = React.useRef<ScrollView>(null);
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: true, title: "Report" });
  }, [navigation])


  const latestData = [
    'accordion',
    'alert',
    'alert-dialog',
    'aspect-ratio',
    'avatar',
    'badge',
    'bottom-sheet',
    'button',
    'toast',
    'toggle',
    'alert',
    'alert-dialog',
    'aspect-ratio',
    'avatar',
    'badge',
    'bottom-sheet',
    'button',
    'toast',
    'toggle',
    'alert',
    'alert-dialog',
    'aspect-ratio',
    'avatar',
    'badge',
    'bottom-sheet',
    'button',
    'toast',
    'toggle',
    'alert',
    'alert-dialog',
    'aspect-ratio',
    'avatar',
    'badge',
    'bottom-sheet',
    'button',
    'toast',
    'toggle',
  ];

  const ref = React.useRef(null);
  useScrollToTop(ref);

  return (
    <View className="flex-1 px-4">
      <View className='flex-row gap-3 my-2 mx-1'>
        <CardTitle className='pt-1 '>Report by date</CardTitle>
      </View>
      <View className="mb-6">
        <NativeDatePicker
          label='Select date'
          initialValue=''
          onChange={(date) => console.log(date)}
        />
      </View>
          <FlashList
            ref={ref}
            data={latestData}
            className='native:overflow-hidden rounded-t-lg'
            estimatedItemSize={49}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => (
              // <Link href={`/${item}`} asChild>
              <Button
                variant='secondary'
                size='lg'
                className={cn(
                  'bg-secondary/40 px-4 border-x border-t border-foreground/5 rounded-none flex-row justify-between',
                  index === 0 && 'rounded-t-lg',
                  index === latestData.length - 1 && 'border-b rounded-b-lg'
                )}
              >
                <Text className='text-primary'>{(item)}</Text>
                <Text className='text-primary'>{0.00} +</Text>
              </Button>
              // </Link>
            )}
            ListFooterComponent={<View className='py-4' />}
          />
        </View>
  );
}
