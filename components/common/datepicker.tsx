import { forwardRef, useState } from "react";
import { Calendar } from './calendar';
import { Button, buttonTextVariants } from "~/components/ui/button";
import {
    BottomSheet,
    BottomSheetCloseTrigger,
    BottomSheetContent,
    BottomSheetOpenTrigger,
    BottomSheetView,
} from './bottom-sheet';
import { Calendar as CalendarIcon } from '../../lib/icons/Calendar';
import { X } from "../../lib/icons/X";
import { Text, View } from "react-native";
import { cn } from "~/lib/utils";

const NativeDatePicker = forwardRef(({ label, description, initialValue, onChange, ...props }, ref) => {
    const [value, setValue] = useState(initialValue || '');

    const handleDateChange = (date) => {
        const newValue = date === value ? '' : date;
        setValue(newValue);
        onChange?.(newValue);
    };

    return (
        <View>
            {!!label && <Text className="text-primary mb-2 mx-1">{label}</Text>}
            <BottomSheet>
                <BottomSheetOpenTrigger asChild>
                    <Button
                        variant='outline'
                        className='flex-row gap-3 justify-start px-3 relative'
                        ref={ref}
                    >
                        {({ pressed }) => (
                            <>
                                <CalendarIcon
                                    className={buttonTextVariants({
                                        variant: 'outline',
                                        className: cn(!value && 'opacity-80', pressed && 'opacity-60'),
                                    })}
                                    size={18}
                                />
                                <Text
                                    className={buttonTextVariants({
                                        variant: 'outline',
                                        className: cn('font-normal', !value && 'opacity-70', pressed && 'opacity-50'),
                                    })}
                                >
                                    {value ? value : 'Pick a date'}
                                </Text>
                                {!!value && (
                                    <Button
                                        className='absolute right-0 active:opacity-70 native:pr-3'
                                        variant='ghost'
                                        onPress={() => handleDateChange('')}
                                    >
                                        <X size={18} className='text-muted-foreground text-xs' />
                                    </Button>
                                )}
                            </>
                        )}
                    </Button>
                </BottomSheetOpenTrigger>
                <BottomSheetContent>
                    <BottomSheetView hadHeader={false} className='pt-2'>
                        <Calendar
                            style={{ height: 358, borderRadius: 8 }}
                            onDayPress={(day) => handleDateChange(day.dateString)}
                            markedDates={{
                                [value ?? '']: {
                                    selected: true,
                                },
                            }}
                            current={value} // opens calendar on selected date
                            {...props}
                        />
                        <View className={'pb-2 pt-4'}>
                            <BottomSheetCloseTrigger asChild>
                                <Button>
                                    <Text>Close</Text>
                                </Button>
                            </BottomSheetCloseTrigger>
                        </View>
                    </BottomSheetView>
                </BottomSheetContent>
            </BottomSheet>
        </View>
    );
});

export default NativeDatePicker;