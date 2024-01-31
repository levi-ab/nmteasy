import { Button, View } from "react-native";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        onPress={() => navigation.navigate('SignIn')}
        title="Go to notifications"
      />
    </View>
  );
}

export default HomeScreen;