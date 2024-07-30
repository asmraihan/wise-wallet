import { Tabs } from 'expo-router';
import { ModalToggle } from '~/components/ModalToggle';
import { ThemeToggle } from '~/components/ThemeToggle';
import { LayoutPanelLeft } from 'lucide-react-native';
import { MenuSquare } from 'lucide-react-native'; 

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name='index'
        options={{
          title: 'Demo',
          tabBarIcon({ color, size }) {
            return <LayoutPanelLeft color={color} size={size} />;
          },
          headerLeft: () => <ModalToggle />,
          headerRight: () => <ThemeToggle />,
        }}
      />
      <Tabs.Screen
        name='components'
        options={{
          title: 'Components',
          tabBarIcon({ color, size }) {
            return <MenuSquare color={color} size={size} />;
          },
          headerRight: () => <ThemeToggle />,
        }}
      />
    </Tabs>
  );
}
