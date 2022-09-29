const express = require('express');
// const exphandbrs = require('express-handlebars');
const { engine } = require('express-handlebars');
const app = express();
const db = require('./db/connection');
const path = require('path');
const Job = require('./models/Job');
const Sequelize = require('sequelize');
const Op = Sequelize.Op

const bodyParser = require('body-parser');
const PORT = 3000;

app.listen(PORT, ()=> {
  console.log(`App running at port: ${PORT}...`)
})


//body parser
app.use(bodyParser.urlencoded({extended: false}));


//handlebars
app.set('views', path.join(__dirname, 'views'));
// app.engine('handlebars', exphandbrs({defaultLayout: 'main'}));
app.engine('handlebars', engine({ extname: '.handlebars', defaultLayout: "main"}));
app.set('view engine', 'handlebars');

//static folders/ public
app.use(express.static(path.join(__dirname, 'public')));

//db connection
db.authenticate()
.then(() => {
  console.log("Conectado ao banco sqlite");
})
.catch((e) => {
  console.log("Erro ao conectar ao banco: ", e);
})

//routes
app.get('/', (req, res) =>{

  let search = req.query.job;
  let query = '%' + search + '%'  //p -> php, //word -> wordpress

  if(!search){
    Job.findAll({order: [ //metod of sequelize
      ['createdAt', 'DESC']
    ]}) 
    .then(jobs =>{
      res.render('index', {
        jobs
      });
    })
    .catch(err => console.log(err));
  }
  else{
    Job.findAll({
    where: { title: { [Op.like]: query} },
    order: [
    ['createdAt', 'DESC']
  ]}) 
  .then(jobs =>{
    res.render('index', {
      jobs, search
    })
  })
  .catch(err => console.log(err));
  }

  
})

//Jobs routes
app.use('/jobs', require('./routes/jobs'));
