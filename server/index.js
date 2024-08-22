const express =require('express');
const { default: mongoose } = require('mongoose');
const app= express()
const multer = require('multer')
const path =require('path')


app.listen(3000,()=>{
console.log("server is running on 3000")
})

app.get('/',(req,res)=>{
res.send("working--")
})
// Set up storage engine for multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'utils/'); // Destination folder
    },
    filename: function (req, file, cb) {
      // Use the original file name
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });



  // Create multer instance with storage engine
const upload = multer({ storage: storage });
const fs = require('fs');
const uploadDir = path.join(__dirname, 'utils');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}


// Route to upload a single file
app.post('/upload', upload.single('file'), (req, res) => {
    // `req.file` contains information about the uploaded file
    console.log(req.file);
    res.send('File uploaded successfully');
  });



  app.get('/', (req, res) => {
    res.send(`
      <form ref='uploadForm' 
        id='uploadForm' 
        action='/upload' 
        method='post' 
        encType="multipart/form-data">
          <input type="file" name="file" />
          <input type='submit' value='Upload!' />
      </form>
    `);
  });
  


// mongoose.connect(`mongodb://localhost:27017`, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   }).then((res)=>{
//     console.log("mongodb is connected.......",res)
// }).catch((err)=>{
//     console.log("errr",err)
// })