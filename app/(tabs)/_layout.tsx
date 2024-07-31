import { Tabs } from 'expo-router';
import { SettingsBarToggle } from '~/components/SettingsBarToggle';
import { ThemeToggle } from '~/components/ThemeToggle';
import { LayoutPanelLeft } from 'lucide-react-native';
import { MenuSquare } from 'lucide-react-native'; 

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name='index'
        options={{
          title: 'Home',
          tabBarIcon({ color, size }) {
            return <LayoutPanelLeft color={color} size={size} />;
          },
          tabBarStyle: {
            marginBottom: 10,
          },
          headerLeft: () => <SettingsBarToggle />,
          // headerRight: () => <ThemeToggle />,
        }}
      />
      <Tabs.Screen
        name='history'
        options={{
          title: 'History',
          tabBarIcon({ color, size }) {
            return <MenuSquare color={color} size={size} />;
          },
          tabBarStyle: {
            marginBottom: 10,
          },
          headerLeft: () => <SettingsBarToggle />,
          headerRight: () => <ThemeToggle />,
        }}
      />
    </Tabs>
  );
}
