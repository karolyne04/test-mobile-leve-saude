import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, TextInputProps } from "react-native";
import { Feather } from "@expo/vector-icons";
import colors from "../theme/colors";

interface InputPasswordProps extends TextInputProps {

    value: string;
    onChangeText: (text: string) => void;
}

const InputPassword: React.FC<InputPasswordProps> = ({ value, onChangeText, placeholder, ...rest }) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    return (
        <View style={[styles.container, isFocused && styles.containerFocused]}>



            <Feather name="lock" size={20} color={isFocused ? colors.primary : colors.textSecondary} style={styles.icon} />

            <TextInput
                style={styles.input}
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={!isPasswordVisible}
                placeholderTextColor={colors.textSecondary}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                autoCapitalize="none"
                {...rest}
            />

            <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                <Feather
                    name={isPasswordVisible ? "eye" : "eye-off"}
                    size={20}
                    color={isFocused ? colors.primary : colors.textSecondary}
                    style={styles.eyeIcon}
                />
            </TouchableOpacity>

        </View>
    );
};

export default InputPassword;

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
        borderColor: colors.primary,
        backgroundColor: colors.background,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: colors.text,
    },
    icon: {
        marginHorizontal: 4,
    },

    eyeIcon: {
        marginLeft: 8,
        padding: 4,
    },
});
