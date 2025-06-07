async function loadImages() {
    try {
        const res = await fetch("http://localhost:3000/api/images");
        const images = await res.json();

        const imageList = document.getElementById("image-list");
        imageList.innerHTML = ""; // Clear any existing images

        images.forEach((filename) => {
            const img = document.createElement("img");
            img.src = `http://localhost:3000/images/${filename}`;
            img.alt = filename;
            img.width = 100;
            img.style.cursor = "pointer";

            // When clicked, select the image for resizing
            img.addEventListener("click", () => {
                selectImage(filename);
            });

            imageList.appendChild(img);
        });
    } catch (err) {
        console.error("Failed to load images", err);
    }
}

function selectImage(filename) {
    // Store selected image name somewhere accessible
    window.selectImage = filename;
    alert(`Selected image: ${filename}`);
}

// Call loadImages when page loads
window.addEventListener("DOMContentLoaded", loadImages);

document.getElementById("resize-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!window.selectImage) {
        alert("Please select an image first!");
        return;
    }

    const width = document.getElementById("width").value;
    const height = document.getElementById("height").value;

    if (!width || !height) {
        alert("Please enter valid dimensions.");
        return;
    }

    try {
        // Call your resize API
        const res = await fetch(
            `http://localhost:3000/api/resize?image=${encodeURIComponent(
                window.selectImage
            )}&width=${width}&height=${height}`
        );
        const data = await res.json();

        if (res.ok) {
            const resultDiv = document.getElementById("result");
            resultDiv.innerHTML = `<p>Generated URL: <a href="${data.url}" target="_blank">${data.url}</a></p><img src="${data.url}" alt="Resized Image" />`;
        } else {
            alert(`Error: ${data.error}`);
        }
    } catch (err) {
        console.error("Error calling resize API:", err);
        alert("Failed to generate image.");
    }
});

document.getElementById("uploadForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const fileInput = document.getElementById("fileInput");
    if (!fileInput.files.length) {
        alert("Please select an image file to upload.");
        return;
    }

    const formData = new FormData();
    formData.append("image", fileInput.files[0]);

    try {
        const res = await fetch("http://localhost:3000/api/upload", {
            method: "POST",
            body: formData,
        });

        const data = await res.json();

        const uploadResult = document.getElementById("uploadResult");

        if (res.ok) {
            uploadResult.textContent = "Image uploaded successfully!";
            // Reload images to reflect new upload
            loadImages();
            fileInput.value = "";
        } else {
            uploadResult.textContent = `Upload failed: ${data.error}`;
        }
    } catch (err) {
        console.error("Upload error:", err);
        document.getElementById("uploadResult").textContent = "Failed to upload image.";
    }
});


