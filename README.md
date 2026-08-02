# NEURAL LINK // Cyberpunk 2077

賽博朋克風格沉浸式入口頁：透過「虛擬眼鏡 / Neural Link」帶入 *Cyberpunk 2077* 的 Night City 世界觀。

## 體驗重點

- **NEURAL LINK** 中央啟動按鈕 + 動態 HUD 圓環
- Cyberpunk Yellow (`#FCEE0A`) × Dark Surface、故障 glitch、掃描線
- 三大核心區塊：階級制度 / 改造裝置 / 區域地圖（含生成式 logo）
- 角落系統座標與狀態碼、頂部浮動 HUD 導航

## 預覽方式

雲端 Agent 內的 `localhost` **無法**從你的電腦連線（會出現 `ERR_CONNECTION_REFUSED`）。請在本機預覽：

**方式 A — 直接開檔（最快）**

1. 下載或 clone 此 repo / 此分支
2. 雙擊開啟 `index.html`

**方式 B — 本機靜態伺服器**

```bash
git clone https://github.com/jin358-cmd/86.git
cd 86
git checkout cursor/cyberpunk-neural-link-b68f
python3 -m http.server 8080
```

瀏覽 `http://localhost:8080`（需先在你自己的電腦執行上述指令）。

**方式 C — GitHub Pages**

合併後（或在 repo Settings → Pages 選擇 GitHub Actions）部署至：

`https://jin358-cmd.github.io/86/`

按 **NEURAL LINK**（或鍵盤 `N`）啟動接入動畫並捲動至世界觀介紹。

## 免責

粉絲概念介面，與 CD PROJEKT RED 無關。
