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