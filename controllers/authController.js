const db = require('../config/db');
const bcrypt = require('bcrypt');

// Registro de usuario
exports.register = async (req, res) => {

    const { name, email, password } = req.body;

    try {

        // Encriptar contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Guardar usuario
        const sql = `
            INSERT INTO users (name, email, password)
            VALUES (?, ?, ?)
        `;

        db.query(sql, [name, email, hashedPassword], (err, result) => {

            if (err) {
                console.log(err);
                return res.send('Error al registrar usuario');
            }

            res.send('Usuario registrado correctamente 🚀');
        });

    } catch (error) {
        console.log(error);
        res.send('Error del servidor');
    }
};

// Login usuario
exports.login = (req, res) => {

    const { email, password } = req.body;

    const sql = `
        SELECT * FROM users WHERE email = ?
    `;

    db.query(sql, [email], async (err, results) => {

        if (err) {
            console.log(err);
            return res.send('Error del servidor');
        }

        // Usuario no encontrado
        if (results.length === 0) {
            return res.send('Usuario no encontrado');
        }

        const user = results[0];

        // Comparar contraseña
        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.send('Contraseña incorrecta');
        }

        res.redirect('/dashboard');
    });
};