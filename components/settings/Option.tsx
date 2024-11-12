import { Pressable, StyleSheet, View } from "react-native";
import React from "react";
import { ThemedText } from "@/components/shared/ThemedText";
import { CheckIcon } from "@/components/shared/Icons";
import { PrimaryColor } from "@/constants/Colors";

interface OptionProps {
  title: string;
  subtitle?: string;
  onPress?: () => void;
  selected?: boolean;
}

export default function Option({
  title,
  subtitle,
  onPress,
  selected,
}: OptionProps) {
  return (
    <Pressable onPress={onPress} style={[styles.option]}>
      <View>
        <ThemedText>{title}</ThemedText>
        {subtitle && (
          <ThemedText size="small" style={{ opacity: 0.75 }}>
            {subtitle}
          </ThemedText>
        )}
      </View>
      {selected && (
        <View style={styles.checkedContainer}>
          <CheckIcon color={PrimaryColor} />
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  option: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  checkedContainer: {
    width: 18,
    height: 18,
  },
});
