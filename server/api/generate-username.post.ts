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
  filters?: FilterSettings;
  styleSettings?: StyleSettings;
}

const generateRandomUsername = () => {
  const str = "nox8l3nrmqeszo.___";
  const len = 7;
  let username = "";

  for (let i = 0; i < len; i++) {
    username += str.charAt(Math.floor(Math.random() * str.length));
  }

  return username;
};

const generateStyledUsername = (styleSettings: StyleSettings) => {
  const { baseName, style, suffix, customWord } = styleSettings;

  if (!baseName) {
    return "名前を入力してください";
  }

  let result = baseName.toLowerCase();

  switch (style) {
    case "number-replace":
      result = result
        .replace(/o/g, "0")
        .replace(/i/g, "1")
        .replace(/e/g, "3")
        .replace(/a/g, "4")
        .replace(/s/g, "5")
        .replace(/g/g, "6")
        .replace(/t/g, "7")
        .replace(/b/g, "8");
      break;

    case "vowel-repeat":
      result = result
        .replace(/a/g, "aaa")
        .replace(/i/g, "iii")
        .replace(/u/g, "uuu")
        .replace(/e/g, "eee")
        .replace(/o/g, "ooo");
      break;

    case "dot-separate":
      result = result.split("").join(".");
      break;

    case "underscore-separate":
      result = result.split("").join("_");
      break;

    case "emoji-style":
      const emojiMap: { [key: string]: string } = {
        heart: "s2",
        butterfly: "si3",
        cherry: "o6",
        apple: "c5",
        smile: "u_u",
        wink: "p_q",
        kiss: "oxo",
      };
      result = emojiMap[baseName] || result + "_" + emojiMap["smile"];
      break;

    case "self-intro":
      const intros = ["iam_", "_dayo", "_desu", "_chan", "_kun"];
      const randomIntro = intros[Math.floor(Math.random() * intros.length)];
      if (randomIntro.startsWith("iam_")) {
        result = randomIntro + result;
      } else {
        result = result + randomIntro;
      }
      break;

    case "hobby":
      const hobbies = ["coffee", "music", "art", "photo", "travel", "food", "game", "book"];
      const randomHobby = hobbies[Math.floor(Math.random() * hobbies.length)];
      result = result + "_" + randomHobby;
      break;

    case "gram-style":
      const endings = ["gram", "style", "ism", "official"];
      const randomEnding = endings[Math.floor(Math.random() * endings.length)];
      result = result + "." + randomEnding;
      break;

    case "korean-style":
      const koreanMap: { [key: string]: string } = {
        strawberry: "ttalgi",
        rabbit: "tokki",
        cat: "goyangi",
        flower: "kkot",
        star: "byeol",
        moon: "dal",
        sun: "hae",
      };
      result = koreanMap[baseName] || result + "_" + "sarang";
      break;

    case "slang":
      result = result
        .replace(/love/g, "luv")
        .replace(/thanks/g, "thx")
        .replace(/you/g, "u")
        .replace(/are/g, "r")
        .replace(/for/g, "4");
      break;

    case "french":
      const frenchMap: { [key: string]: string } = {
        flower: "fleur",
        moon: "lune",
        star: "etoile",
        love: "amour",
        beautiful: "belle",
        cat: "chat",
      };
      result = frenchMap[baseName] || result + "_" + "belle";
      break;

    case "alphabet-to-number":
      result = result
        .split("")
        .map((char: string) => {
          const code = char.charCodeAt(0);
          if (code >= 97 && code <= 122) {
            return (code - 96).toString();
          }
          return char;
        })
        .join("");
      break;
  }

  // カスタムワードを追加
  if (customWord) {
    result = result + "_" + customWord.toLowerCase();
  }

  // サフィックスを追加
  if (suffix) {
    result = result + suffix;
  }

  return result;
};

const isValidUsername = (username: string, filters: FilterSettings) => {
  if (filters.requiredChars) {
    const requiredCharsArray = filters.requiredChars.split("");
    for (const char of requiredCharsArray) {
      if (!username.includes(char)) {
        return false;
      }
    }
  }

  if (filters.excludedChars) {
    const excludedCharsArray = filters.excludedChars.split("");
    for (const char of excludedCharsArray) {
      if (username.includes(char)) {
        return false;
      }
    }
  }

  if (filters.excludeHyphen && username.includes("-")) {
    return false;
  }
  if (filters.excludeUnderscore && username.includes("_")) {
    return false;
  }
  if (filters.excludeDot && username.includes(".")) {
    return false;
  }

  return true;
};

export default defineEventHandler(async (event) => {
  try {
    const body: GenerateRequest = await readBody(event);
    const { type, filters, styleSettings } = body;

    if (type === 'random') {
      if (!filters) {
        throw createError({
          statusCode: 400,
          statusMessage: 'Filters are required for random generation',
        });
      }

      let attempts = 0;
      const maxAttempts = 100;
      let username = "";

      while (attempts < maxAttempts) {
        username = generateRandomUsername();
        if (isValidUsername(username, filters)) {
          break;
        }
        attempts++;
      }

      if (attempts >= maxAttempts) {
        throw createError({
          statusCode: 400,
          statusMessage: 'フィルター条件が厳しすぎます。条件を緩めてください。',
        });
      }

      return { username };
    } else if (type === 'styled') {
      if (!styleSettings) {
        throw createError({
          statusCode: 400,
          statusMessage: 'Style settings are required for styled generation',
        });
      }

      const username = generateStyledUsername(styleSettings);
      return { username };
    } else {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid generation type',
      });
    }
  } catch (error) {
    console.error('Error generating username:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error',
    });
  }
}); 