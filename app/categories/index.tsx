import { useScrollToTop } from "@react-navigation/native";
import { FlashList } from "@shopify/flash-list";
import { router, useNavigation } from "expo-router";
import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { cn } from "~/lib/utils";
import { Plus } from '~/lib/icons/Plus';
import { useCategoryDb } from "~/actions/useCategoryDb";
import { Input } from "~/components/ui/input";

export default function CategoriesScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: true, title: "Category Setting" });
  }, [navigation])

  const ref = React.useRef(null);
  useScrollToTop(ref);

  const categoryDb = useCategoryDb();

  const [data, setData] = React.useState([]);
  console.log(data)
  const [search, setSearch] = React.useState('');

  async function getCategories() {
    try {
      const res = await categoryDb.searchByName(search);
      setData(res);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getCategories();
  }, [search])


  return (
    <View className="flex-1">
      <CardHeader>
        <View className='flex-row gap-3'>
          <CardTitle className='pt-1'>Categories</CardTitle>
        </View>
        <CardDescription>All available Categories</CardDescription>
      </CardHeader>
      <View className='mx-4 mb-4'>
        <Input
          placeholder='Search category...'
          clearButtonMode='always'
          value={search}
          onChangeText={setSearch}
        />
      </View>
      <View>
        <Button
          variant='default'
          size={"icon"}
          className='flex-row items-center justify-center gap-2 p-8 rounded-full absolute -bottom-[75vh] right-[4vh]'
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
        data={data}
        className='native:overflow-hidden rounded-t-lg mx-4'
        estimatedItemSize={20}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <Button
            disabled
            variant='secondary'
            size='lg'
            className={cn(
              'opacity-100 bg-secondary/40 pl-4 pr-1.5 border-x border-t border-foreground/5 rounded-none flex-row justify-center',
              index === 0 && 'rounded-t-lg',
              index === data.length - 1 && 'border-b rounded-b-lg'
            )}
          >
            <Text className='text-primary'>{(item?.name)}</Text>
          </Button>
        )}
        ListFooterComponent={<View className='py-4' />}
      />

    </View>
  );
}
