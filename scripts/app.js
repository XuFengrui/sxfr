/*
 * app.js
 * 应用主控制器：页面切换 + 事件绑定
 */

const ENDING_HINTS = [
    '需要的时候，我一直在这里。',
    '没关系，我们慢慢来。'
];


document.addEventListener('DOMContentLoaded', () => {
    initOpening();
    initHome();
    refreshCounts();
});

/* ================== 开场视频 ================== */

function initOpening() {
    const opening = document.getElementById('opening');
    const home = document.getElementById('home');
    const video = document.getElementById('openingVideo');

    if (!video || !opening || !home) {
        if (opening) opening.classList.add('hidden');
        if (home) home.classList.remove('hidden');
        return;
    }

    // 尝试加载视频，如果失败则直接进入首页
    video.src = 'assets/video/opening.mp4';
    video.muted = true;
    
    video.addEventListener('error', () => {
        // 视频文件不存在或加载失败，直接进入首页
        enterHome();
    });

    video.addEventListener('loadeddata', () => {
        // 视频加载成功，尝试播放
        video.play().catch(() => {
            // 如果自动播放失败，点击任意处进入
            opening.addEventListener('click', enterHome, { once: true });
        });
    });

    video.addEventListener('ended', enterHome);

    // 如果视频加载超时，也进入首页
    setTimeout(() => {
        if (video.readyState < 2) { // HAVE_CURRENT_DATA
            enterHome();
        }
    }, 2000);

    function enterHome() {
        opening.classList.add('hidden');
        home.classList.remove('hidden');
        home.classList.add('fade-in');
    }
}

/* ================== 首页 ================== */
/* ================== 情绪模式微文案 ================== */

const MODE_TEXTS = {
    sad: '如果你有点难过，我在。',
    angry: '如果你现在很生气，先别急。',
    happy: '如果你今天有点开心。',
    hidden: '如果你不知道为什么点了这里。'
};

function initHome() {
    const modeButtons = document.querySelectorAll('.mode-card');

    modeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // 防止重复点击
            if (btn.classList.contains('disabled')) return;

            const modeKey = btn.dataset.mode;
            
            // 保存原始内容
            const modeTextEl = btn.querySelector('.mode-text');
            const modeCountEl = btn.querySelector('.mode-count');
            const originalText = modeTextEl ? modeTextEl.textContent : '';
            
            // 🌸 设置按钮显示的微文案
            if (modeTextEl) {
                modeTextEl.textContent = MODE_TEXTS[modeKey];
            } else {
                // 如果没有mode-text元素，创建它
                const textSpan = document.createElement('span');
                textSpan.className = 'mode-text';
                textSpan.textContent = MODE_TEXTS[modeKey];
                if (modeCountEl) {
                    btn.insertBefore(textSpan, modeCountEl);
                } else {
                    btn.appendChild(textSpan);
                }
            }

            // 先禁用按钮（被接住的感觉）
            btn.classList.add('disabled');

            // 加一点展开/呼吸感（可选）
            btn.classList.add('box-open');

            // 延迟抽取 + 展示，增加期待感
            setTimeout(() => {
                const wish = DrawLogic.drawWishByMode(modeKey);

                if (!wish) {
                    alert('这一类心愿已经被抽完了。');
                    btn.classList.remove('disabled');
                    btn.classList.remove('box-open');
                    // 恢复按钮文本
                    if (modeTextEl) {
                        modeTextEl.textContent = originalText || '';
                    }
                    return;
                }

                showResult(wish);
                refreshCounts();
                checkSecretUnlock();
            }, 800);
        });
    });

}

/* ================== 抽取结果 ================== */

