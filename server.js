if(process.env.NODE_ENV!='production'){
    require('dotenv').config();
}


const express=require('express')
const path=require('path')
const app=express()
const expressLayouts=require('express-ejs-layouts')


const indexRouter=require('./routes/index')
const authorRouter=require('./routes/authors')
const bookRouter=require('./routes/books')
const methodOverride=require('method-override')

const bodyParser=require('body-parser')
const mongoose=require('mongoose')

app.set('view engine','ejs')
app.set('views', path.join(__dirname, 'views'))
app.set('layout','layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(bodyParser.urlencoded({limit:'10mb',extended:false}))
app.use(methodOverride('_method'))

app.use('/',indexRouter)
app.use('/authors',authorRouter)
app.use('/books',bookRouter)

app.listen(process.env.PORT || 3002)
console.log('server running at port 3000')

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true,useUnifiedTopology: true })
mongoose.set('useCreateIndex', true);
const db=mongoose.connection
db.on('error',error=>console.error(error))
db.once('open',()=>console.log('Connected to Mongoose'))