// Data Extracted from Images
// Alishan Quote: 164,860 / 18 pax ~= 9,160
// Taitung Quote: 161,982 / 18 pax ~= 8,999

const tripData = {
    alishan: {
        id: 'alishan',
        name: '阿里山森林三日遊',
        color: '#10b981',
        metrics: {
            teamBuilding: { score: 9, reason: '包含抓泥鰍、漆彈射擊、趣味競賽等高互動團隊活動，且有共同迎接日出的情感連結。' },
            nature: { score: 10, reason: '深入阿里山森林遊樂區、觀音瀑布與隙頂雲海，沉浸於高山壯闊景觀。' },
            lessCultureParks: { score: 8, reason: '除雲中街外，多為戶外自然或動態活動，較少靜態文創園區行程。' },
            travelTime: { score: 5, reason: '山路蜿蜒車程較長，易暈車者需注意；景點間拉車時間較多。' },
            food: { score: 7, reason: '以便餐與合菜為主 (餐標$3850-$4400/桌)，特色較少但能飽足。' },
            accommodation: { score: 6, reason: '入住童年渡假村(小木屋)與高山青飯店(老牌)，設施偏舊，且阿里山住宿品質普遍一般。' },
            curiosity: { score: 9, reason: '阿里山日出、小火車與神木群具備國際級指標性，同仁期待度通常較高。' }
        }
    },
    taitung: {
        id: 'taitung',
        name: '台東東海岸三日遊',
        color: '#3b82f6',
        metrics: {
            teamBuilding: { score: 7, reason: '主要為部落射箭體驗與單車遊，多屬個人體驗，團隊協作與競爭感較低。' },
            nature: { score: 8, reason: '台東海岸線與森林公園，視野開闊療癒，但震撼度略遜於高山雲海。' },
            lessCultureParks: { score: 6, reason: '包含糖廠文創、南迴驛站、水族館等較多室內或靜態參觀行程。' },
            travelTime: { score: 7, reason: '雖路途遙遠，但在平路行駛較舒適，且部分時段可安排火車接駁減少疲勞。' },
            food: { score: 8, reason: '包含娜路彎自助晚餐與海鮮餐廳，餐飲選擇較豐富且環境較佳。' },
            accommodation: { score: 9, reason: '連住兩晚娜路彎花園酒店 (四星級)，免去更換飯店困擾，設施新穎舒適。' },
            curiosity: { score: 8, reason: '適合放鬆度假，但景點驚喜感與獨特性較為常見。' }
        }
    }
};

const comparisonCriteria = [
    { key: 'teamBuilding', label: '團隊向心力', icon: 'fa-users' },
    { key: 'nature', label: '大自然景點', icon: 'fa-tree' },
    { key: 'lessCultureParks', label: '活動動態性', icon: 'fa-person-running' },
    { key: 'travelTime', label: '車程舒適度', icon: 'fa-bus' },
    { key: 'food', label: '餐飲品質', icon: 'fa-utensils' },
    { key: 'accommodation', label: '住宿等級', icon: 'fa-hotel' },
    { key: 'curiosity', label: '行程期待值', icon: 'fa-star' }
];

// Extracted from images
const budgetData = [
    { item: '交通費', ali: 48000, tai: 48900, note: '34人座(三年內新車)' },
    { item: '住宿費', ali: 54900, tai: 54000, note: '阿里山:高山青+童年 / 台東:娜路彎x2' },
    { item: '餐飲費', ali: 37660, tai: 28600, note: '台東部分餐費含於門票' },
    { item: '門票活動', ali: 20700, tai: 26622, note: '台東含原生植物園與部落體驗' },
    { item: '保險行政', ali: 3620, tai: 3860, note: '250萬旅責險+20萬醫療' }
];

const totalBudget = {
    ali: 164860,
    tai: 161982,
    aliPerPerson: 9160,
    taiPerPerson: 8999
};

