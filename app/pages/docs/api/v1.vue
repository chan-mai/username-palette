<template>
  <div class="min-h-screen bg-slate-50">
    <!-- Header -->
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-6">
          <div class="flex items-center justify-center">
            <h1 class="text-2xl font-bold text-slate-900">Username Palette API</h1>
            <span class="ml-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-100 text-rose-800">
              v1
            </span>
          </div>
          <NuxtLink to="/" class="text-rose-400 hover:text-rose-200 transition-colors font-medium">
            ホームに戻る
          </NuxtLink>
        </div>
      </div>
    </header>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <!-- Sidebar Navigation -->
        <div class="lg:col-span-1">
          <nav class="sticky top-8">
            <div class="bg-white rounded-lg border border-slate-200 p-4">
              <h3 class="text-sm font-semibold text-slate-900 mb-4">目次</h3>
              <ul class="space-y-2">
                <li v-for="section in sections" :key="section.id">
                  <NuxtLink 
                    :to="`#${section.id}`"
                    class="text-sm text-slate-600 hover:text-rose-300 transition-colors block py-1"
                    @click="scrollToSection(section.id)"
                  >
                    {{ section.title }}
                  </NuxtLink>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        <!-- Main Content -->
        <div class="lg:col-span-3 space-y-8">
          <!-- Overview -->
          <section id="overview" class="bg-white rounded-lg border border-slate-200 p-6">
            <h2 class="text-xl font-semibold text-slate-900 mb-4">概要</h2>
            <p class="text-slate-600 mb-4">
              Username Palette APIは、ランダムなユーザー名やスタイル付きのユーザー名を生成するためのRESTful APIです。
              フィルター機能や様々なスタイルオプションを提供し、アプリケーションにユーザー名生成機能を簡単に統合できます。
            </p>
            
            <div class="bg-slate-50 rounded-lg p-4 mb-4">
              <h4 class="font-medium text-slate-900 mb-2">Base URL</h4>
              <code class="text-sm bg-white px-2 py-1 rounded border">https://username-palette.mq1.dev/api/v1</code>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 class="font-medium text-green-900 mb-2">認証</h4>
                <p class="text-sm text-green-700">現在のところ認証は不要です</p>
              </div>
              <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 class="font-medium text-blue-900 mb-2">レート制限</h4>
                <p class="text-sm text-blue-700">1分間に100リクエスト</p>
              </div>
            </div>
          </section>

          <!-- Endpoints -->
          <section id="endpoints" class="bg-white rounded-lg border border-slate-200 p-6">
            <h2 class="text-xl font-semibold text-slate-900 mb-6">エンドポイント</h2>
            
            <!-- Generate Username Endpoint -->
            <div class="border border-slate-200 rounded-lg overflow-hidden">
              <div class="bg-slate-50 px-4 py-3 border-b border-slate-200">
                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-3">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      POST
                    </span>
                    <code class="text-sm font-mono">/generate-username</code>
                  </div>
                  <span class="text-sm text-slate-500">ユーザー名生成</span>
                </div>
              </div>
              
              <div class="p-4 space-y-4">
                <div>
                  <h4 class="font-medium text-slate-900 mb-2">説明</h4>
                  <p class="text-sm text-slate-600">
                    ランダムなユーザー名またはスタイル付きのユーザー名を生成します。
                    <code>type</code>パラメータで生成タイプを指定してください。
                  </p>
                </div>

                <div>
                  <h4 class="font-medium text-slate-900 mb-2">リクエストボディ</h4>
                  <div class="bg-slate-900 rounded-lg p-4 overflow-x-auto">
                    <pre class="text-sm text-slate-100"><code>{
  "type": "random" | "styled",
  "count": number, // 1-100の間で指定（省略時は1）
  "filters": {
    "requiredChars": "string",
    "excludedChars": "string", 
    "excludeHyphen": boolean,
    "excludeUnderscore": boolean,
    "excludeDot": boolean
  },
  "styleSettings": {
    "baseName": "string",
    "style": "string",
    "suffix": "string",
    "customWord": "string"
  }
}</code></pre>
                  </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 class="font-medium text-slate-900 mb-2">成功レスポンス (200)</h4>
                    <div class="bg-green-50 border border-green-200 rounded-lg p-4">
                      <pre class="text-sm text-green-800"><code>{
  "usernames": ["generated_username"]
}</code></pre>
                    </div>
                  </div>
                  
                  <div>
                    <h4 class="font-medium text-slate-900 mb-2">複数生成レスポンス (200)</h4>
                    <div class="bg-green-50 border border-green-200 rounded-lg p-4">
                      <pre class="text-sm text-green-800"><code>{
  "usernames": ["username1", "username2", "username3"]
}</code></pre>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 class="font-medium text-slate-900 mb-2">エラーレスポンス (400)</h4>
                  <div class="bg-red-50 border border-red-200 rounded-lg p-4">
                    <pre class="text-sm text-red-800"><code>{
  "statusCode": 400,
  "statusMessage": "エラーメッセージ"
}</code></pre>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- Examples -->
          <section id="examples" class="bg-white rounded-lg border border-slate-200 p-6">
            <h2 class="text-xl font-semibold text-slate-900 mb-6">使用例</h2>
            
            <div class="space-y-6">
              <!-- Random Generation Example -->
              <div class="border border-slate-200 rounded-lg overflow-hidden">
                <div class="bg-slate-50 px-4 py-3 border-b border-slate-200">
                  <h4 class="font-medium text-slate-900">ランダム生成の例</h4>
                </div>
                <div class="p-4">
                  <div class="mb-4">
                    <h5 class="font-medium text-slate-900 mb-2">リクエスト</h5>
                    <div class="bg-slate-900 rounded-lg p-4 overflow-x-auto">
                      <pre class="text-sm text-slate-100"><code>curl -X POST https://username-palette.mq1.dev/api/generate-username \
  -H "Content-Type: application/json" \
  -d '{
    "type": "random",
    "filters": {
      "requiredChars": "x8",
      "excludedChars": "abc",
      "excludeHyphen": true,
      "excludeUnderscore": false,
      "excludeDot": false
    }
  }'</code></pre>
                    </div>
                  </div>
                  
                  <div>
                    <h5 class="font-medium text-slate-900 mb-2">レスポンス</h5>
                    <div class="bg-green-50 border border-green-200 rounded-lg p-4">
                      <pre class="text-sm text-green-800"><code>{
  "usernames": ["nox8l3n"]
}</code></pre>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Styled Generation Example -->
              <div class="border border-slate-200 rounded-lg overflow-hidden">
                <div class="bg-slate-50 px-4 py-3 border-b border-slate-200">
                  <h4 class="font-medium text-slate-900">スタイル生成の例</h4>
                </div>
                <div class="p-4">
                  <div class="mb-4">
                    <h5 class="font-medium text-slate-900 mb-2">リクエスト</h5>
                    <div class="bg-slate-900 rounded-lg p-4 overflow-x-auto">
                      <pre class="text-sm text-slate-100"><code>curl -X POST https://username-palette.mq1.dev/api/generate-username \
  -H "Content-Type: application/json" \
  -d '{
    "type": "styled",
    "styleSettings": {
      "baseName": "kaori",
      "style": "number-replace",
      "suffix": "2024",
      "customWord": "coffee"
    }
  }'</code></pre>
                    </div>
                  </div>
                  
                  <div>
                    <h5 class="font-medium text-slate-900 mb-2">レスポンス</h5>
                    <div class="bg-green-50 border border-green-200 rounded-lg p-4">
                      <pre class="text-sm text-green-800"><code>{
  "usernames": ["k40r1_coffee2024"]
}</code></pre>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Multiple Generation Example -->
              <div class="border border-slate-200 rounded-lg overflow-hidden">
                <div class="bg-slate-50 px-4 py-3 border-b border-slate-200">
                  <h4 class="font-medium text-slate-900">複数生成の例</h4>
                </div>
                <div class="p-4">
                  <div class="mb-4">
                    <h5 class="font-medium text-slate-900 mb-2">リクエスト</h5>
                    <div class="bg-slate-900 rounded-lg p-4 overflow-x-auto">
                      <pre class="text-sm text-slate-100"><code>curl -X POST https://username-palette.mq1.dev/api/generate-username \
  -H "Content-Type: application/json" \
  -d '{
    "type": "random",
    "count": 5,
    "filters": {
      "requiredChars": "x8",
      "excludedChars": "abc",
      "excludeHyphen": true,
      "excludeUnderscore": false,
      "excludeDot": false
    }
  }'</code></pre>
                    </div>
                  </div>
                  
                  <div>
                    <h5 class="font-medium text-slate-900 mb-2">レスポンス</h5>
                    <div class="bg-green-50 border border-green-200 rounded-lg p-4">
                      <pre class="text-sm text-green-800"><code>{
  "usernames": [
    "nox8l3n",
    "x8m3q2p",
    "k8x2n4r",
    "x8p5m1q",
    "n8x3l2k"
  ]
}</code></pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- Style Options -->
          <section id="styles" class="bg-white rounded-lg border border-slate-200 p-6">
            <h2 class="text-xl font-semibold text-slate-900 mb-6">スタイルオプション</h2>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div v-for="style in styleOptions" :key="style.value" class="border border-slate-200 rounded-lg p-4">
                <h4 class="font-medium text-slate-900 mb-2">{{ style.label }}</h4>
                <p class="text-sm text-slate-600 mb-2">{{ style.description }}</p>
                <div class="bg-slate-50 rounded p-2">
                  <code class="text-xs text-slate-700">{{ style.value }}</code>
                </div>
              </div>
            </div>
          </section>

          <!-- Code Samples -->
          <section id="code-samples" class="bg-white rounded-lg border border-slate-200 p-6">
            <h2 class="text-xl font-semibold text-slate-900 mb-6">コードサンプル</h2>
            
            <div class="space-y-6">
              <!-- JavaScript Example -->
              <div class="border border-slate-200 rounded-lg overflow-hidden">
                <div class="bg-slate-50 px-4 py-3 border-b border-slate-200">
                  <h4 class="font-medium text-slate-900">JavaScript (Fetch API)</h4>
                </div>
                <div class="p-4">
                  <div class="bg-slate-900 rounded-lg p-4 overflow-x-auto">
                    <pre class="text-sm text-slate-100"><code>// 単一生成
