let express = require('express');
let app = express();
let path = require('path');
let PORT = 3000;
let methodOverride = require('method-override')
let session = require('express-session')
let cookieParser = require('cookie-parser')

/* Enrutadores */
let autosRouter = require('./routes/autos');
let homeRouter = require('./routes/home');
let sucursalesRouter = require('./routes/sucursales');
let usersRouter = require('./routes/users')
let adminSucursalesRouter = require('./routes/adminSucursales');
let adminAutosRouter = require('./routes/adminAutos')
let adminUsersRouter = require('./routes/adminUsers')
let { cookieCheck, adminCheck } = require('./middlewares/usersMiddlewares')

/* Vistas */
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");
app.use(methodOverride('_method'));
app.use(cookieParser())

/* Middlewares */
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(session({
    secret:"concesionarias",
    resave: false,
    saveUninitialized: true,
    cookie: {}
}));
app.use(cookieCheck)

/* Rutas */
app.use('/', homeRouter);
app.use('/sucursales', sucursalesRouter);
app.use('/autos', autosRouter);
app.use('/admin/sucursales', /* adminCheck , */ adminSucursalesRouter);
app.use('/admin/autos', /* adminCheck , */ adminAutosRouter);
app.use('/admin/users', /* adminCheck , */ adminUsersRouter)
app.use('/users', usersRouter)

/* Vista not found */
app.use((req, res, next) => {
    res.status(404).render('not-found')
})

app.listen(PORT, () => {
    console.log(`Servidor levantado en el puerto ${PORT}\nLink: http://localhost:3000/`)
})