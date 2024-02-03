import * as Font from "expo-font";

const useFonts = async () => {
   await Font.loadAsync({
      "Marlboro" : require("../assets/fonts/Marlboro.ttf"),
    });
};

export default useFonts;