const db = require('../config/db');
const bcrypt = require('bcryptjs');

// Mostrar login
exports.showLogin = (req, res) => {
    res.render('login', { error: null });
};

// Mostrar register
exports.showRegister = (req, res) => {
    res.render('register');
};

// Registrar usuario
exports.register = (req, res) => {

    const { email, password } = req.body;

    const hashedPassword = bcrypt.hashSync(password, 10);

    const sql = "INSERT INTO users (email, password) VALUES (?, ?)";

    db.query(sql, [email, hashedPassword], (err) => {

        if (err) {
            console.log(err);
            return res.send("Error al registrar usuario");
        }

        // IMPORTANTE: ir a login después de registrar
        res.redirect("/login");
    });
};

// Login usuario
exports.login = (req, res) => {

    const { email, password } = req.body;

    const sql = "SELECT * FROM users WHERE email = ?";

    db.query(sql, [email], (err, results) => {

        if (err) {
            console.log(err);
            return res.send("Error en login");
        }


        if (results.length === 0) {
            return res.render("login", { error: "Usuario no encontrado. Por favor crea una cuenta :)" });
        }

        const user = results[0];

        const isValid = bcrypt.compareSync(password, user.password);


        if (!isValid) {
            return res.render("login", { error: "Contraseña incorrecta. Intenta de nuevo" });
        }

        // login correcto
        req.session.user = {
            id: user.id,
            email: user.email
        };

        res.redirect("/dashboard");
    });
};