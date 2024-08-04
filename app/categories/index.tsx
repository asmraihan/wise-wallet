import { useScrollToTop } from "@react-navigation/native";
import { FlashList } from "@shopify/flash-list";
import { router, useFocusEffect, useNavigation } from "expo-router";
import React, { useEffect } from "react";
import { View } from "react-native";
import { Text } from "~/components/ui/text";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { cn } from "~/lib/utils";
import { Plus } from '~/lib/icons/Plus';
import { CategoryType, useCategoryDb } from "~/actions/useCategoryDb";
import { Input } from "~/components/ui/input";
import { ChevronRight } from "~/lib/icons/ChevronRight";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '~/components/ui/alert-dialog';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '~/components/ui/context-menu';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog';

import { HoverCard, HoverCardContent, HoverCardTrigger } from '~/components/ui/hover-card';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { CalendarDays } from '~/lib/icons/CalendarDays';
import { ChevronDown } from '~/lib/icons/ChevronDown';
import { GripHorizontal } from '~/lib/icons/GripHorizontal';
import { FilePenLine } from '~/lib/icons/FilePenLine';
import { Trash2 } from '~/lib/icons/Trash2';
import { Skeleton } from "~/components/ui/skeleton";
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover';
import Toast from "react-native-toast-message";
import { Form, FormField, FormInput } from "~/components/common/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export default function CategoriesScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: true, title: "Category Setting" });
  }, [navigation])

  const ref = React.useRef(null);
  useScrollToTop(ref);

  const categoryDb = useCategoryDb();

  const [data, setData] = React.useState<CategoryType[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  console.log(data)
  const [search, setSearch] = React.useState('');

  async function getCategories() {
    setIsLoading(true);
    try {
      const res = await categoryDb.searchByName(search);
      setData(res)
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      getCategories();
    }, [search])
  )

  async function handleDelete(id: number) {
    try {
      await categoryDb.remove(id);
      Toast.show({
        type: 'success',
        text1: 'Success!',
        text2: 'Category deleted successfully.',
        visibilityTime: 1500,
        topOffset: 44,
      });
      getCategories();
    } catch (error) {
      console.log(error);
    }
  }

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
      {
        isLoading ?
          <View className="mx-4">
            {
              Array.from({ length: 12 }).map((_, index) => (
                <Skeleton key={index} className='h-14 my-1' />
              ))
            }
          </View> :
          <FlashList
            ref={ref}
            data={data}
            className='native:overflow-hidden rounded-t-lg mx-4'
            estimatedItemSize={20}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View className='items-center flex-row justify-center mt-64' style={{ minHeight: 70 }}>
                <Text className={'text-secondary text-xl text-center'}>No categories found</Text>
              </View>
            }
            renderItem={({ item, index }) => (
              <ListOption
                data={data}
                index={index}
                item={item}
                handleDelete={handleDelete}
                getCategories={getCategories}
              />
            )}
            ListFooterComponent={<View className='py-4' />}
          />
      }

    </View>
  );
}

function toOptions(name: string) {
  const title = name
    .split('-')
    .map(function (str: string) {
      return str.replace(/\b\w/g, function (char) {
        return char.toUpperCase();
      });
    })
    .join(' ');
  return title;
}

const contentInsets = {
  left: 16,
  right: 16,
};


function ListOption({
  data,
  index,
  item,
  handleDelete,
  getCategories,
}: {
  data: CategoryType[];
  index: number;
  item: CategoryType;
  handleDelete: (id: number) => void;
  getCategories: () => void;
}) {
  const [isDialogOpen, setDialogOpen] = React.useState(false);
  const [isAlertDialogOpen, setAlertDialogOpen] = React.useState(false);


  const formSchema = z.object({
    name: z.coerce.string().min(3, {
      message: 'Please enter 3 character at least.',
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: item.name,
    },
  });

  const categoryDb = useCategoryDb();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await categoryDb.update({
        id: item.id,
        name: values.name
      });

      setDialogOpen(false);

      getCategories()

      Toast.show({
        type: 'success',
        text1: 'Success!',
        text2: 'Category created successfully.',
        visibilityTime: 1500,
        topOffset: 44,
      });
    } catch (error) {
      console.log(error);
    }

  }


  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant='secondary'
          size='lg'
          className={cn(
            'bg-secondary/25 pl-4 pr-1.5 border-x border-t border-foreground/5 rounded-none flex-row justify-between',
            index === 0 && 'rounded-t-lg',
            index === data.length - 1 && 'border-b rounded-b-lg'
          )}
        >
          <Text className='text-xl text-foreground'>{toOptions(item.name)}</Text>
          <GripHorizontal size={24} className='text-foreground/50' />
        </Button>
      </PopoverTrigger>

      <PopoverContent align='end' insets={contentInsets} className='w-48'>
        <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button variant={"ghost"} size={"sm"} className="flex-row gap-2 w-full justify-start">
              <FilePenLine size={16} className='text-primary' />
              <Text className='font-semibold text-start'>Edit</Text>
            </Button>
          </DialogTrigger>
          <DialogContent className='sm:max-w-[425px] native:w-[385px]'>
            <DialogHeader>
              <DialogTitle>Edit Category</DialogTitle>
              <DialogDescription>
                Make changes to the category here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <View>
              <Form {...form}>
                <View className='gap-7'>
                  <FormField
                    control={form.control}
                    name='name'
                    render={({ field }) => (
                      <FormInput
                        label='Name'
                        placeholder='Enter category name...'
                        autoCapitalize='none'
                        autoComplete='off'
                        inputMode='text'
                        {...field}
                      />
                    )}
                  />
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button onPress={form.handleSubmit(onSubmit)}>
                        <Text>Submit</Text>
                      </Button>
                    </DialogClose>
                  </DialogFooter>

                </View>
              </Form>
            </View>
          </DialogContent>
        </Dialog>

        <AlertDialog open={isAlertDialogOpen} onOpenChange={setAlertDialogOpen}>
          <AlertDialogTrigger asChild>
            <Button variant={"ghost"} size={"sm"} className="flex-row gap-2 w-full justify-start">
              <Trash2 size={16} className='text-destructive' />
              <Text className='text-destructive font-semibold'>Delete</Text>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your account and remove
                your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>
                <Text>Cancel</Text>
              </AlertDialogCancel>
              <AlertDialogAction onPress={
                () => {
                  handleDelete(item.id);
                }
              }>
                <Text>Continue</Text>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </PopoverContent>
    </Popover>
  );
}
