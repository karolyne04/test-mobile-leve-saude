// src/screens/FeedbackForm.tsx
import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { TextInput, TouchableOpacity, Text } from "react-native";

import colors from "../theme/colors";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../services/firebase";
import { getAuth } from "firebase/auth";
import Button from "../components/Button";

const FeedbackFormScreen = () => {
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleRatingPress = (value: number) => {
    setRating(value);
  };
  const handleSubmit = async () => {
    if (rating === 0) {
      Alert.alert("Erro", "Por favor, selecione uma nota de 1 a 5.");
      return;
    }

    if (comment.trim().length < 10) {
      Alert.alert("Erro", "O comentário deve ter pelo menos 10 caracteres.");
      return;
    }

    try {
      setLoading(true);
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        Alert.alert("Erro", "Usuário não autenticado.");
        setLoading(false);
        return;
      }

      await addDoc(collection(db, "feedbacks"), {
        rating,
        comment,
        createdAt: Timestamp.now(),
        userId: user.uid,
      });
      Alert.alert("Sucesso", "Feedback enviado!");
      setRating(0);
      setComment("");
      navigation.goBack();
    } catch (error) {
      console.error("Erro ao enviar feedback:", error);
      Alert.alert("Erro", "Ocorreu um erro ao enviar o feedback.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <View style={styles.background}>
      <View style={styles.card}>
        <Text style={styles.title}>
          Como foi sua experiência com o app da Leve Saúde? Nos ajude a
          melhorar! 🌟
        </Text>
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>1. Avalie com estrelas:</Text>
          <Text style={styles.infoText}>
            De 1 a 5, qual foi o seu nível de satisfação ao usar o app?
          </Text>
          <Text style={styles.infoTitle}>2. Deixe um comentário:</Text>
          <Text style={styles.infoText}>
            Nos conte o motivo da sua nota. O que funcionou bem? O que podemos
            melhorar?
          </Text>
        </View>
        <View style={styles.stars}>
          {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity
              key={star}
              onPress={() => handleRatingPress(star)}
            >
              <Ionicons
                name={star <= rating ? "star" : "star-outline"}
                size={40}
                color={colors.star}
                style={styles.starIcon}
              />
            </TouchableOpacity>
          ))}
        </View>
        <TextInput
          placeholder="Escreva seu comentário..."
          placeholderTextColor={colors.textSecondary}
          style={styles.input}
          multiline
          numberOfLines={4}
          value={comment}
          onChangeText={setComment}
        />
        <Text style={styles.footerText}>
          💬 Sua opinião é muito importante para continuarmos evoluindo!
        </Text>
        <Button title="Enviar" onPress={handleSubmit} loading={loading} />
      </View>
    </View>
  );
};

export default FeedbackFormScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 28,
    width: "100%",
    maxWidth: 400,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: 24,
    textAlign: "center",
  },
  stars: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 28,
  },
  starIcon: {
    marginHorizontal: 4,
  },
  input: {
    backgroundColor: "#f7f7f7",
    borderRadius: 10,
    borderColor: colors.textSecondary,
    borderWidth: 1,
    padding: 16,
    textAlignVertical: "top",
    marginBottom: 28,
    width: "100%",
    fontSize: 16,
    minHeight: 90,
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 2,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    width: "100%",
    marginTop: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  infoBox: {
    backgroundColor: "#f0f6fa",
    borderRadius: 10,
    padding: 14,
    marginBottom: 22,
    width: "100%",
  },
  infoTitle: {
    fontWeight: "bold",
    color: colors.primary,
    fontSize: 15,
    marginTop: 6,
  },
  infoText: {
    color: colors.text,
    fontSize: 15,
    marginBottom: 2,
    marginLeft: 8,
  },
  footerText: {
    color: colors.textSecondary,
    fontSize: 14,
    textAlign: "center",
    marginBottom: 12,
    marginTop: -10,
  },
});
