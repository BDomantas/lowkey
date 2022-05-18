import {useTranslation} from 'react-i18next';
import React, {useState} from 'react';
import {View, StyleSheet, TextInput, Text} from 'react-native';
import {Colors} from '@Styles/Colors';

interface InputProps {
  placeholder: string;
  title?: string;
  setText: (text: string) => void;
}

const Input = ({
  title,
  setText,
  placeholder,
  ...props
}: InputProps): JSX.Element => {
  const {t} = useTranslation();
  return (
    <View style={style.container}>
      {Boolean(title) && <Text style={style.titleText}>{t(title || '')}</Text>}
      <TextInput
        style={style.input}
        onChangeText={setText}
        {...props}
        placeholderTextColor={Colors.textSecondary}
        placeholder={t(placeholder)}
      />
    </View>
  );
};

const style = StyleSheet.create({
  container: {flex: 1},
  titleText: {
    color: Colors.textSecondary,
    paddingBottom: 10,
  },
  input: {
    backgroundColor: Colors.secondary,
    height: 50,
    borderRadius: 12,
    paddingHorizontal: 20,
    color: Colors.textPrimary,
  },
});

export default Input;
