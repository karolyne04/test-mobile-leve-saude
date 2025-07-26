import React, { useState } from "react";
import {
  TextInput,
  View,
  TextInputProps,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import colors from "../theme/colors";

interface InputProps extends TextInputProps {
  icon?: keyof typeof Feather.glyphMap;
  secureText?: boolean;
}

const Input: React.FC<InputProps> = ({ icon, secureText = false, ...rest }) => {
  const [isSecure, setIsSecure] = useState(secureText);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View
      style={[
        styles.container,
        isFocused && styles.containerFocused,
      ]}
    >
      {icon && (
        <Feather
          name={icon}
          size={20}
          color={isFocused ? colors.primary : colors.textSecondary}
          style={styles.icon}
        />
      )}

      <TextInput
        style={styles.input}
        placeholderTextColor={colors.textSecondary}
        secureTextEntry={isSecure}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        autoCapitalize="none"
        {...rest}
      />

      {secureText && (
        <TouchableOpacity
          onPress={() => setIsSecure(!isSecure)}
          style={styles.eyeButton}
        >
          <Feather
            name={isSecure ? "eye-off" : "eye"}
            size={20}
            color={isFocused ? colors.primary : colors.textSecondary}
          />
        </TouchableOpacity>
      )}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.textSecondary,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 16,
  },
  containerFocused: {
    borderColor: colors.primary, // Cor verde destaque ao focar
    backgroundColor: colors.background, // Leve mudança no fundo opcional
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
  },
  icon: {
    marginHorizontal: 4,
  },
  eyeButton: {
    padding: 4,
    marginLeft: 8,
  },
});

export default Input;
