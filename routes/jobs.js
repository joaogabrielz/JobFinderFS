const express = require('express')
const router = express.Router();
const Job = require('../models/Job')

router.get('/test', (req, res) =>{
  res.send('it Work !!!!')
})


//detalhe da vaga -> view/1, view/2
router.get('/view/:id', (req, res) => {
  Job.findOne({
    where: {id: req.params.id}
  })
  .then(job => {
    res.render('view', { 
      job
    });
  })
  .catch(err => console.log(err))
})


// Form rota de envio, busca pelo input
router.get('/add', (req, res) => {
  res.render('add');
})

// add an job with Post
router.post('/add', (req, res) => {

  //recebe do corpo da req, e desestrutura
  let { 
    title,
    description,
    salary,
    company,
    email,
    new_job
  } = req.body;  

  //insert sqlite
  //cria um campo pelos dados pegos do corpo
  Job.create({
    title,
    description,
    salary,
    company,
    email,
    new_job
  })
  .then(() => res.redirect('/'))
  .catch(e => console.log(e));
})

module.exports = router;