document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const selectionView = document.getElementById('selection-view');
    const comparisonView = document.getElementById('comparison-view');
    const startBtn = document.getElementById('start-compare-btn');
    const backBtn = document.getElementById('back-to-selection');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.querySelector('.lightbox-img');
    const closeLightbox = document.querySelector('.close-lightbox');

    // Tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    // Navigation
    startBtn.addEventListener('click', () => {
        selectionView.classList.remove('active');
        selectionView.classList.add('hidden');

        setTimeout(() => {
            selectionView.style.display = 'none';
            comparisonView.style.display = 'block';
            void comparisonView.offsetWidth;
            comparisonView.classList.remove('hidden');
            comparisonView.classList.add('active');
            renderComparison();
            renderBudget();
            renderItinerary();
        }, 500);
    });

    backBtn.addEventListener('click', () => {
        comparisonView.classList.remove('active');
        comparisonView.classList.add('hidden');
        setTimeout(() => {
            comparisonView.style.display = 'none';
            selectionView.style.display = 'block';
            void selectionView.offsetWidth;
            selectionView.classList.remove('hidden');
            selectionView.classList.add('active');
        }, 500);
    });

    // Tab Switching
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            btn.classList.add('active');
            document.getElementById(`${btn.dataset.tab}-tab`).classList.add('active');
        });
    });

    // Lightbox
    window.openImage = (filename) => {
        lightboxImg.src = filename;
        lightbox.classList.remove('hidden');
    };
    closeLightbox.addEventListener('click', () => lightbox.classList.add('hidden'));
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) lightbox.classList.add('hidden');
    });

    // --- Rendering Functions ---

    let chartInstance = null;

    function renderComparison() {
        renderComparisonTable();
        renderChart();
        renderAnalysis();
    }

    function renderComparisonTable() {
        const tbody = document.getElementById('comparison-table-body');
        tbody.innerHTML = '';
        comparisonCriteria.forEach(criteria => {
            const aliData = tripData.alishan.metrics[criteria.key];
            const taiData = tripData.taitung.metrics[criteria.key];
            let winner = aliData.score > taiData.score ? '阿里山' : (taiData.score > aliData.score ? '台東' : '平手');

            const row = document.createElement('tr');
            row.innerHTML = `
                <td style="width: 15%; white-space: nowrap;"><i class="fa-solid ${criteria.icon}"></i> ${criteria.label}</td>
                <td class="alishan-col" style="width: 35%;">
                    <div class="score-row">${getScoreBadge(aliData.score)}</div>
                    <div class="score-reason">${aliData.reason}</div>
                </td>
                <td class="taitung-col" style="width: 35%;">
                    <div class="score-row">${getScoreBadge(taiData.score)}</div>
                    <div class="score-reason">${taiData.reason}</div>
                </td>
                <td style="width: 15%; text-align: center; font-weight: bold;">
                    ${winner === '平手' ? '平手' : `<span class="winner-icon" style="color:${winner === '阿里山' ? '#10b981' : '#3b82f6'}"><i class="fa-solid fa-crown"></i> ${winner}</span>`}
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    function getScoreBadge(score) {
        let type = 'score-low';
        if (score >= 9) type = 'score-high';
        else if (score >= 7) type = 'score-mid';
        return `<span class="score-badge ${type}">${score}/10</span>`;
    }

    function renderChart() {
        const ctx = document.getElementById('radarChart').getContext('2d');
        if (chartInstance) chartInstance.destroy();

        chartInstance = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: comparisonCriteria.map(c => c.label),
                datasets: [
                    {
                        label: '阿里山',
                        data: comparisonCriteria.map(c => tripData.alishan.metrics[c.key].score),
                        fill: true,
                        backgroundColor: 'rgba(16, 185, 129, 0.2)',
                        borderColor: '#10b981',
                        pointBackgroundColor: '#10b981'
                    },
                    {
                        label: '台東',
                        data: comparisonCriteria.map(c => tripData.taitung.metrics[c.key].score),
                        fill: true,
                        backgroundColor: 'rgba(59, 130, 246, 0.2)',
                        borderColor: '#3b82f6',
                        pointBackgroundColor: '#3b82f6'
                    }
                ]
            },
            options: {
                elements: { line: { borderWidth: 3 } },
                scales: {
                    r: {
                        angleLines: { color: 'rgba(255, 255, 255, 0.1)' },
                        grid: { color: 'rgba(255, 255, 255, 0.1)' },
                        pointLabels: { color: '#94a3b8', font: { size: 14 } }, // Larger font
                        min: 0, max: 10, ticks: { display: false }
                    }
                },
                plugins: { legend: { labels: { color: '#f8fafc', font: { size: 14 } } } }
            }
        });
    }
});

function renderAnalysis() {
    const container = document.getElementById('ai-suggestion');
    // Simple heuristic for summary
    container.innerHTML = `
            <p><strong>費用面：</strong> 兩者預算極為接近，台東每人約便宜 NT$161，差異可忽略。</p>
            <p><strong>行程特色：</strong> 
            <br>🌲 <strong>阿里山</strong>：行程集中於體能活動（抓泥鰍、爬山、日出），適合年輕或活力充沛的團隊，住宿較為基礎但有特色(小木屋)。
            <br>🌊 <strong>台東</strong>：偏向文化體驗與休閒觀光（部落、單車、水族館），住宿升級為連住兩晚四星酒店，適合追求放鬆與住宿品質的團隊。</p>
            <p style="margin-top:10px; color: #facc15;">💡 <strong>建議：</strong> 若重視「員工凝聚力/團康」選阿里山；若重視「慰勞/吃好住好」選台東。</p>
        `;
}

function renderBudget() {
    const tbody = document.getElementById('budget-table-body');
    tbody.innerHTML = '';

    budgetData.forEach(row => {
        const tr = document.createElement('tr');
        let diff = row.ali - row.tai;
        let diffText = diff > 0 ? `阿里山貴 ${diff.toLocaleString()}` : (diff < 0 ? `台東貴 ${Math.abs(diff).toLocaleString()}` : '-');

        tr.innerHTML = `
                <td>${row.item}</td>
                <td style="color:${diff > 0 ? '#ef4444' : 'inherit'}">${row.ali.toLocaleString()}</td>
                <td style="color:${diff < 0 ? '#ef4444' : 'inherit'}">${row.tai.toLocaleString()}</td>
                <td style="font-size:0.85rem; color:#94a3b8">${diffText}</td>
            `;
        tbody.appendChild(tr);
    });

    document.getElementById('ali-total').textContent = `$${totalBudget.ali.toLocaleString()}`;
    document.getElementById('tai-total').textContent = `$${totalBudget.tai.toLocaleString()}`;
    document.getElementById('ali-pp').textContent = `$${totalBudget.aliPerPerson.toLocaleString()}`;
    document.getElementById('tai-pp').textContent = `$${totalBudget.taiPerPerson.toLocaleString()}`;

    let totalDiff = totalBudget.ali - totalBudget.tai;
    document.getElementById('total-diff').textContent = totalDiff > 0 ? `阿里山總價多 $${totalDiff.toLocaleString()}` : `台東總價多 $${Math.abs(totalDiff).toLocaleString()}`;
}

const itineraries = {
    taitung: {
        title: '台東三日遊',
        period: '115年3-5月 平日',
        day1: [
            { time: '07:50~08:00', activity: '指定地點集合報到', note: '預計 08:00 發車', image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1000', link: '#' },
            { time: '08:00~10:30', activity: '車程時間', note: '', image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1000', link: '#' },
            { time: '10:30~11:30', activity: '屏東農業科技園區觀賞水族展示廳', note: '欣賞珍稀魚類與草間彌生公共藝術', image: 'https://images.unsplash.com/photo-1535591273668-578e31182c4f?q=80&w=1000', link: 'https://www.facebook.com/Pabp.Aquarium' },
            { time: '12:00~13:00', activity: '午餐時間', note: '', image: 'https://images.unsplash.com/photo-1599042250262-42173167b57b?q=80&w=1000', link: '#' },
            { time: '13:00~15:00', activity: '車程時間', note: '', image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1000', link: '#' },
            { time: '15:00~15:40', activity: '大武之心南迴驛站', note: '全台最美休息站，眺望太平洋', image: 'https://tour.taitung.gov.tw/image/27339/1024x768', link: 'https://tour.taitung.gov.tw/zh-tw/attraction/details/1535' },
            { time: '17:00~18:00', activity: '晚餐時間', note: '', image: 'https://images.unsplash.com/photo-1605333396915-47e1327179ec?q=80&w=1000', link: '#' },
            { time: '18:30~19:00', activity: '辦理進房入住，小憩片刻', note: '住宿', image: 'https://www.naruwan-hotel.com.tw/garden/images/cover.jpg', link: 'https://www.naruwan-hotel.com.tw/garden/' },
            { time: '20:00~22:00', activity: '自由活動，享用飯店設備設施', note: '台東 娜路彎花園酒店 或同級', image: 'https://www.naruwan-hotel.com.tw/garden/images/cover.jpg', link: 'https://www.naruwan-hotel.com.tw/garden/' }
        ],
        day2: [
            { time: '06:30~09:00', activity: '早安台東，享用飯店早餐', note: '預計 09:00 集合發車', image: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?q=80&w=1000', link: '#' },
            { time: '09:30~12:00', activity: '達魯瑪克部落文化體驗', note: '入境儀式＋過火除穢行程說明＋部落簡介\n• 傳統弓射箭體驗\n• 部落+獵經導覽+樹洞探索\n• DIY 體驗：無塑餐具（竹杯）\n• 大合照（賦歸）', image: 'https://tour.taitung.gov.tw/image/576/1024x768', link: 'https://ilrataromak.com/' },
            { time: '12:30~14:00', activity: '午餐時間', note: '', image: 'https://images.unsplash.com/photo-1599042250262-42173167b57b?q=80&w=1000', link: '#' },
            { time: '14:00~15:00', activity: '原生應用植物園', note: '養生藥草與親子牧場體驗', image: 'https://tour.taitung.gov.tw/image/596/1024x768', link: 'https://yuan-sen.com.tw/' },
            { time: '15:30~17:00', activity: '台東森林公園', note: '含腳踏車，遊覽琵琶湖、活水湖', image: 'https://tour.taitung.gov.tw/image/23304/1024x768', link: 'https://tour.taitung.gov.tw/zh-tw/attraction/details/456' },
            { time: '17:30~18:30', activity: '晚餐時間', note: '', image: 'https://images.unsplash.com/photo-1605333396915-47e1327179ec?q=80&w=1000', link: '#' },
            { time: '19:00~00:00', activity: '晚安台東', note: '住宿：台東 娜路彎花園酒店 或同級', image: 'https://www.naruwan-hotel.com.tw/garden/images/cover.jpg', link: 'https://www.naruwan-hotel.com.tw/garden/' }
        ],
        day3: [
            { time: '07:00~09:30', activity: '飯店晨喚，享用飯店內自助式早餐', note: '預計 09:30 集合發車', image: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?q=80&w=1000', link: '#' },
            { time: '09:50~10:30', activity: '台東糖廠文創園區', note: '探索在地文創與工業地景藝術', image: 'https://tour.taitung.gov.tw/image/23308/1024x768', link: 'https://tour.taitung.gov.tw/zh-tw/attraction/details/460' },
            { time: '11:00~12:00', activity: '午餐時間', note: '', image: 'https://images.unsplash.com/photo-1599042250262-42173167b57b?q=80&w=1000', link: '#' },
            { time: '12:00~17:00', activity: '車程時間，返抵溫暖的家', note: '', image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1000', link: '#' }
        ]
    },
    alishan: {
        title: '阿里山三日遊',
        period: '115年3-5月 平日',
        day1: [
            { time: '07:50~08:00', activity: '指定地點集合報到', note: '預計 08:00 發車', image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1000', link: '#' },
            { time: '08:00~09:00', activity: '車程時間', note: '', image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1000', link: '#' },
            { time: '09:00~09:40', activity: '寧濟御庭園林山水文化園區', note: '中國風庭園，媽祖信仰中心', image: 'https://img.mimigo.com.tw/upload/202110/30/202110302302196695.jpg', link: 'https://www.facebook.com/NINGJIYUTING/' },
            { time: '10:00~10:40', activity: '雲中街文創聚落', note: '日式舊宿舍群，文青必訪', image: 'https://tour.yunlin.gov.tw/upload/attractions/20200827170845.jpg', link: 'https://www.facebook.com/YunzhongStreet/' },
            { time: '11:00~12:00', activity: '午餐時間', note: '', image: 'https://images.unsplash.com/photo-1599042250262-42173167b57b?q=80&w=1000', link: '#' },
            { time: '13:00~16:00', activity: '觀音瀑布', note: '需換乘接駁車，週四休園', image: 'https://www.ali-nsa.net/image/24911/1024x768', link: 'https://www.ali-nsa.net/zh-tw/attractions/detail/201' },
            { time: '17:00~17:30', activity: '辦理進房入住，小憩片刻', note: '', image: 'https://www.greencity.com.tw/upload/room_b/078a0a86616016cda71a646270ee3e87.jpg', link: 'https://www.greencity.com.tw/' },
            { time: '18:00~20:00', activity: '晚餐時間~BBQ 時光', note: '住宿：嘉義 童年渡假村 或同級', image: 'https://images.unsplash.com/photo-1532635241-17e820acc59f?q=80&w=1000', link: 'https://www.greencity.com.tw/' },
            { time: '22:00~00:00', activity: '晚安嘉義', note: '', image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1000', link: '#' }
        ],
        day2: [
            { time: '07:00~08:00', activity: '飯店晨喚，享用飯店內自助式早餐', note: '', image: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?q=80&w=1000', link: '#' },
            { time: '08:00~11:00', activity: '童年渡假村分組闘關活動競賽', note: '• 我們來去抓泥鰍（這個會濕）\n• 或人力拉車\n• 滾鐵輪\n• 划船區\n• 漆彈射擊區（定點每人5發）', image: 'https://www.greencity.com.tw/upload/room_b/5679dc6e8b4e70e9f4561b36997f37f3.jpg', link: 'https://www.greencity.com.tw/' },
            { time: '11:00~12:00', activity: '午餐時間', note: '預計 12:00 集合發車', image: 'https://images.unsplash.com/photo-1599042250262-42173167b57b?q=80&w=1000', link: '#' },
            { time: '12:00~13:00', activity: '車程時間', note: '', image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1000', link: '#' },
            { time: '13:00~15:00', activity: '隙頂二延平步道觀雲平台', note: '漫步茶園步道，欣賞壯麗雲海', image: 'https://www.ali-nsa.net/image/2486/1024x768', link: 'https://www.ali-nsa.net/zh-tw/attractions/detail/144' },
            { time: '16:30~17:00', activity: '辦理進房入住，小憩片刻', note: '', image: 'https://www.hotel.com.tw/upload/hotel/00438/b/00438_b_01.jpg', link: 'https://www.hotel.com.tw/zh-tw/hotel/alimountain-gaushanching-hotel/' },
            { time: '18:00~19:00', activity: '晚餐時間', note: '住宿：嘉義 高山青大飯店 或同級', image: 'https://images.unsplash.com/photo-1605333396915-47e1327179ec?q=80&w=1000', link: 'https://www.hotel.com.tw/zh-tw/hotel/alimountain-gaushanching-hotel/' },
            { time: '22:00~00:00', activity: '晚安阿里山', note: '', image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1000', link: '#' }
        ],
        day3: [
            { time: '03:00~04:00', activity: '飯店晨喚，來去看日出囉', note: '去程搭乘小火車前往祝山站\n回程步行下山', image: 'https://www.ali-nsa.net/image/2464/1024x768', link: 'https://www.ali-nsa.net/zh-tw/attractions/detail/139' },
            { time: '07:00~09:00', activity: '早餐時段', note: '預計 10:00 集合發車', image: 'https://images.unsplash.com/photo-1493770348161-369560ae357d?q=80&w=1000', link: '#' },
            { time: '10:00~11:30', activity: '車程時間', note: '', image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1000', link: '#' },
            { time: '12:00~13:00', activity: '午餐時間', note: '', image: 'https://images.unsplash.com/photo-1599042250262-42173167b57b?q=80&w=1000', link: '#' },
            { time: '13:30~16:00', activity: '粉牛樂園 (綠盈牧場)', note: '親子同樂，享受牧場風光', image: 'https://www.greening.com.tw/upload/2019/04/20190412111536.jpg', link: 'http://www.greening.com.tw/' },
            { time: '16:00~17:30', activity: '車程時間，返抵溫暖的家', note: '', image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1000', link: '#' }
        ]
    }
};

function renderItinerary() {
    ['alishan', 'taitung'].forEach(loc => {
        const container = document.getElementById(`${loc}-timeline`);
        container.innerHTML = '';

        const data = itineraries[loc];

        ['day1', 'day2', 'day3'].forEach((day, index) => {
            const dayNum = index + 1;
            const themeClass = `day-theme-${dayNum}`; // day-theme-1, 2, 3

            // Day Section Wrapper
            const daySection = document.createElement('div');
            daySection.className = `day-section ${themeClass}`;

            // Day Header
            daySection.innerHTML = `
                    <div class="day-divider">
                        <div class="day-badge">DAY ${dayNum}</div>
                        <div class="day-title text-white">
                            ${dayNum === 1 ? '啟程前往' : (dayNum === 2 ? '深度體驗' : '完美的句點')}
                        </div>
                    </div>
                `;

            // Timeline Group (Left Border)
            const timelineGroup = document.createElement('div');
            timelineGroup.className = 'timeline-group';

            data[day].forEach(item => {
                // Process Note newlines
                const noteHtml = item.note ? item.note.replace(/\\n/g, '<br>').replace(/\n/g, '<br>') : '';

                // Determine Icon and Type
                let iconClass = 'fa-map-location-dot';
                let tagText = '行程';

                if (item.activity.includes('餐') || item.activity.includes('飯')) {
                    iconClass = 'fa-utensils';
                    tagText = '餐飲';
                } else if (item.activity.includes('住') || item.activity.includes('店')) {
                    iconClass = 'fa-bed';
                    tagText = '住宿';
                } else if (item.activity.includes('車') || item.activity.includes('接駁') || item.activity.includes('發車')) {
                    iconClass = 'fa-bus';
                    tagText = '交通';
                } else if (item.activity.includes('步道') || item.activity.includes('森') || item.activity.includes('園')) {
                    iconClass = 'fa-tree';
                    tagText = '景點';
                } else if (item.activity.includes('體驗') || item.activity.includes('DIY') || item.activity.includes('闖關')) {
                    iconClass = 'fa-puzzle-piece';
                    tagText = '活動';
                }

                const cardWrapper = document.createElement('div');
                cardWrapper.className = 'timeline-card-wrapper';

                cardWrapper.innerHTML = `
                        <div class="timeline-dot"></div>
                        <div class="timeline-card no-image-card">
                            <div class="card-content-inner">
                                <div class="card-header">
                                    <div class="item-time">
                                        <i class="fa-regular fa-clock"></i> ${item.time}
                                    </div>
                                    <span class="activity-tag">${tagText}</span>
                                </div>
                                <div class="card-body">
                                    <div class="activity-icon-large">
                                        <i class="fa-solid ${iconClass}"></i>
                                    </div>
                                    <div class="activity-details">
                                        <h3 class="card-title text-layout">${item.activity}</h3>
                                        ${noteHtml ? `<div class="card-note">${noteHtml}</div>` : ''}
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                timelineGroup.appendChild(cardWrapper);
            });

            daySection.appendChild(timelineGroup);
            container.appendChild(daySection);
        });
    });
}
