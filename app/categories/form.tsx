import * as React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '~/components/ui/select';
import { Text } from '~/components/ui/text';
import { H1, Muted } from '~/components/ui/typography';

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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Toast from "react-native-toast-message";
import { cn } from '~/lib/utils';
import { router } from 'expo-router';

export default function CategoryForm() {
    const insets = useSafeAreaInsets();

    const accounts = [
        { value: '1', label: 'Cash Account' },
        { value: '2', label: 'Bank Account' },
        { value: '3', label: 'Credit Card' }
    ]

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


    const [selectTriggerWidth, setSelectTriggerWidth] = React.useState(0);

    const formSchema = z.object({
        amount: z.coerce.number().min(1, {
            message: 'Please enter a valid number.',
        }),
        account: z.object(
            { value: z.string({ message: 'Please select an account.', }), label: z.string() },
            {
                message: 'Please select an account.',
            }
        ),

    });


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            amount: 0,
            account: null,
        },
    });

    const contentInsets = {
        top: insets.top,
        bottom: insets.bottom,
        left: 12,
        right: 12,
    };

    function onSubmit(values: z.infer<typeof formSchema>) {

        Toast.show({
            type: 'success',
            text1: 'Success!',
            text2: 'Amount added to account.',
            visibilityTime: 1000,
            topOffset: insets.top === 0 ? 12 : insets.top,
        });
        router.push('../');
    }



    return (
        <View>
            <View className=' '>
                <View className='p-4 '>
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

                            {/* <FormField
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
                  /> */}

                            <Button onPress={form.handleSubmit(onSubmit)}>
                                <Text>Submit</Text>
                            </Button>
                        </View>
                    </Form>
                </View>
            </View>
        </View>
    );
}