import { Link } from 'expo-router';
import * as React from 'react';
import { Platform, View } from 'react-native';
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
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '~/components/ui/hover-card';
import { Text } from '~/components/ui/text';
import { Tooltip, TooltipContent, TooltipTrigger } from '~/components/ui/tooltip';
import { Muted } from '~/components/ui/typography';
import { CalendarDays } from '~/lib/icons/CalendarDays';
import { ChevronDown } from '~/lib/icons/ChevronDown';
import { ChevronRight } from '~/lib/icons/ChevronRight';
import { Plus } from '~/lib/icons/Plus';
import { Minus } from '~/lib/icons/Minus';
import { ArrowRightLeft } from '~/lib/icons/ArrowRightLeft';
import { Info } from '~/lib/icons/Info';
import { cn } from '~/lib/utils';
import { useScrollToTop } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';


export default function HomeScreen() {


  const latestData = [
    'accordion',
    'alert',
    'alert-dialog',
    'aspect-ratio',
    'avatar',
    'badge',
    'bottom-sheet',
    'button',
    'toast',
    'toggle',
  ];
  const ref = React.useRef(null);
  useScrollToTop(ref);



  return (
    <View className='flex-1FIX p-6 justify-center gap-6'>
      <View className='flex-row gap-3'>
        <CardTitle className='pt-1'>Choose an account</CardTitle>
        <Tooltip delayDuration={150}>
          <TooltipTrigger className='web:focus:outline-none'>
            <Info size={Platform.OS == 'web' ? 14 : 16} className='text-foreground' />
          </TooltipTrigger>
          <TooltipContent side='bottom' insets={contentInsets} className='gap-1 py-3 px-5'>
            <Text className='native:text-lg font-bold'>2 Types of account:</Text>
            <Text className='native:text-lg text-muted-foreground'>
              · Cash
            </Text>
            <Text className='native:text-lg text-muted-foreground'>
              · Card
            </Text>
          </TooltipContent>
        </Tooltip>
      </View>
      <View className='w-full'>
        <RoleDropdownSelect defaultValue='All accounts' />
      </View>
      <View className='flex-row justify-between items-center'>
        {/* <Link href='/form' asChild>
          <Button variant='link' className='flex-row'>
            <Text>Go To Form</Text>
            <ChevronRight className='text-foreground' size={18} />
          </Button>
        </Link> */}
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant='outline'
              size={Platform.OS === 'web' ? 'sm' : 'default'}
              className='flex-row items-center justify-center gap-2'
            >
              <Plus size={18} className='text-foreground' />
              <Text className=''>Income</Text>
            </Button>
          </DialogTrigger>
          <DialogContent className='m-4'>
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button>
                  <Text>OK</Text>
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant='outline'
              size={Platform.OS === 'web' ? 'sm' : 'default'}
              className='flex-row items-center justify-center gap-2'
            >
              <Minus size={18} className='text-foreground' />
              <Text className=''>Expense</Text>
            </Button>
          </DialogTrigger>
          <DialogContent className='m-4'>
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button>
                  <Text>OK</Text>
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant='outline'
              size={Platform.OS === 'web' ? 'sm' : 'default'}
              className='flex-row items-center justify-center gap-2'
            >
              <ArrowRightLeft size={18} className='text-foreground' />
              <Text className=''>Transfer</Text>
            </Button>
          </DialogTrigger>
          <DialogContent className='m-4'>
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button>
                  <Text>OK</Text>
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </View>
      {/* Balance sheet */}
      <View>
        <Card className='w-full max-w-lg mx-auto'>
          <CardHeader>
            <View className='flex-row gap-3'>
              <CardTitle className='pt-1'>Balance Sheet</CardTitle>
            </View>
            <CardDescription>Balance per day + previous balance</CardDescription>
          </CardHeader>

          <CardContent className='gap-2'>

            <View className='flex-row gap-3'>
              <View className='flex-1 flex-row gap-3'>
                <View className='flex-1'>
                  <Text numberOfLines={1} className='text-muted-foreground'>
                    Income
                  </Text>
                </View>
              </View>
              <View className=''>
                <Text className='text-muted-foreground'>
                  0.00 +
                </Text>
              </View>
            </View>

            <View className='flex-row gap-3'>
              <View className='flex-1 flex-row gap-3'>
                <View className='flex-1'>
                  <Text numberOfLines={1} className='text-muted-foreground'>
                    Previous Balance
                  </Text>
                </View>
              </View>
              <View className=''>
                <Text className='text-muted-foreground'>
                  0.00 +
                </Text>
              </View>
            </View>

            <View className='flex-row gap-3'>
              <View className='flex-1 flex-row gap-3'>
                <View className='flex-1'>
                  <Text numberOfLines={1} className='text-muted-foreground'>
                    Expense
                  </Text>
                </View>
              </View>
              <View className=''>
                <Text className='text-muted-foreground'>
                  0.00 -
                </Text>
              </View>
            </View>

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
                  0.00 =
                </Text>
              </View>
            </View>
          </CardContent>
        </Card>
      </View>

      {/* latest record */}
      <View>
        <Card className='w-full max-w-lg mx-auto'>
          <CardHeader>
            <View className='flex-row gap-3'>
              <CardTitle className='pt-1'>Latest Records</CardTitle>
            </View>
            <CardDescription>Your last 10 transaction history</CardDescription>
          </CardHeader>

          <CardContent className='gap-2 h-72'>
            <View className='flex-1'>
              <FlashList
                ref={ref}
                data={latestData}
                className='native:overflow-hidden rounded-t-lg'
                estimatedItemSize={10}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => (
                  // <Link href={`/${item}`} asChild>
                    <Button
                      variant='secondary'
                      size='lg'
                      className={cn(
                        'bg-secondary/40 pl-4 pr-1.5 border-x border-t border-foreground/5 rounded-none flex-row justify-between',
                        index === 0 && 'rounded-t-lg',
                        index === latestData.length - 1 && 'border-b rounded-b-lg'
                      )}
                    >
                      <Text className='text-xl'>{toOptions(item)}</Text>
                      <ChevronRight className='text-foreground/50' />
                    </Button>
                  // </Link>
                )}
                ListFooterComponent={<View className='py-4' />}
              />
            </View>
          </CardContent>
        </Card>
      </View>
    </View>
  );
}

