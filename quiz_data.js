const allQuestions = [
    {
        id: 1,
        type: 'basic',
        question: 'QCC 最主要的目的通常是什麼？',
        choices: [
            { text: '提高員工福利', correct: false },
            { text: '促進部門之間的溝通', correct: false },
            { text: '解決工作現場的品質或效率問題', correct: true },
            { text: '增加公司資產', correct: false }
        ],
        correct_index: 2,
        feedback_correct: '非常正確！QCC 核心目的就是通過小組合作來解決實際問題並持續改進。',
        feedback_incorrect: '這個答案不太精確。QCC 的核心重點是解決工作現場的品質或效率問題。'
    },
    {
        id: 2,
        type: 'basic',
        question: 'QCC 活動通常會遵循哪個經典的循環步驟？',
        choices: [
            { text: '輸入-處理-輸出 (IPO)', correct: false },
            { text: '計畫-執行-檢查-行動 (PDCA)', correct: true },
            { text: '設計-開發-測試-部署 (DDTD)', correct: false },
            { text: '分析-設計-實施-評估 (ADIE)', correct: false }
        ],
        correct_index: 1,
        feedback_correct: '答對了！PDCA (Plan-Do-Check-Act) 是 QCC 活動的核心框架。',
        feedback_incorrect: '錯誤。QCC 活動的經典循環步驟是 PDCA (Plan-Do-Check-Act)。'
    },
    {
        id: 3,
        type: 'basic',
        question: '在 QCC 團隊中，圈長的職責是什麼？',
        choices: [
            { text: '負責為團隊成員發薪水', correct: false },
            { text: '負責撰寫所有報告', correct: false },
            { text: '領導和協調小組活動，確保目標達成', correct: true },
            { text: '提供所有技術解決方案', correct: false }
        ],
        correct_index: 2,
        feedback_correct: '完美！圈長是團隊的靈魂人物，負責領導和協調。',
        feedback_incorrect: '不對。圈長的主要職責是領導和協調小組活動，確保目標達成。'
    },
    {
        id: 4,
        type: 'basic',
        question: 'QCC 解決問題最常使用的方法是？',
        choices: [
            { text: '猜測與直覺', correct: false },
            { text: '數據分析與科學方法', correct: true },
            { text: '聽從最高主管的指示', correct: false },
            { text: '隨機嘗試', correct: false }
        ],
        correct_index: 1,
        feedback_correct: '答得漂亮！QCC 尤其強調以數據和科學方法為基礎來解決問題。',
        feedback_incorrect: '這個選項不符合 QCC 的精神。QCC 解決問題最常使用的方法是數據分析與科學方法。'
    },
    {
        id: 5,
        type: 'basic',
        question: '在 QCC 提案發表時，哪一項最能展現其價值？',
        choices: [
            { text: '精美的投影片設計', correct: false },
            { text: '圈長流利的口才', correct: false },
            { text: '量化且顯著的改善成果', correct: true },
            { text: '團隊成員的高學歷', correct: false }
        ],
        correct_index: 2,
        feedback_correct: '正是如此！量化的成果是證明 QCC 價值的最佳證據。',
        feedback_incorrect: '雖然其他要素也很重要，但最能展現 QCC 價值的是量化且顯著的改善成果。'
    },
    // 進階題
    {
        id: 6,
        type: 'advanced',
        question: '在 QCC 的「查核」階段，最核心的動作是什麼？',
        choices: [
            { text: '定義問題', correct: false },
            { text: '對照目標與實施後的結果', correct: true },
            { text: '發想解決方案', correct: false },
            { text: '將解決方案標準化', correct: false }
        ],
        correct_index: 1,
        feedback_correct: '非常正確！查核 (Check) 就是要對照目標與實施後的結果，確認是否達成改善。',
        feedback_incorrect: '這是錯誤的。在 QCC 的「查核」階段，最核心的動作是對照目標與實施後的結果。'
    },
    {
        id: 7,
        type: 'advanced',
        question: '以下哪個工具最適合用來分析問題的根本原因 (Root Cause)？',
        choices: [
            { text: '直方圖', correct: false },
            { text: '魚骨圖 (特性要因圖)', correct: true },
            { text: '柏拉圖', correct: false },
            { text: '散佈圖', correct: false }
        ],
        correct_index: 1,
        feedback_correct: '答對了！魚骨圖是找出根本原因的經典工具。',
        feedback_incorrect: '不對。最適合用來分析問題根本原因的工具是魚骨圖 (特性要因圖)。'
    },
    {
        id: 8,
        type: 'advanced',
        question: '為什麼 QCC 成果需要「標準化」？',
        choices: [
            { text: '為了讓報告看起來更厚重', correct: false },
            { text: '為了防止問題再次發生，並將成功經驗推廣', correct: true },
            { text: '方便團隊成員休息', correct: false },
            { text: '讓公司可以向外界炫耀', correct: false }
        ],
        correct_index: 1,
        feedback_correct: '太棒了！標準化的目的在於固化成果，防止問題重演並推廣最佳實踐。',
        feedback_incorrect: '錯誤。QCC 成果需要「標準化」的原因是為了防止問題再次發生，並將成功經驗推廣。'
    },
    {
        id: 9,
        type: 'advanced',
        question: '在 QCC 選擇主題時，應該優先考慮哪一類問題？',
        choices: [
            { text: '最簡單且最容易解決的問題', correct: false },
            { text: '影響最大、急迫性高且可由小組能力範圍解決的問題', correct: true },
            { text: '與產品品質完全無關的問題', correct: false },
            { text: '由最高主管直接指派的問題', correct: false }
        ],
        correct_index: 1,
        feedback_correct: '完全正確！主題的「重要性」與「可行性」是選擇的兩大關鍵。',
        feedback_incorrect: '應優先考慮影響最大、急迫性高且可由小組能力範圍解決的問題。'
    },
    {
        id: 10,
        type: 'advanced',
        question: '在 QCC 活動中，計算「有形成果」的主要目的是？',
        choices: [
            { text: '證明團隊成員很會算數學', correct: false },
            { text: '將改善的效益量化為金錢或數字，證明活動的價值', correct: true },
            { text: '作為成員年終獎金的唯一依據', correct: false },
            { text: '與競爭對手比較誰的成果數字比較大', correct: false }
        ],
        correct_index: 1,
        feedback_correct: '非常好！量化成果是 QCC 提案發表時最具說服力的部分。',
            feedback_incorrect: '計算「有形成果」的主要目的是將改善的效益量化為金錢或數字，證明活動的價值。'
    }
];
