// ==========================================
// HUKUK AKADEMİ - TEST SİSTEMİ
// ==========================================

const questions = [
    {
        question:
            "Türk Borçlar Hukuku'na göre bir sözleşmenin kurulabilmesi için tarafların irade beyanlarının nasıl olması gerekir?",

        answers: [
            "Birbirinden tamamen bağımsız olması",
            "Karşılıklı ve birbirine uygun olması",
            "Mutlaka noter huzurunda açıklanması",
            "Yalnızca yazılı şekilde yapılması"
        ],

        correct: 1,

        explanation:
            "Sözleşmenin kurulabilmesi için tarafların karşılıklı ve birbirine uygun irade açıklamalarında bulunmaları gerekir.",

        law:
            "Türk Borçlar Kanunu m. 1"
    },

    {
        question:
            "Bir sözleşmenin yapılması amacıyla bir kişinin diğer tarafa yönelttiği ve sözleşmenin esaslı unsurlarını içeren irade açıklamasına ne ad verilir?",

        answers: [
            "Öneri (icap)",
            "İbra",
            "Temerrüt",
            "İfa"
        ],

        correct: 0,

        explanation:
            "Sözleşme yapılması amacıyla karşı tarafa yöneltilen ve kabul edilmesi hâlinde sözleşmenin kurulmasını sağlayabilecek irade açıklaması öneri olarak adlandırılır.",

        law:
            "Türk Borçlar Kanunu m. 3 ve devamı"
    },

    {
        question:
            "Hazır olan kişiler arasında yapılan bir öneride kabul için süre belirlenmemişse öneride bulunan kişi kural olarak ne zamana kadar önerisiyle bağlıdır?",

        answers: [
            "Bir hafta boyunca",
            "Karşı taraf yazılı cevap verene kadar",
            "Önerinin hemen kabul edilebileceği ana kadar",
            "Her durumda 24 saat boyunca"
        ],

        correct: 2,

        explanation:
            "Hazır olan kişiler arasında süre belirlenmeden yapılan öneri hemen kabul edilmezse öneride bulunan kişi önerisiyle bağlılıktan kurtulur.",

        law:
            "Türk Borçlar Kanunu m. 4"
    },

    {
        question:
            "Aşağıdakilerden hangisi sözleşmenin kurulmasında 'kabul' kavramını en doğru şekilde ifade eder?",

        answers: [
            "Borçlunun borcunu yerine getirmesi",
            "Önerinin muhatabının öneriye uygun irade açıklaması",
            "Sözleşmenin mahkeme tarafından onaylanması",
            "Taraflardan birinin sözleşmeden dönmesi"
        ],

        correct: 1,

        explanation:
            "Kabul, önerinin muhatabı tarafından öneriye uygun olarak açıklanan ve sözleşmenin kurulmasını sağlayan irade beyanıdır.",

        law:
            "Türk Borçlar Kanunu m. 1"
    },

    {
        question:
            "Tarafların irade açıklamalarının sözleşmenin esaslı noktalarında uyuşması hâlinde kural olarak aşağıdakilerden hangisi gerçekleşir?",

        answers: [
            "Sözleşme kurulmuş olur",
            "Sözleşme kendiliğinden geçersiz olur",
            "Mutlaka noter onayı gerekir",
            "Mahkeme kararı beklenir"
        ],

        correct: 0,

        explanation:
            "Tarafların karşılıklı ve birbirine uygun irade açıklamalarının sözleşmenin esaslı noktalarında uyuşması sözleşmenin kurulmasını sağlar.",

        law:
            "Türk Borçlar Kanunu m. 1-2"
    }
];


// ==========================================
// DEĞİŞKENLER
// ==========================================

let currentQuestion = 0;

// Her sorunun seçilen cevabını burada tutacağız.
// null = henüz cevap verilmedi.
let userAnswers = new Array(questions.length).fill(null);


// Sadece test.html sayfasındaysak çalışması için:
const questionText = document.getElementById("questionText");
const answersContainer = document.getElementById("answersContainer");
const questionNumber = document.getElementById("questionNumber");
const progressBar = document.getElementById("quizProgressBar");

const previousButton = document.getElementById("previousButton");
const nextButton = document.getElementById("nextButton");

const answeredCount = document.getElementById("answeredCount");
const remainingCount = document.getElementById("remainingCount");

const questionDots = document.querySelectorAll(".question-dot");


// ==========================================
// SORUYU EKRANA GETİR
// ==========================================