const contentInsets = {
  left: 12,
  right: 12,
};

function RoleDropdownSelect({ defaultValue }: { defaultValue: string }) {
  const [value, setValue] = React.useState(defaultValue);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='outline'
          size={Platform.OS === 'web' ? 'sm' : 'default'}
          className='flex-row gap-2 native:pr-3'
        >
          <Text>{value}</Text>
          <ChevronDown size={18} className='text-foreground' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='center' insets={contentInsets} className='w-10/12 mx-auto mt-2'>
        <DropdownMenuLabel>Select an account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className='gap-1'>
          <DropdownMenuItem
            onPress={() => {
              setValue('All accounts');
            }}
            className={cn(
              'flex-col items-start gap-1',
              value === 'All accounts' ? 'bg-secondary/70' : ''
            )}
          >
            <Text>All accounts</Text>
            <Muted>Can view and comment.</Muted>
          </DropdownMenuItem>
          <DropdownMenuItem
            onPress={() => {
              setValue('Cash');
            }}
            className={cn(
              'flex-col items-start gap-1',
              value === 'Cash' ? 'bg-secondary/70' : ''
            )}
          >
            <Text>Cash</Text>
            <Muted>Can view, comment, and manage billing.</Muted>
          </DropdownMenuItem>
          <DropdownMenuItem
            onPress={() => {
              setValue('Card');
            }}
            className={cn('flex-col items-start gap-1', value === 'Card' ? 'bg-secondary/70' : '')}
          >
            <Text>Card</Text>
            <Muted>Admin-level access to all resources</Muted>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
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
