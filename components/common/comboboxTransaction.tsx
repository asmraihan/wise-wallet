import * as React from 'react';
import { ListRenderItemInfo, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  BottomSheet,
  BottomSheetContent,
  BottomSheetFlatList,
  BottomSheetHeader,
  BottomSheetOpenTrigger,
  BottomSheetTextInput,
  useBottomSheet,
} from './bottom-sheet';
import { Button, buttonTextVariants, buttonVariants } from '../ui/button';
import { Check } from '../../lib/icons/Check';
import { ChevronsUpDown } from '../../lib/icons/ChevronsUpDown';
import { Search } from '../../lib/icons/Search';
import { cn } from '../../lib/utils';

// TODO: refactor and move to UI
// TODO: create web component, use https://ui.shadcn.com/docs/components/combobox

const HEADER_HEIGHT = 130;

interface ComboboxTransactionOption {
  name?: string;
  id?: number;
}

const ComboboxTransaction = React.forwardRef<
  React.ElementRef<typeof Button>,
  Omit<React.ComponentPropsWithoutRef<typeof Button>, 'children'> & {
    items: ComboboxTransactionOption[];
    placeholder?: string;
    inputProps?: React.ComponentPropsWithoutRef<typeof BottomSheetTextInput>;
    emptyText?: string;
    defaultSelectedItem?: ComboboxTransactionOption | null;
    selectedItem?: ComboboxTransactionOption | null;
    onSelectedItemChange?: (option: ComboboxTransactionOption | null) => void;
  }
>(
  (
    {
      className,
      // @ts-ignore
      textClass,
      variant = 'outline',
      size = 'default',
      inputProps,
      placeholder,
      items,
      emptyText = 'Nothing found...',
      defaultSelectedItem = null,
      selectedItem: selectedItemProp,
      onSelectedItemChange,
      ...props
    },
    ref
  ) => {
    const insets = useSafeAreaInsets();
    const [search, setSearch] = React.useState('');
    const [selectedItem, setSelectedItem] = React.useState<ComboboxTransactionOption | null>(
      defaultSelectedItem
    );
    const bottomSheet = useBottomSheet();
    const inputRef = React.useRef<React.ComponentRef<typeof BottomSheetTextInput>>(null);

    const listItems = React.useMemo(() => {
      return search
        ? items.filter((item) => {
          return item.name?.toLocaleLowerCase().includes(search.toLocaleLowerCase());
        })
        : items;
    }, [items, search]);

    function onItemChange(listItem: ComboboxTransactionOption) {
      if (selectedItemProp?.id === listItem.id) {
        return null;
      }
      setSearch('');
      bottomSheet.close();
      return listItem;
    }

    const renderItem = React.useCallback(
      ({ item }: ListRenderItemInfo<unknown>) => {
        const listItem = item as ComboboxTransactionOption;
        const isSelected = onSelectedItemChange
          ? selectedItemProp?.id === listItem.id
          : selectedItem?.id === listItem.id;
        return (
          <Button
            variant='ghost'
            className='items-center flex-row android:flex-1 justify-between h-4'
            onPress={() => {
              if (onSelectedItemChange) {
                onSelectedItemChange(onItemChange(listItem));
                return;
              }
              setSelectedItem(onItemChange(listItem));
            }}
          >
            <View className='flex-row flex-1'>
              <Text className={'text-foreground text-xl'}>{listItem.name}</Text>
            </View>
            {isSelected && <Check size={24} className={'text-foreground px-6'} />}
          </Button>

          //   <Button
          //   variant='secondary'
          //   size='lg'
          //   className={cn(
          //     'bg-secondary/25 pl-4 pr-1.5 border-x border-t border-foreground/5 rounded-none flex-row justify-between',
          //   )}
          //   onPress={() => {
          //     if (onSelectedItemChange) {
          //       onSelectedItemChange(onItemChange(listItem));
          //       return;
          //     }
          //     setSelectedItem(onItemChange(listItem));
          //   }}
          // >
          //   <Text className='text-xl text-foreground'>{listItem.label}</Text>
          //   {isSelected && <Check size={24} className={'text-foreground px-6'} />}
          // </Button>
        );
      },
      [selectedItem, selectedItemProp]
    );

    function onSubmitEditing() {
      const firstItem = listItems[0];
      if (!firstItem) return;
      if (onSelectedItemChange) {
        onSelectedItemChange(firstItem);
      } else {
        setSelectedItem(firstItem);
      }
      bottomSheet.close();
    }

    function onSearchIconPress() {
      if (!inputRef.current) return;
      const input = inputRef.current;
      if (input && 'focus' in input && typeof input.focus === 'function') {
        input.focus();
      }
    }

    const itemSelected = onSelectedItemChange ? selectedItemProp : selectedItem;

    return (
      <BottomSheet>
        <BottomSheetOpenTrigger
          ref={ref}
          className={buttonVariants({
            variant,
            size,
            className: cn('flex-row w-full', className),
          })}
          role='combobox'
          {...props}
        >
          <View className='flex-1 flex-row justify-between'>
            <Text
              className={buttonTextVariants({
                variant,
                size :'lg',
                className: cn(!itemSelected && 'opacity-60 font-normal', textClass),
              })}
              numberOfLines={1}
            >
              {itemSelected ? itemSelected.name : placeholder ?? ''}
            </Text>
            <ChevronsUpDown className='text-foreground ml-2 opacity-50' />
          </View>
        </BottomSheetOpenTrigger>
        <BottomSheetContent
          ref={bottomSheet.ref}
          onDismiss={() => {
            setSearch('');
          }}
        >
          <BottomSheetHeader className='border-b-0'>
            <Text className='text-foreground text-xl font-bold text-center px-0.5'>
              {placeholder}
            </Text>
          </BottomSheetHeader>
          <View className='relative px-4 border-b border-border pb-4'>
            <BottomSheetTextInput
              role='searchbox'
              ref={inputRef}
              className='pl-12'
              value={search}
              onChangeText={setSearch}
              onSubmitEditing={onSubmitEditing}
              returnKeyType='next'
              clearButtonMode='while-editing'
              placeholder='Search...'
              {...inputProps}
            />
            <Button
              variant={'ghost'}
              size='sm'
              className='absolute left-4 top-2.5'
              onPress={onSearchIconPress}
            >
              <Search size={18} className='text-foreground opacity-50' />
            </Button>
          </View>
          <BottomSheetFlatList
            data={listItems}
            contentContainerStyle={{
              paddingBottom: insets.bottom + HEADER_HEIGHT,
            }}
            renderItem={renderItem}
            keyExtractor={(item, index) => (item as ComboboxTransactionOption)?.id ?? index.toString()}
            className={'px-4'}
            keyboardShouldPersistTaps='handled'
          ListEmptyComponent={() => {
            return (
              <View
                className='items-center flex-row justify-center flex-1  px-3 py-5'
                style={{ minHeight: 70 }}
              >
                <Text className={'text-muted-foreground text-xl text-center'}>{emptyText}</Text>
              </View>
            );
          }}
          />
        </BottomSheetContent>
      </BottomSheet>
    );
  }
);

ComboboxTransaction.displayName = 'ComboboxTransaction';

export { ComboboxTransaction, type ComboboxTransactionOption };
