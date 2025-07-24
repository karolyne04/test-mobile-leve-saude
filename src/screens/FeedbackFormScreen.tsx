// src/screens/FeedbackForm.tsx
import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TextInput, TouchableOpacity, Text } from 'react-native';

import colors from '../theme/colors';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../services/firebase';
import { getAuth } from 'firebase/auth';
import Button from '../components/Button';


const FeedbackFormScreen = () => {
    const [rating, setRating] = useState<number>(0);
    const [comment, setComment] = useState('');
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    const handleRatingPress = (value: number) => {
        setRating(value);
    };
    const handleSubmit = async () => {
        if (rating === 0) {
            Alert.alert('Erro', 'Por favor, selecione uma nota de 1 a 5.');
            return;
        }

        if (comment.trim().length < 10) {
            Alert.alert('Erro', 'O comentário deve ter pelo menos 10 caracteres.');
            return;
        }

        try {
            setLoading(true);
            const auth = getAuth();
            const user = auth.currentUser;

            if (!user) {
                Alert.alert('Erro', 'Usuário não autenticado.');
                setLoading(false);
                return;
            }

            await addDoc(collection(db, 'feedbacks'), {
                rating,
                comment,
                createdAt: Timestamp.now(),
                userId: user.uid,

            });
            await fetchUserFeedbacks()

            Alert.alert('Sucesso', 'Feedback enviado!');
            setRating(0);
            setComment('');
            navigation.goBack();
        } catch (error) {
            console.error('Erro ao enviar feedback:', error);
            Alert.alert('Erro', 'Ocorreu um erro ao enviar o feedback.');
        } finally {
            setLoading(false);
        }
    };
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Deixe seu feedback</Text>


            <View style={styles.stars}>
                {[1, 2, 3, 4, 5].map((star) => (
                    <TouchableOpacity key={star} onPress={() => handleRatingPress(star)}>
                        <Ionicons
                            name={star <= rating ? 'star' : 'star-outline'}
                            size={32}
                            color={colors.star}
                        />
                    </TouchableOpacity>
                ))}
            </View>

            {/* Comentário */}
            <TextInput
                placeholder="Escreva seu comentário..."
                placeholderTextColor={colors.textSecondary}
                style={styles.input}
                multiline
                numberOfLines={4}
                value={comment}
                onChangeText={setComment}
            />

            <Button title="Enviar" onPress={handleSubmit} loading={loading} />
        </View>
    );
};

export default FeedbackFormScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        padding: 24,
        justifyContent: 'center',
    },
    title: {
        marginBottom: 24,
        textAlign: 'center',
    },
    stars: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 24,
    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 8,
        borderColor: colors.textSecondary,
        borderWidth: 1,
        padding: 12,
        textAlignVertical: 'top',
        marginBottom: 24,
    },
    button: {
        backgroundColor: colors.primary,
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
});
