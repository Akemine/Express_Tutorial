window.addEventListener('DOMContentLoaded', () => {
    bindTweet()
    updateTweet()
})

// permet de mettre à jour le tableau pour pouvoir supprimer plusieurs tweets à la suite (soucis lié au fait qu'on a perdu les infos du DOM et on a pas les nouvelles infos du DOM)
function bindTweet() {
    const elements = document.querySelectorAll('.btn-danger');
    const tweetContainer = document.querySelector('#tweet-list-container')
    elements.forEach(e => {
        e.addEventListener('click', ($event) => {
            const tweetId = $event.target.getAttribute('tweetid');
            axios.delete('/tweets/' + tweetId)
                .then(function (response) {
                    tweetContainer.innerHTML = response.data
                    bindTweet();
                })
                .catch(function (err) { console.log(err) });
        })
    })
}

function updateTweet() {
    const elements = document.querySelectorAll('.updateIt');
    const tweetContainer = document.querySelector('#tweet-textarea-content')
    elements.forEach(e => {
        e.addEventListener('click', ($event) => {
            const tweetContent = $event.target.getAttribute('tweetcontent');
            axios.put('/tweets/' + tweetContent)
                .then(function (response) {
                    tweetContainer.innerHTML = response.data
                })
                .catch(function (err) { console.log(err) });
        })
    })
}