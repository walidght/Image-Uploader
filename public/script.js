function _(selector) {
    return document.querySelector(selector);
}

_('#choose-file-button').addEventListener('click', () => {
    _('#file-upload').click();
});

_('#file-upload').addEventListener('change', () => {
    _('.upload-screen-container').classList.add('hidden');
    _('.loading-container ').classList.remove('hidden');
    const file = _('#file-upload').files[0];
    uploadFile(file);
});

_('.drop-container').addEventListener('dragover', (event) => {
    event.preventDefault();
});

_('.drop-container').addEventListener('drop', (event) => {
    event.preventDefault();
    _('.upload-screen-container').classList.add('hidden');
    _('.loading-container ').classList.remove('hidden');
    const file = event.dataTransfer.files[0];
    uploadFile(file);
});

_('#copy-link-button').addEventListener('click', () => {
    console.log('clicked 2');
    navigator.clipboard.writeText(_('#image-result').src);
    _('#copy-link-button').innerHTML = 'Copied!';
});

async function uploadFile(file) {
    let formData = new FormData();
    formData.append('file', file);
    const response = await fetch('/api/images', {
        method: 'POST',
        body: formData,
    });
    const data = await response.json();
    if (data.success) {
        _('.loading-container ').classList.add('hidden');
        _('.result-container ').classList.remove('hidden');
        _('#link-p').innerHTML = data.imageLink;
        _('#image-result').src = data.imageLink;
    }
}
