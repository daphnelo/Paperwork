# Paperwork 紙上

以 A4 學術筆記編輯器為主畫面，透過工具列的 **✦ Gemini** 分析 PDF／Word，再將結果放回筆記、提煉概念卡片。

**網站：<https://daphnelo.github.io/Paperwork/>**

## 網站版使用方式

1. 開啟網站，直接編輯 A4 筆記。建議使用新版 Chrome 或 Edge。
2. 點工具列 **✦ Gemini → 連線設定**，填入自己的 Gemini API Key 並驗證。網站沒有內建共用 Key。
3. 選取 PDF／DOCX，或從本機資料夾勾選檔案，再按「開始分析」。只有此時才會將所選文件與提示詞直接傳給 Google。
4. 分析完成後，結果回到編輯器。論文摘要可以選法學／社會科學模板、建立新筆記或插入游標處，並選擇要建立的概念卡片。
5. 在連線設定中按 **選擇本機儲存資料夾**，瀏覽器取得授權後，會在其中的 `Paperwork` 子資料夾另存完整 HTML 筆記庫及每次分析報告。

筆記與分析紀錄預設存於目前瀏覽器的 IndexedDB，不會上傳到 GitHub。換電腦、換瀏覽器或清除網站資料，不會自動保留這些筆記；請定期點「匯出 HTML」備份。未授權資料夾或瀏覽器不支援時，可下載結果及匯出 HTML。Key 預設只存在當前網頁記憶體；只有主動勾選「記住金鑰」才會存入此瀏覽器。

原本 localhost 的筆記不會自動搬到網站：請在本機版「匯出 HTML」，再到網站版「匯入 HTML」。原本檔案會保留。

分析時請保持分頁開啟。重新整理或關閉分頁可能中斷分析；Google 可能已處理請求，重新提交可能再次計費。多分頁共用同一筆記庫時，舊分頁會拒絕覆蓋新版，請先匯出再合併。

## 檔案與匯出

- PDF／DOCX：一般分析最多 5 份，單檔 50 MB、合計 80 MB；論文摘要每次一份 PDF。
- 合計不超過 10 MB 的文件使用內嵌 PDF 請求；較大 PDF 使用 Google Files API。如果瀏覽器或網路阻擋上傳跨來源標頭，請拆小 PDF，或使用下方本機版。
- DOCX 僅解析正文與表格文字。掃描圖片、公式或重要排版請轉成 PDF。
- 分析報告可下載 Markdown、TXT、HTML、JSON；筆記可匯出完整 HTML、Word、Markdown，並以列印另存 PDF。
- 本機資料夾中的筆記庫名稱含唯一識別碼，分析報告各有獨立子資料夾，不覆寫來源文件。

## 本機版

[下載本機版 ZIP](https://github.com/daphnelo/Paperwork/raw/main/downloads/Paperwork-local.zip)，解壓縮後執行 `start.cmd`。需要 Python 3.10 以上，無第三方 Python 套件。也可下載此儲存庫，在 `local/` 執行 `python server.py --open`。

本機版由 Python 服務負責 API 與資料夾存檔，預設只監聽 `127.0.0.1`。詳見 [本機版說明](local/README.txt)。原始碼不包含 API Key、使用者筆記、PDF、分析結果或帳號設定。

## 維護與部署

- `docs/`：可直接由 GitHub Pages 提供的網站；無建置步驟、無外部前端依賴。
- `docs/browser-runtime.js`：瀏覽器儲存、Google API、DOCX 解讀與本機資料夾存檔。
- `local/`：保留完整 Python 本機版。
- `tests/`：使用模擬 Google 回應及暫存資料測試，不呼叫真實 Gemini。

GitHub Pages 設定為 **Deploy from a branch → main → /docs**。網站版不依賴 Python 主機，也不需要把 API Key 放入儲存庫或 GitHub Secrets。更動 `docs/editor.html` 的主程式時，必須同步重算內嵌 CSP 的 SHA-256；請保持 LF 換行。

執行測試：`npm ci`，接著 `npm test`。

網站仍需使用者自己的有效 Gemini 專案及額度。測試以模擬 API 檢查資料流與錯誤處理；真實模型回應與 Google 服務限制以實際帳號狀態為準。
