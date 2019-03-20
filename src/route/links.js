const express= require('express');
const route = express.Router();
const pool= require('../database');
const {isLoggedIn} = require('../lib/auth');

route.get('/add',isLoggedIn,(req,res)=>{
     res.render('links/add');
});
route.post('/add',async(req,res)=>{
    const {tittle, url, description}=req.body;
    const newlink ={
        title: tittle, //Comprobación de bd con variable del form
        url,
        description
    };
    await pool.query('insert into links set ?',[newlink]);
    res.redirect('/links');

});

route.get('/',isLoggedIn, async(req,res) =>{
    const links = await pool.query('select * from links');
    console.log(links);
    res.render('links/list',{links});
});

route.get('/delete/:id',async(req,res)=>{
    const {id}= req.params;
    await pool.query('delete from links where id=? ',[id]);
    req.flash('success','Eliminado');
    res.redirect('/links');
});

route.get('/edit/:id',isLoggedIn,async(req,res)=>{
    const {id}= req.params;
    const lnk = await pool.query('select * from links where id= ?',[id]);
    res.render('links/edit',{test:lnk[0]});
});
route.post('/edit/:id',async(req,res)=>{
    const {id}= req.params;
    const {title,description,url}= req.body;
    const edit={
        title,
        description,
        url
    };
    console.log(edit);
    await pool.query('update links set ? where id=?',[edit, id]);
    req.flash('success', 'link guardado');
    res.redirect('/links'); 

});
module.exports = route;