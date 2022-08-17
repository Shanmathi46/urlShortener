const express=require('express');
const mongoose=require('mongoose');
const shortUrl = require('./models/shortUrl');
const ShortUrl=require('./models/shortUrl')
const app=express();
app.use(express.urlencoded({extended:false}))
mongoose.connect("mongodb://localhost:27017/urlShortener",{
    useNewUrlParser:true,
    useUnifiedTopology:true
},(err)=>{
if(err){
    console.log("Error while connecting to database")
    return;
}
console.log("connected to database")
})
app.set("view engine","ejs")

app.get('/',async (req,res)=>{
    const shorturls=await ShortUrl.find()
    res.render('index',{shorturls:shorturls})
})
app.get('/:shortUrl',async (req,res)=>{
    const urlItem=await ShortUrl.findOne({shortUrl:req.params.shortUrl})
    if(urlItem==null){
        return res.sendStatus(404)
    }
    urlItem.clicks++;
    urlItem.save()
    res.redirect(urlItem.fullUrl)
})
app.post('/shortUrls',async (req,res)=>{
    await shortUrl.create({
        fullUrl:req.body.fullUrl
    })
    res.redirect('/')
})

app.listen(process.env.PORT || 8000)