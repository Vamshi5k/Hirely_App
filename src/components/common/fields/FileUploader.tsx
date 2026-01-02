import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  Alert,
} from 'react-native';
import {
  Upload,
  FileText,
  Image,
  Film,
  Music,
  FileArchive,
  X,
} from 'lucide-react-native';
import { pick, types } from '@react-native-documents/picker';

export interface UploadedFile {
  name: string;
  size?: number;
  type?: string;
  uri?: string;
}

interface FileUploaderProps {
  label?: string;
  files?: UploadedFile[];
  onFilesChange?: (files: UploadedFile[]) => void;
  onPickFile?: () => void;
  allowedTypes?: string[];
  error?: string;
  touched?: any;
  maxFiles?: number;
  containerStyle?: ViewStyle;
  labelStyle?: TextStyle;
}

const Colors = {
  primary: '#2563EB',
  dark: '#0F172A',
  mediumGray: '#64748B',
  lightGray: '#94A3B8',
  border: '#E5E7EB',
  white: '#FFFFFF',
  error: '#EF4444',
  success: '#10B981',
  background: '#F8FAFC',
};

const Fonts = {
  bold: 'System',
};

const getFileIcon = (fileName: string, type?: string) => {
  const extension = fileName.split('.').pop()?.toLowerCase();
  const iconProps = { size: 18, strokeWidth: 2 };

  if (
    type?.startsWith('image/') ||
    ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(extension || '')
  ) {
    return <Image {...iconProps} color={Colors.primary} />;
  }
  if (
    type?.startsWith('video/') ||
    ['mp4', 'mov', 'avi', 'mkv'].includes(extension || '')
  ) {
    return <Film {...iconProps} color={Colors.primary} />;
  }
  if (
    type?.startsWith('audio/') ||
    ['mp3', 'wav', 'ogg', 'm4a'].includes(extension || '')
  ) {
    return <Music {...iconProps} color={Colors.primary} />;
  }
  if (['zip', 'rar', '7z', 'tar', 'gz'].includes(extension || '')) {
    return <FileArchive {...iconProps} color={Colors.primary} />;
  }
  return <FileText {...iconProps} color={Colors.primary} />;
};

const formatFileSize = (bytes?: number) => {
  if (!bytes) return '';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const FileUploader: React.FC<FileUploaderProps> = ({
  label,
  files = [],
  onFilesChange,
  onPickFile,
  allowedTypes = [types.allFiles],
  error,
  touched,
  maxFiles = 5,
  containerStyle,
  labelStyle,
}) => {
  const hasError = Boolean(touched && error);
  const canUploadMore = files.length < maxFiles;

  const handlePickFile = async () => {
    if (onPickFile) {
      onPickFile();
      return;
    }

    try {
      const results = await pick({
        allowMultiSelection: maxFiles - files.length > 1,
        type: allowedTypes,
      });

      const newFiles: UploadedFile[] = results.map(result => ({
        name: result.name ?? 'Unknown file',
        size: result.size ?? undefined,
        type: result.type ?? undefined,
        uri: result.uri,
      }));

      const availableSlots = maxFiles - files.length;
      const filesToAdd = newFiles.slice(0, availableSlots);

      if (newFiles.length > availableSlots) {
        Alert.alert(
          'File Limit Reached',
          `You can only upload ${availableSlots} more file(s). The first ${availableSlots} file(s) were added.`,
        );
      }

      onFilesChange?.([...files, ...filesToAdd]);
    } catch (err: any) {
      if (err?.code === 'DOCUMENT_PICKER_CANCELED') {
        return;
      }

      console.error('Error picking file:', err);
      Alert.alert('Upload Error', 'Failed to pick file. Please try again.');
    }
  };

  const handleRemoveFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    onFilesChange?.(updatedFiles);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {/* Label */}
      {label && (
        <View style={styles.labelRow}>
          <Text style={[styles.label, labelStyle]}>{label}</Text>
          {maxFiles > 1 && (
            <Text style={styles.counter}>
              {files.length}/{maxFiles}
            </Text>
          )}
        </View>
      )}

      {/* Upload Button */}
      {canUploadMore && (
        <TouchableOpacity
          style={[
            styles.uploadButton,
            hasError && styles.uploadButtonError,
            files.length > 0 && styles.uploadButtonWithFiles,
          ]}
          onPress={handlePickFile}
          activeOpacity={0.7}
        >
          <Upload
            size={18}
            color={hasError ? Colors.error : Colors.lightGray}
            strokeWidth={2}
          />
          <Text style={[styles.uploadText, hasError && styles.uploadTextError]}>
            {files.length === 0 ? 'Choose file' : 'Add another file'}
          </Text>
        </TouchableOpacity>
      )}

      {/* File List */}
      {files.length > 0 && (
        <View style={styles.fileList}>
          {files.map((file, index) => (
            <View key={index} style={styles.fileItem}>
              <View style={styles.fileIconWrapper}>
                {getFileIcon(file.name, file.type)}
              </View>

              <View style={styles.fileInfo}>
                <Text style={styles.fileName} numberOfLines={1}>
                  {file.name}
                </Text>
                {file.size && (
                  <Text style={styles.fileSize}>
                    {formatFileSize(file.size)}
                  </Text>
                )}
              </View>

              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => handleRemoveFile(index)}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                activeOpacity={0.6}
              >
                <X size={16} color={Colors.mediumGray} strokeWidth={2} />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}

      {/* Error Message */}
      {hasError && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

export default FileUploader;

/* =====================================================
   STYLES
===================================================== */

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },

  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },

  label: {
    fontSize: 13,
    color: Colors.mediumGray,
    fontFamily: Fonts.bold,
    marginBottom: 6,
  },

  counter: {
    fontSize: 12,
    color: Colors.lightGray,
    fontFamily: Fonts.bold,
  },

  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    borderRadius: 30,
    height: 48,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: Colors.white,
    gap: 8,
  },

  uploadButtonWithFiles: {
    marginBottom: 12,
  },

  uploadButtonError: {
    borderColor: Colors.error,
    backgroundColor: '#FEF2F2',
  },

  uploadText: {
    fontSize: 14,
    color: Colors.lightGray,
    fontFamily: Fonts.bold,
  },

  uploadTextError: {
    color: Colors.error,
  },

  fileList: {
    gap: 8,
  },

  fileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 30,
    height: 48,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: Colors.white,
  },

  fileIconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },

  fileInfo: {
    flex: 1,
    justifyContent: 'center',
  },

  fileName: {
    fontSize: 14,
    color: Colors.dark,
    fontFamily: Fonts.bold,
    marginBottom: 2,
  },

  fileSize: {
    fontSize: 11,
    color: Colors.lightGray,
    fontFamily: Fonts.bold,
  },

  removeButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },

  errorText: {
    marginTop: 6,
    marginLeft: 4,
    fontSize: 12,
    color: Colors.error,
    fontFamily: Fonts.bold,
  },
});