async function generateUsername() {
  try {
    const response = await fetch('/api/generate-username', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'random',
        count: 1,
        filters: {
          requiredChars: 'x8',
          excludedChars: 'abc',
          excludeHyphen: true,
          excludeUnderscore: false,
          excludeDot: false
        }
      })
    });

    const data = await response.json();
    console.log('Generated username:', data.usernames[0]);
    return data.usernames[0];
  } catch (error) {
    console.error('Error generating username:', error);
  }
}

// 複数生成
async function generateMultipleUsernames() {
  try {
    const response = await fetch('/api/generate-username', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'random',
        count: 5,
        filters: {
          requiredChars: 'x8',
          excludedChars: 'abc',
          excludeHyphen: true,
          excludeUnderscore: false,
          excludeDot: false
        }
      })
    });

    const data = await response.json();
    console.log('Generated usernames:', data.usernames);
    return data.usernames;
  } catch (error) {
    console.error('Error generating usernames:', error);
  }
}</code></pre>
                  </div>
                </div>
              </div>

              <!-- Python Example -->
              <div class="border border-slate-200 rounded-lg overflow-hidden">
                <div class="bg-slate-50 px-4 py-3 border-b border-slate-200">
                  <h4 class="font-medium text-slate-900">Python (requests)</h4>
                </div>
                <div class="p-4">
                  <div class="bg-slate-900 rounded-lg p-4 overflow-x-auto">
                    <pre class="text-sm text-slate-100"><code>import requests
