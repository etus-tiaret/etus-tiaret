const express = require('express')
const hbs = require('hbs')
const path = require('path');
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const bodyParser = require("body-parser");
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./db/ETUSDATASTORE.db');
const fs = require("fs")
const cors = require('cors');
var multer  = require('multer');


var app = express()
app.set('view engine', 'hbs')

app.use(express.static(path.join(__dirname, '/static')));

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './static/img/')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
})


const editUpload = multer({ storage: storage }).single('editImage')
const upload = multer({ storage: storage }).single('image')

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const oneDay = 1000 * 60 * 60 * 24;


app.use(sessions({
    secret: "shingekinokyujin213",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false
}));

hbs.registerHelper('trimString', function(str) {
    var theString = str.toString().split(" ").slice(0,20).join(' ');
    return new hbs.SafeString(theString)
});

hbs.registerHelper('breaklines', function(text) {
    text = hbs.Utils.escapeExpression(text);
    text = text.replace(/(\r\n|\n|\r)/gm, '<br>');
    return new hbs.SafeString(text);
});

hbs.registerPartial('arFooter',fs.readFileSync(__dirname + '/views/components/footer.hbs', 'utf8'));
hbs.registerPartial('arNavbar',fs.readFileSync(__dirname + '/views/components/navbar.hbs', 'utf8'));
hbs.registerPartial('arHead',fs.readFileSync(__dirname + '/views/components/head.hbs', 'utf8'));


// ********************************** ARABIC **************************************************

app.get('', (req, res)=>{

    db.all('SELECT rowid as id,titleAr,descAr,image,postDate from etusPostTableEncrypted where actif = "1" limit 3', function(err, rows) {       
        res.render('index',{title:"إيتوس تيارت | الرئيسية",data:rows})
    });
    
})

app.get('/postDetails/:id', (req, res)=>{
    var id = req.params.id.toString()
    db.all('SELECT * from etusPostTableEncrypted where rowid = ?',id, function(err, rows) {       
        
        res.render('post',{title:"إيتوس تيارت | "+rows[0].titleAr,data:rows[0]})

    });

    
})

app.get('/videos', (req, res)=>{
    res.render('videos',{title:"إيتوس تيارت |  فيديوهات"})
})

app.get('/news', (req, res)=>{
    db.all('SELECT rowid as id,titleAr,descAr,image,postDate from etusPostTableEncrypted', function(err, rows) {       
        res.render('news',{title:"إيتوس تيارت | الأخبار",data:rows})
    });

    
})

app.get('/faq', (req, res)=>{
    res.render('faq',{title:"إيتوس تيارت |  انشغالاتكم"})
})

app.get('/gps', (req, res)=>{
    res.render('gps',{title:"إيتوس تيارت |  نظام تحديد المواقع للحافلات"})
})


app.get('/photo', (req, res)=>{
    res.render('photo',{title:"إيتوس تيارت | الأخبار"})
})

app.get('/stats', (req, res)=>{
    res.render('stats',{title:"إيتوس تيارت | الاحصائيات"})
})

// ************************** card **************************

app.get('/hafilati-app', (req, res)=>{
    res.render('card',{title:"إيتوس تيارت | تطبيق حافلتي"})
})

app.get('/hafilati-app/:item', (req, res)=>{
    var item = req.params.item.toString()
    var dict = {};
    dict["what-is-hafilati-app"] = "why"
    dict["why-use-hafilati-app"] = "why2"
    dict["where-buy-hafilati-card"] = "where"
    dict["loss"] = "how2"
    dict["hafilati-card"] = "how"
    
    
   
    
    
    res.render('card',{title:"إيتوس تيارت | تطبيق حافلتي",item:dict[item]})
})
// ************************** card **************************
// ************************** about *************************

app.get('/about', (req, res)=>{
    res.render('about',{title:"إيتوس تيارت | معلومات عنا"})
})

app.get('/about/:item', (req, res)=>{
    var item = req.params.item.toString()
    res.render('about',{title:"إيتوس تيارت | معلومات عنا",item:item})
})
// *********************** about ****************************
// ************************** services *************************

app.get('/services', (req, res)=>{
    res.render('services',{title:"إيتوس تيارت | خدماتنا"})
})

app.get('/services/:item', (req, res)=>{
    var item = req.params.item.toString()
    res.render('services',{title:"إيتوس تيارت | خدماتنا",item:item})
})
// *********************** services ****************************
// *********************** lines ****************************
app.get('/lines', (req, res)=>{
    
    res.render('lines',{title:"إيتوس تيارت | الخطوط"})
    
})

 app.get('/lines/:item', (req, res)=>{
     var item = req.params.item.toString()
     res.render('lines',{title:"إيتوس تيارت | الخطوط",item:item}) })

// *********************** lines *****************************
// *********************** timing ****************************

app.get('/timing', (req, res)=>{
    res.render('timing',{title:"إيتوس تيارت | مواعيد الحافلات "})
})

app.get('/timing/:item', (req, res)=>{
    var item = req.params.item.toString()
    res.render('timing',{title:"إيتوس تيارت | مواعيد الحافلات ",item:item})
})
// *********************** timing ***************************

// ********************************** ARABIC **************************************************




// ************************ administration ***************************

var session;

app.get('/administration/login', (req, res)=>{
    
    res.render('administration/login')
})

app.get('/administration/dashboard', (req, res)=>{
    
    session=req.session;
    if(session.email){
        res.render('administration/dashboard')
    }
    else
    {
        res.render('administration/login')
    }
    

    
})

