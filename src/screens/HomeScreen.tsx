// src/screens/HomeScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../services/firebase';
import colors from '../theme/colors';
import { useNavigation } from '@react-navigation/native';
import Button from '../components/Button';



interface Feedback {
    id: string;
    rating: number;
    comment: string;
    createdAt: string;
    userId: string; // Opcional se você tiver autenticação
}


const HomeScreen = () => {
    const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchUserFeedbacks = async () => {
            const auth = getAuth();
            const user = auth.currentUser;

            if (!user) return;

            try {
                const q = query(
                    collection(db, 'feedbacks'),
                    where('userId', '==', user.uid),
                    orderBy('createdAt', 'desc')
                );

                const querySnapshot = await getDocs(q);
                const data: Feedback[] = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                })) as Feedback[];

                setFeedbacks(data);
            } catch (error) {
                console.error('Erro ao buscar feedbacks do usuário:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserFeedbacks();
    }, []);


    const renderItem = ({ item }: { item: Feedback }) => (
        <View style={styles.card}>
            <View style={styles.stars}>
                {[1, 2, 3, 4, 5].map(i => (
                    <Ionicons
                        key={i}
                        name={i <= item.rating ? 'star' : 'star-outline'}
                        size={20}
                        color={colors.star}
                    />
                ))}
            </View>
            <Text style={styles.comment}>{item.comment}</Text>
        </View>
    );
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Seus Feedbacks</Text>
            <Button
                title="Novo Feedback"
                onPress={() => navigation.navigate('FeedbackFormScreen')}
            />

            {loading ? (
                <ActivityIndicator size="large" color={colors.primary} />

            ) : feedbacks.length > 0 ? (
                <FlatList
                    data={feedbacks}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={{ paddingTop: 16, paddingBottom: 48 }}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                />
            ) : (
                <Text style={styles.emptyText}>Você ainda não enviou feedbacks.</Text>
            )}
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        paddingHorizontal: 24,
        paddingTop: 48,

    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
        color: colors.text,
    },
    card: {
        backgroundColor: colors.light,
        padding: 16,
        borderRadius: 10,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 3,
    },
    stars: {
        flexDirection: 'row',
        marginBottom: 8,
    },
    comment: {
        fontSize: 16,
        color: colors.text,
    },

    emptyText: {
        textAlign: 'center',
        color: colors.textSecondary,
        marginTop: 24,
    },
});
