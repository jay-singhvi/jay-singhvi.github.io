$(document).ready(function () {
    $('.fa-chevron-up').click(function () {
        $('body').animate({
            scrollTop: 0
        }, 400);
        return false;
    });
});

function openResumeModal() {
    document.getElementById('resumeModal').style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

function closeResumeModal() {
    document.getElementById('resumeModal').style.display = 'none';
    document.body.style.overflow = 'auto'; // Restore scrolling
}

window.onclick = function (event) {
    const modal = document.getElementById('resumeModal');
    if (event.target == modal) {
        closeResumeModal();
    }
}

document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.page-transition-link').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            document.body.classList.add('page-transitioning');

            setTimeout(function () {
                window.location.href = link.getAttribute('href');
            }, 300);
        });
    });
});