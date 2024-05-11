# Debian 12
# Conectar por SSH
ssh-keygen -R api.holaqueai.com
ssh debian@api.holaqueai.com

sudo vi installVictorIAapi.sh
# copiar el contenido del script /scripts/installVictorIAapi.sh
sudo chmod +x installVictorIAapi.sh
# Ejecutar el script installVictorIAapi.sh
./installVictorIAapi.sh

# Eliminar el script creado
rm -rf installVictorIAapi.sh


##### local environment
source ~/.nvm/nvm.sh