const pass = require('passport');
const rest = require('passport-local').Strategy;
const pool = require('../database');
const helper = require('../lib/helpers');

pass.use('local.signin', new rest({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true

},async (req, username, password,done) =>{  
    console.log(req.body); 
    const rows= await pool.query('select * from users where namep = ?',[username]);
    console.log(rows); 
    if (rows.length >0){
        const user = rows[0];
        const valid = await helper.matchPassword(password, user.password);
        if(valid){
            done(null, user, req.flash('success','entrando'+ user.username));
        }
        else{
            done(null,false, req.flash('message','contraseña incorrecta'));
        }
    }else{
        return done(null,false, req.flash('message','usuario no encontrado'));
    }
}
));

pass.use('local.signup', new rest({
    usernameField: 'username', //Del form signup
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password,done) =>{
    const{fullname}= req.body;
    const newuser = {
        namep : username,
        password: password,
        us: fullname
    };
    console.log(newuser);
    newuser.password = await helper.encryp(password);
    console.log(newuser.password);
    const result = await pool.query('insert into users set ?', [newuser]);
    newuser.id = result.insertId;
    return done(null, newuser);
    
    

}

));

pass.serializeUser((usr,done) =>{
    done(null,usr.id);

});

pass.deserializeUser(async (id,done) =>{
  const array= await pool.query('select * from users where id= ?', [id]);
  done(null, array[0]);
});