import * as React from 'react';
import { Text, View, Alert, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Form,
  FormCheckbox,
  FormCombobox,
  FormDatePicker,
  FormField,
  FormInput,
  FormRadioGroup,
  FormSelect,
  FormSwitch,
  FormTextarea,
} from '~/components/common/form';
import { Button } from '~/components/ui/button';
import { RadioGroupItem } from '~/components/ui/radio-group';
import { Label } from '~/components/ui/label';
import { SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select';
import { cn } from '~/lib/utils';
import Toast from 'react-native-toast-message';
import { CategoryType, useCategoryDb } from '~/actions/useCategoryDb';
import { useFocusEffect } from 'expo-router';
import { AccountType, useAccountDb } from '~/actions/useAccountDb';
import { useTransactionDb } from '~/actions/useTransactionDb';




export default function ExpenseScreen() {

  const scrollRef = React.useRef<ScrollView>(null);
  const insets = useSafeAreaInsets();
  const [selectTriggerWidth, setSelectTriggerWidth] = React.useState(0);

  const [accountData, setAccountData] = React.useState<AccountType[]>([]);
  const [categoryData, setCategoryData] = React.useState<CategoryType[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const accountDb = useAccountDb();
  async function getAccounts() {
    setIsLoading(true);
    try {
      const res = await accountDb.list();
      setAccountData(res)
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  const categoryDb = useCategoryDb();

  async function getCategories() {
    setIsLoading(true);
    try {
      const res = await categoryDb.searchByName("", "EXPENSE");
      setCategoryData(res)
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }



  useFocusEffect(
    React.useCallback(() => {
      getAccounts();
      getCategories();
    }, [])
  )



  const formSchema = z.object({
    amount: z.coerce.number().min(1, {
      message: 'Please enter a valid number.',
    }),
    account: z.object(
      { label: z.string(), value: z.number() },
      {
        message: 'Please select an account.',
      }
    ),
    category: z.optional(z.object(
      { id: z.number(), name: z.string(), type: z.string() },
      {
        message: 'Please select a category.',
      }
    )),
    date: z.string(),
    details: z.optional(z.string()),

  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 0,
      account: { label: 'Select an account', value: 0 },
      category: undefined,
      date: new Date().toDateString(),
      details: '',
    },
  });

  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 12,
    right: 12,
  };

  const transactionDb = useTransactionDb();

  async function onSubmit(values: z.infer<typeof formSchema>) {

    console.log(values, "form values");

    const res = await transactionDb.create({
      amount: values.amount,
      account: values.account.value,
      category: values.category?.id || null,
      type: 'EXPENSE',
      date: values.date,
      details: values.details || '',
  });

  console.log(res, "created successfully");

  if(res.error) {
    Toast.show({
      type: 'error',
      text1: 'Error!',
      text2: res.error,
      visibilityTime: 1000,
      topOffset: insets.top === 0 ? 12 : insets.top
    });

  } else {
    form.reset();
    Toast.show({
      type: 'success',
      text1: 'Success!',
      text2: 'Amount added to account.',
      visibilityTime: 1000,
      topOffset: insets.top === 0 ? 12 : insets.top,
    });
  }

  }

  return (
    <ScrollView
      ref={scrollRef}
      contentContainerClassName='p-6 mx-auto w-full max-w-xl'
      showsVerticalScrollIndicator={false}
      automaticallyAdjustContentInsets={false}
      contentInset={{ top: 12 }}
    >
      <Form {...form}>
        <View className='gap-7'>

          <FormField
            control={form.control}
            name='amount'
            render={({ field }) => (
              <FormInput
                label='Amount'
                placeholder='Enter amount ...'
                description='This is the transaction amount'
                autoCapitalize='none'
                autoComplete='off'
                inputMode='decimal'
                {...field}
              />
            )}
          />

          <FormField
            control={form.control}
            name='account'
            render={({ field }) => (
              // @ts-ignore
              <FormSelect
                label='Select an account'
                {...field}
              >
                <SelectTrigger
                  onLayout={(ev) => {
                    setSelectTriggerWidth(ev.nativeEvent.layout.width);
                  }}
                >
                  <SelectValue
                    className={cn(
                      'text-sm native:text-lg',
                      field.value ? 'text-foreground' : 'text-muted-foreground'
                    )}
                    placeholder='Select an account'
                  />
                </SelectTrigger>
                <SelectContent insets={contentInsets} style={{ width: selectTriggerWidth }} >
                  <SelectGroup>
                    {accountData.map((acc) => (
                      <SelectItem className='capitalize' key={acc.id}
                        label={acc.name === 'cash' ? 'Cash account' : acc.name === 'card' ? 'Card account' : 'Savings account'}
                        // @ts-ignore
                        value={acc.id}
                      >
                        <Text>{acc.name}</Text>
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </FormSelect>
            )}
          />

          <FormField
            control={form.control}
            name='category'
            render={({ field }) => (
              <FormCombobox
                label='Select a category'
                description='Ignoring this will default to general.'
                // @ts-ignore
                items={categoryData}
                {...field}
              />
            )}
          />

          <FormField
            control={form.control}
            name='date'
            render={({ field }) => (
              <FormDatePicker
                label='Select date'
                description={`Ignoring this will default to ${new Date()?.toDateString()}.`}
                maxDate={new Date().toDateString()}
                {...field}
              />
            )}
          />

          <FormField
            control={form.control}
            name='details'
            render={({ field }) => (
              // @ts-ignore
              <FormTextarea
                label='Details of income'
                placeholder='Write details ...'
                description='This is to keep details about this transaction.'
                {...field}
              />
            )}
          />

          <Button onPress={form.handleSubmit(onSubmit)}>
            <Text>Submit</Text>
          </Button>
          <View>
            <Button
              variant='ghost'
              onPress={() => {
                form.clearErrors();
              }}
            >
              <Text>Clear errors</Text>
            </Button>
            <Button
              variant='ghost'
              onPress={() => {
                form.reset();
              }}
            >
              <Text>Clear form values</Text>
            </Button>
          </View>
        </View>
      </Form>
    </ScrollView>
  );
}
