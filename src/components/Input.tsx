import React, { useState } from 'react';
import {
    TextInput,
    View,
    TextInputProps,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import colors from '../theme/colors';

interface InputProps extends TextInputProps {
    icon?: keyof typeof Feather.glyphMap;
    secureText?: boolean;
}

const Input: React.FC<InputProps> = ({ icon, secureText = false, ...rest }) => {
    const [isSecure, setIsSecure] = useState(secureText);

    return (
        <View style={styles.container}>
            {icon && (
                <Feather
                    name={icon}
                    size={20}
                    color={colors.textSecondary}
                    style={styles.icon}
                />
            )}

            <TextInput
                style={styles.input}
                placeholderTextColor={colors.textSecondary}
                secureTextEntry={isSecure}
                {...rest}
            />

            {secureText && (
                <TouchableOpacity onPress={() => setIsSecure(!isSecure)}>
                    <Feather
                        name={isSecure ? 'eye-off' : 'eye'}
                        size={20}
                        color={colors.textSecondary}
                        style={styles.icon}
                    />
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.background,
        borderWidth: 1,
        borderColor: colors.textSecondary,
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        marginBottom: 16,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: colors.text,
    },
    icon: {
        marginHorizontal: 4,
    },
});

export default Input;
