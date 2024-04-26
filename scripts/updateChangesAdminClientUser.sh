# 1. stop pm2
pm2 stop all
pm2 delete all

# 2. get latest changes
git -C /home/debian/GitHub/adminia pull
git -C /home/debian/GitHub/clientia pull
git -C /home/debian/GitHub/useria pull
git -C /home/debian/GitHub/victorIAapi pull

# 3. install packages if necessary
npm install --prefix /home/debian/GitHub/adminia
npm install --prefix /home/debian/GitHub/clientia
npm install --prefix /home/debian/GitHub/useria
npm install --prefix /home/debian/GitHub/victorIAapi

# 4. compile with tsc
tsc -p /home/debian/GitHub/adminia
tsc -p /home/debian/GitHub/clientia
tsc -p /home/debian/GitHub/useria
tsc -p /home/debian/GitHub/victorIAapi

# 5. start pm2
chmod +x /home/debian/GitHub/adminia/scripts/installNpmRunStart_Adminia.sh
chmod +x /home/debian/GitHub/adminia/scripts/installNpmRunStart_Clientia.sh
chmod +x /home/debian/GitHub/adminia/scripts/installNpmRunStart_Useria.sh
chmod +x /home/debian/GitHub/adminia/scripts/installNpmRunStart_VictorIAapi.sh

pm2 start /home/debian/GitHub/adminia/scripts/installNpmRunStart_Adminia.sh --name adminia --daemon 
pm2 start /home/debian/GitHub/adminia/scripts/installNpmRunStart_Clientia.sh --name clientia --daemon 
pm2 start /home/debian/GitHub/adminia/scripts/installNpmRunStart_Useria.sh --name useria --daemon
pm2 start /home/debian/GitHub/adminia/scripts/installNpmRunStart_VictorIAapi.sh --name victorIAapi --daemon