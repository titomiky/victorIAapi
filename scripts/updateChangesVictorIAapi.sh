# 1. stop pm2
pm2 stop victorIAapi
pm2 delete victorIAapi

# 2. get latest changes
git -C /home/debian/GitHub/victorIAapi pull

# 3. install packages if necessary
npm install --prefix /home/debian/GitHub/victorIAapi

# 4. compile with tsc
tsc -p /home/debian/GitHub/victorIAapi

# 5. start pm2
chmod +x /home/debian/GitHub/adminia/scripts/installNpmRunStart_VictorIAapi.sh

pm2 start /home/debian/GitHub/adminia/scripts/installNpmRunStart_VictorIAapi.sh --name victorIAapi --daemon 