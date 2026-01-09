<div id="top"></div>

# Dreamer
### ストーリー
<!-- プロジェクトについて -->
以前制作したご褒美機能つきのTodoアプリ「Dreamer」をブラッシュアップしました。フォームのサーバー側のバリデーション強化や、ユーザーがストレージに画像をアップロードできるようにしました。それに伴い、DBの変更、よりストーリーに合うUIの変更、styled-componentsからTailwind CSSに変更し、余分なstyleやthemeの削除を行うことでコードを見やすくしました。テスト内容を前回より増やし、全体的に保守性をアップした変更を行いました。


## URL
https://dreamer-app.vercel.app
 <br >
テストユーザーでログインから、ユーザー名とパスワードを入力せずにログインできます。

https://asami-portfolio.vercel.app/projects/dreamer-app
<br>
Dreamer詳細(ポートフォリオ)

https://github.com/Asami222/dreamer
<br>
アップデート前のDreamer詳細（アプリ自体は現在稼働していません）
## 使用技術一覧

<!-- シールド一覧 -->
<!-- 該当するプロジェクトの中から任意のものを選ぶ-->
<p style="display: inline">
  <!-- フロントエンドの言語一覧 -->
  <img src="https://img.shields.io/badge/-typescript-000000?style=for-the-badge&logo=typescript&logoColor=FFE500">
  <!-- フロントエンドのフレームワーク一覧 -->
  <img src="https://img.shields.io/badge/-react-000000?style=for-the-badge&logo=react&logoColor=61DAFB">
  <img src="https://img.shields.io/badge/-Next.js-000000.svg?logo=next.js&style=for-the-badge">
  <img src="https://img.shields.io/badge/-prisma-000000.svg?logo=prisma&style=for-the-badge">
  <img src="https://img.shields.io/badge/-supabase-000000.svg?logo=supabase&style=for-the-badge">
  <img src="https://img.shields.io/badge/-tailwindcss-000000?style=for-the-badge&logo=tailwindcss&logoColor=0854C1">
  <img src="https://img.shields.io/badge/-headlessui-000000?style=for-the-badge&logo=headlessui&logoColor=66E3FF">
  <img src="https://img.shields.io/badge/-mui-000000?style=for-the-badge&logo=mui&logoColor=007FFF">
  <img src="https://img.shields.io/badge/-storybook-000000?style=for-the-badge&logo=storybook&logoColor=FF4785">
  <img src="https://img.shields.io/badge/-vitest-000000?style=for-the-badge&logo=vitest&logoColor=6E9F18">
  <!-- バックエンドの言語一覧 -->
  <!-- ミドルウェア一覧 -->
  <!-- インフラ一覧 -->
</p>

## 機能一覧
- ユーザー認証、データ管理、画像アップロード ( Supabase Auth、Supabase Postgres、Supabase Storage )
- ORM (Prisma)
- データ取得・更新API ( Server Action、route handler)

## アップデート前との違い
- ルーティング ( Pages Router  →  App Router )
- CSS ( styled-components  →  Tailwind CSS )
- DB ( Heroku  →  Supabase )
- ストレージ ( なし  →  Supabase Storage )
- データ取得 ( SWR・fetcher  →  route handler・fetcher / Server Actions )
- サーバー側バリデーション( json-server  →  フロントエンド側と共通のzodスキーマ )

<!-- 
- ユーザー登録、ログイン機能(devise)
- 投稿機能
  - 画像投稿(refile)
  - 位置情報検索機能(geocoder)
- いいね機能(Ajax)
  - ランキング機能
- コメント機能(Ajax)
- フォロー機能(Ajax)
- ページネーション機能(kaminari)
  - 無限スクロール(Ajax)
- 検索機能(ransack)
-->
## テスト構成
| 内容                         | ライブラリ・ツール                 |
| --------------------------- | ------------------------------- |
| Formのバリデーションチェック    | Zod　　                          |
| UI確認&アクセシビリティチェック  | Storybook                       |
| 単体テスト                    | vitest + @testing-library/react |
| 結合テストまたはE2Eテスト       | PlayWright                      |
  

## 環境

<!-- 言語、フレームワーク、ミドルウェア、インフラの一覧とバージョンを記載 -->

| 言語・フレームワーク他 | バージョン |
| --------------------- | ---------- |
| Node.js               | v24.5.0    |
| React                 | ^19.2.0     |
| Next.js               | ^16.0.7     |
| storybook             | ^9.1.15     |
| prisma                | 6.19     |

その他のパッケージのバージョンは package.json を参照してください. 


## プロジェクト詳細

<h3 align="center">UIの変更</h3>
<p>
Dreamerのアプリ内容により合わせるため、背景色などを変更し、透明感や軽さを出しました。
</p>
<p align="center">
  <img src="https://raw.githubusercontent.com/Asami222/dreamer-app/main/public/git/1.webp" width="328" style="max-width: 100%;" />
</p>
<br />
<h3 align="center">サーバー側とフロント側の共通のバリデーション</h3>
<p>
Server Actions内で、フロント側と共通のzodスキーマを利用することで、バリデーション内容の違いを防いでいます。
</p>
<p align="center">
  <img src="https://raw.githubusercontent.com/Asami222/dreamer-app/main/public/git/2.webp" width="328" style="max-width: 100%;" />
</p>
<br />
<h3 align="center">パスワードリセットフォームの設置</h3>
<p>
前回はなかったパスワードリセットの設定を取り入れることで、UXを良くしました。
</p>
<p align="center">
  <img src="https://raw.githubusercontent.com/Asami222/dreamer-app/main/public/git/3.webp" width="328" style="max-width: 100%;" />
</p>
<br />
<h3 align="center">Storageの追加</h3>
<p>
Supabase Storageを利用し、ユーザーがストレージに画像をアップロードできるようにしました。前回では仮の画像を表示していましたが、今回は、ユーザーがアップロードした画像を表示できます。
</p>
<p align="center">
  <img src="https://raw.githubusercontent.com/Asami222/dreamer-app/main/public/git/4.webp" width="328" style="max-width: 100%;" />
</p>

<p align="right">(<a href="#top">トップへ</a>)</p>
