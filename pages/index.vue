<template>
  <div class="min-h-screen bg-white flex flex-col items-center justify-center p-4">
    <div class="w-full max-w-4xl mx-auto">
      <!-- 通知メッセージ -->
      <div v-if="notification.show" class="mb-4 p-4 rounded-lg border"
        :class="notification.type === 'success' ? 'bg-green-50 border-green-200 text-green-500' : 'bg-rose-50 border-rose-200 text-rose-500'">
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <svg v-if="notification.type === 'success'" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <svg v-else class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span class="font-medium">{{ notification.message }}</span>
          </div>
          <button @click="closeNotification" aria-label="通知を閉じる" class="text-slate-400 hover:text-slate-600 transition-colors">
            <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd" />
            </svg>
          </button>
        </div>
      </div>

      <div class="text-center mb-8">
        <h1 class="text-2xl font-bold text-slate-700 mb-4">Username Palette</h1>

        <div class="w-full max-w-2xl mx-auto mb-4">
          <div class="inline-flex h-10 items-center justify-center rounded-md bg-rose-50 p-1 text-slate-600">
            <button :class="[
              'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
              activeTab === 'random' ? 'bg-white text-rose-400' : 'hover:bg-white/50'
            ]" @click="activeTab = 'random'" aria-label="ランダム生成タブ">
              <Icon name="lucide:sparkles" class="h-4 w-4 mr-2" />
              ランダム生成
            </button>
            <button :class="[
              'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
              activeTab === 'styled' ? 'bg-white text-rose-400' : 'hover:bg-white/50'
            ]" @click="activeTab = 'styled'" aria-label="スタイル生成タブ">
              <Icon name="lucide:user" class="h-4 w-4 mr-2" />
              スタイル生成
            </button>
          </div>

          <!-- Random Tab Content -->
          <div v-show="activeTab === 'random'" class="mt-2">
            <div class="mb-6 rounded-lg border bg-white text-slate-800">
              <div class="flex flex-col space-y-1.5 p-6">
                <h2 class="text-lg font-semibold leading-none tracking-tight">生成条件の設定</h2>
              </div>
              <div class="p-6 pt-0 space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div class="space-y-2">
                    <label class="text-sm font-medium leading-none">必須文字(含む)</label>
                    <input
                      class="flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder:border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-300 focus:ring-offset-2"
                      placeholder="例: x8" v-model="filters.requiredChars" />
                  </div>

                  <div class="space-y-2">
                    <label class="text-sm font-medium leading-none">除外文字(含まない)</label>
                    <input
                      class="flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder:border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-300 focus:ring-offset-2"
                      placeholder="例: abc" v-model="filters.excludedChars" />
                  </div>
                </div>

                <div class="space-y-3">
                  <label class="text-sm font-medium">特定文字の除外</label>
                  <div class="flex flex-wrap gap-4">
                    <div class="flex items-center space-x-2">
                      <button type="button" role="switch" :aria-checked="filters.excludeHyphen" :aria-label="filters.excludeHyphen ? 'ハイフンの除外を無効にする' : 'ハイフンを除外する'" :class="[
                        'peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-2',
                        filters.excludeHyphen ? 'bg-rose-300' : 'bg-slate-300'
                      ]" @click="filters.excludeHyphen = !filters.excludeHyphen">
                        <span :class="[
                          'pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform',
                          filters.excludeHyphen ? 'translate-x-5' : 'translate-x-0'
                        ]" />
                      </button>
                      <label class="text-sm">ハイフン(-)</label>
                    </div>

                    <div class="flex items-center space-x-2">
                      <button type="button" role="switch" :aria-checked="filters.excludeUnderscore" :aria-label="filters.excludeUnderscore ? 'アンダースコアの除外を無効にする' : 'アンダースコアを除外する'" :class="[
                        'peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-2',
                        filters.excludeUnderscore ? 'bg-rose-300' : 'bg-slate-300'
                      ]" @click="filters.excludeUnderscore = !filters.excludeUnderscore">
                        <span :class="[
                          'pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform',
                          filters.excludeUnderscore ? 'translate-x-5' : 'translate-x-0'
                        ]" />
                      </button>
                      <label class="text-sm">アンダースコア(_)</label>
                    </div>

                    <div class="flex items-center space-x-2">
                      <button type="button" role="switch" :aria-checked="filters.excludeDot" :aria-label="filters.excludeDot ? 'ドットの除外を無効にする' : 'ドットを除外する'" :class="[
                        'peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-2',
                        filters.excludeDot ? 'bg-rose-300' : 'bg-slate-300'
                      ]" @click="filters.excludeDot = !filters.excludeDot">
                        <span :class="[
                          'pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform',
                          filters.excludeDot ? 'translate-x-5' : 'translate-x-0'
                        ]" />
                      </button>
                      <label class="text-sm">ドット(.)</label>
                    </div>
                  </div>
                </div>

                <button
                  class="inline-flex items-center justify-center rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium hover:bg-rose-50 focus:outline-none focus:ring-2 focus:ring-rose-300 focus:ring-offset-2 transition-colors"
                  @click="resetFilters" aria-label="フィルター設定をリセット">
                  リセット
                </button>
              </div>
            </div>
          </div>

          <!-- Styled Tab Content -->
          <div v-show="activeTab === 'styled'" class="mt-2">
            <div class="mb-6 rounded-lg border bg-white text-slate-800">
              <div class="flex flex-col space-y-1.5 p-6">
                <h2 class="text-lg font-semibold leading-none tracking-tight">スタイル設定</h2>
              </div>
              <div class="p-6 pt-0 space-y-4">
                <div class="space-y-2">
                  <label class="text-sm font-medium leading-none">ベース名前</label>
                  <input
                    class="flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder:border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-300 focus:ring-offset-2"
                    placeholder="例: kaori, nana, yuko" v-model="styleSettings.baseName" />
                </div>

                <div class="space-y-2">
                  <label class="text-sm font-medium leading-none">スタイル</label>
                  <div class="relative">
                    <button type="button"
                      class="flex h-10 w-full items-center justify-between rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 focus:ring-offset-2"
                      @click="showStyleSelect = !showStyleSelect" aria-label="スタイルを選択">
                      <span :class="styleSettings.style ? 'text-slate-700' : 'border-rose-200'">
                        {{ getStyleLabel(styleSettings.style) }}
                      </span>
                      <svg class="h-4 w-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    <div v-show="showStyleSelect"
                      class="absolute z-50 w-full mt-1 bg-white border border-slate-300 rounded-md shadow-lg">
                      <div class="py-1">
                        <button v-for="style in styleOptions" :key="style.value"
                          class="relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-rose-100 focus:bg-rose-100"
                          @click="selectStyle(style.value)" :aria-label="`${style.label}を選択`">
                          {{ style.label }}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div class="space-y-2">
                    <label class="text-sm font-medium leading-none">カスタムワード</label>
                    <input
                      class="flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder:border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-300 focus:ring-offset-2"
                      placeholder="例: coffee, music" v-model="styleSettings.customWord" />
                  </div>

                  <div class="space-y-2">
                    <label class="text-sm font-medium leading-none">サフィックス</label>
                    <input
                      class="flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder:border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-300 focus:ring-offset-2"
                      placeholder="例: 2024, _official" v-model="styleSettings.suffix" />
                  </div>
                </div>

                <button
                  class="inline-flex items-center justify-center rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium hover:bg-rose-50 focus:outline-none focus:ring-2 focus:ring-rose-300 focus:ring-offset-2 transition-colors"
                  @click="resetStyleSettings" aria-label="スタイル設定をリセット">
                  リセット
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="flex items-center justify-center gap-8 mb-8">
        <button
          class="h-12 w-12 flex items-center justify-center rounded-full hover:bg-rose-200 disabled:opacity-30 focus:outline-none focus:ring-2 focus:ring-rose-300 focus:ring-offset-2 transition-colors"
          :disabled="listplace <= 0" @click="backUsername" aria-label="前のユーザーネームに戻る">
          <Icon name="lucide:chevron-left" class="h-6 w-6" />
        </button>

        <div class="text-center">
          <div
            class="text-4xl md:text-6xl font-bold text-slate-700 mb-4 font-mono tracking-wider min-h-[80px] flex items-center justify-center break-all">
            <LoadingSpinner v-if="isGenerating" />
            <span v-else>{{ currentUsername || "生成中..." }}</span>
          </div>
          <button @click="copyUsername" aria-label="ユーザーネームをコピー" class="text-rose-300 hover:text-rose-400 transition-colors text-sm">
            このユーザーネームをコピーして使う
          </button>
        </div>

        <button
          class="h-12 w-12 flex items-center justify-center rounded-full hover:bg-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-300 focus:ring-offset-2 transition-colors"
          @click="generateUsername" aria-label="新しいユーザーネームを生成">
          <Icon name="lucide:chevron-right" class="h-6 w-6" />
        </button>
      </div>

      <div class="flex justify-center gap-4">
        <button
          class="inline-flex items-center justify-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium hover:bg-rose-50 focus:outline-none focus:ring-2 focus:ring-rose-300 focus:ring-offset-2 transition-colors"
          :disabled="listplace <= 0" @click="backUsername" aria-label="前のユーザーネームに戻る">
          <Icon name="lucide:chevron-left" class="h-4 w-4 mr-2" />
          戻る
        </button>

        <button
          class="inline-flex items-center justify-center rounded-md bg-rose-300 px-4 py-2 text-sm font-medium text-white hover:bg-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-300 focus:ring-offset-2 transition-colors"
          @click="generateUsername" :disabled="isGenerating" aria-label="新しいユーザーネームを生成">
          <LoadingSpinner v-if="isGenerating" />
          <span class="flex items-center" v-else>
            生成
            <Icon name="lucide:chevron-right" class="h-4 w-4 ml-2" />
          </span>
        </button>

        <button
          class="inline-flex items-center justify-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium hover:bg-rose-50 focus:outline-none focus:ring-2 focus:ring-rose-300 focus:ring-offset-2 transition-colors"
          @click="copyUsername" aria-label="ユーザーネームをクリップボードにコピー">
          <Icon name="lucide:copy" class="h-4 w-4 mr-2" />
          コピー
        </button>
      </div>

      <!-- 現在の設定表示 -->
      <div class="mt-6 text-center">
        <div class="inline-flex flex-wrap gap-2 text-xs text-rose-500">
          <template v-if="activeTab === 'random'">
            <span v-if="filters.requiredChars" class="bg-rose-100 text-rose-700 px-2 py-1 rounded">
              必須: {{ filters.requiredChars }}
            </span>
            <span v-if="filters.excludedChars" class="bg-rose-100 text-rose-700 px-2 py-1 rounded">
              除外: {{ filters.excludedChars }}
            </span>
            <span v-if="filters.excludeHyphen" class="bg-rose-100 text-rose-700 px-2 py-1 rounded">-除外</span>
            <span v-if="filters.excludeUnderscore" class="bg-rose-100 text-rose-700 px-2 py-1 rounded">_除外</span>
            <span v-if="filters.excludeDot" class="bg-rose-100 text-rose-700 px-2 py-1 rounded">.除外</span>
          </template>
          <template v-if="activeTab === 'styled'">
            <span v-if="styleSettings.baseName" class="bg-rose-100 text-rose-700 px-2 py-1 rounded">
              ベース: {{ styleSettings.baseName }}
            </span>
            <span class="bg-fuchsia-100 text-fuchsia-700 px-2 py-1 rounded">
              スタイル: {{ styleSettings.style }}
            </span>
            <span v-if="styleSettings.customWord" class="bg-rose-100 text-rose-700 px-2 py-1 rounded">
              カスタム: {{ styleSettings.customWord }}
            </span>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
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

