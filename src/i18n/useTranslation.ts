import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import translations, {type Translations} from './translations';

export default function useTranslation(): Translations {
  const {i18n} = useDocusaurusContext();
  return translations[i18n.currentLocale] ?? translations.en;
}
