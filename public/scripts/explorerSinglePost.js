
window.onload = function() {
    const postTitle = document.getElementsByClassName('post-title');

    [...postTitle].forEach(title => {
        title.addEventListener('click', function(e) {
            let titleId = title.dataset.permalinks
            let target = e.target
            reqPermalinks(titleId)
            .then(res => res.json())
            .then(data => {
                
            })
            .catch(e => {
                console.log(e);
                alert(e.response.data.error)
            })
        })
    })

    function reqPermalinks(type, profileId) {
        let headers = new Headers()
        headers.append('Accept', 'Application/JSON')
        headers.append('content-type', 'Application/JSON')

        let req = new Request(`/explorer/${profileId}`, {
            method: 'GET',
            headers,
            mode: 'cors'
        })

        return fetch(req)
    }
}





/* $('.post-title').on('click', async function(e) {
    let postId = e.target.parentElement.dataset.postid
    let postPermalinks = e.target.parentElement.dataset.permalinks

    let url = `/explorer/${postPermalinks}`
    e.preventDefault()
    const res = await fetch(url, {

    })

    // const res = await fetch(url, {
    //     method: 'GET',
    //     headers: {
    //         "Content-Type": 'application/json'
    //     },
    //     body: JSON.stringify({
    //         parcel: postPermalinks
    //     })
        
    // }) 
    
    console.log(res)
    const data = await res.json()
    

    // console.log(postId)
    // let headers = new Headers()
    // headers.append('Accept', 'Application/JSON')
    // headers.append('content-type', 'Application/JSON')

    // alert(postId)
    // let req = new Request(`/explorer/${postPermalinks}`, {
    //     method: 'GET',
    //     headers,
    //     mode: 'cors',
    //     body: postPermalinks
    // })

    // fetch(req) 
    //     .then(res => res.json())
    //     .then(data => {
    //         console.log(data);
    //     })
    //     .catch (e => {
    //         console.log(e.message)
    //         alert('Server Error Occurred')
    //     })

}) */