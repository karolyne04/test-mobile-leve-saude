import React, { useState } from 'react'
import { View, Text, TextInput, StyleSheet, Alert, ActivityIndicator, TouchableOpacity, Image } from 'react-native'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../services/firebase'
import colors from '../theme/colors'
import Button from '../components/Button'
import Input from '../components/Input'
import { showError, showWarning } from '../utils/toast'
import InputPassword from '../components/ InputPassword'


export default function LoginScreen({ navigation }: any) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const handleLogin = async () => {
        if (!email || !password) {
            showWarning('Preencha todos os campos');
            return

        }

        setLoading(true)

        try {
            await signInWithEmailAndPassword(auth, email, password)

            navigation.navigate('Home')

        } catch (error: any) {
            Alert.alert('Erro no login', error.message)
            showError('Erro ao fazer login');
        } finally {
            setLoading(false)
        }
    }

    return (
        <View style={styles.container}>
            <Image source={require('../img/leve.png')} style={styles.logo} />
            <Text style={styles.title}>Faça login</Text>

            <Input
                placeholder="Email"
                value={email}
                icon="mail"
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
            />



            <InputPassword
                placeholder="Senha"
                value={password}
                onChangeText={setPassword}
            />

            {loading ? (
                <ActivityIndicator size="large" color={colors.secondarys} />
            ) : (

                <Button
                    title="Entrar"
                    onPress={handleLogin}
                    loading={loading}
                />
            )}

            <View style={{ marginTop: 24, alignItems: 'center' }}>
                <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')}>
                    <Text style={{ color: colors.primary, fontWeight: 'bold' }}>
                        Ainda não tem conta? Criar agora
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: colors.background,
    },
    logo: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginBottom: 24,
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        marginBottom: 24,
        textAlign: 'center',
        color: colors.text,
    },


})
