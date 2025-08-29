interface LanguageSelectorProps {
  languages: string[];
  selectedLanguage: string;
  onSelectLanguage: (language: string) => void;
}

export default function LanguageSelector({
  languages,
  selectedLanguage,
  onSelectLanguage,
}: LanguageSelectorProps) {
  return (
    <select
      value={selectedLanguage}
      onChange={(e) => onSelectLanguage(e.target.value)}
      className="mb-6 p-2 rounded border border-gray-300 dark:bg-gray-800 dark:text-white"
    >
      {languages.map((lang) => (
        <option key={lang} value={lang}>
          {lang}
        </option>
      ))}
    </select>
  );
}
