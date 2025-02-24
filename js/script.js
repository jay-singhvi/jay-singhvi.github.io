$(document).ready(function(){
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

// Close the modal if user clicks outside the content
window.onclick = function(event) {
    const modal = document.getElementById('resumeModal');
    if (event.target == modal) {
        closeResumeModal();
    }
}