import json

# 単一生成
def generate_username():
    url = "https://username-palette.mq1.dev/api/generate-username"
    
    payload = {
        "type": "styled",
        "count": 1,
        "styleSettings": {
            "baseName": "kaori",
            "style": "number-replace",
            "suffix": "2024",
            "customWord": "coffee"
        }
    }
    
    headers = {
        "Content-Type": "application/json"
    }
    
    try:
        response = requests.post(url, json=payload, headers=headers)
        response.raise_for_status()
        
        data = response.json()
        print(f"Generated username: {data['usernames'][0]}")
        return data['usernames'][0]
        
    except requests.exceptions.RequestException as e:
        print(f"Error generating username: {e}")
        return None

# 複数生成
def generate_multiple_usernames():
    url = "https://username-palette.mq1.dev/api/generate-username"
    
    payload = {
        "type": "random",
        "count": 5,
        "filters": {
            "requiredChars": "x8",
            "excludedChars": "abc",
            "excludeHyphen": True,
            "excludeUnderscore": False,
            "excludeDot": False
        }
    }
    
    headers = {
        "Content-Type": "application/json"
    }
    
    try:
        response = requests.post(url, json=payload, headers=headers)
        response.raise_for_status()
        
        data = response.json()
        print(f"Generated usernames: {data['usernames']}")
        return data['usernames']
        
    except requests.exceptions.RequestException as e:
        print(f"Error generating usernames: {e}")
        return None</code></pre>
                  </div>
                </div>
              </div>

              <!-- Node.js Example -->
              <div class="border border-slate-200 rounded-lg overflow-hidden">
                <div class="bg-slate-50 px-4 py-3 border-b border-slate-200">
                  <h4 class="font-medium text-slate-900">Node.js (axios)</h4>
                </div>
                <div class="p-4">
                  <div class="bg-slate-900 rounded-lg p-4 overflow-x-auto">
                    <pre class="text-sm text-slate-100"><code>const axios = require('axios');

