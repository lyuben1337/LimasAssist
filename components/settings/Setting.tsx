import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { ReactElement } from "react";
import { ThemedText } from "@/components/shared/ThemedText";
import { ChevronLeftIcon, SpecificIconProps } from "@/components/shared/Icons";
import { Colors, NeutralColor, PrimaryColor } from "@/constants/Colors";

type SettingProps = {
  title: string;
  icon: ReactElement<SpecificIconProps>;
  iconColor: string;
  value?: string;
  onPress?: () => void;
};

export default function Setting({
  title,
  icon,
  iconColor,
  value,
  onPress,
}: SettingProps) {
  return (
    <Pressable onPress={onPress} style={styles.setting}>
      <View style={styles.titleContainer}>
        <View style={[styles.iconContainer, { backgroundColor: iconColor }]}>
          {React.cloneElement(icon, { color: Colors.light.background })}
        </View>
        <ThemedText>{title}</ThemedText>
      </View>
      <View style={styles.valueContainer}>
        {value && <Text style={styles.value}>{value}</Text>}
        <View style={styles.chevronContainer}>
          <ChevronLeftIcon color={Colors.light.tabIconDefault} />
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  setting: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  iconContainer: {
    width: 30,
    height: 30,
    borderRadius: 10,
    padding: 4,
  },
  valueContainer: {
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
  },
  chevronContainer: {
    width: 16,
    height: 16,
  },
  value: {
    fontSize: 16,
    color: NeutralColor,
  },
});
