import express from 'express'; //mengimpor Express untuk membuat server
import mysql from 'mysql2'; //mengimpor swagger untuk dokumentasi API
import swaggerUi from 'swagger-ui-express'; //mengimpor swagger untuk dokumentasi API
import fs from 'fs'; //Mengimpor modul fs untuk membaca file
import YAML from 'yaml'; //mengimpor YAML untuk membaca Spesifikasi OPENAPI

//Membaca dan mengubah file OpenAPI (spec.yaml) menjadi object Javascript
const swaggerDocument = YAML.parse(fs.readFileSync('./openapi/spec.yaml', utf8));

//Membuat koneksi ke database Mysql
const db = mysql.createConnection({
    host: 'localhost', // alamat database
    user: "root", //nama pengguna database
    password: "", // kata sandi database
    database: "user" // nama database yang digunakan
});

// inisialisasi aplikasi express
const app = express();

//Middleware untuk memungkinkan server membaca dan memproses data JSON dalam request body
app.use(express.json());

//Endpoint untuk menampilkan dokumentasi Swagger di '/docs'
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//Endpoint untuk mendapatkan semua pengguna dari database
app.get('/users', (reg, res) => {
    db.query('SELECT * FROM user', (err, result) => {
        if (err) {
            console.error(err); //Menampilkan error di console
            res.status(500).send('Internal Server Error'); // Jika ada kesalahan, kirim respons error 500
            return;
        }
        res.json(results); //Mengirim data pengguna dalam format JSON
    });
});

//Query untuk menambahkan pengguna baru
db.query('INSERT INTO user (name, email, age) VALUES (?, ?, ?)', [name, email, age], (err, result) => {
    if (err) {
        console.error(err); // menampilkan error di console
        res.status(500).send('Internal Server Error'); // Jika ada kesalahan, kirim respons error 500
        return;
    }
    res.status(201).json({
        message: 'User added succesfully',
        user: { id: result.insertId, name, email, age }
    });
 });

 //Endpoint untuk mendapatkan pengguna berdasarkan ID
 app.get('/users/:id', (req, res) => {
    const { id } = req.params; // Mengambil ID dari parameter URL
    db.query('SELECT * FROM user WHERE id = ?', [id], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            return;
        }
        if (result.length === 0) {
            res.status(404).send('User not found'); //Jika pengguna tidak ditemukan, kirim respons 404
            return;
        }
        res,json({message: "User updated sucessfully"});
    });
 });

 //Endpoint untuk menghapus pengguna berdasarkan ID
 app.delete('/users/:id', (req, res) => {
    const {id} = req.params; // Menga,bil ID pengguna dari parameter URL
    db.query('DELETE FROM user WHERE id id =?', [id], (err, result) => {
        if (err) {
            console.error(err);
            res,status(500),send('Internal Server Error');
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).send('User not found'); // Jika tidak ditemukan, kirim respons 404
            return;
        }
        res.json({ message: 'User deleted successfully'});
    });
 });