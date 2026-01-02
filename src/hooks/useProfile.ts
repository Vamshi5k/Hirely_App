import { useNavigation } from '@react-navigation/native';
import { CustomToast } from '../components/Toast';

export interface UserProfile {
  name: string;
  role: string;
}

export const useProfile = () => {
  const navigation = useNavigation<any>();
  const user: UserProfile = {
    name: 'Vamshi Animela',
    role: 'App Developer',
  };

  const logout = () => {
    console.log('Logout pressed');
    navigation.navigate('Onboarding');
    CustomToast('Logout SuccessFully !!');
  };

  return {
    user,
    logout,
  };
};
