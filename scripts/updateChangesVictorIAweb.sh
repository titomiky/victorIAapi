# 1. stop pm2
pm2 stop victorIAweb
pm2 delete victorIAweb

# 2. get latest changes
git -C /home/debian/GitHub/victorIAmanu reset --hard
git -C /home/debian/GitHub/victorIAmanu pull

# 3. install packages if necessary
pnpm --prefix /home/debian/GitHub/victorIAmanu install
pnpm --prefix /home/debian/GitHub/victorIAmanu run build

# 4. start pm2
chmod +x /home/debian/GitHub/victorIAapi/scripts/installNpmRunStart_VictorIAweb.sh
pm2 start /home/debian/GitHub/victorIAapi/scripts/installNpmRunStart_VictorIAweb.sh --name victorIAweb --daemon 