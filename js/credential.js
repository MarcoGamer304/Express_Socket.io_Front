document.addEventListener('DOMContentLoaded', () => {
    const formCredentials = document.getElementById('credentials');

    if (!formCredentials) return;

    formCredentials.addEventListener('submit', function release(event) {
        event.preventDefault();

        const name = document.getElementById('name');
        localStorage.setItem('username', name.value);

        window.location.href = '../app.html';
    });
});

export function getUsername() {
    return localStorage.getItem('username') || 'incognito';
}


