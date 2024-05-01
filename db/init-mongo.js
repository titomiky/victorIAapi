use admin
db.createUser({
  user: "root",
  pwd: "vDHH4ZtZQUag6Fre",
  roles: [
  { role: "root", db: "admin" },
  { role: "readWriteAnyDatabase", db: "admin" },
  { role: "dbAdminAnyDatabase", db: "admin" }
]
})

// Usuario 'admin' con todos los permisos en la base de datos 'mibd'
db.createUser({
    user: 'admin',
    pwd: '5m7pW7BCgtNMb8N6', 
    roles: [{ role: 'dbAdmin', db: 'holaqueai' }, { role: 'readWrite', db: 'holaqueai' }]
});

// Usuario 'client' con acceso de lectura
db.createUser({
    user: 'client',
    pwd: '5NaErRTdWrjbJnMK', 
    roles: [{ role: 'readWrite', db: 'holaqueai' }]
});


// Usuario 'user' con acceso de lectura y escritura
db.createUser({
    user: 'user',
    pwd: 'D5q8R7NQm9TGIUXg', 
    roles: [{ role: 'readWrite', db: 'holaqueai' }]
});

print('Usuarios creados exitosamente.');

db.users.createIndex({ email: 1 }, { unique: true });

print('Indice creado por user.email.');

