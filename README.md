# Bloxd.io APIリファレンス（GitHub Pages用）

検索・カテゴリ絞り込み・詳細表を備えた静的サイトです。元の構造化ドキュメントにはコードAPIの紹介と型用語集しか含まれず、関数・コールバックなどの参照ページ内容が欠落していました。そのため不足分を[Bloxdy/code-api](https://github.com/Bloxdy/code-api)の公開リファレンスから補い、API関数228件、コールバック70件、設定項目190件、ブロック名1,179件、アイテム名1,044件のほか、アイコン・スキン・音声・パーティクル・モブバリエーション・AI状態の各カタログを収録しています。外部ライブラリやビルド工程は不要です。

## GitHub Pagesで公開する

1. このフォルダー内のファイルをGitHubリポジトリのルートに配置します。
2. リポジトリの **Settings → Pages** を開きます。
3. **Deploy from a branch** を選択し、公開元のブランチと `/(root)` を指定して保存します。
4. 公開URLにアクセスします。

`index.html`、`styles.css`、`app.js`、`data.js` は同じ階層に置いてください。

## 使い方

- API関数、コールバック、型名、引数、設定名、ブロック名、アイテム名、説明、コード例を検索できます。英語の識別子は単語の途中からでも検索できます。一致したコード例はスライドに絞り込まれます。
- 「BGM」などコード例の見出しでも検索できます。API関数やコールバックの行を開くと、その項目に対応する使用例が詳細欄に表示されます。
- コード例は56件収録しています。元資料の基本例に加え、[API Reference](https://github.com/Bloxdy/code-api/blob/main/API_REFERENCE.md)、[Client Options](https://github.com/Bloxdy/code-api/blob/main/CLIENT_OPTIONS.md)、[Mob Settings](https://github.com/Bloxdy/code-api/blob/main/MOB_SETTINGS.md)、[Mesh Entities](https://github.com/Bloxdy/code-api/blob/main/MESH_ENTITY_DOCS.md)、[QTE](https://github.com/Bloxdy/code-api/blob/main/QTE_DOCS.md)、[Particles](https://github.com/Bloxdy/code-api/blob/main/PARTICLES.md)、[Sounds & Music](https://github.com/Bloxdy/code-api/blob/main/SOUNDS_AND_MUSIC.md)、[Skins & Poses](https://github.com/Bloxdy/code-api/blob/main/SKINS_AND_POSES.md)、[Icons](https://github.com/Bloxdy/code-api/blob/main/ICONS.md)の各公開資料から実例を追加しています。設定オブジェクト例と、そのまま実行できる呼び出し例の両方を含みます。
- API関数228件とコールバック70件の概要・説明・引数説明は日本語です。関数名、引数名、型、シグネチャなどコード上の識別子は原文のまま掲載しています。
- アイコン・ポーズ・スキン・効果音・楽曲・パーティクル名も個別に検索できます。
- 左のカテゴリを選択して表示を絞り込めます。
- 行を選択すると、引数・フィールド表、シグネチャ、元の定義が開きます。該当する公開出典へのリンクも表示します。
- モブのスポーン設定では、`spawnerId`（スポーンを要求したプレイヤーのID）、`mobDbId`（保存・復元用のID）、戻り値の`MobId`の違いを日本語の説明とコード例で確認できます。
- コード例は前後ボタン、ページ位置、ドット、左右矢印キーで切り替えられます。
- `/` キーで検索欄に移動し、`Escape` で検索を解除できます。

## 出典と注意

元のBloxd.io APIドキュメントを整理した非公式の参考資料です。ゲーム内APIの最新仕様は公式情報で確認してください。
