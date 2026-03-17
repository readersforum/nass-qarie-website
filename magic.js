// magic.js - Glowing Cursor and Interactive Effects
document.addEventListener("DOMContentLoaded", function () {
    // تم حذف تأثيرات الماوس نهائياً بناءً على طلب المستخدم



    // 5. إضافة النجوم المضيئة المتحركة في الخلفية
    const starsContainer = document.createElement("div");
    starsContainer.classList.add("stars-container");
    document.body.prepend(starsContainer); // إضافته في بداية الصفحة ليكون خلفية

    const starsStyle = document.createElement('style');
    starsStyle.innerHTML = `
        .stars-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1; /* ليكون خلف جميع العناصر */
            overflow: hidden;
            
            /* ألوان النجوم في الوضع النهاري (برتقالي) */
            --star-color: #d35400;
            --star-glow: rgba(211, 84, 0, 0.6);
        }

        /* ألوان النجوم في الوضع الليلي (أصفر ذهبي) */
        body.dark-mode .stars-container {
            --star-color: #f1c40f;
            --star-glow: rgba(241, 196, 15, 0.8);
        }

        .magic-star {
            position: absolute;
            background-color: var(--star-color);
            border-radius: 50%;
            opacity: 0;
            animation: twinkle linear infinite;
        }

        @keyframes twinkle {
            0% {
                opacity: 0;
                transform: scale(0.5) translateY(0);
            }
            50% {
                opacity: 1;
                transform: scale(1.2) translateY(-20px);
                box-shadow: 0 0 10px var(--star-glow), 0 0 20px var(--star-glow);
            }
            100% {
                opacity: 0;
                transform: scale(0.5) translateY(-40px);
            }
        }
    `;
    document.head.appendChild(starsStyle);

    // دالة إنشاء النجوم
    function createStar() {
        const star = document.createElement("div");
        star.classList.add("magic-star");

        // تحديد خصائص النجمة عشوائياً
        const size = Math.random() * 3 + 1; // الحجم بين 1 و 4 بيكسل
        const left = Math.random() * 100; // الموقع الأفقي
        const animationDuration = Math.random() * 3 + 2; // مدة الحركة بين 2 و 5 ثواني
        const animationDelay = Math.random() * 5; // تأخير الحركة

        star.style.width = size + "px";
        star.style.height = size + "px";
        star.style.left = left + "vw";
        star.style.top = Math.random() * 100 + "vh"; // ظهور في أماكن عشوائية عمودياً أيضاً
        star.style.animationDuration = animationDuration + "s";
        star.style.animationDelay = animationDelay + "s";

        starsContainer.appendChild(star);

        // إزالة النجمة بعد انتهاء حركتها لعدم تكديس العناصر (اختياري، لكن هنا النجوم تعيد نفسها لأنها infinite)
    }

    // إنشاء عدد من النجوم
    const numberOfStars = 50;
    for (let i = 0; i < numberOfStars; i++) {
        createStar();
    }

    // 6. زر الصعود للأعلى (Scroll to Top)
    const scrollTopBtn = document.createElement("button");
    // أيقونة سهم أنيقة مصممة بـ SVG بدل الإيموجي التقليدي 
    scrollTopBtn.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>`;
    scrollTopBtn.classList.add("scroll-top-btn");
    document.body.appendChild(scrollTopBtn);

    const scrollTopStyle = document.createElement('style');
    scrollTopStyle.innerHTML = `
        .scroll-top-btn {
            position: fixed;
            bottom: 30px;
            right: 30px; /* مكان الزر في الزاوية اليمنى السفلية */
            padding: 8px 22px; /* لتكوين مستطيل أفقي */
            border-radius: 25px; /* حواف دائرية بالكامل (Pill Shape) */
            background-color: rgba(211, 84, 0, 0.6); /* لون برتقالي ناري شفاف */
            backdrop-filter: blur(4px); /* تأثير زجاجي لطيف */
            -webkit-backdrop-filter: blur(4px);
            color: white;
            border: 1px solid rgba(211, 84, 0, 0.8);
            cursor: pointer;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            z-index: 2000;
            opacity: 0;
            visibility: hidden;
            transform: translateY(20px);
            transition: all 0.3s ease-in-out;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .scroll-top-btn svg {
            width: 22px;
            height: 22px;
            transition: transform 0.3s;
        }

        .scroll-top-btn.show {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
        }

        .scroll-top-btn:hover {
            background-color: rgba(230, 126, 34, 0.9);
            transform: translateY(-5px);
            box-shadow: 0 6px 15px rgba(211, 84, 0, 0.3);
        }

        .scroll-top-btn:hover svg {
            transform: translateY(-3px); /* حركة خفيفة للسهم للأعلى عند التأشير */
        }

        /* الوضع الليلي لزر الصعود */
        body.dark-mode .scroll-top-btn {
            background-color: rgba(241, 196, 15, 0.5); /* لون أصفر ذهبي شفاف */
            color: #fff;
            border: 1px solid rgba(241, 196, 15, 0.7);
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
        }

        body.dark-mode .scroll-top-btn:hover {
            background-color: rgba(243, 156, 18, 0.9);
            box-shadow: 0 6px 15px rgba(241, 196, 15, 0.4);
        }
    `;
    document.head.appendChild(scrollTopStyle);

    // إظهار/إخفاء الزر بناءً على التمرير
    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add("show");
        } else {
            scrollTopBtn.classList.remove("show");
        }
    });

    // الصعود لأعلى بسلاسة عند الضغط
    scrollTopBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    // 7. زر التلكرام العائم مع نص (Telegram Floating Button with Text)
    const telegramBtn = document.createElement("a");
    telegramBtn.href = "https://t.me/muntada25"; // رابط القناة
    telegramBtn.target = "_blank";
    telegramBtn.title = "انضم لنقاشاتنا على التلكرام";
    telegramBtn.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
        </svg>
        <span class="telegram-text">انضم لنقاشاتنا على التلكرام</span>
    `;
    telegramBtn.classList.add("telegram-floating-btn");
    document.body.appendChild(telegramBtn);

    const telegramStyle = document.createElement('style');
    // إضافة تنسيق الخط ليتوافق مع تصميم الموقع عامةً (إذا كان الخط Segoe UI أو غيره)
    telegramStyle.innerHTML = `
        .telegram-floating-btn {
            position: fixed;
            bottom: 30px;
            left: 30px; /* مكان الزر في الزاوية اليسرى السفلية */
            height: 50px;
            padding: 0 20px; /* حشوة أفقية للنص */
            background-color: rgba(0, 136, 204, 0.6); /* لون التلكرام الأصلي، لكن شفاف 60% */
            backdrop-filter: blur(4px); /* تأثير زجاجي لطيف كزر الصعود */
            -webkit-backdrop-filter: blur(4px);
            color: white;
            border: 1px solid rgba(0, 136, 204, 0.8); /* حدود واضحة بلون التلكرام */
            border-radius: 25px; /* حواف دائرية تعطي شكل كبسولة */
            display: flex;
            justify-content: center;
            align-items: center;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            z-index: 2000;
            transition: all 0.3s ease-in-out;
            text-decoration: none;
            font-family: inherit; /* ليتوافق مع خط الموقع */
            overflow: hidden;
            direction: rtl; /* اتجاه النص من اليمين لليسار */
        }

        .telegram-text {
            font-size: 15px;
            font-weight: bold;
            margin-right: 10px; /* مسافة بين الأيقونة والنص */
            white-space: nowrap; /* منع انقسام النص على سطرين */
        }

        .telegram-floating-btn svg {
            transition: transform 0.3s;
            margin-top: 2px;
            flex-shrink: 0;
        }

        .telegram-floating-btn:hover {
            transform: translateY(-5px); /* حركة للصعود بدلاً من التكبير */
            background-color: rgba(0, 119, 181, 0.9); /* يصبح أغمق وأقل شفافية عند التمرير */
            box-shadow: 0 6px 15px rgba(0, 136, 204, 0.3);
            color: white;
        }

        .telegram-floating-btn:hover svg {
            transform: rotate(-10deg) scale(1.1);
        }

        /* الوضع الليلي لزر التلكرام */
        body.dark-mode .telegram-floating-btn {
            background-color: rgba(0, 136, 204, 0.5); /* شفافية أكبر في الوضع الليلي */
            border: 1px solid rgba(0, 136, 204, 0.7);
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
        }

        body.dark-mode .telegram-floating-btn:hover {
            background-color: rgba(0, 136, 204, 0.8);
            box-shadow: 0 6px 15px rgba(0, 136, 204, 0.5);
        }
        
        /* توافق زر التلكرام مع شاشات الهواتف */
        @media (max-width: 768px) {
            .telegram-floating-btn {
                bottom: 20px;
                left: 20px;
                height: 45px;
                padding: 0 15px;
            }
            .telegram-text {
                font-size: 13px; /* تصغير الخط قليلاً للهواتف */
                margin-right: 8px;
            }
            .telegram-floating-btn svg {
                width: 20px;
                height: 20px;
            }
        }
    `;
    document.head.appendChild(telegramStyle);
});
