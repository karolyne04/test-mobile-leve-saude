import Toast from 'react-native-toast-message';

export const showSuccess = (message: string) => {
  Toast.show({
    type: 'success',
    text1: 'Sucesso',
    text2: message,
    position: 'top',
  });
};

export const showError = (message: string) => {
  Toast.show({
    type: 'error',
    text1: 'Erro',
    text2: message,
    position: 'top',
  });
};

export const showWarning = (message: string) => {
  Toast.show({
    type: 'info',
    text1: 'Atenção',
    text2: message,
    position: 'top',
  });
};
