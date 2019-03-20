const express= require('express');
const morgan= require('morgan');
const hbs=require('express-handlebars');
const path= require('path');
const flahs= require('connect-flash');
const session= require('express-session');
const mysqlstore= require('express-mysql-session');
const {database}= require('./keys');
const passport= require('passport');

//inicializar
const app= express();
require('./lib/passport');
//configuraciones
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));

app.engine('.hbs',hbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')

}))
app.set('view engine', '.hbs');
// Peticiones
app.use(session({
    secret:'faztmysqlnodesession',
    resave: false,
    saveUninitialized:false,
    store: new mysqlstore(database)
}));
app.use(flahs());
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

//VB
app.use((req, res, next) =>{
    app.locals.success=req.flash('success');
    app.locals.message=req.flash('message'); 
    app.locals.user=req.user; //permite acceder desde cualquier vista a los datos de logeo
    next();
}); 
//Ruta
app.use(require('./route'));
app.use(require('./route/authentication'));
app.use('/links',require('./route/links'));
//Publico
app.use(express.static(path.join(__dirname, 'public')));
//Inicio

app.listen(app.get('port'), () => {
    console.log('Servidor en el puerto ',app.get('port'));
    
});
