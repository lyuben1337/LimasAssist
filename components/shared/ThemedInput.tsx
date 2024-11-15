import { StyleSheet, TextInput, TextInputProps } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { NeutralColor } from "@/constants/Colors";

export default function ThemedInput({ style, ...rest }: TextInputProps) {
  const themeStyle = {
    backgroundColor: useThemeColor("background"),
    color: useThemeColor("text"),
  };

  return (
    <TextInput
      style={[style, themeStyle, styles.default]}
      placeholderTextColor={NeutralColor}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    width: "100%",
    height: 48,
    borderRadius: 8,
    fontSize: 16,
    lineHeight: 24,
    padding: 10,
  },
});
