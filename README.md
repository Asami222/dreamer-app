<div id="top"></div>

# Dreamer
### ストーリー
<!-- プロジェクトについて -->
以前制作したご褒美機能つきのTodoアプリ「Dreamer」を改修しました。フォームのサーバー側のバリデーション強化や、ユーザーがストレージに画像をアップロードできるようにしました。それに伴い、DBの変更、よりストーリーに合うUIの変更、styled-componentsからtailwindcssに変更し、余分なstyleやthemaの削除を行うことでコードを見やすくしました。テスト内容を前回より増やし、全体的に保守性をアップした変更を行いました。


## URL
https://dreamer-app.vercel.app
 <br >
テストユーザーでログインから、ユーザー名とパスワードを入力せずにログインできます。

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
- ユーザー認証、データ管理 ( Supabase、Supabase Auth )
- ORM (Prisma)
- データ取得・更新API ( Server Action )

## アップデート前との違い
- データ取得 ( SWR・fetcher  →  route handler/Server Actions )
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

<h3 align="center">ログイン状態による画像表示の切り替え</h3>
<p>
useContextフックを使用し、グローバルにユーザーのログイン状態を管理しています。未ログイン、ユーザーイメージを登録済の場合のログイン、イメージを登録していない場合のログイン状態で表示画像を切り替え分かりやすいUIにしています。
</p>
<p align="center">
  <img src="https://raw.githubusercontent.com/Asami222/dreamer-app/main/public/git/1.webp" width="500" style="max-width: 100%;" />
</p>
<h3 align="center">新規登録の場合のみ表示</h3>
<p>
新規登録でユーザー情報を登録した場合は、新規登録の時にだけ表示するページに移行するようになっています。
</p>
<p align="center">
  <img src="https://raw.githubusercontent.com/Asami222/dreamer-app/main/public/git/2.webp" width="500" style="max-width: 100%;" />
</p>
<h3 align="center">ユーザーフォームとご褒美設定フォーム</h3>
<p>
ユーザー情報は後から、ポップアップのメニューより内容を編集することができます。ユーザー設定、ご褒美設定はどちらもreact-hook-formを使用してバリデーションチェックをしています。
</p>
<p align="center">
  <img src="https://raw.githubusercontent.com/Asami222/dreamer-app/main/public/git/3.webp" width="500" style="max-width: 100%;" />
</p>
<h3 align="center">Todoページ</h3>
<p>
TodoはuseContextでグローバルに状態管理し、useReducerで作成、削除などの更新関数を作成し、フォームやTodoページのコピー、完了ボタンで使用しています。フォームではreact-hook-formを利用しバリデーションチェックを行なっています。
</p>
<p align="center">
  <img src="https://raw.githubusercontent.com/Asami222/dreamer-app/main/public/git/4.webp" width="500" style="max-width: 100%;" />
</p>

<p align="right">(<a href="#top">トップへ</a>)</p>
