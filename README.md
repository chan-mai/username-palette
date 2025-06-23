# Username Palette

インスタやTikTokなどのSNSで使える、いい感じのエモいユーザーネームを生成するWebアプリケーションです。  
[読めないユーザーネームメーカー](https://username-maker.com/)がサ終するらしいので、少しの機能拡張を加え、互換アプリを作成しました。  

## 🌟 特徴

- **ランダム生成**: 完全にランダムなユーザーネームを生成
- **スタイル生成**: ベース名から様々なスタイルのユーザーネームを生成
- **カスタマイズ可能**: 必須文字、除外文字、スタイル設定など細かい条件を指定可能
- **モダンなUI**: よくある淡いパステル系のえもえもUI

## 🎨 生成スタイル

### ランダム生成
- 完全にランダムな7文字のユーザーネーム
- フィルター機能で条件を指定可能

### スタイル生成
- **数字置換**: o→0, i→1, e→3 など
- **母音繰り返し**: a→aaa, i→iii など
- **ドット区切り**: 文字間にドットを挿入
- **アンダースコア区切り**: 文字間にアンダースコアを挿入
- **絵文字スタイル**: 絵文字風の表現
- **自己紹介風**: iam_, _dayo, _desu など
- **趣味系**: coffee, music, art など
- **グラム風**: gram, style, ism など
- **韓国風**: 韓国語風の表現
- **スラング**: love→luv, thanks→thx など
- **フランス風**: フランス語風の表現
- **アルファベット→数字**: a→1, b→2 など

## 🚀 技術スタック

- **フロントエンド**: Nuxt 3, Vue 3, TypeScript
- **スタイリング**: Tailwind CSS
- **アイコン**: @nuxt/icon
- **デプロイ**: Cloudflare Workers
- **パッケージマネージャー**: pnpm
- **分析**: Google Analytics (gtag)

## 📦 セットアップ

### 前提条件
- Node.js 18以上
- pnpm

### インストール

```bash
# 依存関係をインストール
pnpm install
```

### 開発サーバー

```bash
# 開発サーバーを起動 (http://localhost:3000)
pnpm dev
```

### ビルド

```bash
# 本番用ビルド
pnpm build

# Cloudflare用ビルド
pnpm build:cf
```

### プレビュー

```bash
# 本番ビルドのローカルプレビュー
pnpm preview
```

## 🌐 デプロイ

このプロジェクトはCloudflare Workersにデプロイされています。

```bash
# Cloudflare Workersにデプロイ
pnpm deploy
```

### デプロイ設定
- **ドメイン**: username-palette.mq1.dev
- **プラットフォーム**: Cloudflare Workers
- **ビルドコマンド**: `pnpm run build:cf`

## 📁 プロジェクト構造

```
username-maker/
├── app.vue                 # アプリケーションのルートコンポーネント
├── assets/                 # 静的アセット
│   └── css/
│       └── main.css       # メインCSSファイル
├── components/            # Vueコンポーネント
│   └── ui/               # UIコンポーネント
├── layouts/              # レイアウトファイル
├── pages/               # ページコンポーネント
│   └── index.vue        # メインページ
├── server/              # サーバーサイドAPI
│   └── api/
│       └── generate-username.post.ts  # ユーザーネーム生成API
├── nuxt.config.ts       # Nuxt設定
├── tailwind.config.js   # Tailwind CSS設定
├── wrangler.toml        # Cloudflare Workers設定
└── package.json         # 依存関係
```


## 📊 機能詳細
### フィルター機能
- **必須文字**: 指定した文字を含むユーザーネームのみ生成
- **除外文字**: 指定した文字を含まないユーザーネームのみ生成
- **特殊文字除外**: ハイフン(-)、アンダースコア(_)、ドット(.)の除外設定

### スタイル設定
- **ベース名**: スタイル生成の基となる名前
- **スタイル**: 適用するスタイルの種類
- **カスタムワード**: 追加するカスタムワード
- **サフィックス**: 末尾に追加する文字列

## 🤝 コントリビューション

1. このリポジトリをフォーク
2. 機能ブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'feat: some amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. PRを作成

## 📄 ライセンス
このプロジェクトはAGPL-3.0ライセンスの下で公開されています。


## 🔗 リンク

- **本番サイト**: https://username-palette.mq1.dev
- **Nuxt 3**: https://nuxt.com/
- **Tailwind CSS**: https://tailwindcss.com/
- **Cloudflare Workers**: https://workers.cloudflare.com/