app.post('/administration/connect',function (req, res){
    var email = req.body.email
    var password = req.body.password    

    db.all("SELECT * from etusUserTableEncrypted where etusEmailField = ? and etusPasswordField = ?",[email,password], function(err, rows) {
       
        if (rows.length != 0)
        {              
            session=req.session;
            session.email=req.body.email;
            res.send("fff")
            
        }
        else
        {
            res.send("000")
        }
    });
    
})


app.post('/administration/adduser',function (req, res){
    var email = req.body.email
    var password = req.body.password
    
    db.all("SELECT * from etusUserTableEncrypted where etusEmailField = ?",[email], function(err, rows) {
       
        if (rows.length != 0)
        {              
            res.send("000")
            
        }
        else
        {
           
            db.run(`INSERT INTO etusUserTableEncrypted (etusEmailField, etusPasswordField) VALUES (?,?)`,[email,password],
                function(error){
                    res.send("fff")
                }
            );
        }
    });   
})

app.delete('/administration/deleteuser/:id',function (req, res){
    var id = req.params.id
    console.log("id is "+id);
    db.run(`delete from etusUserTableEncrypted where rowid = ?`,id,
            function(error){
                console.log("user deleted");
                res.send("User Deleted")
            });
})
app.get('/administration/allusers',(req,res) => {
    db.all("SELECT rowid AS id,etusEmailField from etusUserTableEncrypted", function(err, rows) {       
        res.send(rows)
        console.log(rows);
    });
});

app.get('/administration/allposts',(req,res) => {
    db.all("SELECT rowid AS id,titleFr,descFr,titleAr,descAr,postDate,image,actif from etusPostTableEncrypted", function(err, rows) {       
        res.send(rows)
        console.log(rows);
    });
});


app.post('/administration/addpost',function (req, res){

    upload(req, res, async function(err){ 
        
        if( err){
            console.log(err)
            res.send("000")
        }else{
            
            
            var postTitleFr = req.body.postTitleFr
            var postDescFr =req.body.postDescFr
            var postTitleAr =req.body.postTitleAr
            var postDescAr = req.body.postDescAr
            var postDate = req.body.postDate
            var imageName = req.body.imageName
            var actif = req.body.actif
            
            
           
            db.run(`INSERT INTO etusPostTableEncrypted (titleFr, descFr,titleAr,descAr,postDate,image,actif) VALUES (?,?,?,?,?,?,?)`,[postTitleFr,postDescFr,postTitleAr,postDescAr,postDate,imageName,actif],
                function(error){
                    res.send("fff")
                }
            );
           
            
        }
       })

    
           
            
        
      
})


app.post('/administration/editpost',function (req, res){


    editUpload(req, res, async function(err){ 
        
        if( err){
            console.log(err)
            res.send("000")
        }else{
            
            

            var id = req.body.id
            var editPostTitleFr = req.body.editPostTitleFr
            var editPostDescFr =req.body.editPostDescFr
            var editPostTitleAr =req.body.editPostTitleAr
            var editPostDescAr = req.body.editPostDescAr
            var imageName = req.body.imageName
            var actif = req.body.actif
            if (imageName == ""){
                db.run(`UPDATE etusPostTableEncrypted set titleFr = ?, descFr = ?,titleAr = ?,descAr = ?,actif = ? WHERE rowid = ?`,[editPostTitleFr,editPostDescFr,editPostTitleAr,editPostDescAr,actif,id],
                function(error){
                    res.send("fff")
                }
            );
            }
            else{

                db.run(`UPDATE etusPostTableEncrypted set titleFr = ?, descFr = ?,titleAr = ?,descAr = ?,image = ?,actif = ? WHERE rowid = ?`,[editPostTitleFr,editPostDescFr,editPostTitleAr,editPostDescAr,imageName,actif,id],
                    function(error){
                        res.send("fff")
                    }
                );

            }
            
        }
       })
})


app.delete('/administration/deletepost/:id',function (req, res){
    var id = req.params.id
    

    db.all("SELECT image from etusPostTableEncrypted where rowid = ?",id, function(err, rows) {       
        const path = './static/img/'+rows[0].image
        try {
            fs.unlinkSync(path)
            
        } catch(err) {
            console.error(err)
        }
    });

    db.run(`delete from etusPostTableEncrypted where rowid = ?`,id,
            function(error){
                console.log("Post deleted");
                res.send("Post Deleted")
            });
})


app.get('/administration/logout',(req,res) => {
    req.session.destroy();
    res.send("fff")
});


app.post('/administration/sendmail',function (req, res){

    upload(req, res, async function(err){ 
        
        if( err){
            console.log(err)
            res.send("000")
        }else{
            
            var nodemailer = require('nodemailer');
            var name = req.body.name
            var lastName =req.body.lastName
            var email =req.body.email
            var message = req.body.message
            
            
            
           
           


            

            var transporter = nodemailer.createTransport({
            service: 'yahoo',
            auth: {
            user: 'etustiaret@yahoo.com',
            pass: 'mrulryipbayshrio'
            }
             });

        var mailOptions = {
           from: 'etustiaret@yahoo.com',
            to: 'support@etustiaret.dz',
            subject: 'Sending Email using Node.js',
            text: name+' '+ lastName+ '\n' +'email '+email+'\n'+'الرسالة ' + message
             };

            transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                res.send("000")
            } else {
                res.send("fff")
            }
            });
           
            
        }
       })

    
           
            
        
      
})

// ************************ administration ***************************
app.listen(5000);