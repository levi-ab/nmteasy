import { useState } from "react";
import { Text, TextInput, TextStyle, View } from "react-native";
import { colors } from "../../styles";

const TextInputWithLabel = (props: {style?: any, defaultValue?: string, label: string; secureTextEntry?: boolean, labelStyle:TextStyle; textInputStyle:  TextStyle; onChangeText?: ((text: string) => void); focusBorderColor?: string, notFocusedBorderColor?: string}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={props.style}>
      <Text style={props.labelStyle}>{props.label}</Text>
      <TextInput
        defaultValue={props.defaultValue ?? ""}
        placeholder={props.label}
        secureTextEntry={props.secureTextEntry}
        placeholderTextColor={colors.grays50}
        style={[props.textInputStyle, {
            borderColor:
            isFocused 
                ? props.focusBorderColor ?? colors.themePrimary
                : props.notFocusedBorderColor ?? colors.grays50,
            borderWidth: isFocused ? 2 : 1,
          },]}
        onChangeText={props.onChangeText}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </View>
  );
};

export default TextInputWithLabel;
