import { useScrollToTop } from "@react-navigation/native";
import { FlashList } from "@shopify/flash-list";
import { router, useNavigation } from "expo-router";
import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { cn } from "~/lib/utils";

import { Plus } from '~/lib/icons/Plus';


export default function CategoriesScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: true, title: "Category Setting" });
  }, [navigation])

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

  const ref = React.useRef(null);
  useScrollToTop(ref);
  return (
    <View className="">
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
          onPress={() => {{
            router.push('./form');
          }}}
        >
          <Plus size={28} strokeWidth={3} className='text-black' />
        </Button>
      </View>
      <View className='rounded-xl h-[90vh] mx-4'>
        <View className='flex-1 rounded-xl mb-16'>
          <FlashList
            ref={ref}
            data={latestData}
            className='native:overflow-hidden rounded-t-lg'
            estimatedItemSize={10}
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
      </View>

    </View>
  );
}
