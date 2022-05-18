import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Colors} from '@Styles/Colors';
import {useTranslation} from 'react-i18next';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import LoadableComponent from './LoadableComponent';
import {defaultPlaceholderStyle} from '@Styles/Utils';

interface HeaderTitleProps {
  membersCount: number;
  onlineMembersCount: number;
  loading: boolean;
}

const HeaderTitlePlaceholder = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Low KeySquad</Text>
    <SkeletonPlaceholder {...defaultPlaceholderStyle}>
      <View style={styles.subtitlePlaceholder} />
    </SkeletonPlaceholder>
  </View>
);

const HeaderTitle: React.FC<HeaderTitleProps> = ({
  membersCount,
  onlineMembersCount,
  loading,
}) => {
  const {t} = useTranslation();

  return (
    <LoadableComponent
      loading={loading}
      placeholder={<HeaderTitlePlaceholder />}>
      <View style={styles.container}>
        <Text style={styles.title}>Low KeySquad</Text>
        <Text style={styles.subtitle}>
          {t('headerSubtitle', {
            members: membersCount,
            online: onlineMembersCount,
          })}
        </Text>
      </View>
    </LoadableComponent>
  );
};

const styles = StyleSheet.create({
  subtitlePlaceholder: {
    width: 160,
    height: 15,
  },
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: Colors.textPrimary,
    fontWeight: 'bold',
  },
  subtitle: {
    color: Colors.textSecondary,
  },
});

export default HeaderTitle;
