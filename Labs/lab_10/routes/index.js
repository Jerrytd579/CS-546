const bcrypt = require('bcrypt');
const data = require('../data');
const userData = data.users;

const constructorMethod = (app) => {
    
    app.get('/', async (req, res) => {
        // https://masteringjs.io/tutorials/express/redirect
        if(req.session.user) {
            res.redirect('/private');
            return;
        }

        res.render('login', {title: 'Login'});
    });

    app.post('/login', async (req, res) => {

        if(!req.body.username || !req.body.password){
            res.status(401).render('login', {title: 'Login', error: 'Error 401: Username or password not provided.'});
            return;
        }
        
        const username = req.body.username.trim();
        const password = req.body.password.trim();

        for(x of userData){
            if(x.username === username && bcrypt.compareSync(password, x.hashedPassword)){
                req.session.user = x;
                break;
            }
        }

        if(!req.session.user){
            res.status(401).render('login', {title: 'Login', error: 'Error 401: User not found.'});
            return;
        }

        res.redirect('/private');

        return;
    });

    app.get('/private', async (req, res) => {
        res.render('private', {user: req.session.user, title: 'Private'});
        return;
    });

    app.get('/logout', async (req, res) => {
        req.session.destroy();
        res.render('logout', {title: 'Logged out!'});
    });

    app.use('*', (req, res) => {
        res.status(404).render('error', {title: 'Error', error: '404: Not found'});
    });
};
  
module.exports = constructorMethod;