          
// cloudinary.config({ 
//   cloud_name: 'dzuyyidc8', 
//   api_key: '931488863352811', 
//   api_secret: 'rgjKomd7Z-AWvNqZq-fCsVMqRBY' 
// });

const cloud_name = 'dzuyyidc8';
const upload_preset = 'simi-social-media';
export const uploadToCloudniry = async (pics, fileType) => {
    if(pics && fileType){
        const formData = new FormData();
        formData.append("file", pics);
        formData.append("upload_preset", upload_preset);
        formData.append("cloud_name", cloud_name);
        const res = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/${fileType}/upload`, {
            method: "POST",
            body: formData
        });
        console.log("res", res);
        const data = await res.json();
        console.log("data", data);
        return data.url;

    } else {
        console.log("Please select a file");
    }

}