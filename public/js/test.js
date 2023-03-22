
let picsListEl = document.getElementById('pics');
let picsArray = [];
// let newPicsArr = [];

getPicsArray();

function getPicsArray(){
  // console.log(newPicsArr);
  let picsArray = JSON.parse(localStorage.getItem("allPics"));
  if (picsArray !== null) {
      // console.log(picsArray);
      //  console.log(picsArray[0].picUrl);

      for (i = 0; i < picsArray.length; ++i) {
        let li = document.createElement('li');                
        let image = document.createElement('img');
        image.setAttribute("src", picsArray[i].picUrl);   
        image.setAttribute("class", "pt-6");
        picsListEl.appendChild(li);
        li.appendChild(image);
     }
    } else return;
};

const cloudName = "dkm1hkwdl"
const uploadPreset = "ttq2s0sa"
let myWidget = cloudinary.createUploadWidget({
  cloudName: cloudName, 
  uploadPreset: uploadPreset}, (error, result) => { 
    if (!error && result && result.event === "success") { 
      // console.log('Done! Here is the image info: ', result.info.asset_id);  
      // document.getElementById('uploadedimage').src = result.info.secure_url;
      let pictureId = result.info.asset_id;
      let pictureUrl = result.info.secure_url;

      let picture = {
        picId: pictureId,
        picUrl: pictureUrl
      };

      let picsArray = JSON.parse(localStorage.getItem("allPics"));
      if (picsArray == null) {picsArray = [];}
  
      
      localStorage.setItem(pictureId, JSON.stringify(picture));
      let newPic = JSON.parse(localStorage.getItem(pictureId));
      // console.log(newPic.picUrl);
      // console.log(typeof newPic);
      picsArray.push(newPic);

      // console.log(picsArray);
      // console.log(picsArray[0].picUrl);
      localStorage.setItem("allPics", JSON.stringify(picsArray));
      let newPicsArr = JSON.parse(localStorage.getItem("allPics"));
      console.log(newPicsArr);

      let li = document.createElement('li');                
      let image = document.createElement('img');
      image.setAttribute("src", newPic.picUrl);    
      image.setAttribute("class", "pt-6");
      picsListEl.appendChild(li);
      li.appendChild(image);
    
      // console.log(newPicsArr[0].picUrl);

    //   for (i = 0; i < picsArray.length; ++i) {
    //     let li = document.createElement('li');                
    //     let image = document.createElement('img');
    //     image.setAttribute("src", picsArray[i].picUrl);    
    //     picsListEl.appendChild(li);
    //     li.appendChild(image);
    //  }

      // console.log('Done! Here is the image url: ', result.info.secure_url); 
    }
  }
)

document.getElementById("upload_widget").addEventListener("click", function(){
    myWidget.open();
  }, false);
