# 1. stop pm2
pm2 stop victorIAchat
pm2 delete victorIAchat

# 2. get latest changes
git -C /home/debian/GitHub/victorIAchat reset --hard
git -C /home/debian/GitHub/victorIAchat pull

# 3. install packages if necessary
pnpm --prefix /home/debian/GitHub/victorIAchat install
pnpm --prefix /home/debian/GitHub/victorIAchat run build

# 4. start pm2
cd /home/debian/GitHub/victorIAchat
pm2 start pnpm --name victorIAchat -- run start -p 3200