function showQuestion() {

    if (!questionText || !answersContainer) {
        return;
    }

    const question = questions[currentQuestion];

    questionNumber.textContent =
        `SORU ${currentQuestion + 1} / ${questions.length}`;

    questionText.textContent = question.question;

    // Progress bar
    const progress =
        ((currentQuestion + 1) / questions.length) * 100;

    progressBar.style.width = `${progress}%`;


    // Önce eski şıkları temizle
    answersContainer.innerHTML = "";


    const letters = ["A", "B", "C", "D"];


    // Yeni şıkları oluştur
    question.answers.forEach((answer, index) => {

        const button = document.createElement("button");

        button.classList.add("answer-option");


        // Daha önce bu cevap seçildiyse seçili göster
        if (userAnswers[currentQuestion] === index) {
            button.classList.add("selected");
        }


        button.innerHTML = `
            <span class="answer-letter">
                ${letters[index]}
            </span>

            <span>
                ${answer}
            </span>
        `;


        button.addEventListener("click", () => {

            selectAnswer(index);

        });


        answersContainer.appendChild(button);

    });


    // İlk sorudaysak önceki butonu kapat
    previousButton.disabled = currentQuestion === 0;


    // Son soru kontrolü
    if (currentQuestion === questions.length - 1) {

        nextButton.innerHTML = `
            Testi Bitir
            <i class="fa-solid fa-check"></i>
        `;

        nextButton.classList.add("finish");

    } else {

        nextButton.innerHTML = `
            Sonraki Soru
            <i class="fa-solid fa-arrow-right"></i>
        `;

        nextButton.classList.remove("finish");

    }


    updateQuestionMap();
    updateAnswerStatus();
}


// ==========================================
// CEVAP SEÇ
// ==========================================

function selectAnswer(answerIndex) {

    userAnswers[currentQuestion] = answerIndex;

    const options =
        document.querySelectorAll(".answer-option");


    options.forEach((option, index) => {

        option.classList.toggle(
            "selected",
            index === answerIndex
        );

    });


    updateQuestionMap();
    updateAnswerStatus();
}


// ==========================================
// SAĞDAKİ SORU HARİTASI
// ==========================================

function updateQuestionMap() {

    questionDots.forEach((dot, index) => {

        dot.classList.remove(
            "active",
            "answered"
        );


        if (userAnswers[index] !== null) {
            dot.classList.add("answered");
        }


        if (index === currentQuestion) {
            dot.classList.add("active");
        }

    });
}


// ==========================================
// CEVAPLANAN / KALAN
// ==========================================

function updateAnswerStatus() {

    const answered =
        userAnswers.filter(answer => answer !== null).length;

    const remaining =
        questions.length - answered;


    answeredCount.textContent = answered;

    remainingCount.textContent = remaining;
}


// ==========================================
// SONRAKİ SORU
// ==========================================

if (nextButton) {

    nextButton.addEventListener("click", () => {

        if (currentQuestion < questions.length - 1) {

            currentQuestion++;

            showQuestion();

        } else {

            finishQuiz();

        }

    });

}


// ==========================================
// ÖNCEKİ SORU
// ==========================================

if (previousButton) {

    previousButton.addEventListener("click", () => {

        if (currentQuestion > 0) {

            currentQuestion--;

            showQuestion();

        }

    });

}


// ==========================================
// NUMARAYA BASARAK SORUYA GİT
// ==========================================

questionDots.forEach((dot, index) => {

    dot.addEventListener("click", () => {

        currentQuestion = index;

        showQuestion();

    });

});


// ==========================================
// TESTİ BİTİR
// ==========================================

function finishQuiz() {

    const unanswered =
        userAnswers.filter(answer => answer === null).length;


    // Boş soru varsa kullanıcıya sor
    if (unanswered > 0) {

        const confirmFinish = confirm(
            `${unanswered} soruyu boş bıraktın.\n\n` +
            `Yine de testi bitirmek istiyor musun?`
        );


        if (!confirmFinish) {
            return;
        }

    }


    let correctCount = 0;


    questions.forEach((question, index) => {

        if (userAnswers[index] === question.correct) {
            correctCount++;
        }

    });


    const wrongCount =
        questions.length - correctCount - unanswered;


    const score =
        Math.round(
            (correctCount / questions.length) * 100
        );


    // Sonuç ekranında kullanmak için kaydet
    const result = {

        score: score,

        correct: correctCount,

        wrong: wrongCount,

        empty: unanswered,

        answers: userAnswers,

        questions: questions

    };


    localStorage.setItem(
        "hukukTestResult",
        JSON.stringify(result)
    );


    // Birazdan oluşturacağımız sonuç sayfasına git
    window.location.href = "sonuc.html";
}


// ==========================================
// SAYFA İLK AÇILDIĞINDA
// ==========================================

showQuestion();

