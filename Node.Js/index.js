import express from 'express'; //mengimpor Express untuk membuat server
import mysql from 'mysql2'; //mengimpor swagger untuk dokumentasi API
import swaggerUi from 'swagger-ui-express'; //mengimpor swagger untuk dokumentasi API
import fs from 'fs'; //Mengimpor modul fs untuk membaca file
import YAML from 'yaml'; //mengimpor YAML untuk membaca Spesifikasi OPENAPI