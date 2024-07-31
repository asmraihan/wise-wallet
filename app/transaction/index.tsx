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

const categories = [
  {
    id: 1,
    value: 'House Rent',
    label: 'house-rent',
  },
  {
    id: 2,
    value: 'Tuition Fee',
    label: 'tuition-fee',
  },
  {
    id: 3,
    value: 'Transport Fee',
    label: 'transport-fee',
  },
  {
    id: 4,
    value: 'Electricity Bill',
    label: 'electricity-bill',
  },
  {
    id: 5,
    value: 'Water Bill',
    label: 'water-bill',
  },
  {
    id: 6,
    value: 'Internet Bill',
    label: 'internet-bill',
  },
  {
    id: 7,
    value: 'Mobile Bill',
    label: 'mobile-bill',
  },
  {
    id: 8,
    value: 'Grocery',
    label: 'grocery',
  },
  {
    id: 9,
    value: 'Others',
    label: 'others',
  },

];


const formSchema = z.object({
  amount: z.coerce.number().min(1, {
    message: 'Please enter a valid number.',
  }),
  account: z.object(
    { value: z.string({   message: 'Please select an account.',}), label: z.string() },
    {
      message: 'Please select an account.',
    }
  ),

});


const accounts = [
  { value: 'tom@cruise.com', label: 'tom@cruise.com' },
  { value: 'napoleon@dynamite.com', label: 'napoleon@dynamite.com' },
  { value: 'kunfu@panda.com', label: 'kunfu@panda.com' },

];


export default function IncomeScreen() {
  const scrollRef = React.useRef<ScrollView>(null);
  const insets = useSafeAreaInsets();
  const [selectTriggerWidth, setSelectTriggerWidth] = React.useState(0);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 0,
      account: null,
      category: null,
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

  function onSubmit(values: z.infer<typeof formSchema>) {

    // Alert.alert('Submitted!', JSON.stringify(values, null, 2), [
    //   {
    //     text: 'OK',
    //     onPress: () => {
    //       scrollRef.current?.scrollTo({ y: 0 });
    //       form.reset();
    //     },
    //   },
    // ]);

    Toast.show({
      type: 'success',
      text1: 'Success!',
      text2: 'Amount added to account.',
      visibilityTime: 1000,
      topOffset: insets.top === 0 ? 12 : insets.top,
    });

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
                    placeholder='Select a verified email'
                  />
                </SelectTrigger>
                <SelectContent insets={contentInsets} style={{ width: selectTriggerWidth }} >
                  <SelectGroup>
                    {accounts.map((email) => (
                      <SelectItem key={email.value} label={email.label} value={email.value}>
                        <Text>{email.label}</Text>
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
                items={categories}
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