interface NotificationState {
  show: boolean;
  message: string;
  type: 'success' | 'error';
}

const namelist = ref<string[]>([]);
const listplace = ref(-1);
const currentUsername = ref("");
const showStyleSelect = ref(false);
const activeTab = ref("random");
const isGenerating = ref(false);
const notification = ref<NotificationState>({
  show: false,
  message: '',
  type: 'success',
});
const filters = ref<FilterSettings>({
  requiredChars: "",
  excludedChars: "",
  excludeHyphen: false,
  excludeUnderscore: false,
  excludeDot: false,
});
const styleSettings = ref<StyleSettings>({
  baseName: "",
  style: "number-replace",
  suffix: "",
  customWord: "",
});

const styleOptions = [
  { value: "number-replace", label: "数字置き換え (kaori→ka0ri)" },
  { value: "vowel-repeat", label: "母音連続 (nana→naaaana)" },
  { value: "dot-separate", label: "ドット区切り (mio→m.i.o)" },
  { value: "underscore-separate", label: "アンダースコア区切り (yuko→yu_ko)" },
  { value: "emoji-style", label: "絵文字風 (heart→s2)" },
  { value: "self-intro", label: "自己紹介風 (iam_名前)" },
  { value: "hobby", label: "趣味組み合わせ (名前_hobby)" },
  { value: "gram-style", label: "インスタ風 (名前.gram)" },
  { value: "korean-style", label: "韓国語風" },
  { value: "slang", label: "英語スラング" },
  { value: "french", label: "フランス語風" },
  { value: "alphabet-to-number", label: "アルファベット→数字" },
];