// ==========================================
// SONUÇ SAYFASI
// ==========================================

function loadResultPage() {

    const analysisList =
        document.getElementById("analysisList");

    // sonuc.html sayfasında değilsek çalışma
    if (!analysisList) {
        return;
    }


    const savedResult =
        localStorage.getItem("hukukTestResult");


    // Kayıtlı test sonucu yoksa
    if (!savedResult) {

        analysisList.innerHTML = `
            <div class="no-result-message">
                Henüz tamamlanmış bir test bulunmuyor.
            </div>
        `;

        return;
    }


    const result = JSON.parse(savedResult);


    // ======================================
    // ÜST SONUÇLAR
    // ======================================

    document.getElementById("scoreValue").textContent =
        result.score;

    document.getElementById("correctResult").textContent =
        result.correct;

    document.getElementById("wrongResult").textContent =
        result.wrong;

    document.getElementById("emptyResult").textContent =
        result.empty;

    document.getElementById("successResult").textContent =
        `%${result.score}`;

    document.getElementById("performancePercent").textContent =
        `%${result.score}`;


    // ======================================
    // TAMAMLAMA ORANI
    // ======================================

    const answered =
        result.questions.length - result.empty;

    const completion =
        Math.round(
            (answered / result.questions.length) * 100
        );


    document.getElementById("accuracyText").textContent =
        `%${result.score}`;

    document.getElementById("completionText").textContent =
        `%${completion}`;

    document.getElementById("accuracyBar").style.width =
        `${result.score}%`;

    document.getElementById("completionBar").style.width =
        `${completion}%`;


    // ======================================
    // DAİRELER
    // ======================================

    const bigCircle =
        document.getElementById("bigScoreCircle");

    bigCircle.style.background = `
        conic-gradient(
            white 0 ${result.score}%,
            rgba(255,255,255,.18)
            ${result.score}% 100%
        )
    `;


    const performanceCircle =
        document.querySelector(".performance-circle");

    performanceCircle.style.background = `
        conic-gradient(
            #7447dc 0 ${result.score}%,
            #eeeaf5 ${result.score}% 100%
        )
    `;


    // ======================================
    // MESAJ
    // ======================================

    const message =
        document.getElementById("resultMessage");

    const caption =
        document.getElementById("scoreCaption");

    const recommendationTitle =
        document.getElementById("recommendationTitle");

    const recommendationText =
        document.getElementById("recommendationText");


    if (result.score >= 80) {

        message.textContent =
            "Harika İş Çıkardın! 🎉";

        caption.textContent =
            "Çok İyi";

        recommendationTitle.textContent =
            "Konuya oldukça hakimsin";

        recommendationText.textContent =
            "Başarılı bir sonuç elde ettin. Yanlış yaptığın soruları inceleyerek konuyu pekiştirebilirsin.";

    }

    else if (result.score >= 60) {

        message.textContent =
            "Güzel Gidiyorsun! 👏";

        caption.textContent =
            "İyi";

        recommendationTitle.textContent =
            "Biraz daha tekrar yapabilirsin";

        recommendationText.textContent =
            "Temel kavramları biliyorsun. Yanlış cevaplarını inceleyip ilgili bölümleri tekrar etmen faydalı olabilir.";

    }

    else {

        message.textContent =
            "Biraz Daha Çalışalım 📚";

        caption.textContent =
            "Tekrar Gerekli";

        recommendationTitle.textContent =
            "Konuyu yeniden gözden geçir";

        recommendationText.textContent =
            "Video dersi tekrar izleyip özellikle yanlış yaptığın soruların açıklamalarını inceleyebilirsin.";

    }


    // ======================================
    // SORU ANALİZLERİNİ OLUŞTUR
    // ======================================

    createAnalysisItems(
        result,
        "all"
    );


    // ======================================
    // FİLTRELER
    // ======================================

    const filterButtons =
        document.querySelectorAll(
            ".analysis-filter-button"
        );


    filterButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                filterButtons.forEach(btn =>
                    btn.classList.remove("active")
                );


                button.classList.add("active");


                createAnalysisItems(
                    result,
                    button.dataset.filter
                );

            }
        );

    });

}


// ==========================================
// ANALİZ KARTLARINI ÜRET
// ==========================================

