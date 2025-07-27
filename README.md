# 📱 FeedbackHub

Aplicativo mobile desenvolvido com **React Native + Expo**, onde o usuário pode **enviar** e **visualizar** seus próprios feedbacks. Projeto criado como parte do teste técnico para a vaga de Desenvolvedora Mobile.

---

## 🚀 Tecnologias Utilizadas

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Firebase Authentication](https://firebase.google.com/products/auth)
- [Firebase Firestore](https://firebase.google.com/products/firestore)
- [React Navigation](https://reactnavigation.org/)
- [EAS Build (modo desenvolvimento)](https://docs.expo.dev/build/introduction/)
- [ESLint + Prettier](https://eslint.org/)
- Estilização com `StyleSheet`

---

## 📋 Funcionalidades

✅ Autenticação com Firebase (email e senha)  
✅ Envio de feedback com nota (1 a 5 estrelas) e comentário obrigatório  
✅ Validação: mínimo de 10 caracteres no comentário  
✅ Listagem dos feedbacks enviados pelo usuário autenticado  
✅ Estilização utilizando apenas `StyleSheet`  
✅ Persistência de dados no Firebase Firestore  
✅ EAS Build configurado para modo desenvolvimento  
✅ Projeto escrito com TypeScript  
✅ Código padronizado com ESLint e Prettier  
✅ Repositório com histórico de commits organizado

---

## 🧪 Como rodar o projeto localmente

### 1. Clone o repositório

```bash
git clone https://github.com/karolyne04/test-mobile-leve-saude
cd test-mobile-leve-saude

2. Instale as dependências

npm install

Crie o arquivo .env com suas chaves do Firebase
env

FIREBASE_API_KEY=AIzaSyBJJd8av7Zs1AXv0z1zGxyoR7Urse8391E
FIREBASE_AUTH_DOMAIN=feedbackhub-83b2d.firebaseapp.com
FIREBASE_PROJECT_ID=feedbackhub-83b2d
FIREBASE_STORAGE_BUCKET=feedbackhub-83b2d.firebasestorage.app
FIREBASE_MESSAGING_SENDER_ID=335214134775
FIREBASE_APP_ID=1:335214134775:web:95ea5cc4d0ed585d2b5af2

 Inicie o projeto em modo desenvolvimento

npx expo start

Use o app Expo Go no celular para escanear o QR code ou rode em um emulador Android/iOS.

Firebase - Estrutura do Firestore

📂 feedbacks
 ┣ 📄 <feedbackId>
 ┃ ┣ uid: string // ID do usuário
 ┃ ┣ stars: number // nota de 1 a 5
 ┃ ┣ comment: string // texto do feedback
 ┃ ┣ createdAt: timestamp // data de envio
🧹 Padronização de Código

ESLint + Prettier configurados

Scripts úteis:


npm run lint       # verifica problemas de lint
npm run format     # formata o código com Prettier
📲 EAS Build (Modo Desenvolvimento)

eas build --profile development --platform android ou eas build -p android --profile preview
Gera o APK para testes em dispositivos físicos com perfil de desenvolvimento.  