onMounted(() => {
  generateUsername();
});

const showNotification = (message: string, type: 'success' | 'error') => {
  notification.value = {
    show: true,
    message,
    type,
  };
  
  // 5秒後に自動で閉じる
  setTimeout(() => {
    closeNotification();
  }, 5000);
};

const closeNotification = () => {
  notification.value.show = false;
};

const generateUsername = async () => {
  if (listplace.value < 0) {
    await createNewUsername();
  } else if (listplace.value < namelist.value.length - 1) {
    const newPlace = listplace.value + 1;
    listplace.value = newPlace;
    currentUsername.value = namelist.value[newPlace];
  } else {
    await createNewUsername();
  }
};

const createNewUsername = async () => {
  try {
    isGenerating.value = true;
    
    const requestBody = {
      type: activeTab.value as 'random' | 'styled',
      count: 1,
      ...(activeTab.value === 'random' && { filters: filters.value }),
      ...(activeTab.value === 'styled' && { styleSettings: styleSettings.value }),
    };

    const response = await $fetch('/api/v1/generate-username', {
      method: 'POST',
      body: requestBody,
    }) as { usernames: string[] };

    if (response?.usernames && response.usernames.length > 0) {
      const newUsernames = response.usernames;
      namelist.value.push(...newUsernames);
      listplace.value = namelist.value.length - newUsernames.length;
      currentUsername.value = newUsernames[0];
    }
  } catch (error: any) {
    console.error('Error generating username:', error);
    if (error.data?.statusMessage) {
      showNotification(error.data.statusMessage, 'error');
    } else {
      showNotification('ユーザーネームの生成に失敗しました。', 'error');
    }
  } finally {
    isGenerating.value = false;
  }
};

const backUsername = () => {
  if (listplace.value > 0) {
    const newPlace = listplace.value - 1;
    listplace.value = newPlace;
    currentUsername.value = namelist.value[newPlace];
  }
};

const copyUsername = async () => {
  try {
    await navigator.clipboard.writeText(currentUsername.value);
    showNotification('コピーしました！', 'success');
  } catch (err) {
    console.error("Failed to copy: ", err);
    showNotification('コピーに失敗しました。', 'error');
  }
};

const resetFilters = () => {
  filters.value = {
    requiredChars: "",
    excludedChars: "",
    excludeHyphen: false,
    excludeUnderscore: false,
    excludeDot: false,
  };
};

const resetStyleSettings = () => {
  styleSettings.value = {
    baseName: "",
    style: "number-replace",
    suffix: "",
    customWord: "",
  };
};

const getStyleLabel = (value: string) => {
  const option = styleOptions.find(opt => opt.value === value);
  return option ? option.label : value;
};

const selectStyle = (value: string) => {
  styleSettings.value.style = value;
  showStyleSelect.value = false;
};
</script>
