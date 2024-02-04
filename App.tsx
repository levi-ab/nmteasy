import { createDrawerNavigator } from "@react-navigation/drawer";
import { useFonts } from "expo-font";
import { AuthProvider } from "./src/data/AuthContext";
import AppNavigator from "./src/components/AppNavigator";

const Drawer = createDrawerNavigator();


export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    'Inter-Black': require('./src/assets/fonts/Inter-Black.otf'),
    'Marlboro': require('./src/assets/fonts/Marlboro.ttf'),
  });

  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}
