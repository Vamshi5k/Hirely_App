import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { LogOut } from 'lucide-react-native';
import { Colors } from '../../theme/colors';
import { Fonts } from '../../theme/typography';

const { width } = Dimensions.get('window');

interface LogoutModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const LogoutModal: React.FC<LogoutModalProps> = ({
  visible,
  onClose,
  onConfirm,
}) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.iconContainer}>
            <LogOut size={40} color={Colors.primary} strokeWidth={2} />
          </View>

          <Text style={styles.title}>Logout Account</Text>

          <Text style={styles.message}>
            Are you sure you want to logout? You’ll need to sign in again to
            access your account.
          </Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={onClose}
              activeOpacity={0.8}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.confirmButton]}
              onPress={onConfirm}
              activeOpacity={0.8}
            >
              <Text style={styles.confirmButtonText}>Yes, Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  modalContainer: {
    backgroundColor: Colors.white,
    borderRadius: 22,
    padding: 22,
    width: width * 0.85,
    maxWidth: 340,
    alignItems: 'center',
    elevation: 10,
  },

  iconContainer: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: 'rgba(68, 122, 239, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },

  title: {
    fontSize: 18,
    fontFamily: Fonts.bold,

    color: Colors.primary,
    marginBottom: 8,
    textAlign: 'center',
    lineHeight: 24,
  },

  message: {
    fontSize: 14,
    fontFamily: Fonts.regular,

    color: Colors.dark,
    opacity: 0.65,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },

  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    gap: 10,
  },

  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  cancelButton: {
    backgroundColor: Colors.primary,
  },

  confirmButton: {
    backgroundColor: Colors.error,
  },

  cancelButtonText: {
    fontSize: 14,
    fontFamily: Fonts.bold,
    color: Colors.white,
    opacity: 0.85,
  },

  confirmButtonText: {
    fontSize: 14,
    fontFamily: Fonts.bold,

    color: Colors.white,
  },
});

export default LogoutModal;
