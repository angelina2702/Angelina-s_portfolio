//анимация кружочков
document.addEventListener('DOMContentLoaded', () => {
 const circles = document.querySelectorAll('.tech-circle');
 const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
     if (entry.isIntersecting) {
 // Добавляем класс, запускающий анимацию
 entry.target.classList.add('active');
 // Перестаем следить, чтобы анимация была только ОДИН разobserver.unobserve(entry.target);
}
});
}, {
threshold: 0.5 // Срабатывает, когда видно 50% элемента
});
circles.forEach(circle => observer.observe(circle));
});


var carousel = document.getElementById("carousel");
var slides = document.getElementsByClassName("slide");
var prevBtn = document.getElementById("prev");
var nextBtn = document.getElementById("next");
var dotsContainer = document.getElementById("dots");
var modal = document.getElementById("modal");
var modalImg = document.getElementById("modal-img");
var closeBtn = document.getElementById("close");

var totalSlides = slides.length;
var currentIndex = 0;

// Создание точек
for (var i = 0; i < totalSlides; i++) {
    var dot = document.createElement("div");
    dot.className = "dot";
    if (i === 0) {
        dot.className = "dot active";
    }
    (function(index) {
        dot.onclick = function() {
            goToSlide(index);
        };
    })(i);
    dotsContainer.appendChild(dot);
}

// Перейти к слайду
function goToSlide(index) {
    currentIndex = index;
    carousel.style.transform = "translateX(" + (-currentIndex * 106) + "%)";
    
    // Обновить точки
    var dots = document.getElementsByClassName("dot");
    for (var j = 0; j < dots.length; j++) {
        if (j === currentIndex) {
            dots[j].className = "dot active";
        } else {
            dots[j].className = "dot";
        }
    }
}

// Следующий
function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    goToSlide(currentIndex);
}

// Предыдущий
function prevSlide() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    goToSlide(currentIndex);
}

// Привязка кнопок
prevBtn.addEventListener("click", prevSlide);
nextBtn.addEventListener("click", nextSlide);

// Автопрокрутка
setInterval(nextSlide, 6000);

// Открытие модалки
function handleCarouselClick(e) {
    var target = e.target || e.srcElement;
    if (target.tagName === "IMG") {
        modalImg.src = target.src;
        modal.className = "modal open";
    }
}
carousel.addEventListener("click", handleCarouselClick);

// Закрытие модалки
function closeModal() {
    modal.className = "modal";
}
closeBtn.addEventListener("click", closeModal);
modal.addEventListener("click", function(e) {
    if (e.target === modal) closeModal();
});

// Клавиатура
function handleKeyDown(e) {
    var isOpen = modal.className.indexOf("open") !== -1;
    if (isOpen) {
        if (e.key === "Escape" || e.keyCode === 27) {
            closeModal();
        }
    } else {
        if (e.key === "ArrowRight" || e.keyCode === 39) {
            nextSlide();
        } else if (e.key === "ArrowLeft" || e.keyCode === 37) {
            prevSlide();
        }
    }
}
document.addEventListener("keydown", handleKeyDown);

document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    form.addEventListener("submit", formSend);
    
    const TOKEN = "8777081741:AAFndmuThmCGeKDZgUJyBdj1NAWcLeRjdKw";
    const CHAT_ID = "5374624860";
    const API_URL = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

    async function formSend(event) {
        event.preventDefault();
        
        // ✅ Правильные селекторы
        let userName = document.querySelector('input[name="name"]').value;
        let userPhone = document.querySelector('input[name="phone"]').value;
        let userMessage = document.querySelector('textarea[name="message"]').value;

        let message =`Новая заявка!\n\n👤 ФИО: ${userName}\n📱 Телефон: ${userPhone}\n💬 Сообщение: ${userMessage}` ;  
     
        try {
            const response = await fetch(API_URL, {   
                method: "POST",    
                headers: {"Content-type": "application/json"},    
                body: JSON.stringify({ chat_id: CHAT_ID, text: message}),  
            });  
            
            const result = await response.json(); 
            
            if (result.ok) {   
                alert("Ваше сообщение отправлено. С вами свяжутся в ближайшее время");    
                form.reset();  
            } else {
                alert("Ошибка отправки: " + (result.description || "неизвестная"));
            }
        } catch (error) {
            console.error("Ошибка:", error);
            alert("Не удалось отправить сообщение. Проверьте консоль.");
        }
    }
});
