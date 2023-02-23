#!/bin/sh
####################################################################
# this script will upgrade pisignage
# this script will do fllowing actions:
#	1) check .problem directory
#   2) check internet connectivity
#	3) get zip file
#   4) kill forever process
#	5) show update video and continue with upgrade process
#	6) Once finished reboot the system
#####################################################################
show_update_video() {
	DISPLAY_ORIENT=`cat /boot/config.txt  | grep "rotate" | tr -d '[a-z][A-Z] _ = '`

	if [ "$DISPLAY_ORIENT" -eq '0' ]; then
	    echo "Landscape Mode"
		nohup sudo omxplayer   --no-osd --no-keys  -o both --loop /home/pi/update_landscape.mp4 &
	else
	    echo "Portrait Mode"
		nohup sudo omxplayer   --no-osd --no-keys  -o both --loop  /home/pi/update_portrait.mp4 &

	fi
	return 0
}

cd /home/pi/

if [ -f "/home/pi/update.png" ]
then
	sudo fbi -T 1 /home/pi/update.png &
fi


echo "check .problem directory"
if [ -d "/home/pi/piSignagePro.problem" ]; then
	sudo rm -rf  /home/pi/piSignagePro.problem
fi

echo "get the new server release file"
ping -c 3 www.pisignage.com
rm $2
wget --no-check-certificate $1  -O $2
if [ $? -ne 0 ]; then
	echo "wget could not get the release file" 1>&2
#	exit 1
    echo "Instead of exit, reboot"
    sudo reboot
    exit 1
fi

# kill forever process
sudo pkill -f forever
sudo pkill -f node
sudo pkill -f uzbl
killall -s 9 chromium-browser
sudo pkill -f omx
echo "wait for the process termination to complete"
sleep 15
show_update_video

echo "deleting prev directory if exists"
if [ -d "/home/pi/piSignagePro.prev" ]; then
    sudo rm -rf  /home/pi/piSignagePro.prev
fi
echo "saving the current image"
mv /home/pi/piSignagePro /home/pi/piSignagePro.prev

echo "deleting updatevrquin-p.prev directory if exists"
if [ -d "/home/pi/updatevrquin-p.prev" ]; then
    sudo rm -rf  /home/pi/updatevrquin-p.prev
fi
echo "saving the current updatevrquin-p"
mv /home/pi/updatevrquin /home/pi/updatevrquin-p.prev

git clone https://github.com/Debaprasadjena1997/updatevrquin-p.git

echo "unzipping the New pi image"
rm -rf  /home/pi/piImage
unzip $2
mv /home/pi/piImage /home/pi/piSignagePro

echo "copying configuration files"
cp /home/pi/piSignagePro.prev/config/_config.json /home/pi/piSignagePro/config
cp /home/pi/piSignagePro.prev/config/_settings.json /home/pi/piSignagePro/config
cp /home/pi/piSignagePro.prev/misc/upgrade.sh /home/pi/piSignagePro/misc

echo "copying the previous node modules"
cp -R /home/pi/piSignagePro.prev/node_modules /home/pi/piSignagePro

rm $2
cd /home/pi/piSignagePro

chmod +x /home/pi/piSignagePro/misc/upgrade.sh
chmod +x /home/pi/piSignagePro/misc/upgrade-manual.sh
chmod +x /home/pi/piSignagePro/misc/downgrade.sh
chmod +x /home/pi/piSignagePro/misc/network-config
chmod +x /home/pi/piSignagePro/misc/*.sh
chmod -R +x /home/pi/piSignagePro/misc/upgrade_scripts

sleep 5
echo "installing npm packages"
npm install
echo "adding line in socket.io npm"
sed "s/.*self\.transport\.onClose.*/if \(self\.transport\) self\.transport\.onClose\(\)/" -i /home/pi/piSignagePro/node_modules/socket.io-client/lib/socket.js
sed "s/.*self\.transport\.onClose.*/if \(self\.transport\) self\.transport\.onClose\(\)/" -i /home/pi/piSignagePro/node_modules/919.socket.io-client/lib/socket.js

sleep 5
echo "executing upgrade scripts"
file="pi-upgrade.js"
if [ -f "$file" ]
then
	node $file
fi

if [ -f "$file" ] && [ -d "/home/pi/pisignage-data" ] && [ -f "/home/pi/pisignage-data/upgrade.sh" ]; then
    /bin/sh /home/pi/pisignage-data/upgrade.sh
fi

sync

rm /home/pi/piSignagePro/misc/install.sh /home/pi/piSignagePro/misc/autostart

echo "Rebooting after the update"
sudo python /home/pi/updatevrquin-p/vrquin.py
sudo reboot
