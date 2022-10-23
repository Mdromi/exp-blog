window.onload = function() {
    const flows = document.getElementsByClassName('flow');

    [...flows].forEach(flow => {
        flow.addEventListener('click', function(e) {
            let target = e.target
            reqflowUnflow('flowing', profileId)
            .then(res => res.json())
            .then(data => {
                let flowingText = data.flowing ? 'Flowing' : 'Flow'
                target.innerHTML = flowingText
            })
            .catch(e => {
                console.log(e);
                alert(e.response.data.error)
            })
        })
        let profileId = flow.dataset.profile
    })

    function reqflowUnflow(type, profileId) {
        let headers = new Headers()
        headers.append('Accept', 'Application/JSON')
        headers.append('content-type', 'Application/JSON')

        let req = new Request(`/api/${type}/${profileId}`, {
            method: 'GET',
            headers,
            mode: 'cors'
        })

        return fetch(req)
    }
}