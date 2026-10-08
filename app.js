(() => {
  const data = window.BLOXD_API_DATA;
  if (!Array.isArray(data)) {
    document.querySelector("#tables").innerHTML =
      '<p class="load-error">APIデータを読み込めませんでした。data.js がサイトに含まれているか確認してください。</p>';
    return;
  }

  const examples = [
    {
      title: "BGMを再生",
      description: "対象プレイヤーのBGMを指定した曲に切り替えます。曲名は楽曲カタログから選べます。",
      code: 'api.setClientOption(myId, "music", "Juhani Junkala [Retro Game Music Pack] Level 1")',
    },
    {
      title: "BGMの音量を設定",
      description: "音楽の音量を設定します。値は0から1の範囲です。",
      code: 'api.setClientOption(myId, "musicVolumeLevel", 0.6)',
    },
    {
      title: "効果音を再生",
      description: "指定した位置を音源として効果音を鳴らします。",
      code: 'api.playSound(myId, "dig", 1, 1, { playerIdOrPos: myId })',
    },
    {
      title: "参加時に歓迎メッセージを送る",
      description: "プレイヤーがワールドに参加したとき、そのプレイヤーにメッセージを表示します。",
      code: 'onPlayerJoin = (playerId) => {\n    api.sendMessage(playerId, "ようこそ！")\n}',
    },
    {
      title: "ブロック名を取得",
      description: "座標 (0, 0, 0) にあるブロック名を取得してログに出力します。",
      code: "const blockName = api.getBlock([0, 0, 0])\napi.log(blockName)",
    },
    {
      title: "ブロックを設置",
      description: "座標 (0, 0, 0) に石ブロックを設置します。",
      code: 'api.setBlock([0, 0, 0], "Stone")',
    },
    {
      title: "プレイヤー一覧を取得",
      description: "ワールド内のプレイヤーID一覧をログに出力します。",
      code: "const playerIds = api.getPlayerIds()\napi.log(playerIds)",
    },
    {
      title: "PlayerIdを指定してモブをスポーン",
      description: "スポーンを要求したプレイヤーのIDと、永続保存用IDは別の値です。mobDbIdは保存・復元が必要な場合だけ指定します。",
      code: `// MobSpawnOpts<Pig> の使用例
const mobId = api.attemptSpawnMob("Pig", x, y, z, {
    spawnerId: playerId, // スポーンを要求したプレイヤーのPlayerId
    mobDbId: savedMobDbId, // 保存済みMobDbId（初回生成なら省略。MobIdとは別）
    name: "ブタ",
})
// 戻り値のmobIdは、今回スポーンしたモブ個体のMobId`,
    },
    {
      title: "プレイヤーをジャンプ",
      description: "上方向の速度を設定して、プレイヤーをジャンプさせます。",
      code: "api.setVelocity(myId, 0, 9, 0)",
    },
    {
      title: "プレイヤーを押し出す",
      description: "インパルスを加えて、プレイヤーを押し出します。",
      code: "api.applyImpulse(myId, 9, 0, 9)",
    },
    {
      title: "自分にメッセージを送る",
      description: "色を指定して、自分にメッセージを表示します。",
      code: 'api.sendMessage(myId, "こんにちは！", { color: "orange" })',
    },
    {
      title: "全プレイヤーに告知",
      description: "全プレイヤーに赤色のメッセージを送ります。",
      code: 'api.broadcastMessage("お知らせ", { color: "red" })',
    },
    {
      title: "空中にテキストを表示",
      description: "画面中央に飛び出すテキストを表示します。",
      code: 'const speed = 100\napi.sendFlyingMiddleMessage(myId, ["表示するメッセージ"], speed)',
    },
    {
      title: "体力を設定して記録",
      description: "変更前の体力を取得し、体力を99に設定してから古い値を出力します。",
      code: 'const oldHealth = api.getHealth(myId)\napi.setHealth(myId, 99)\napi.log("変更前の体力:", oldHealth)',
    },
    {
      title: "自分以外のプレイヤーを取得",
      description: "プレイヤー一覧から自分のIDを除外して返す関数です。",
      code: "getOtherIds = () => {\n    const ids = api.getPlayerIds()\n    const otherIds = []\n    for (const id of ids) {\n        if (id !== myId) {\n            otherIds.push(id)\n        }\n    }\n    return otherIds\n}",
    },
    {
      title: "他プレイヤーをゾンビ風にする",
      description: "自分以外のプレイヤーのポーズと頭のスキンを変更します。",
      code: 'for (const otherId of getOtherIds()) {\n    api.setPlayerPose(otherId, "zombie")\n    api.changePlayerIntoSkin(otherId, "head", "zombie")\n}',
    },
    {
      title: "全員を浮遊する魔法使い風にする",
      description: "全プレイヤーのポーズと頭のスキンを変更します。",
      code: 'for (const playerId of api.getPlayerIds()) {\n    api.setPlayerPose(playerId, "driving")\n    api.changePlayerIntoSkin(playerId, "head", "wizard")\n}',
    },
    {
      title: "長い処理を中断可能にする",
      description: "実行時間の上限に近づいたら進捗を保存してループを抜け、次回再開できるようにします。",
      code: `let savedLoopCounter = 0

for (let i = savedLoopCounter; i < 1000; i++) {
    if (api.isNearInterrupt()) {
        savedLoopCounter = i
        break
    }

    someExpensiveFunction()
}`,
    },
    {
      title: "ダブルジャンプを有効にする",
      description: "プレイヤーの空中ジャンプ回数を1回に設定します。",
      code: 'api.setClientOption(myId, "airJumpCount", 1)',
    },
    {
      title: "最大体力を増やす",
      description: "プレイヤーの最大体力を200に設定します。",
      code: 'api.setClientOption(myId, "maxHealth", 200)',
    },
    {
      title: "リーダーボードの表示名を設定",
      description: "ロビーのリーダーボードに表示する名前と並び順を設定します。",
      code: `{
    name: {
        displayName: "Name",
        sortPriority: 0,
    },
}`,
    },
    {
      title: "モブの防具構成を設定",
      description: "モブ設定に渡す防具データの例です。ヘルメットにはエンチャント段階を指定しています。",
      code: `{
    "Helmet": {
        itemName: "Diamond Helmet",
        enchantmentTier: "Tier 5",
    },
    "Boots": {
        itemName: "Iron Boots",
    },
}`,
    },
    {
      title: "モブの戦闘テザーを設定",
      description: "射程とパーティクル色を含む戦闘テザー設定の例です。",
      code: `{
    range: 11,
    particleOpts: {
        texture: "soul_0",
        colorGradients: [
            {
                timeFraction: 0,
                minColor: [245, 35, 25, 1],
                maxColor: [255, 45, 35, 1],
            },
        ],
    },
}`,
    },
    {
      title: "モブの回避動作を設定",
      description: "回避確率、角度、インパルスを指定する設定データの例です。",
      code: `{
    probability: 0.6,
    minAngle: Math.PI * 0.35,
    maxAngle: Math.PI * 0.6,
    impulse: 8,
}`,
    },
    {
      title: "モブのドロップ品を設定",
      description: "倒されたときに生ポークチョップを1〜3個落とす設定の例です。",
      code: `[
    {
        itemName: "Raw Porkchop",
        probabilityOfDrop: 1,
        dropMinAmount: 1,
        dropMaxAmount: 3,
    },
]`,
    },
    {
      title: "ペットの友好度データを設定",
      description: "ペットの友好度や給餌履歴を表す設定オブジェクトの例です。",
      code: `{
    friendshipPoints: 0,
    lastFedAt: null,
    highestFriendshipLevelReached: 0,
    superlikedFood: null,
    superlikedFoodKnown: false,
    bonusesGained: [],
}`,
    },
    {
      title: "モブの手なずけ設定を構成",
      description: "手なずけに使うアイテム、確率、好物、レベルアップ報酬を含む設定例です。",
      code: `{
    tameItemName: ["Apple"],
    probabilityOfTame: 1,
    isSaddleable: false,
    supportsFriendship: true,
    likedFoods: [
        "Plum",
        "Cracked Coconut",
        "Pumpkin Pie",
        "Bowl of Rice",
        "Melon Slice",
        "Gold Melon Slice",
        "Corn",
        "Bowl of Cranberries",
        "Mushroom Soup",
        "Chili Pepper",
        "Carrot",
        "Beetroot",
        "Raw Potato",
        "Baked Potato",
    ],
    neutralFoods: ["Watermelon Slice", "Gold Watermelon Slice", "Apple", "Wheat", "Pear", "Cherry", "Bread"],
    dislikedFoods: [
        "Raw Porkchop",
        "Raw Beef",
        "Raw Mutton",
        "Raw Venison",
        "Cooked Porkchop",
        "Steak",
        "Cooked Mutton",
        "Cooked Venison",
        "Rotten Flesh",
        "Banana",
        "Rotten Brain",
    ],
    guaranteedDrop: "Truffle",
    commonDrops: ["Poop", "Wheat Seeds"],
    levelUpBonuses: {
        "1": "Renaming",
        "2": "Special Drops",
        "3": "Double Poop",
        "4": "Painting",
        "5": "Feed Aura",
    },
}`,
    },
    {
      title: "モブのワープ攻撃を設定",
      description: "クールダウン、射程、効果音、移動先の距離、パーティクルを指定する設定例です。",
      code: `{
    cooldown: 20_000,
    range: 32,
    sound: "warperPhase",
    delay: 1_000,
    minDestinationRadius: 5,
    maxDestinationRadius: 7,
    swingArm: false,
    particleOpts: {
        duration: 2_000,
        texture: "soul_0",
        colorGradients: [
            {
                timeFraction: 0,
                minColor: [70, 215, 230, 1],
                maxColor: [75, 225, 240, 1],
            },
        ],
    },
}`,
    },
    {
      title: "赤いメッシュボックスを作成",
      description: "1×1×1の赤いボックス型メッシュを作成し、指定座標に配置します。",
      code: `const boxId = api.attemptCreateMeshEntity("Box", {
    width: 1,
    height: 1,
    depth: 1,
    diffuseColor: [255, 0, 0],
})
if (boxId) {
    api.setPosition(boxId, 10, 50, 10)
}`,
    },
    {
      title: "ダイヤモンドブロックのメッシュを作成",
      description: "ゲーム内ブロックをメッシュエンティティとして作成します。",
      code: `const blockId = api.attemptCreateMeshEntity("BloxdBlock", {
    blockName: "Block of Diamond",
    size: 1,
})`,
    },
    {
      title: "商人の人物メッシュを作成",
      description: "立ち姿の人物メッシュを作成し、頭に商人スキンを設定します。",
      code: `const personId = api.attemptCreateMeshEntity("Person", {
    size: 1,
    pose: "standing",
    textures: { head: "trader_black" },
}, "Bedwars Merchant")`,
    },
    {
      title: "物理演算付きメッシュを作成",
      description: "衝突設定を有効にした緑色のボックス型メッシュを作成します。",
      code: `const physicsBoxId = api.attemptCreateMeshEntity(
    "Box",
    { width: 0.5, height: 0.5, depth: 0.5, diffuseColor: [0, 255, 0] },
    "",
    {
        doPhysics: true,
        collidesEntities: true,
        collideBits: 1,
        collideMask: 1,
    },
)`,
    },
    {
      title: "メッシュボックスを更新",
      description: "既存のボックスを青色の2×2×2サイズに変更します。赤いボックスの例を先に実行してください。",
      code: `api.updateMeshEntity(boxId, "Box", {
    width: 2,
    height: 2,
    depth: 2,
    diffuseColor: [0, 0, 255],
})`,
    },
    {
      title: "メッシュエンティティを削除",
      description: "作成済みのメッシュエンティティを削除します。",
      code: "api.deleteMeshEntity(boxId)",
    },
    {
      title: "ファイアボールを投げる",
      description: "プレイヤーの向いている方向に、速度とダメージ倍率を指定してファイアボールを生成します。",
      code: `const pos = api.getPosition(playerId)
const { dir } = api.getPlayerFacingInfo(playerId)
const throwableId = api.attemptCreateThrowable(
    playerId,
    "Fireball",
    [pos[0], pos[1] + 1.5, pos[2]],
    dir,
    2,
    1.5,
)`,
    },
    {
      title: "投射物を削除",
      description: "作成済みの投射物を自動消滅する前に削除します。",
      code: "api.deleteThrowable(throwableId)",
    },
    {
      title: "右腕にブロックを装着",
      description: "プレイヤーの右腕ノードに小さなダイヤモンドブロックを装着します。",
      code: `api.updateEntityNodeMeshAttachment(
    playerId,
    "ArmRightMesh",
    "BloxdBlock",
    { blockName: "Diamond Block", size: 0.3 },
    [0, -0.5, 0],
    [0, 0, 0],
)`,
    },
    {
      title: "頭に光るボックスを装着",
      description: "プレイヤーの頭ノードに発光する黄色いボックスを装着します。",
      code: `api.updateEntityNodeMeshAttachment(
    playerId,
    "HeadMesh",
    "Box",
    { width: 0.3, height: 0.3, depth: 0.3, emissiveColor: [255, 215, 0] },
    [0, 0.5, 0],
)`,
    },
    {
      title: "腕に装着したメッシュを外す",
      description: "右腕ノードに装着したメッシュを取り外します。",
      code: 'api.updateEntityNodeMeshAttachment(playerId, "ArmRightMesh", null)',
    },
    {
      title: "連打式QTEを設定",
      description: "クリックを繰り返して進行バーを満たすQTEを開始します。",
      code: `api.addQTE(playerId, {
    type: "progressBar",
    parameters: {
        progressStartValue: 30,
        progressDecreasePerTick: 0.075,
        progressPerClick: 5,
        canFail: false,
        description: [{ str: "Click repeatedly to complete!" }],
        clickIcon: "fa-solid fa-computer-mouse",
        scale: 1,
        rotation: 15,
    },
})`,
    },
    {
      title: "制限時間付きクリックQTEを設定",
      description: "制限時間内のクリックを求めるQTEを設定します。",
      code: `api.addQTE(playerId, {
    type: "timedClick",
    parameters: {
        timeWindow: 3000,
        icon: "fa-solid fa-computer-mouse",
        label: [{ str: "Click to complete the QTE!" }],
        showTimer: true,
        scale: 1,
        rotation: 15,
        breatheCenter: false,
    },
})`,
    },
    {
      title: "重力バーQTEを設定",
      description: "重力と移動速度を調整するバー型QTEの設定例です。",
      code: `api.addQTE(playerId, {
    type: "gravityBar",
    parameters: {
        progressStartValue: 30,
        catchZoneSize: 0.25,
        moverSpeed: 3,
        moverErraticness: 0.8,
        gravity: 1,
        riseSpeed: 1.5,
        progressGainPerSecond: 8,
        progressDrainPerSecond: 4,
        canFail: false,
        description: [{ str: "Hold to catch!" }],
        icon: "Moonfish",
    },
})`,
    },
    {
      title: "タイミング合わせQTEを設定",
      description: "マーカーが成功ゾーンに入ったタイミングでクリックするQTEです。",
      code: `api.addQTE(playerId, {
    type: "precisionBar",
    parameters: {
        speed: 0.5,
        successZoneSize: 0.15,
        label: [{ str: "Click when the marker is within the green zone." }],
        icon: "",
        scale: 1,
        rotation: 0,
    },
})`,
    },
    {
      title: "リズムクリックQTEを設定",
      description: "指定回数の成功と許容ミス数を設定するリズムQTEです。",
      code: `api.addQTE(playerId, {
    type: "rhythmClick",
    parameters: {
        requiredSuccesses: 5,
        shrinkDurationMs: 1200,
        toleranceFraction: 0.15,
        maxMisses: 3,
        label: [{ str: "Click when the circles align!" }],
        icon: "",
    },
})`,
    },
    {
      title: "QTEを開始",
      description: "クリックで進行するQTEを開始し、戻り値のIDを保存します。",
      code: `const qteId = api.addQTE(playerId, {
    type: "progressBar",
    parameters: {
        progressDecreasePerTick: 0.075,
        progressPerClick: 7,
        canFail: false,
        description: [{ str: "Click repeatedly to complete!" }],
        clickIcon: "fa-solid fa-computer-mouse",
    },
})`,
    },
    {
      title: "QTEの結果を処理",
      description: "QTE完了コールバックで成功・失敗を判定します。",
      code: `onPlayerFinishQTE(playerId, qteId, result) {
    if (result) {
        /* 成功時の処理 */
    } else {
        /* 失敗時の処理 */
    }
}`,
    },
    {
      title: "実行中のQTEをキャンセル",
      description: "プレイヤーに表示中のQTEをIDで削除します。",
      code: "api.deleteQTE(playerId, qteId)",
    },
    {
      title: "QTEが実行中か確認",
      description: "プレイヤーにアクティブなQTEがあるかどうかを取得します。",
      code: "const hasQTE = api.hasActiveQTE(playerId)",
    },
    {
      title: "カスタム粒子エフェクトを再生",
      description: "色、寿命、速度などを指定した泡のパーティクルを現在位置付近に生成します。",
      code: `let [x, y, z] = thisPos
y += 1
api.playParticleEffect({
    dir1: [-1, -1, -1],
    dir2: [1, 1, 1],
    pos1: [x, y, z],
    pos2: [x + 1, y + 1, z + 1],
    texture: "bubble",
    minLifeTime: 0.2,
    maxLifeTime: 0.6,
    minEmitPower: 2,
    maxEmitPower: 2,
    minSize: 0.25,
    maxSize: 0.35,
    manualEmitCount: 20,
    gravity: [0, -10, 0],
    colorGradients: [
        {
            timeFraction: 0,
            minColor: [60, 60, 150, 1],
            maxColor: [200, 200, 255, 1],
        },
    ],
    velocityGradients: [
        {
            timeFraction: 0,
            factor: 1,
            factor2: 1,
        },
    ],
    blendMode: 1,
})`,
    },
    {
      title: "パーティクルプリセットを再生",
      description: "組み込みのオーラプリセットを現在位置付近に再生します。",
      code: `let [x, y, z] = thisPos
y += 1
api.playParticleEffect({
    presetId: "aura",
    pos1: [x, y, z],
    pos2: [x + 1, y + 1, z + 1],
})`,
    },
    {
      title: "BGMを停止",
      description: "プレイヤーに設定されている再生中の楽曲を停止します。",
      code: 'api.setClientOption(playerId, "music", null)',
    },
    {
      title: "効果音を全員に再生",
      description: "指定したプレイヤーを音源位置にして効果音を全員に再生し、そのプレイヤー本人は対象から除外します。",
      code: `api.broadcastSound(
    "dig",
    1,
    1,
    { playerIdOrPos: myId },
    myId,
)`,
    },
    {
      title: "プレイヤーにスキンを適用",
      description: "プレイヤーの胴体と頭にスキンを設定します。",
      code: `api.changePlayerIntoSkin(playerId, "body", "body_0_0")
api.changePlayerIntoSkin(playerId, "head", "wizard")`,
    },
    {
      title: "プレイヤーのポーズを変更",
      description: "プレイヤーのポーズを立ち姿または座り姿に設定します。",
      code: `api.setPlayerPose(playerId, "standing")
api.setPlayerPose(playerId, "sitting")`,
    },
    {
      title: "NPC用スキンを適用",
      description: "プレイヤーの頭パーツに魔法使いのNPCスキンを設定します。",
      code: 'api.changePlayerIntoSkin(playerId, "head", "wizard")',
    },
    {
      title: "アイコン付きメッセージを表示",
      description: "Font Awesomeアイコンと色を組み合わせたメッセージを送ります。",
      code: `api.sendMessage(playerId, [{ icon: "fa-solid fa-heart" }, " ライフを獲得しました！"])
api.sendMessage(playerId, [{ icon: "fa-solid fa-star", style: { color: "gold" } }, " 実績解除！"])`,
    },
  ];

  const localizedText = new Map([
    [
      'Music tracks are longer audio for background ambiance. Use the setClientOption API method with the "music" option. API Usage Note: Unlike sound effects, songs are played via client options, not the playSound API. Only one song plays at a time per player; setting a new song replaces the current one. Available Songs (44 total)',
      "楽曲は、背景の雰囲気を演出するための長めの音声です。setClientOption APIの「music」オプションで再生します。効果音とは異なり、楽曲はplaySound APIではなくクライアントオプションから再生します。プレイヤーごとに同時に再生できる曲は1曲だけで、新しい曲を設定すると再生中の曲と置き換わります。利用できる楽曲は全44曲です。",
    ],
    ["The music track to play in the background", "背景で再生する楽曲"],
    ["Volume level for the music", "楽曲の音量"],
    [
      "Modify a client option at runtime and send to the client if it changed",
      "実行中にクライアント設定を変更します。値が変わった場合はクライアントへ反映します。",
    ],
    ["The name of the option", "設定項目の名前"],
    ["The new value of the option", "設定する新しい値"],
    ["Called when a player joins the lobby", "プレイヤーがロビーに参加したときに呼び出されます。"],
    ["The id of the player that joined", "参加したプレイヤーのID"],
    [
      "Whether this call is from a game reset (used by SessionBasedGame)",
      "ゲームのリセットによる呼び出しかどうか（SessionBasedGameで使用）",
    ],
    ["Get the current health of an entity.", "エンティティの現在の体力を取得します。"],
    [
      "Set the current health of an entity. If you want to set their health to more than their current max health, the optional increaseMaxHealthIfNeeded must be true.",
      "エンティティの現在の体力を設定します。最大体力を超える値にする場合は、increaseMaxHealthIfNeededをtrueにしてください。",
    ],
    ["Get all the player ids.", "すべてのプレイヤーIDを取得します。"],
    ["Set the velocity of an entity", "エンティティの速度を設定します。"],
    ["Apply an impulse to an entity", "エンティティに力積を加えます。"],
    ["Get the name of a block.", "ブロック名を取得します。"],
    [
      "Send a message to a specific player",
      "指定したプレイヤーにメッセージを送ります。",
    ],
    ["Send a message to everyone", "全プレイヤーにメッセージを送ります。"],
    ["Optional", "省略可能"],
    ["The amount of damage dealt", "与えたダメージ量"],
    ["The item used to attack", "攻撃に使用したアイテム"],
    ["See documentation for api.playSound", "api.playSoundの説明を参照してください。"],
  ]);
  const localize = (text) => localizedText.get(text) || text;
  const mobSpawnDescriptions = {
    mobHerdId: "モブの群れを識別するIDです。同じ群れとして扱うモブをまとめるときに使います。",
    spawnerId: "スポーンを要求したプレイヤーのPlayerIdです。これはモブ個体のIDではなく、誰がスポーンさせたかを表します。省略可能です。",
    mobDbId: "モブを保存・復元するときに使う永続的なデータベースIDです。スポーン後の個体ID（MobId）とは別のIDで、省略可能です。",
    name: "モブの頭上に表示する名前です。省略した場合は既定の表示になります。",
    playSoundOnSpawn: "スポーン時の効果音を再生するかどうかを指定します。",
    variation: "外見などのバリエーションを指定します。選べる値はモブの種類によって異なります。",
    physicsOpts: "当たり判定の幅（width）・高さ（height）と、ほかのエンティティとの衝突（collidesEntities）を上書きします。各項目は省略可能です。",
  };
  const mobSpawnOptionsSummary = "モブのスポーン時に使う追加設定です。7項目はすべて省略可能です。特に、spawnerIdはスポーンを要求したプレイヤーのID、mobDbIdはモブの保存・復元用IDで、スポーンした個体のMobIdとは役割が異なります。mobDbIdを指定する場合は、既に使われているIDと重複するとスポーンに失敗します。";
  const localizeItemText = (item, text) => {
    if (item.name === "Music") {
      return "楽曲は、背景の雰囲気を演出するための長めの音声です。setClientOption APIの「music」オプションで再生します。効果音とは異なり、楽曲はplaySound APIではなくクライアントオプションから再生します。プレイヤーごとに同時に再生できる曲は1曲だけで、新しい曲を設定すると再生中の曲と置き換わります。利用できる楽曲は全44曲です。";
    }
    if (item.name === "MobSpawnOpts") return mobSpawnOptionsSummary;
    if (item.name === "attemptSpawnMob") {
      const [mainDescription, returnDescription] = text.split("\n戻り値:");
      const idNote = "spawnerIdはスポーンを要求したプレイヤーのPlayerId、mobDbIdは保存・復元用のIDです。どちらも省略可能で、スポーンした個体のMobIdとは別です。";
      return `${mainDescription} ${idNote}${returnDescription ? `\n戻り値: ${returnDescription}` : ""}`;
    }
    return localize(text);
  };
  const localizeFieldText = (item, field) => {
    if (item.name === "MobSpawnOpts") return mobSpawnDescriptions[field.name] || localize(field.description);
    if (item.name === "attemptSpawnMob" && field.name === "opts") return mobSpawnOptionsSummary;
    return localize(field.description);
  };

  const searchInput = document.querySelector("#search");
  const categoryNav = document.querySelector("#category-nav");
  const tables = document.querySelector("#tables");
  const resultCount = document.querySelector("#result-count");
  const clearButton = document.querySelector("#clear-search");
  const emptyState = document.querySelector("#empty-state");
  const exampleCarousel = document.querySelector("#example-carousel");
  const exampleSlide = document.querySelector("#example-slide");
  const exampleCount = document.querySelector("#example-count");
  const examplePosition = document.querySelector("#example-position");
  const exampleDots = document.querySelector("#example-dots");
  let visibleExamples = examples;
  let exampleIndex = 0;
  const pageSize = 60;
  const expandedGroups = new Map();
  const categoryNames = [...new Set(data.map((item) => item.category))].sort((a, b) =>
    a.localeCompare(b, "ja"),
  );
  let activeCategory = "すべて";

  const normalize = (value) =>
    String(value ?? "")
      .normalize("NFKC")
      .toLocaleLowerCase("ja")
      .replace(/\s+/g, " ");

  const containsJapanese = (value) => /[\u3040-\u30ff\u3400-\u9fff]/.test(value);
  const searchTokens = (value) =>
    String(value ?? "")
      .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
      .replace(/([A-Z])([A-Z][a-z])/g, "$1 $2")
      .normalize("NFKC")
      .toLocaleLowerCase("ja")
      .match(/[a-z0-9]+|[\u3040-\u30ff\u3400-\u9fff]+/g) || [];

  const containsAllTerms = (values, query) => {
    const identifiers = values.filter((value) => value && /^[\w$?.]+$/.test(String(value)));
    const compactQuery = normalize(query).replace(/^api\./, "").replace(/[\s_.]+/g, "");
    const isCamelIdentifier = !/\s/.test(query) && /[A-Z]/.test(query);
    if (isCamelIdentifier) {
      return identifiers.some((value) => normalize(value).replace(/^api\./, "").includes(compactQuery));
    }

    const terms = searchTokens(query);
    const normalizedValues = values.map(normalize);
    const tokens = values.flatMap(searchTokens);
    if (terms.length === 1 && terms[0].length <= 3 && !containsJapanese(terms[0])) {
      const identifierTokens = identifiers.flatMap(searchTokens);
      return identifierTokens.some((token) => token === terms[0]);
    }
    return terms.every((term) =>
      containsJapanese(term)
        ? normalizedValues.some((value) => value.includes(term))
        : tokens.some((token) => token === term || token.startsWith(term)),
    );
  };

  const matches = (item, query) => {
    if (!query) return true;
    const values = [
      item.name,
      ...item.fields.map((field) => field.name),
      item.category,
      item.summary,
      item.description,
      localizeItemText(item, item.summary),
      localizeItemText(item, item.description),
      ...item.fields.flatMap((field) => [field.name, field.type, field.description]),
      ...item.fields.map((field) => localizeFieldText(item, field)),
    ];
    return containsAllTerms(values, query);
  };

  const matchesExample = (example, query) => {
    const codeIdentifiers = example.code.match(/\b[a-zA-Z_$][\w$]*(?:\.[a-zA-Z_$][\w$]*)*\b/g) || [];
    const values = [example.title, example.description, example.code, ...codeIdentifiers];
    if (!query || containsAllTerms(values, query)) {
      return true;
    }
    const terms = searchTokens(query);
    return terms.length === 1
      && terms[0].length <= 3
      && searchTokens(example.title).includes(terms[0]);
  };

  function renderCategories(filtered) {
    const counts = new Map();
    filtered.forEach((item) => counts.set(item.category, (counts.get(item.category) || 0) + 1));
    const availableCategories = categoryNames.filter(
      (name) => counts.get(name) || name === activeCategory,
    );
    const buttons = ["すべて", ...availableCategories].map((name) => {
      const count = name === "すべて" ? filtered.length : counts.get(name) || 0;
      return `<button class="category-button${activeCategory === name ? " active" : ""}" type="button" data-category="${escapeHtml(name)}" aria-pressed="${activeCategory === name}">
        <span>${escapeHtml(name)}</span><span class="category-count">${count}</span>
      </button>`;
    });
    categoryNav.innerHTML = buttons.join("");
  }

  function render() {
    const rawQuery = searchInput.value.trim();
    const searched = data.filter((item) => matches(item, rawQuery));
    visibleExamples = examples.filter((example) => matchesExample(example, rawQuery));
    exampleIndex = Math.min(exampleIndex, Math.max(visibleExamples.length - 1, 0));
    renderExamples();
    renderCategories(searched);
    const visible = activeCategory === "すべて"
      ? searched
      : searched.filter((item) => item.category === activeCategory);
    resultCount.textContent = `${visible.length.toLocaleString()} 件が一致${visibleExamples.length ? `・コード例 ${visibleExamples.length} 件` : ""}`;
    clearButton.hidden = !searchInput.value;
    emptyState.hidden = visible.length > 0 || visibleExamples.length > 0;

    const groups = new Map();
    visible.forEach((item) => {
      if (!groups.has(item.category)) groups.set(item.category, []);
      groups.get(item.category).push(item);
    });

    tables.innerHTML = [...groups.entries()]
      .map(([category, items]) => renderGroup(category, items, rawQuery, expandedGroups.get(category) || pageSize))
      .join("");
  }

  function renderExamples() {
    exampleCarousel.hidden = visibleExamples.length === 0;
    exampleCount.textContent = `${visibleExamples.length} 件${searchInput.value.trim() ? " が検索に一致" : ""}`;
    if (!visibleExamples.length) {
      exampleSlide.innerHTML = "";
      examplePosition.textContent = "0 / 0";
      exampleDots.innerHTML = "";
      return;
    }

    const example = visibleExamples[exampleIndex];
    examplePosition.textContent = `${exampleIndex + 1} / ${visibleExamples.length}`;
    exampleSlide.innerHTML = `<article class="example-card">
      <div class="example-card-heading">
        <div><span>コード例 ${String(exampleIndex + 1).padStart(2, "0")}</span><h4>${escapeHtml(example.title)}</h4></div>
      </div>
      <p>${escapeHtml(example.description)}</p>
      <pre><code>${escapeHtml(example.code)}</code></pre>
    </article>`;
    exampleDots.innerHTML = visibleExamples.map((item, index) =>
      `<button type="button" class="carousel-dot${index === exampleIndex ? " active" : ""}" data-example-index="${index}" aria-label="${escapeHtml(item.title)}" aria-current="${index === exampleIndex ? "true" : "false"}"></button>`,
    ).join("");
    document.querySelector("#example-prev").disabled = exampleIndex === 0;
    document.querySelector("#example-next").disabled = exampleIndex === visibleExamples.length - 1;
  }

  function moveExample(offset) {
    exampleIndex = Math.max(0, Math.min(visibleExamples.length - 1, exampleIndex + offset));
    renderExamples();
  }

  function renderGroup(category, items, query, limit) {
    const shownItems = items.slice(0, limit);
    const rows = shownItems
      .map((item, index) => {
        const id = `detail-${slug(item.name)}-${index}`;
        const fieldCount = item.fields.length
          ? `${item.fields.length} ${item.kind === "enum" ? "メンバー" : item.kind === "api" || item.kind === "callback" ? "引数" : item.kind === "setting" ? "設定項目" : "フィールド"}`
          : item.kind === "api" || item.kind === "callback" ? "引数なし" : item.kind === "name" ? "名前" : item.kind === "guide" ? "ガイド" : item.kind === "enum" ? "列挙型" : "型";
        return `<tbody class="type-entry">
          <tr class="api-row" tabindex="0" role="button" aria-expanded="false" aria-controls="${id}">
            <td><span class="type-name">${highlight(item.name, query)}</span></td>
            <td><span class="type-summary">${highlight(shorten(localizeItemText(item, item.summary), 180), query)}</span></td>
            <td class="type-kind"><span class="field-count">${escapeHtml(fieldCount)}</span></td>
          </tr>
          <tr id="${id}" class="detail-row" hidden><td colspan="3">${renderDetail(item, query)}</td></tr>
        </tbody>`;
      })
      .join("");

    return `<section class="category-section">
      <div class="section-heading"><h2>${escapeHtml(category)}</h2><span>${items.length.toLocaleString()} 件</span></div>
      <table class="api-table">
        <thead><tr><th>名前</th><th>概要</th><th>項目</th></tr></thead>
        ${rows}
      </table>
      ${items.length > shownItems.length ? `<button class="load-more" type="button" data-load-category="${escapeHtml(category)}">さらに表示 <span>${(items.length - shownItems.length).toLocaleString()} 件</span></button>` : ""}
    </section>`;
  }

  function renderDetail(item, query) {
    const description = item.description
      ? `<p class="detail-description">${highlight(localizeItemText(item, item.description), query)}</p>`
      : "";
    const fields = item.fields.length
      ? `<table class="fields-table"><thead><tr><th>${item.kind === "api" || item.kind === "callback" ? "引数" : item.kind === "enum" ? "メンバー" : item.kind === "setting" ? "項目" : "フィールド"}</th><th>型・値</th><th>説明</th></tr></thead><tbody>
          ${item.fields.map((field) => `<tr>
            <td><code>${highlight(field.name, query)}</code></td>
            <td><code>${highlight(field.type, query)}</code></td>
            <td>${highlight(localizeFieldText(item, field) || "—", query)}</td>
          </tr>`).join("")}
        </tbody></table>`
      : "";
    const sourceLink = item.source
      ? `<a class="source-toggle source-link" href="${escapeHtml(item.source)}" target="_blank" rel="noreferrer">出典を開く ↗</a>`
      : "";
    const codeTitle = item.kind === "api" || item.kind === "callback" ? "シグネチャ" : item.kind === "name" ? "名前" : "定義・例";
    const code = item.code
      ? `<details><summary class="source-toggle">${codeTitle}を表示</summary><pre class="source-code">${escapeHtml(item.code)}</pre></details>`
      : "";
    const relatedExamples = examples.filter((example) =>
      item.name === "MobSpawnOpts"
        ? example.code.includes("MobSpawnOpts")
        : item.kind === "callback"
        ? example.code.includes(`${item.name} =`)
        : item.kind === "api" && example.code.includes(`api.${item.name}(`),
    );
    const exampleMarkup = relatedExamples.length
      ? `<section class="detail-examples"><h3>この項目の使用例</h3>${relatedExamples.map((example) => `<article><h4>${escapeHtml(example.title)}</h4><p>${escapeHtml(example.description)}</p><pre><code>${escapeHtml(example.code)}</code></pre></article>`).join("")}</section>`
      : "";
    return `<div class="detail-panel">${description}${fields}${exampleMarkup}${code}${sourceLink}
    </div>`;
  }

  function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, (char) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
    })[char]);
  }

  function highlight(value, query) {
    const text = escapeHtml(value);
    if (!query) return text;
    const escapedQuery = query
      .split(" ")
      .filter(Boolean)
      .sort((a, b) => b.length - a.length)
      .map((term) => term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
      .join("|");
    try {
      return text.replace(new RegExp(`(${escapedQuery})`, "gi"), "<mark>$1</mark>");
    } catch {
      return text;
    }
  }

  function slug(value) {
    return String(value).toLowerCase().replace(/[^a-z0-9_-]+/g, "-");
  }

  function shorten(value, maxLength) {
    const text = String(value ?? "");
    return text.length > maxLength ? `${text.slice(0, maxLength - 1).trimEnd()}…` : text;
  }

  searchInput.addEventListener("input", () => {
    activeCategory = "すべて";
    exampleIndex = 0;
    expandedGroups.clear();
    render();
  });
  categoryNav.addEventListener("click", (event) => {
    const button = event.target.closest("[data-category]");
    if (!button) return;
    activeCategory = button.dataset.category;
    render();
  });
  tables.addEventListener("click", (event) => {
    const loadMore = event.target.closest("[data-load-category]");
    if (loadMore) {
      const category = loadMore.dataset.loadCategory;
      expandedGroups.set(category, (expandedGroups.get(category) || pageSize) + pageSize);
      render();
      return;
    }
    const row = event.target.closest(".api-row");
    if (!row) return;
    const detail = document.getElementById(row.getAttribute("aria-controls"));
    const open = row.getAttribute("aria-expanded") === "true";
    row.setAttribute("aria-expanded", String(!open));
    detail.hidden = open;
  });
  tables.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    if (!event.target.matches(".api-row")) return;
    event.preventDefault();
    event.target.click();
  });
  clearButton.addEventListener("click", () => {
    searchInput.value = "";
    activeCategory = "すべて";
    exampleIndex = 0;
    expandedGroups.clear();
    render();
    searchInput.focus();
  });
  document.querySelector("#example-prev").addEventListener("click", () => moveExample(-1));
  document.querySelector("#example-next").addEventListener("click", () => moveExample(1));
  exampleDots.addEventListener("click", (event) => {
    const dot = event.target.closest("[data-example-index]");
    if (!dot) return;
    exampleIndex = Number(dot.dataset.exampleIndex);
    renderExamples();
  });
  exampleCarousel.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") moveExample(-1);
    if (event.key === "ArrowRight") moveExample(1);
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "/" && !["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) {
      event.preventDefault();
      searchInput.focus();
    }
    if (event.key === "Escape" && document.activeElement === searchInput) {
      searchInput.value = "";
      render();
      searchInput.blur();
    }
  });

  render();
})();
