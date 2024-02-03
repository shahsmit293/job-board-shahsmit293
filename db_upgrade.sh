pm2 stop database
sleep 1
pm2 delete database

sleep 3
pipenv run migrate

sleep 5
pipenv run upgrade

sleep 5
pm2 start "pipenv run start" --name database
sleep 3
pm2 save
