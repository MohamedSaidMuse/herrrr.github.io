const uploadForm = document.getElementById('uploadForm');
const fileInput = document.getElementById('fileInput');
const uploadButton = document.getElementById('uploadButton');
const fileList = document.getElementById('fileList');

uploadForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append('file', fileInput.files[0]);

    uploadButton.innerHTML = 'Uploading...';

    fetch('/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        const li = document.createElement('li');
        li.innerHTML = data.filename;
        fileList.appendChild(li);

        uploadButton.innerHTML = 'Upload';
    })
    .catch(error => {
        console.error(error);

        uploadButton.innerHTML = 'Upload';
    });
});

fetch('/files')
.then(response => response.json())
.then(data => {
    fileList.innerHTML = '';

    data.forEach(file => {
        const li = document.createElement('li');
        const link = document.createElement('a');
        link.setAttribute('href', '/download/' + file);
        link.innerHTML = file;
        li.appendChild(link);
        fileList.appendChild(li);
    });
})
.catch(error => {
    console.error(error);

    const li = document.createElement('li');
    li.innerHTML = 'Error fetching file list.';
    fileList.appendChild(li);
});
