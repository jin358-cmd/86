# 86 — GVG OS

多版本共存倉庫：各版本在獨立資料夾開發，GitHub Pages 同時發布可線上檢視。

## 版本資料夾（本機作業）

| 版本 | 資料夾 | 說明 | 本機指令 |
|------|--------|------|----------|
| **V1** | [`V1/`](./V1) | Neural Link 電影級體驗 | `cd V1 && npm install && npm run dev` |
| **V2** | [`V2/`](./V2) | 商城／淺色 cyberpunk 平台快照 | `cd V2 && npm install && npm run dev` |

本機預設：http://localhost:3000（不需 `/86` 前綴）

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
| **V1 Neural Link** | https://jin358-cmd.github.io/86/v1/ |
| **V2 Marketplace** | https://jin358-cmd.github.io/86/v2/ |

## 倉庫結構

```
86/
├── V1/           # 版本 1 完整專案（獨立 npm / Next app）
├── V2/           # 版本 2 完整專案（獨立 npm / Next app）
├── site-hub/     # Pages 根目錄版本選擇頁
└── .github/workflows/static.yml  # 同時建置並部署 V1 + V2
```

## GitHub

- Repo: https://github.com/jin358-cmd/86
- 預設分支 `main` push 後自動部署上述三個網址