function createAnalysisItems(result, filter) {

    const container =
        document.getElementById("analysisList");

    container.innerHTML = "";


    const letters =
        ["A", "B", "C", "D"];


    result.questions.forEach(
        (question, index) => {

            const userAnswer =
                result.answers[index];

            const isEmpty =
                userAnswer === null;

            const isCorrect =
                userAnswer === question.correct;


            // Yanlışlarım filtresi:
            // doğru cevapları gösterme
            if (
                filter === "wrong" &&
                isCorrect
            ) {
                return;
            }


            let statusClass;
            let statusText;
            let statusIcon;


            if (isEmpty) {

                statusClass =
                    "empty-answer";

                statusText =
                    "Boş";

                statusIcon =
                    "fa-minus";

            }

            else if (isCorrect) {

                statusClass =
                    "correct-answer";

                statusText =
                    "Doğru";

                statusIcon =
                    "fa-check";

            }

            else {

                statusClass =
                    "wrong-answer";

                statusText =
                    "Yanlış";

                statusIcon =
                    "fa-xmark";

            }


            // Kullanıcının cevabı
            let userAnswerText =
                "Cevap verilmedi";

            if (!isEmpty) {

                userAnswerText =
                    `${letters[userAnswer]} - ${question.answers[userAnswer]}`;

            }


            // Doğru cevap
            const correctAnswerText =
                `${letters[question.correct]} - ${question.answers[question.correct]}`;


            const item =
                document.createElement("div");


            item.className =
                `analysis-item ${statusClass}`;


            item.innerHTML = `

                <div class="analysis-question-header">

                    <div class="analysis-status-icon">

                        <i class="fa-solid ${statusIcon}"></i>

                    </div>


                    <div class="analysis-question-title">

                        <span>
                            SORU ${index + 1}
                        </span>

                        <h3>
                            ${question.question}
                        </h3>

                    </div>


                    <div class="analysis-result-label">

                        ${statusText}

                    </div>

                </div>


                <div class="analysis-answer-details">


                    <div class="
                        answer-review
                        ${
                            isCorrect
                            ? "user-correct"
                            : "user-wrong"
                        }
                    ">

                        <strong>
                            Senin cevabın:
                        </strong>

                        ${userAnswerText}

                    </div>


                    ${
                        !isCorrect
                        ? `

                        <div class="
                            answer-review
                            correct-choice
                        ">

                            <strong>
                                Doğru cevap:
                            </strong>

                            ${correctAnswerText}

                        </div>

                        `
                        : ""
                    }


                    <div class="answer-explanation">

                        <strong>
                            Açıklama:
                        </strong>

                        ${question.explanation}


                        <div class="law-reference">

                            <i class="fa-solid fa-scale-balanced"></i>

                            İlgili Mevzuat:
                            ${question.law}

                        </div>

                    </div>

                </div>
            `;


            container.appendChild(item);

        }
    );


    // Filtrede hiç sonuç yoksa
    if (container.children.length === 0) {

        container.innerHTML = `

            <div style="
                text-align:center;
                padding:30px;
                color:#8f8999;
                font-size:10px;
            ">

                🎉 Bu testte yanlış veya boş
                sorunuz bulunmuyor.

            </div>

        `;

    }

}


// ==========================================
// SONUÇ SAYFASINI BAŞLAT
// ==========================================

loadResultPage();

// ========================================
// MOBİL MENÜ
// ========================================

const mobileMenuButton = document.getElementById("mobileMenuButton");
const mobileMenu = document.getElementById("mobileMenu");

if (mobileMenuButton && mobileMenu) {

    mobileMenuButton.addEventListener("click", function () {

        mobileMenu.classList.toggle("open");
        mobileMenuButton.classList.toggle("active");

        const icon = mobileMenuButton.querySelector("i");

        if (mobileMenu.classList.contains("open")) {
            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");
        } else {
            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");
        }

    });

}
/* ========================================
   DERSLER SAYFASI FİLTRELEME
======================================== */

const courseFilterButtons = document.querySelectorAll(".course-filter");
const allCourseCards = document.querySelectorAll(".all-course-card");
const courseCount = document.querySelector(".course-count");

if (courseFilterButtons.length > 0 && allCourseCards.length > 0) {

    courseFilterButtons.forEach(button => {

        button.addEventListener("click", function () {

            const selectedFilter = this.dataset.filter;

            // Aktif butonu değiştir
            courseFilterButtons.forEach(btn => {
                btn.classList.remove("active");
            });

            this.classList.add("active");

            let visibleCourseCount = 0;

            // Dersleri filtrele
            allCourseCards.forEach(card => {

                const courseCategory = card.dataset.category;

                if (
                    selectedFilter === "all" ||
                    courseCategory === selectedFilter
                ) {
                    card.style.display = "";
                    visibleCourseCount++;
                } else {
                    card.style.display = "none";
                }

            });

            // Görüntülenen ders sayısını güncelle
            if (courseCount) {
                courseCount.textContent =
                    `${visibleCourseCount} ders görüntüleniyor`;
            }

        });

    });

}