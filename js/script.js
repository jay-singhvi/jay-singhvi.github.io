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


document.addEventListener('DOMContentLoaded', function () {
    const phoneLink = document.querySelector('a i.fa-phone').parentElement;
    const phoneNumber = phoneLink.querySelector('span').textContent.trim();

    phoneLink.addEventListener('click', function (e) {
        e.preventDefault();

        // Copy to clipboard
        navigator.clipboard.writeText(phoneNumber)
            .then(() => {
                // Give visual feedback that number was copied (optional)
                const feedback = document.createElement('div');
                feedback.textContent = 'Number copied to clipboard!';
                feedback.style.position = 'fixed';
                feedback.style.top = '10px';
                feedback.style.left = '50%';
                feedback.style.transform = 'translateX(-50%)';
                feedback.style.padding = '10px';
                feedback.style.backgroundColor = 'rgba(0,0,0,0.7)';
                feedback.style.color = '#fff';
                feedback.style.borderRadius = '5px';
                feedback.style.zIndex = '9999';
                document.body.appendChild(feedback);

                setTimeout(() => {
                    document.body.removeChild(feedback);
                }, 2000);

                // Initiate phone call
                window.location.href = `tel:${phoneNumber.replace(/\D/g, '')}`;
            })
            .catch(err => {
                console.error('Failed to copy number: ', err);
                // Fallback to just making the call if clipboard fails
                window.location.href = `tel:${phoneNumber.replace(/\D/g, '')}`;
            });
    });
});