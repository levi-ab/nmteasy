import { Button, View } from "react-native";


const SignIn = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        onPress={() => navigation.navigate('Home')}
        title="Go to asdf"
      />
    </View>
  );
}

export default SignIn;