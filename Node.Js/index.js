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