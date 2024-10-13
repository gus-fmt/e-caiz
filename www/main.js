const { app, BrowserWindow } = require('electron');
const path = require('path');
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();

let mainWindow;

// Fonction pour créer la fenêtre principale
function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    mainWindow.loadFile('index.html'); // Charge ta page HTML principale

    // Ouvre les outils de développement (optionnel)
    mainWindow.webContents.openDevTools();
}

// Quand Electron est prêt
app.whenReady().then(() => {
    createWindow();

    // Chemin vers la base de données
    const dbPath = path.join(__dirname, 'caisse.db');
    let db;

    // Vérifie si la base de données existe
    if (!fs.existsSync(dbPath)) {
        // Créer une nouvelle base de données
        db = new sqlite3.Database(dbPath, (err) => {
            if (err) {
                console.error(`Erreur lors de la création de la base de données: ${err.message}`);
            } else {
                console.log('Nouvelle base de données créée.');
                db.run(`CREATE TABLE jours (id INTEGER PRIMARY KEY AUTOINCREMENT, date DATE NOT NULL, somme REAL)`);
                db.run(`CREATE TABLE groupes (id INTEGER PRIMARY KEY AUTOINCREMENT, jour INTEGER NOT NULL, groupe REAL)`);
                db.run(`CREATE TABLE articles (id INTEGER PRIMARY KEY AUTOINCREMENT, jour INTEGER NOT NULL, groupe REAL)`);

            }
        });
    } else {
        // Ouvrir la base de données existante
        db = new sqlite3.Database(dbPath, (err) => {
            if (err) {
                console.error(`Erreur lors de l'ouverture de la base de données: ${err.message}`);
            } else {
                console.log('Base de données existante ouverte.');
                db.all(`SELECT * FROM jours`, [], (err, rows) => {
                    if (err) {
                        console.error(`Erreur lors de la récupération des données: ${err.message}`);
                    } else {
                        console.log('Données récupérées:', rows);
                    }
                });
            }
        });
    }

    // Quitter l'application quand toutes les fenêtres sont fermées
    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') {
            app.quit();
        }
    });

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});
