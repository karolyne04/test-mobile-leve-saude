import React, { useState } from 'react'
import { View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../services/firebase'

export default function LoginScreen({ navigation }: any) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const handleLogin = async () => {
        if (!email || !password) {
            return Alert.alert('Erro', 'Preencha todos os campos')
        }

        setLoading(true)

        try {
            await signInWithEmailAndPassword(auth, email, password)
            // navega para tela de feedbacks
            navigation.navigate('Home')
        } catch (error: any) {
            Alert.alert('Erro no login', error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Entrar</Text>

            <TextInput
                placeholder="E-mail"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                style={styles.input}
            />

            <TextInput
                placeholder="Senha"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.input}
            />

            {loading ? (
                <ActivityIndicator size="large" color="#03989e" />
            ) : (
                <Button title="Entrar" onPress={handleLogin} />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        marginBottom: 24,
        textAlign: 'center',
    },
    input: {
        height: 48,
        borderColor: '#ccc',
        borderWidth: 1,
        paddingHorizontal: 12,
        marginBottom: 16,
        borderRadius: 8,
    },
})
