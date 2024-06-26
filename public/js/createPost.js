async function savePost(event) {
    event.preventDefault()

    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value

    const response = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            title,
            content
        })
    });
    console.log(response)

    if (response.ok) {
        document.location.replace('/');
    } else {
        alert(response.statusText);
    }

};



document.getElementById('new-post').addEventListener('submit', savePost) 