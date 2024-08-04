import * as React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '~/components/ui/button';
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

import { useCategoryDb } from '~/actions/useCategoryDb';

export default function CategoryForm() {
    const insets = useSafeAreaInsets();

    const categoryDb = useCategoryDb();

    const types = [
        { value: 'INCOME', label: 'Income' },
        { value: 'EXPENSE', label: 'Expense' },
    ]

    const [selectTriggerWidth, setSelectTriggerWidth] = React.useState(0);

    const formSchema = z.object({
        name: z.coerce.string().min(3, {
            message: 'Please enter 3 character at least.',
        }),
        type: z.object(
            { value: z.string({ message: 'Please select a type.', }), label: z.string() },
            {
                message: 'Please select a type.',
            }
        ),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            type: undefined,
        },
    });

    const contentInsets = {
        top: insets.top,
        bottom: insets.bottom,
        left: 12,
        right: 12,
    };

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const res = await categoryDb.create({
                name: values.name,
                type: values.type.value
            });

            console.log(res, "category created successfully");

            Toast.show({
                type: 'success',
                text1: 'Success!',
                text2: 'Category created successfully.',
                visibilityTime: 1500,
                topOffset: insets.top === 0 ? 12 : insets.top,
            });
            router.push('../');

        } catch (error) {
            console.log(error);
        }

    }



    return (
        <View className='flex-1'>
            <View className='p-4 '>
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

                        <FormField
                            control={form.control}
                            name='type'
                            render={({ field }) => (
                                <FormSelect
                                    label='Type'
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
                                            placeholder='Select a type'
                                        />
                                    </SelectTrigger>
                                    <SelectContent insets={contentInsets} style={{ width: selectTriggerWidth }} >
                                        <SelectGroup>
                                            <SelectLabel>Category Type</SelectLabel>
                                            {types.map((type) => (
                                                <SelectItem key={type.value} label={type.label} value={type.value}>
                                                    <Text>{type.label}</Text>
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </FormSelect>
                            )}
                        />


                        <Button onPress={form.handleSubmit(onSubmit)}>
                            <Text>Submit</Text>
                        </Button>
                    </View>
                </Form>
            </View>
        </View>
    );
}