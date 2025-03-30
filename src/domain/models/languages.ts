import { z } from '@/lib/validation';

const languageSchema = z.object({
  code: z.string(),
  name: z.string(),
  flag: z.string(),
});
export type Language = z.infer<typeof languageSchema>;

export const SUPPORTED_LANGUAGES: Language[] = [
  { code: '', name: 'All Languages', flag: '🌐' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'es', name: 'Spanish', flag: '🇪🇸' },
  { code: 'pt', name: 'Portuguese', flag: '🇵🇹' },
  { code: 'id', name: 'Indonesian', flag: '🇮🇩' },
  { code: 'fr', name: 'French', flag: '🇫🇷' },
  { code: 'ar', name: 'Arabic', flag: '🇸🇦' },
  { code: 'tr', name: 'Turkish', flag: '🇹🇷' },
  { code: 'th', name: 'Thai', flag: '🇹🇭' },
  { code: 'vi', name: 'Vietnamese', flag: '🇻🇳' },
  { code: 'de', name: 'German', flag: '🇩🇪' },
  { code: 'it', name: 'Italian', flag: '🇮🇹' },
  { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
  { code: 'zh-CN', name: 'Chinese Simplified', flag: '🇨🇳' },
  { code: 'zh-TW', name: 'Chinese Traditional', flag: '🇹🇼' },
  { code: 'ru', name: 'Russian', flag: '🇷🇺' },
  { code: 'ko', name: 'Korean', flag: '🇰🇷' },
  { code: 'pl', name: 'Polish', flag: '🇵🇱' },
  { code: 'nl', name: 'Dutch', flag: '🇳🇱' },
  { code: 'ro', name: 'Romanian', flag: '🇷🇴' },
  { code: 'hu', name: 'Hungarian', flag: '🇭🇺' },
  { code: 'sv', name: 'Swedish', flag: '🇸🇪' },
  { code: 'cs', name: 'Czech', flag: '🇨🇿' },
  { code: 'hi', name: 'Hindi', flag: '🇮🇳' },
  { code: 'bn', name: 'Bengali', flag: '🇧🇩' },
  { code: 'da', name: 'Danish', flag: '🇩🇰' },
  { code: 'fa', name: 'Farsi', flag: '🇮🇷' },
  { code: 'tl', name: 'Filipino', flag: '🇵🇭' },
  { code: 'fi', name: 'Finnish', flag: '🇫🇮' },
  { code: 'he', name: 'Hebrew', flag: '🇮🇱' },
  { code: 'ms', name: 'Malay', flag: '🇲🇾' },
  { code: 'no', name: 'Norwegian', flag: '🇳🇴' },
  { code: 'uk', name: 'Ukrainian', flag: '🇺🇦' },
];
