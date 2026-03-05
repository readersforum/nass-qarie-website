// magic.js - Glowing Cursor and Interactive Effects
document.addEventListener("DOMContentLoaded", function () {
    // 1. إنشاء عناصر المؤشر السحري (الدائرة والظل المضيء)
    const cursor = document.createElement("div");
    const cursorBlur = document.createElement("div");

    cursor.classList.add("magic-cursor");
    cursorBlur.classList.add("magic-cursor-blur");

    document.body.appendChild(cursor);
    document.body.appendChild(cursorBlur);

    // 2. إضافة التنسيقات (CSS) الخاصة بالمؤشر عبر الجافاسكريبت مباشرة
    const style = document.createElement('style');
    style.innerHTML = `
        /* إخفاء المؤشر الافتراضي اختيارياً (تم التعليق لترك الخيار لك) */
        /* body { cursor: none; } */

        .magic-cursor {
            width: 20px;
            height: 20px;
            border: 2px solid #d35400; /* لون برتقالي ناري */
            border-radius: 50%;
            position: fixed;
            pointer-events: none; /* كي لا يعيق الضغط على العناصر */
            z-index: 9999;
            transform: translate(-50%, -50%); /* مركزه على نقطة الماوس */
            transition: width 0.3s, height 0.3s, background-color 0.3s, border-color 0.3s;
        }

        .magic-cursor-blur {
            width: 50px;
            height: 50px;
            background-color: rgba(211, 84, 0, 0.2);
            border-radius: 50%;
            position: fixed;
            pointer-events: none;
            z-index: 9998;
            transform: translate(-50%, -50%);
            filter: blur(8px); /* تأثير التوهج */
            /* حركة ناعمة وتأخير بسيط ليعطي تأثير "الذيل" المضيء */
            transition: width 0.3s, height 0.3s, background-color 0.3s, left 0.1s ease-out, top 0.1s ease-out;
        }

        /* تفاعل المؤشر مع الوضع الليلي */
        body.dark-mode .magic-cursor {
            border-color: #f1c40f; /* لون أصفر ذهبي */
        }
        
        body.dark-mode .magic-cursor-blur {
            background-color: rgba(241, 196, 15, 0.2);
        }

        /* تفاعل العناصر مع الماوس */
        a:hover, button:hover, .book-card:hover, .team-card:hover, .close-btn:hover {
            cursor: pointer;
        }
    `;
    document.head.appendChild(style);

    // 3. برمجة حركة المؤشر وتتبع الماوس
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    document.addEventListener("mousemove", function (e) {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // الدائرة الأساسية تلحق الماوس فوراً
        cursor.style.left = mouseX + "px";
        cursor.style.top = mouseY + "px";

        // الظل المضيء يتبعها بتأخير بسيط جداً
        setTimeout(() => {
            cursorBlur.style.left = mouseX + "px";
            cursorBlur.style.top = mouseY + "px";
        }, 50);
    });

    // 4. تأثيرات خاصة عند التمرير على الروابط والبطاقات
    const hoverables = document.querySelectorAll("a, button, .book-card, .team-card, .close-btn, input");

    hoverables.forEach(el => {
        el.addEventListener("mouseenter", () => {
            // تكبير المؤشر
            cursor.style.width = "40px";
            cursor.style.height = "40px";
            cursor.style.backgroundColor = "rgba(211, 84, 0, 0.1)";

            // تكبير الظل المضيء
            cursorBlur.style.width = "80px";
            cursorBlur.style.height = "80px";

            // تناسق مع الوضع الليلي
            if (document.body.classList.contains('dark-mode')) {
                cursor.style.backgroundColor = "rgba(241, 196, 15, 0.1)";
            }
        });

        el.addEventListener("mouseleave", () => {
            // إعادة المؤشر لحجمه الطبيعي
            cursor.style.width = "20px";
            cursor.style.height = "20px";
            cursor.style.backgroundColor = "transparent";

            cursorBlur.style.width = "50px";
            cursorBlur.style.height = "50px";
        });
    });

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
});
