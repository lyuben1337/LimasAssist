import { StyleSheet, TextInput, TextInputProps, TextStyle } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";

export default function ThemedInput({ style, ...rest }: TextInputProps) {
  const colorStyle = {
    backgroundColor: useThemeColor("background"),
    color: useThemeColor("text"),
  };

  return <TextInput style={[style, colorStyle, styles.default]} {...rest} />;
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
