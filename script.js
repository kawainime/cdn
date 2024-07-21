let previewImg = document.getElementById("previewImg");
let submitBtn = document.getElementById("submitBtn");
var imgInput = document.getElementById("file");
let bar = document.getElementById("bar");
let url = document.getElementById("url");
let cpy = document.getElementById("cpy");
let cancel = document.getElementById('x')
let expirationTime = '';

imgInput.addEventListener("change", (e) => {
  let i = e.target.files[0];
  let img = URL.createObjectURL(i);
  previewImg.src = img;
  document.body.classList.add("active");
  submitBtn.disabled = false;
});

function removeImg() {
  imgInput.value = "";
  document.body.classList.remove("active");
  submitBtn.disabled = true;
  document.body.classList.remove("success");
  cpy.classList.replace("bx-check", "bx-copy");
  bar.style.width = 0;
}

function addExpirationTime(e){
expirationTime = `expiration=${e.value}&`
console.log(expirationTime)
}

document
  .getElementById("uploadForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission
    var formData = new FormData();
    var imageFile = imgInput.files[0];
    formData.append("image", imageFile);
    document.body.classList.add("upload");
    cancel.style.display = 'none'
    let api = `https://api.imgbb.com/1/upload?${expirationTime}key=dbc263178e5cda48ca6b54a98e6c968e`

    fetch(
      api,
      {
        method: "POST",
        body: formData,
      }
    )
      .then((response) => response.json())
      .then((data) => {
        // Handle response from ImgBB API
        if (data && data.data && data.data.url) {
          previewImg.src = data.data.url;
          url.innerHTML = data.data.url;
          document.body.classList.remove("upload");
          document.body.classList.add("success");
          submitBtn.disabled = true;
    cancel.style.display = 'block'

          Swal.fire({
  title: "Uploaded",
  text: "click the copy button to copy imagelink",
  icon: "success"
});
        } else {
        Swal.fire({
  title: "Upload Failed",
  text: "somthing went wrong",
  icon: "error"
});
   cancel.click()
     
        }
      })
      .catch((error) => {
        console.error("Error:", error);
            Swal.fire({
  title: "Upload Failed",
  text: "somthing went wrong",
  icon: "error"
});
   
             cancel.click()

      });
  });

cpy.addEventListener("click", () => {
  navigator.clipboard.writeText(url.textContent);
  cpy.classList.replace("bx-copy", "bx-check");
});
