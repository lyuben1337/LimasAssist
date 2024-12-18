import React, { useRef } from "react";
import {
  StyleSheet,
  Pressable,
  Animated,
  ViewStyle,
  GestureResponderEvent,
  View,
} from "react-native";
import { StyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";
import { NeutralColor } from "@/constants/Colors";
import { AnimatedView } from "react-native-reanimated/lib/typescript/component/View";

type AnimatedPressableProps = {
  children: React.ReactNode;
  onPress?: (event: GestureResponderEvent) => void;
  style?: StyleProp<ViewStyle> | undefined;
  disabled?: boolean;
};

export function ThemedPressable({
  children,
  onPress,
  style,
  disabled = false,
}: AnimatedPressableProps) {
  const darkenAnim = useRef(new Animated.Value(0)).current;

  const handlePressIn = () => {
    Animated.timing(darkenAnim, {
      toValue: 1, // Apply darkening effect
      duration: 150,
      useNativeDriver: false,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(darkenAnim, {
      toValue: 0,
      duration: 150,
      useNativeDriver: false,
    }).start();
  };

  const backgroundColor = darkenAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.4)"],
  });

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      style={{ width: "100%" }}
    >
      <View style={[styles.container, style]}>
        <Animated.View style={[StyleSheet.absoluteFill, { backgroundColor }]} />
        {children}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
});
