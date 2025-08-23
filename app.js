const express = require('express')
const path = require('path');
const { title } = require('process');
const app = express();
app.set('view engine','ejs')
const router = express.Router()
require('dotenv').config()
const compression = require('compression');

app.use(express.static(path.join(__dirname,"Public")))
app.use(compression())
app.use(express.json())

async function getData(URL) {

    let reply = []

    let rawOptions = {
        method: "GET" 
    }

    const response = await fetch(URL,rawOptions)
    .then(data => {return data.json()})
    .then(result => {reply = result})

    return reply
}

app.get('/',async (req,res)=>{

    let dataGiven = []
    dataGiven = await getData(process.env.DATA+"/home/")

    let subTitles = []
    let identifiers = []
    let newPosts = []

    dataGiven.forEach((doc)=>{
        subTitles.push(doc.title)
        newPosts.push((doc.postBody).substr(0,50))
        identifiers.push(doc._id)
    })

    res.render('index',{
        title : "Home",
        subroutes : ["About","Academic Stuff","Opinions","Stories And Ideas"],
        links : ["about","academicStuff","opinions","storiesAndIdeas"],
        subTitle : subTitles,
        posts : newPosts,
        identifier : identifiers,
        scriptAPI : [""]
    })
})

app.get('/academicStuff',async (req,res)=>{

    let dataGiven = []
    dataGiven = await getData(process.env.DATA+"/academicStuff/")

    let subTitles = []
    let identifiers = []
    let newPosts = []

    dataGiven.forEach((doc)=>{
        subTitles.push(doc.title)
        newPosts.push((doc.postBody).substr(0,50))
        identifiers.push(doc._id)
    })

    res.render('index',{
        title : "Academic Stuff",
        subroutes : ["About","Academic Stuff","Opinions","Stories And Ideas"],
        links : ["about","academicStuff","opinions","storiesAndIdeas"],
        subTitle : subTitles,
        posts : newPosts,
        identifier : identifiers,
        scriptAPI : ["https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"]
    })
})

app.get('/about',async (req,res)=>{

    let dataGiven = []
    dataGiven = await getData(process.env.DATA+"/about/")

    let subTitles = []
    let identifiers = []
    let newPosts = []

    dataGiven.forEach((doc)=>{
        subTitles.push(doc.title)
        newPosts.push((doc.postBody).substr(0,50))
        identifiers.push(doc._id)
    })

    res.render('index',{
        title : "About",
        subroutes : ["About","Academic Stuff","Opinions","Stories And Ideas"],
        links : ["about","academicStuff","opinions","storiesAndIdeas"],
        subTitle : subTitles,
        posts : newPosts,
        identifier : identifiers,
        scriptAPI : [""]
    })
})

app.get('/opinions',async (req,res)=>{

    let dataGiven = []
    dataGiven = await getData(process.env.DATA+"/opinions/")

    let subTitles = []
    let identifiers = []
    let newPosts = []

    dataGiven.forEach((doc)=>{
        subTitles.push(doc.title)
        newPosts.push((doc.postBody).substr(0,50))
        identifiers.push(doc._id)
    })

    res.render('index',{
        title : "Opinions",
        subroutes : ["About","Academic Stuff","Opinions","Stories And Ideas"],
        links : ["about","academicStuff","opinions","storiesAndIdeas"],
        subTitle : subTitles,
        posts : newPosts,
        identifier : identifiers,
        scriptAPI : [""]
    })
})

app.get('/storiesAndIdeas',async (req,res)=>{

    let dataGiven = []
    dataGiven = await getData(process.env.DATA+"/storiesAndIdeas/")

    let subTitles = []
    let identifiers = []
    let newPosts = []

    dataGiven.forEach((doc)=>{
        subTitles.push(doc.title)
        newPosts.push((doc.postBody).substr(0,50))
        identifiers.push(doc._id)
    })

    res.render('index',{
        title : "Stories And Ideas",
        subroutes : ["About","Academic Stuff","Opinions","Stories And Ideas"],
        links : ["about","academicStuff","opinions","storiesAndIdeas"],
        subTitle : subTitles,
        posts : newPosts,
        identifier : identifiers,
        scriptAPI : [""]
    })
})

app.get('/ownerOnly',(req,res)=>{
    res.sendFile(path.join(__dirname,"/views/owner.html"))
})

app.get('/letters/:identifier/',async (req,res)=>{

    let dataGiven
    dataGiven = await getData(process.env.DATA+"/document/" + req.params.identifier)

    if(dataGiven.message === "INVALID_DOC_ID"){
        res.status(404).render('noPage.ejs',{
        subroutes : ["About","Academic Stuff","Opinions","Stories And Ideas"],
        links : ["about","academicStuff","opinions","storiesAndIdeas"],
        subTitle : ["Halt there explorer!!"],
        posts : ["You seem to have discovered unexplored lands"],
        identifier : ['']
        })
    }else if(dataGiven.message === "Empty"){
        res.redirect("/")
    }else{
        res.render('letter',{
        title : "Stories And Ideas",
        subroutes : ["About","Academic Stuff","Opinions","Stories And Ideas"],
        links : ["about","academicStuff","opinions","storiesAndIdeas"],
        heading: dataGiven.title,
        body: dataGiven.postBody,
        scriptAPI : ["https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"]
    })
    }
})

app.use((req,res)=>{
    res.status(404).render('noPage.ejs',{
        subroutes : ["About","Academic Stuff","Opinions","Stories And Ideas"],
        links : ["about","academicStuff","opinions","storiesAndIdeas"],
        subTitle : ["Halt there explorer!!"],
        posts : ["You seem to have discovered unexplored lands"],
        identifier : ['']
    })
})
app.use((req,res)=>{
    res.status(500).redirect("/")
})

app.listen((process.env.PORT || 3000),()=>{
    console.log("App is up and running on port 3k")
})
