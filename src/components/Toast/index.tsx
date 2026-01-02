import Toast from 'react-native-simple-toast';

export const CustomToast = (message: string) => {
  Toast.showWithGravity(message, Toast.SHORT, Toast.BOTTOM);
};
