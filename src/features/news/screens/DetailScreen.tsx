import React from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import Typography from '../../../components/shared/Typography';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NewsStackParamList } from '../types';
import { useTheme } from '../../../theme';
import HeaderDetails from '../components/HeaderDetails';
import { formatDate } from '../helpers/formatDate';

type Props = NativeStackScreenProps<NewsStackParamList, 'Detail'>;

export default function DetailScreen({ navigation, route }: Props) {
  const { article } = route.params;
  const { colors } = useTheme();

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.surface }]}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <HeaderDetails
          imageUrl={article.imageUrl}
          articleId={article.id}
          onBack={() => navigation.goBack()}
        />

        <View style={[styles.body, { backgroundColor: colors.surface }]}>
          <View style={styles.meta}>
            <View style={[styles.badge, { backgroundColor: colors.accentBg }]}>
              <Typography color={colors.accent} bold variant="h7">
                {article.category}
              </Typography>
            </View>
            <Typography color={colors.textTertiary} variant="h7">
              {formatDate(article.publishedAt)}
            </Typography>
          </View>
          <View style={{ gap: 6 }}>
            <Typography bold variant="h3">
              {article.title}
            </Typography>

            <View style={styles.authorRow}>
              <Typography color={colors.textSecondary} variant="h6">
                Por{' '}
              </Typography>
              <Typography bold color={colors.textSecondary} variant="h6">
                {article.author}
              </Typography>
            </View>
          </View>

          <View style={[styles.divider, { backgroundColor: colors.border }]} />

          <Typography variant="h5">{article.content}</Typography>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingBottom: 40,
  },
  body: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  meta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  badge: {
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  authorRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    marginBottom: 20,
  },
});
