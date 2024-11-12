import { TextStyle } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Href, Link } from "expo-router";
import { ThemedText, ThemedTextProps } from "@/components/shared/ThemedText";
import { Colors, PrimaryColor } from "@/constants/Colors";

export type ThemedLinkProps = {
  href: Href<string | object>;
  label?: string;
  size?: ThemedTextProps["size"];
  variant?: ThemedTextProps["variant"];
  style?: TextStyle;
};

export function ThemedLink({
  style,
  href,
  label,
  size,
  variant,
}: ThemedLinkProps) {
  return (
    <Link href={href} style={style}>
      <ThemedText
        size={size}
        variant={variant}
        lightColor={PrimaryColor}
        darkColor={PrimaryColor}
      >
        {label ? label : (href as string)}
      </ThemedText>
    </Link>
  );
}
