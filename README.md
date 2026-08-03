# 86 — GVG OS

多版本共存倉庫：各版本在獨立資料夾開發，GitHub Pages 同時發布可線上檢視。

## 版本資料夾（本機作業）

| 版本 | 資料夾 | 說明 | 本機指令 |
|------|--------|------|----------|
| **BetaV1**（主動 · 來自 V1） | [`BetaV1/`](./BetaV1) | Neural Link Beta workspace | `cd BetaV1 && npm install && npm run dev` |
| **Beta1**（主動 · 來自 V2） | [`Beta1/`](./Beta1) | 平台／商城 Beta | `cd Beta1 && npm install && npm run dev` |
| **V1** | [`V1/`](./V1) | Neural Link 電影級體驗（封存） | `cd V1 && npm install && npm run dev` |
| **V2** | [`V2/`](./V2) | 商城／淺色 cyberpunk 快照（封存） | `cd V2 && npm install && npm run dev` |

本機預設：http://localhost:3000（不需 `/86` 前綴）

### Windows 範例（BetaV1）

```powershell
cd F:\@Jin\86-main\BetaV1
git pull
npm install
npm run dev
```

### Windows 範例（Beta1）

```powershell
cd F:\@Jin\86-main\Beta1
git pull
npm install
npm run dev
```

### Windows 範例（V1）

```powershell
cd F:\@Jin\86-main\V1
git pull
npm install
npm run dev
```

### Windows 範例（V2）

```powershell
cd F:\@Jin\86-main\V2
git pull
npm install
npm run dev
```

## 線上版本檢視

| 頁面 | 連結 |
|------|------|
| **版本總覽 Hub** | https://jin358-cmd.github.io/86/ |
| **BetaV1 Neural Link** | https://jin358-cmd.github.io/86/betav1/ |
| **Beta1 Platform** | https://jin358-cmd.github.io/86/beta1/ |
| **V1 Neural Link** | https://jin358-cmd.github.io/86/v1/ |
| **V2 Marketplace** | https://jin358-cmd.github.io/86/v2/ |

## 倉庫結構

```
86/
├── BetaV1/       # Beta V1（來自 V1 Neural Link，主動開發）
├── Beta1/        # Beta 1（來自 V2 平台／商城，主動開發）
├── V1/           # 版本 1 封存
├── V2/           # 版本 2 封存
├── site-hub/     # Pages 根目錄版本選擇頁
└── .github/workflows/static.yml
```

## GitHub

- Repo: https://github.com/jin358-cmd/86
- 預設分支 `main` push 後自動部署上述網址
