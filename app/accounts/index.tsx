import React from "react";
import { View, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";

export default function AccountsScreen() {
  const scrollRef = React.useRef<ScrollView>(null);
  const insets = useSafeAreaInsets();
  return (
    <ScrollView
      ref={scrollRef}
      contentContainerClassName='mx-auto w-full'
      showsVerticalScrollIndicator={false}
      automaticallyAdjustContentInsets={false}
      contentInset={{ top: 12 }}
    >
      <View>
        <CardHeader>
          <View className='flex-row gap-3'>
            <CardTitle className='pt-1'>Accounts</CardTitle>
          </View>
          <CardDescription>All available accounts</CardDescription>
        </CardHeader>
        <View className="mx-4">
          <Card className='w-full max-w-lg mx-auto'>
            <CardHeader>
              <View className='flex-row gap-3'>
                <CardTitle className='pt-1'>Cash account</CardTitle>
              </View>
              <CardDescription>Your friendly expense tracker</CardDescription>
            </CardHeader>

            <CardContent className='gap-2'>
              <View className='border border-t-primary-foreground mt-1'>
              </View>
              <View className='flex-row gap-3'>
                <View className='flex-1 flex-row gap-3'>
                  <View className='flex-1'>
                    <Text numberOfLines={1} className='text-muted-foreground'>
                      Current Balance
                    </Text>
                  </View>
                </View>
                <View className=''>
                  <Text className='text-muted-foreground'>
                    0.00
                  </Text>
                </View>
              </View>
            </CardContent>
          </Card>
        </View>
      </View>
    </ScrollView>
  );
}
