import { useScrollToTop } from "@react-navigation/native";
import { FlashList } from "@shopify/flash-list";
import { router, useNavigation } from "expo-router";
import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { cn } from "~/lib/utils";
import { Plus } from '~/lib/icons/Plus';

export default function CategoriesScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: true, title: "Category Setting" });
  }, [navigation])

  const ref = React.useRef(null);
  useScrollToTop(ref);

  const latestData = [
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


  return (
    <View className="flex-1">
      <CardHeader>
        <View className='flex-row gap-3'>
          <CardTitle className='pt-1'>Categories</CardTitle>
        </View>
        <CardDescription>All available Categories</CardDescription>
      </CardHeader>
      <View>
        <Button
          variant='default'
          size={"icon"}
          className='flex-row items-center justify-center gap-2 p-8 rounded-full absolute -bottom-[80vh] right-[4vh]'
          style={{ zIndex: 1 }}
          onPress={() => {
            {
              router.push('./form');
            }
          }}
        >
          <Plus size={28} strokeWidth={3} className='text-black' />
        </Button>
      </View>
      <FlashList
        ref={ref}
        data={latestData}
        className='native:overflow-hidden rounded-t-lg mx-4'
        estimatedItemSize={49}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <Button
            disabled
            variant='secondary'
            size='lg'
            className={cn(
              'opacity-100 bg-secondary/40 pl-4 pr-1.5 border-x border-t border-foreground/5 rounded-none flex-row justify-center',
              index === 0 && 'rounded-t-lg',
              index === latestData.length - 1 && 'border-b rounded-b-lg'
            )}
          >
            <Text className='text-primary'>{(item)}</Text>
          </Button>
        )}
        ListFooterComponent={<View className='py-4' />}
      />

    </View>
  );
}
