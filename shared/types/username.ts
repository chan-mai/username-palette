interface FilterSettings {
  requiredChars: string;
  excludedChars: string;
  excludeHyphen: boolean;
  excludeUnderscore: boolean;
  excludeDot: boolean;
}

interface StyleSettings {
  baseName: string;
  style: string;
  suffix: string;
  customWord: string;
}

interface GenerateRequest {
  type: 'random' | 'styled';
  count?: number;
  filters?: FilterSettings;
  styleSettings?: StyleSettings;
}

interface GenerateResponse {
  usernames: string[];
}

