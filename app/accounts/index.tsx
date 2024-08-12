import { useFocusEffect, useNavigation } from "expo-router";
import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { AccountType, useAccountDb } from "~/actions/useAccountDb";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";

export default function AccountsScreen() {

  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({ headerShown: true, title: "Accounts Overview" });
  }, [navigation])

  const accountDb = useAccountDb();
  const [data, setData] = React.useState<AccountType[]>([]);
  console.log(data?.length)

  const [isLoading, setIsLoading] = React.useState(true);

  async function getAccounts() {
    setIsLoading(true);
    try {
      const res = await accountDb.list();
      setData(res)
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      getAccounts();
    }, [])
  )

  return (
    <View>
      <CardHeader>
        <View className='flex-row gap-3'>
          <CardTitle className='pt-1'>Accounts</CardTitle>
        </View>
        <CardDescription>All available accounts</CardDescription>
      </CardHeader>
      <View className="mx-4">
       {
        isLoading ? (
          <View className="mx-4">
            {
              Array.from({ length: 3 }).map((_, index) => (
                <Skeleton key={index} className='w-full max-w-lg mx-auto h-40 my-2' />
              ))
            }
          </View>
        ) : (
          data.map((item) => (
            <Card className='w-full max-w-lg mx-auto my-2'>
            <CardHeader>
              <View className='flex-row gap-3'>
                <CardTitle className='pt-1'>
                   <Text className="capitalize">{item.name}{" "}</Text>
                   account</CardTitle>
              </View>
              <CardDescription>Press and hold to adjust account</CardDescription>
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
                    {(item.balance).toFixed(2)}
                  </Text>
                </View>
              </View>
            </CardContent>
          </Card>
          ))
        )
       }
      </View>
    </View>
  );
}
