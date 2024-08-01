import { PortalHost, useModalPortalRoot } from '@rn-primitives/portal';
import { Link } from 'expo-router';
import { Search } from 'lucide-react-native';
import * as React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
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

import { CreditCard } from '~/lib/icons/CreditCard';
import { Layers3 } from '~/lib/icons/Layers3';
import { ScrollText } from '~/lib/icons/ScrollText';
import { User } from '~/lib/icons/User';
import { LayoutPanelLeft } from '~/lib/icons/LayoutPanelLeft';

export default function SideBarScreen() {
  const insets = useSafeAreaInsets();
  const { sideOffset, ...rootProps } = useModalPortalRoot();
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom + Math.abs(sideOffset),
    left: 16,
    right: 16,
  };

  return (
    <View {...rootProps} className=''>
      <View className='mx-6'>
        <Card className='w-full max-w-lg mx-auto'>
          <CardHeader>
            <View className='flex-row gap-3'>
              <CardTitle className='pt-1'>Wise Wallet</CardTitle>
            </View>
            <CardDescription>Your friendly expense tracker</CardDescription>
          </CardHeader>

          <CardContent className='gap-2'>
            <View className='border border-t-primary-foreground mt-1'>
            </View>
            <View className='flex-row gap-3'>
              <View className='flex-1 flex-row justify-start gap-3'>
                <Text numberOfLines={1} className='text-muted-foreground/50'>
                  Built by Asm Raihan
                </Text>
              </View>
            </View>
          </CardContent>
        </Card>
      </View>
      <View className='mx-6'>
      <View className='mt-4 '>
        <Text className='text-muted-foreground my-2'>
          Quick Access
        </Text>
        <Link href={{
          pathname: "./transaction/[transfer]",
          params: { transfer: "transfer" }
        }} asChild>
          <Button
            variant='ghost'
            className='flex-row items-center justify-start gap-4'
          >
            <LayoutPanelLeft size={18} className='text-foreground' />
            <Text className=''>Home</Text>
          </Button>
        </Link>
      </View>
      <View className='mt-4'>
        <Text className='text-muted-foreground my-2'>
          Reports
        </Text>
        <Link href={{
          pathname: "./reports/bydate",
        }} asChild>
          <Button
            variant='ghost'
            className='flex-row items-center justify-start gap-4'
          >
            <ScrollText size={18} className='text-foreground' />
            <Text className=''>Reports by date</Text>
          </Button>
        </Link>
        <Link href={{
          pathname: "./transaction/[transfer]",
          params: { transfer: "transfer" }
        }} asChild>
          <Button
            variant='ghost'
            className='flex-row items-center justify-start gap-4'
          >
            <ScrollText size={18} className='text-foreground' />
            <Text className=''>Reports by category</Text>
          </Button>
        </Link>
        <Link href={{
          pathname: "./transaction/[transfer]",
          params: { transfer: "transfer" }
        }} asChild>
          <Button
            variant='ghost'
            className='flex-row items-center justify-start gap-4'
          >
            <ScrollText size={18} className='text-foreground' />
            <Text className=''>Transfer Reports</Text>
          </Button>
        </Link>
      </View>
      <View className='mt-4 '>
        <Text className='text-muted-foreground my-2'>
          Settings Menu
        </Text>
        <Link href={{
          pathname: "./accounts",
        }} asChild>
          <Button
            variant='ghost'
            className='flex-row items-center justify-start gap-4'
          >
            <CreditCard size={18} className='text-foreground' />
            <Text className=''>Account Setting</Text>
          </Button>
        </Link>
        <Link href={{
          pathname: "./categories",
        }} asChild>
          <Button
            variant='ghost'
            className='flex-row items-center justify-start gap-4'
          >
            <Layers3 size={18} className='text-foreground' />
            <Text className=''>Category Setting</Text>
          </Button>
        </Link>
        <Link href={{
          pathname: "./transaction/[transfer]",
          params: { transfer: "transfer" }
        }} asChild>
          <Button
            variant='ghost'
            className='flex-row items-center justify-start gap-4'
          >
            <User size={18} className='text-foreground' />
            <Text className=''>User Setting</Text>
          </Button>
        </Link>
      </View>
      </View>
      <PortalHost name='settings-example' />
    </View>
  );
}