function showResult(wish) {
    const home = document.getElementById('home');
    const result = document.getElementById('result');
    const wishText = document.getElementById('wishText');
    const wishImage = document.getElementById('wishImage');
    const wishAudio = document.getElementById('wishAudio');
    const backBtn = document.getElementById('backHome');

    if (!home || !result || !wishText || !backBtn) return;

    wishText.textContent = '';
    wishText.classList.remove('wish-text');
    if (wishImage) {
        wishImage.classList.add('hidden');
        wishImage.src = '';
    }
    if (wishAudio) {
        wishAudio.pause();
        wishAudio.currentTime = 0;
        wishAudio.classList.add('hidden');
        wishAudio.removeAttribute('src');
    }

    // 平滑过渡到结果页
    home.classList.add('hidden');
    result.classList.remove('hidden');
    result.classList.add('fade-in');

    // 延迟显示文字，增加期待感
    setTimeout(() => {
        wishText.textContent = wish.text;
        wishText.classList.add('wish-text');
        if (wishImage && wish.image) {
            wishImage.src = wish.image;
            wishImage.classList.remove('hidden');
        }
        if (wishAudio && wish.audio) {
            wishAudio.src = wish.audio;
            wishAudio.classList.remove('hidden');
            wishAudio.load();
            // iOS 需要用户点击，这里在按钮点击上下文内尝试播放
            wishAudio.play().catch(() => {
                // 静默失败，用户可手动点击播放
            });
        }
    }, 400);

    // 重置按钮事件（避免重复绑定）
    backBtn.onclick = () => {
        const hint = document.getElementById('endingHint');
        if (wishAudio) {
            wishAudio.pause();
            wishAudio.currentTime = 0;
        }

        // 先隐藏结果页
        result.classList.remove('fade-in');
        setTimeout(() => {
            result.classList.add('hidden');
        }, 300);

        // 显示结尾提示
        if (hint) {
            const text =
                ENDING_HINTS[Math.floor(Math.random() * ENDING_HINTS.length)];
            hint.textContent = text;
            hint.classList.remove('hidden');
            hint.classList.add('fade-in');
        }

        // 稍后回到首页
        setTimeout(() => {
            if (hint) {
                hint.classList.remove('fade-in');
                setTimeout(() => {
                    hint.classList.add('hidden');
                    hint.textContent = '';
                }, 300);
            }
            home.classList.remove('hidden');
            home.classList.add('fade-in');
        }, 1000);
    };

}

/* ================== 剩余数量刷新 ================== */

function refreshCounts() {
    const counts = DrawLogic.getAllRemainingCounts();

    Object.keys(counts).forEach(modeKey => {
        const el = document.getElementById(`count-${modeKey}`);
        if (!el) return;

        const total = WISH_POOL[modeKey].total;
        el.textContent = `${counts[modeKey]} / ${total}`;

        // 抽完后禁用
        if (counts[modeKey] === 0) {
            el.closest('.mode-card').classList.add('disabled');
        }
    });
}

/* ================== 终极隐藏入口 ================== */

function checkSecretUnlock() {
    if (!DrawLogic.isAllCompleted()) return;

    const secret = document.getElementById('secret');
    const home = document.getElementById('home');

    // 检查是否已经添加过提示
    if (document.querySelector('.secret-hint')) return;

    // 轻柔显示入口（不打断）
    const hintElement = document.createElement('p');
    hintElement.className = 'secret-hint';
    hintElement.textContent = '好像，有什么一直没说完';
    home.appendChild(hintElement);

    hintElement.addEventListener('click', () => {
        home.classList.remove('fade-in');
        setTimeout(() => {
            home.classList.add('hidden');
            secret.classList.remove('hidden');
            secret.classList.add('fade-in');
            initSecret();
        }, 300);
    });
}

function initSecret() {
    const input = document.getElementById('secretInput');
    const confirm = document.getElementById('secretConfirm');
    const video = document.getElementById('secretVideo');
    const wrapper = document.querySelector('.secret-video-wrapper');

    const PASSWORD = '你们的密码'; // ← 你自己改

    confirm.onclick = () => {
        if (input.value === PASSWORD) {
            // 禁止重复触发
            confirm.disabled = true;
            input.disabled = true;

            // 设置视频（可随时换，不影响进度）
            video.src = 'assets/video/final-surprise.mp4';

            wrapper.classList.remove('hidden');

            // iOS 需要用户触发，这里是按钮点击，安全
            video.play();
            const ending = document.getElementById('finalEnding');

            // 你选一句放这里
            ending.textContent = '没有别的了。我一直都在。';

            video.addEventListener('ended', () => {
                // 延迟一点出现，不抢情绪
                setTimeout(() => {
                    ending.classList.remove('hidden');
                }, 800);
            });

        } else {
            input.value = '';
            input.placeholder = '不是这个，但你会想起来的';
        }
    };
}

