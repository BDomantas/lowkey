import React, {useState} from 'react';
import {View, StyleSheet, TextInput, Pressable} from 'react-native';
import {Colors} from '@Styles/Colors';
import Icon from 'react-native-vector-icons/Feather';
import {useTranslation} from 'react-i18next';
import {defaultIconStyle} from '@Styles/Utils';
import {MessageContent, SendMessageResult} from '@State/slices/Messages/types';

interface BottomControlsProps {
  onSendPress: (content: MessageContent) => Promise<SendMessageResult>;
  onCreatePoll: () => void;
}

const BottomControls = ({
  onSendPress,
  onCreatePoll,
}: BottomControlsProps): JSX.Element => {
  const {t} = useTranslation();

  const [message, setMessage] = useState('');

  const onSend = async () => {
    const result = await onSendPress({content: message});
    if (result) {
      setMessage('');
    }
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.iconButton} onPress={onCreatePoll}>
        <Icon name="grid" {...defaultIconStyle} />
      </Pressable>
      <TextInput
        style={styles.textInput}
        placeholder={t('inputPlaceholder')}
        placeholderTextColor={Colors.textSecondary}
        multiline
        onChangeText={setMessage}
        value={message}
      />
      <Pressable style={styles.iconButton} onPress={onSend}>
        <Icon name="disc" {...defaultIconStyle} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexShrink: 1,
    flexDirection: 'row',
    backgroundColor: Colors.background,
    alignItems: 'center',
    paddingTop: 20,
  },
  textInput: {
    flex: 1,
    backgroundColor: Colors.inputBackground,
    height: 35,
    borderRadius: 10,
    paddingHorizontal: 15,
    color: Colors.textPrimary,
    textAlignVertical: 'top',
    paddingTop: 10,
  },
  iconButton: {
    paddingHorizontal: 10,
  },
});

export default BottomControls;
