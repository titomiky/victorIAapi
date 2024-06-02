##### SCRIPT installVictorIAapi.sh ######
# Install mongodb 6 in Debian 12
# Install package prerequisites
sudo apt update
sudo apt install -y gnupg curl

# Import GPG key from MongoDB repository
curl -fsSL https://pgp.mongodb.com/server-7.0.pub | sudo apt-key add -
curl -fsSL https://pgp.mongodb.com/server-7.0.asc | sudo gpg --dearmor -o /etc/apt/trusted.gpg.d/mongodb-server-7.0.gpg

# Add Ubuntu repository for MongoDB (replace "jammy" with the latest Ubuntu LTS if needed)
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

# Update package lists and install MongoDB
sudo apt update

#### Source code ####
# install git
sudo apt install -y git

# git clone repos
mkdir GitHub
cd GitHub
git clone https://titomiky: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@github.com/titomiky/victorIAmanu.git

cd ..

# node 20.13.1 install
curl -sL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt update
sudo apt install -y nodejs
sudo apt update
sudo apt install curl
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh > install_nvm.sh
bash install_nvm.sh
rm install_nvm.sh 
source ~/.bashrc
nvm install 20.13.1

# npm install -y dotenv
sudo npm install -g typescript
sudo npm install pm2@5.3.1 -g

# Run victorIAmanu
npm install --prefix /home/debian/GitHub/victorIAmanu

cd /home/debian/GitHub/victorIAmanu
npm run build 

#npm run --prefix /home/debian/GitHub/clientia start
chmod +x /home/debian/GitHub/victorIAapi/scripts/installNpmRunStart_VictorIAmanu.sh

pm2 start /home/debian/GitHub/victorIAapi/scripts/installNpmRunStart_VictorIAmanu.sh --name victorIAweb --daemon 

# nginx + ssl
sudo apt update
sudo apt install nginx -y

sudo cp /home/debian/GitHub/victorIAapi/scripts/web.holaqueai.com /etc/nginx/sites-available/web.holaqueai.com

sudo ln -s /etc/nginx/sites-available/web.holaqueai.com /etc/nginx/sites-enabled/web.holaqueai.com

# certbot
sudo apt update
sudo apt install certbot python3-certbot-nginx -y

sudo certbot --nginx -d web.holaqueai.com --email titomiky@gmail.com --agree-tos --no-eff-email --non-interactive

sudo certbot renew --dry-run

echo "0 0,12 * * * root certbot renew --quiet" | sudo tee -a /etc/crontab

sudo systemctl restart nginx

# firewall 22, 80 y 443
# TODO: ssh port 22 should only be accessible from specific IPs (e.g. my home IP)
sudo iptables -A INPUT -p tcp --dport 22 -j ACCEPT
sudo iptables -A INPUT -p tcp --dport 80 -j ACCEPT
sudo iptables -A INPUT -p tcp --dport 443 -j ACCEPT

sudo iptables -A INPUT -p tcp --dport 3100 -s localhost -j ACCEPT
sudo iptables -A INPUT -p tcp --dport 3100 -j DROP

sudo iptables -A INPUT -p tcp --dport 3200 -s localhost -j ACCEPT
sudo iptables -A INPUT -p tcp --dport 3200 -j DROP

sudo iptables -A INPUT -p tcp --dport 3300 -s localhost -j ACCEPT
sudo iptables -A INPUT -p tcp --dport 3300 -j DROP

sudo iptables -A INPUT -i lo -j ACCEPT 

sudo apt-get update
echo iptables-persistent iptables-persistent/autosave_v4 boolean true | sudo debconf-set-selections
echo iptables-persistent iptables-persistent/autosave_v6 boolean true | sudo debconf-set-selections

sudo apt-get install -y iptables-persistent

sudo netfilter-persistent save
sudo netfilter-persistent reload

# Instal pnpm for web
sudo curl -fsSL https://get.pnpm.io/install.sh | sh -
sudo npm install -g pnpm



sudo apt update


