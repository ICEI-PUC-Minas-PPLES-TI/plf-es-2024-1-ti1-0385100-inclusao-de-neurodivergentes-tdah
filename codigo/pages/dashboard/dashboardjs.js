document.addEventListener('DOMContentLoaded', function() {
    var buttons = document.querySelectorAll('button');

    buttons.forEach(function(button) {
        button.addEventListener('click', function() {
            animateButton(button);
        });
    });

    function animateButton(button) {
        button.style.transition = 'background-color 0.3s, transform 0.3s';
        button.style.backgroundColor = '#28a745'; // Change color to green
        button.style.transform = 'scale(1.1)';

        // Revert back to original state after 300ms
        setTimeout(function() {
            button.style.backgroundColor = '#007bff';
            button.style.transform = 'scale(1)';
        }, 300);
    }
});