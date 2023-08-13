window.addEventListener('DOMContentLoaded', () => {
    const inputProfile = document.querySelector('#input-profile');
    const formProfile = document.querySelector('#form-profile');

    formProfile.addEventListener('click', () => {
        inputProfile.click();
    })
    inputProfile.addEventListener('change', () => {
        formProfile.submit();
    })
})