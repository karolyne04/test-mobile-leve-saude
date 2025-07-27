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
# 📲 EAS Build – Perfis, Comandos e Fluxo de Desenvolvimento

Este projeto mobile utiliza o **EAS Build (Expo Application Services)** para gerar builds com diferentes finalidades, como desenvolvimento, testes internos e produção.

---

## ✅ Pré-requisitos

- Node.js instalado (recom. v16+)
- `eas-cli` instalado globalmente:
  ```bash
  npm install -g eas-cli
Login na conta Expo:

eas login
Projeto já iniciado com EAS:


eas init
🔗 Guia oficial EAS Build
🔗 Seus builds no Expo

{
  "cli": {
    "version": ">= 16.16.0",
    "appVersionSource": "remote"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal",
      "android": {
        "buildType": "apk"
      }
    },
    "preview": {
      "distribution": "internal",
      "android": {
        "buildType": "apk"
      }
    },
    "production": {
      "android": {
        "buildType": "app-bundle"
      },
      "ios": {
        "simulator": false
      }
    }
  },
  "submit": {
    "production": {}
  }
}

 Perfis de Build
🔹 development – Desenvolvimento com Expo Dev Client

eas build --profile development --platform android
Gera um .apk para uso com o Expo Dev Client

Ideal para testar código com bibliotecas nativas

Necessário instalar o Dev Client no celular

 Instalar Expo Dev Client no celular:
Instale o Expo Go pela Play Store

Ao abrir o .apk gerado com o perfil development, ele instalará um custom client

Use npx expo start --dev-client para rodar local

preview – Testes Internos (Sem Dev Client)

eas build --profile preview --platform android
Gera um .apk independente (sem precisar de Expo Dev Client)

Ideal para compartilhar com outras pessoas para testes

Pode ser instalado direto no celular

Basta abrir o APK e o app funciona normalmente
 Ver todos os builds no Expo
Acesse:
🔗 https://expo.dev/accounts/carolyne04
