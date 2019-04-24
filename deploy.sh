#!/bin/bash


rm -rf tmp.tar.gz
tar zcf tmp.tar.gz *
sleep 2

rsync --progress ./tmp.tar.gz ubuntu@52.78.148.87:/home/ubuntu/ -e "ssh -i ~/aws-pem/gncloud-io.pem"
ssh -i ~/aws-pem/gncloud-io.pem ubuntu@52.78.148.87 sudo tar zxvf /home/ubuntu/tmp.tar.gz -C /var/www/html
ssh -i ~/aws-pem/gncloud-io.pem ubuntu@52.78.148.87 sudo rm -rf /var/www/html/README.md /var/www/html/deploy.sh
ssh -i ~/aws-pem/gncloud-io.pem ubuntu@52.78.148.87 sudo ls -al /var/www/html
ssh -i ~/aws-pem/gncloud-io.pem ubuntu@52.78.148.87 sudo rm /home/ubuntu/tmp.tar.gz


rsync --progress tmp.tar.gz ubuntu@15.164.106.150:/home/ubuntu/ -e "ssh -i ~/aws-pem/gncloud-io.pem"
ssh -i ~/aws-pem/gncloud-io.pem ubuntu@15.164.106.150 sudo tar zxvf tmp.tar.gz -C /var/www/html
ssh -i ~/aws-pem/gncloud-io.pem ubuntu@15.164.106.150 sudo rm -rf /var/www/html/README.md /var/www/html/deploy.sh
ssh -i ~/aws-pem/gncloud-io.pem ubuntu@15.164.106.150 sudo ls -al /var/www/html
ssh -i ~/aws-pem/gncloud-io.pem ubuntu@15.164.106.150 sudo rm /home/ubuntu/tmp.tar.gz