// 単一生成
async function generateUsername() {
  try {
    const response = await axios.post('/api/generate-username', {
      type: 'random',
      count: 1,
      filters: {
        requiredChars: 'x8',
        excludedChars: 'abc',
        excludeHyphen: true,
        excludeUnderscore: false,
        excludeDot: false
      }
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log('Generated username:', response.data.usernames[0]);
    return response.data.usernames[0];
  } catch (error) {
    console.error('Error generating username:', error.response?.data || error.message);
  }
}

// 複数生成
async function generateMultipleUsernames() {
  try {
    const response = await axios.post('/api/generate-username', {
      type: 'random',
      count: 5,
      filters: {
        requiredChars: 'x8',
        excludedChars: 'abc',
        excludeHyphen: true,
        excludeUnderscore: false,
        excludeDot: false
      }
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log('Generated usernames:', response.data.usernames);
    return response.data.usernames;
  } catch (error) {
    console.error('Error generating usernames:', error.response?.data || error.message);
  }
}</code></pre>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- Error Codes -->
          <section id="error-codes" class="bg-white rounded-lg border border-slate-200 p-6">
            <h2 class="text-xl font-semibold text-slate-900 mb-6">エラーコード</h2>
            
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-slate-200">
                <thead class="bg-slate-50">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">ステータスコード</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">説明</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">解決方法</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-slate-200">
                  <tr>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">400</td>
                    <td class="px-6 py-4 text-sm text-slate-600">リクエストが無効です</td>
                    <td class="px-6 py-4 text-sm text-slate-600">リクエストボディの形式を確認してください</td>
                  </tr>
                  <tr>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">400</td>
                    <td class="px-6 py-4 text-sm text-slate-600">countパラメータが無効です</td>
                    <td class="px-6 py-4 text-sm text-slate-600">countは1-100の間で指定してください</td>
                  </tr>
                  <tr>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">400</td>
                    <td class="px-6 py-4 text-sm text-slate-600">フィルター条件が厳しすぎます</td>
                    <td class="px-6 py-4 text-sm text-slate-600">フィルター条件を緩めてください</td>
                  </tr>
                  <tr>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">500</td>
                    <td class="px-6 py-4 text-sm text-slate-600">サーバー内部エラー</td>
                    <td class="px-6 py-4 text-sm text-slate-600">しばらく時間をおいて再試行してください</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <!-- Support -->
          <section id="support" class="bg-white rounded-lg border border-slate-200 p-6">
            <h2 class="text-xl font-semibold text-slate-900 mb-6">サポート</h2>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 class="font-medium text-blue-900 mb-2">GitHub</h4>
                <p class="text-sm text-blue-700 mb-2">バグ報告や機能リクエストはGitHubのIssuesでお願いします。</p>
                <NuxtLink target="_blank" to="https://github.com/chan-mai/username-palette" class="text-blue-600 hover:text-blue-700 text-sm font-medium">リポジトリを見る →</NuxtLink>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { NuxtLink } from '#components';

// JSON-LD構造化データの設定
useJsonld(() => ({
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
  headline: 'Username Palette API Documentation',
  name: 'Username Palette API v1',
  description: 'Username Palette APIは、ランダムなユーザー名やスタイル付きのユーザー名を生成するためのRESTful APIです。',
  url: 'https://username-palette.mq1.dev/docs/api/v1',
  version: '1.0',
  inLanguage: 'ja',
  author: {
    '@type': 'Person',
    name: 'chan-mai'
  },
  publisher: {
    '@type': 'Organization',
    name: 'Username Palette',
    url: 'https://username-palette.mq1.dev'
  },
  datePublished: '2024-11-08',
  dateModified: '2024-11-08',
  mainEntity: {
    '@type': 'WebAPI',
    name: 'Username Palette API',
    description: 'ユーザー名生成API',
    documentation: 'https://username-palette.mq1.dev/docs/api/v1',
    termsOfService: 'https://username-palette.mq1.dev',
    provider: {
      '@type': 'Organization',
      name: 'Username Palette'
    }
  },
  about: {
    '@type': 'SoftwareApplication',
    name: 'Username Palette API',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Any'
  }
}));

const sections = [
  { id: 'overview', title: '概要' },
  { id: 'endpoints', title: 'エンドポイント' },
  { id: 'examples', title: '使用例' },
  { id: 'styles', title: 'スタイルオプション' },
  { id: 'code-samples', title: 'コードサンプル' },
  { id: 'error-codes', title: 'エラーコード' },
  { id: 'support', title: 'サポート' }
];

const styleOptions = [
  {
    value: 'number-replace',
    label: '数字置換',
    description: '文字を数字に置換します (o→0, i→1, e→3, a→4, s→5, g→6, t→7, b→8)'
  },
  {
    value: 'vowel-repeat',
    label: '母音繰り返し',
    description: '母音を3回繰り返します (a→aaa, i→iii, u→uuu, e→eee, o→ooo)'
  },
  {
    value: 'dot-separate',
    label: 'ドット区切り',
    description: '各文字をドットで区切ります'
  },
  {
    value: 'underscore-separate',
    label: 'アンダースコア区切り',
    description: '各文字をアンダースコアで区切ります'
  },
  {
    value: 'emoji-style',
    label: '絵文字スタイル',
    description: '絵文字風の表現に変換します'
  },
  {
    value: 'self-intro',
    label: '自己紹介風',
    description: '自己紹介風の接尾辞を追加します (iam_, _dayo, _desu, _chan, _kun)'
  },
  {
    value: 'hobby',
    label: '趣味風',
    description: '趣味を表す単語を追加します (coffee, music, art, photo, travel, food, game, book)'
  },
  {
    value: 'gram-style',
    label: 'gram風',
    description: 'gram風の接尾辞を追加します (gram, style, ism, official)'
  },
  {
    value: 'korean-style',
    label: '韓国語風',
    description: '韓国語風の表現に変換します'
  },
  {
    value: 'slang',
    label: 'スラング風',
    description: 'スラング風の略語に変換します (love→luv, thanks→thx, you→u)'
  },
  {
    value: 'french',
    label: 'フランス語風',
    description: 'フランス語風の表現に変換します'
  },
  {
    value: 'alphabet-to-number',
    label: 'アルファベット→数字',
    description: 'アルファベットを対応する数字に変換します (a→1, b→2, ...)'
  }
];

const scrollToSection = (id) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};
</script> 