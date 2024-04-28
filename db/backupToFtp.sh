############################
# SE HACE EN OVH en el VPS.
############################

#!/bin/bash

# Variables
database_name="holaqueai"
backup_path="."
fecha_actual=$(date +"%Y-%m-%d")

# Comando para realizar el backup
mongodump --db $database_name --out $backup_path/$database_name-$fecha_actual

# Opcional: comprimir el archivo de backup
gzip -f $backup_path/$database_name-$fecha_actual.bson

echo "**Backup realizado correctamente**"