async function saveAuthorComment(event) {
    event.preventDefault()

    const author_id = document.getElementById('author_id').value;
    const content = document.getElementById('authorComment').value

    const response = await fetch('/api/authors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            author_id,
            content
        })
    });
    console.log(response)

    if (response.ok) {
        document.location.reload();
    } else {
        alert(response.statusText);
    }

};



document.getElementById('author-form').addEventListener('submit', saveAuthorComment) 