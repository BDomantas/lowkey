import React, {useState} from 'react';
import {BottomModal, ModalContent} from 'react-native-modals';
import {
  Text,
  Pressable,
  StyleSheet,
  View,
  FlatList,
  ListRenderItem,
} from 'react-native';
import {Colors} from '@Styles/Colors';
import Icon from 'react-native-vector-icons/Feather';
import {defaultIconStyle} from '@Styles/Utils';
import {useTranslation} from 'react-i18next';
import Input from '@Components/Form/Input';
import uuid from 'react-native-uuid';
import {useAppDispatch} from '@State/hooks';
import {sendMessage} from '@State/slices/Messages/MessagesThunks';
import {ContentType, Option} from '@State/slices/Messages/types';

interface BottomPollModalProps {
  isModalVisible: boolean;
  setIsModalVisible: (value: boolean) => void;
  channelId: string;
}

// Alternative way to do this would be using something like formik/hook-form
// and then just dispatching actions and saving intermediate state into redux
// this would let us have most of the logic like max options per poll outside component and have leaner component
const BottomPollModal = ({
  isModalVisible,
  setIsModalVisible,
  channelId,
}: BottomPollModalProps): JSX.Element => {
  const {t} = useTranslation();
  const [text, setText] = useState('');
  const [options, setOptions] = useState<{[id: string]: Option}>({});
  const dispatch = useAppDispatch();

  const renderItem: ListRenderItem<Option> = ({item}) => {
    return (
      <View style={styles.option}>
        <Input
          setText={optionText =>
            setOptions(currentOptions => ({
              ...currentOptions,
              [item.id]: {content: optionText, id: item.id},
            }))
          }
          placeholder=""
        />
        <Pressable
          style={styles.optionRemoveContainer}
          onPress={() => onRemoveOption(item.id)}>
          <Icon name="x" {...defaultIconStyle} size={20} />
        </Pressable>
      </View>
    );
  };

  const onRemoveOption = (id: string) => {
    setOptions(currentOptions => {
      const {[id]: _, ...restOptions} = currentOptions;
      return restOptions;
    });
  };

  const onNewOption = () => {
    setOptions(currentOptions => {
      const newId = uuid.v4() as string;
      if (Object.values(currentOptions).length < 8) {
        return {...currentOptions, [newId]: {id: newId, content: ''}};
      }
      return currentOptions;
    });
  };

  const onCreatePoll = () => {
    const sendPoll = async () => {
      await dispatch(
        sendMessage({
          channelId,
          message: {
            content: {
              question: text,
              options: Object.values(options),
              votes: 0,
            },
          },
          type: ContentType.poll,
        }),
      );
      setIsModalVisible(false);
      setOptions({});
      setText('');
    };
    sendPoll();
  };

  const renderListFooterComponent = () => (
    <Pressable style={styles.newOptionContainer} onPress={onNewOption}>
      <Text style={styles.newOptionText}>{t('addNewOption')}</Text>
    </Pressable>
  );

  return (
    <BottomModal
      visible={isModalVisible}
      onTouchOutside={() => setIsModalVisible(false)}
      height={0.8}>
      <ModalContent style={styles.modalContent}>
        <View style={styles.headerContainer}>
          <Pressable
            style={styles.iconButton}
            onPress={() => setIsModalVisible(false)}>
            <Icon name="x" {...defaultIconStyle} />
          </Pressable>
          <Text style={styles.headerText}>{t('pollModalHeader')}</Text>
          <Pressable style={styles.iconButton} onPress={onCreatePoll}>
            <Text style={styles.createPollText}>{t('createPoll')}</Text>
          </Pressable>
        </View>

        <View style={styles.questionContainer}>
          <Input
            setText={setText}
            placeholder="pollQuestionPlaceholder"
            title="pollQuestionTitle"
          />
        </View>
        <View style={styles.optionsContainer}>
          <Text style={styles.optionsTitleText}>{t('optionsTitle')}</Text>
          <FlatList
            data={Object.values(options)}
            extraData={options}
            renderItem={renderItem}
            ListFooterComponent={renderListFooterComponent}
          />
        </View>
      </ModalContent>
    </BottomModal>
  );
};

const styles = StyleSheet.create({
  optionsTitleText: {color: Colors.textSecondary, paddingBottom: 10},
  option: {paddingBottom: 8},
  questionContainer: {flex: 1},
  optionsContainer: {flex: 4},
  optionRemoveContainer: {
    backgroundColor: Colors.removeBackground,
    position: 'absolute',
    height: 50,
    width: 50,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomRightRadius: 12,
    borderTopRightRadius: 12,
  },
  newOptionContainer: {
    backgroundColor: Colors.secondary,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    padding: 15,
  },
  flatlist: {flex: 1},
  headerText: {
    color: Colors.textPrimary,
    fontSize: 14,
    fontWeight: 'bold',
  },
  createPollText: {
    color: Colors.createButtonText,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 30,
  },
  modalContent: {
    backgroundColor: Colors.background,
    flex: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  iconButton: {
    paddingHorizontal: 10,
  },
  newOptionText: {
    color: Colors.createButtonText,
  },
});

export default BottomPollModal;
