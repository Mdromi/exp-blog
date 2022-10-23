window.onload = function() {
    const comment = document.getElementById('comment')
    const commentHolder = document.getElementById('comment-holder')
    const deleteComment = document.getElementsByClassName('deleteComment')

    commentHolder.addEventListener('keypress', function(e) {
        if(commentHolder.hasChildNodes(e.target)) {
            if(e.key === 'Enter') {
                let commentId = e.target.dataset.comment
                let value = e.target.value

                if(value) {
                    let data = {
                        body: value
                    }
                    let req = generateRequst(`/api/comments/replies/${commentId}`, 'POST', data)
                    fetch(req)
                    .then(res => res.json())
                    .then(data => {
                        let replyElement = createReplyElement(data)
                        let parent = e.target.parentElement
                        parent.previousElementSibling.appendChild(replyElement)
                        e.target.value = ''
                    })
                    .catch(e => {
                        console.log(e.message);
                        alert(e.message)
                    })

                } else {
                    alert(`Plesse Provid a Valid reply`)
                }
            }
        }
    })

    $('.deleteComment').on('click', function(e) {
        let commentId = e.target.dataset.comment
        let parentElement = e.target.parentElement.parentElement
        parentElement.remove()
        let headers = new Headers()
        headers.append('Accept', 'Application/JSON')
        headers.append('content-type', 'Application/JSON')

        let req = new Request(`/api/comment/delete/${commentId}`, {
            method: 'GET',
            headers,
            mode: 'cors'
        })

        fetch(req) 
            .then(res => res.json())
            .then(data => {
                parentElement.remove()
            })
            .catch (e => {
                console.log(e.message)
                alert('Server Error Occurred')
            })

    })

}

function generateRequst(url, method, body) {
    let headers = new Headers()
    headers.append('Accept', 'Application/JSON')
    headers.append('content-type', 'Application/JSON')

    let req = new Request(url, {
        method,
        headers,
        body: JSON.stringify(body),
        mode: 'cors'
    })

    return req
}



function createReplyElement(reply) {
    let innerHTML = `
        <img style="width:40px;"
            src="${reply.profilePics}" 
            class="align-self-start mr-3 rounded-circle">
        <div class="media-body">
            <p>${reply.body}</p>
        </div>
    `

    let div = document.createElement('div')
    div.className = 'media mt-3'
    div.innerHTML = innerHTML

    return div
}