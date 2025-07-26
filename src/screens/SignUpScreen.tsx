// src/screens/SignUpScreen.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
// import { auth } from '../services/firebase';
import colors from "../theme/colors";
import { useNavigation } from "@react-navigation/native";
import Input from "../components/Input";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../services/firebase";
import Button from "../components/Button";
import { showError, showSuccess, showWarning } from "../utils/toast";
import InputPassword from "../components/ InputPassword";

const SignUpScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleSignUp = async () => {
    if (!email || !password || !name) {

      showWarning("Preencha todos os campos.");
      return;
    }

    try {
      setLoading(true);

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        name: name.trim(),
        email: email.toLowerCase(),
        createdAt: new Date().toISOString(),
      });

      showSuccess('Usuário criado com sucesso!');
      navigation.navigate("Home");
    } catch (error: any) {
      // console.error("Erro ao criar conta:", error);
      showError(error.message || "Não foi possível criar a conta.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require("../img/leve.png")} style={styles.logo} />
      <Text style={styles.title}>Criar Conta</Text>
      <Input
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        icon="mail"
      />
      <InputPassword
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}

      />
      <Input
        placeholder="Nome"
        value={name}
        onChangeText={setName}
        autoCapitalize="words"
        icon="user"
      />

      <Button title="Criar Conta" onPress={handleSignUp} loading={loading} />

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.link}>Já tem conta? Entrar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: "center",
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 32,
    textAlign: "center",
  },
  link: {
    textAlign: "center",
    color: colors.primary,
    marginTop: 12,
    fontWeight: "bold",
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 24,
  },
});
