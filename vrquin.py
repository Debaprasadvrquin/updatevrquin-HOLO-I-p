import os
import shutil


def install(which):
    os.system(which)


os.chdir('/home/pi/updatevrquin-p')
directory = os.getcwd()

# for install pathlib in pip
install("sudo chmod 777 -R /home/pi/piSignagePro")
install("pip install pathlib")
install("sudo apt-get install ffmpeg -y")

# for change startup and updating video
os.remove("/home/pi/brand_pisignage_landscape.mp4")
src_path = directory + "/brand_pisignage_landscape.mp4"
dst_path = r"/home/pi/brand_pisignage_landscape.mp4"
shutil.copy(src_path, dst_path)
os.remove("/home/pi/update_landscape.mp4")
src_path = directory + "/update_landscape.mp4"
dst_path = r"/home/pi/update_landscape.mp4"
shutil.copy(src_path, dst_path)
os.remove("/home/pi/update.png")
src_path = directory + "/update.png"
dst_path = r"/home/pi/update.png"
shutil.copy(src_path, dst_path)
# for create js folder
install("mkdir /home/pi/piSignagePro/public/app/js")
install("mkdir /home/pi/piSignagePro/public/app/thumbnails")
install("sudo chmod 777 -R /home/pi/piSignagePro/public/app/thumbnails")

# for change pisignage.min.js
os.remove("/home/pi/piSignagePro/pi-server.js")
src_path = directory + "/pi-server.js"
dst_path = r"/home/pi/piSignagePro/pi-server.js"
shutil.copy(src_path, dst_path)
os.remove("/home/pi/piSignagePro/public/pisignage.min.js")
src_path = directory + "/pisignage.min.js"
dst_path = r"/home/pi/piSignagePro/public/pisignage.min.js"
shutil.copy(src_path, dst_path)
src_path = directory + "/slick.js"
dst_path = r"/home/pi/piSignagePro/public/app/js/slick.js"
shutil.copy(src_path, dst_path)
src_path = directory + "/manifest.json"
dst_path = r"/home/pi/piSignagePro/public/app/manifest.json"
shutil.copy(src_path, dst_path)
# for change custom.css
os.remove("/home/pi/piSignagePro/public/app/css/custom.css")
src_path = directory + "/custom.css"
dst_path = r"/home/pi/piSignagePro/public/app/css/custom.css"
shutil.copy(src_path, dst_path)
os.remove("/home/pi/piSignagePro/public/app/css/toolkit-light.min.css")
src_path = directory + "/toolkit-light.min.css"
dst_path = r"/home/pi/piSignagePro/public/app/css/toolkit-light.min.css"
shutil.copy(src_path, dst_path)
src_path = directory + "/slick.css"
dst_path = r"/home/pi/piSignagePro/public/app/css/slick.css"
shutil.copy(src_path, dst_path)
# for change index-pi.html
os.remove("/home/pi/piSignagePro/app/views/index-pi.html")
src_path = directory + "/index-pi.html"
dst_path = r"/home/pi/piSignagePro/app/views/index-pi.html"
shutil.copy(src_path, dst_path)

# for change logo image
os.remove("/usr/share/plymouth/themes/pix/splash.png")
src_path = directory + "/logo.png"
dst_path = r"/usr/share/plymouth/themes/pix/splash.png"
shutil.copy(src_path, dst_path)

# for hide boot txt
src_path = "/boot/cmdline.txt"
dst_path = r"/boot/cmdline.txt.copy"
shutil.copy(src_path, dst_path)
os.remove("/boot/cmdline.txt")
src_path = directory + "/cmdline.txt"
dst_path = r"/boot/cmdline.txt"
shutil.copy(src_path, dst_path)

os.remove("/home/pi/start.sh")
src_path = directory + "/start.sh"
dst_path = r"/home/pi/start.sh"
shutil.copy(src_path, dst_path)

os.remove("/home/pi/piSignagePro/public/app/img/favicon.ico")
src_path = directory + "/favicon.png"
dst_path = r"/home/pi/piSignagePro/public/app/img/favicon.ico"
shutil.copy(src_path, dst_path)
src_path = directory + "/VRlogo.png"
dst_path = r"/home/pi/piSignagePro/public/app/img/VRlogo.png"
shutil.copy(src_path, dst_path)
src_path = directory + "/main-banner.png"
dst_path = r"/home/pi/piSignagePro/public/app/img/main-banner.png"
shutil.copy(src_path, dst_path)
src_path = directory + "/Background.png"
dst_path = r"/home/pi/piSignagePro/public/app/img/Background.png"
shutil.copy(src_path, dst_path)
src_path = directory + "/modalbg.png"
dst_path = r"/home/pi/piSignagePro/public/app/img/modalbg.png"
shutil.copy(src_path, dst_path)
src_path = directory + "/img-btn.png"
dst_path = r"/home/pi/piSignagePro/public/app/img/img-btn.png"
shutil.copy(src_path, dst_path)
src_path = directory + "/home-banner.jpg"
dst_path = r"/home/pi/piSignagePro/public/app/img/home-banner.jpg"
shutil.copy(src_path, dst_path)
src_path = directory + "/18.png"
dst_path = r"/home/pi/piSignagePro/public/app/img/18.png"
shutil.copy(src_path, dst_path)
# for welcome page video
src_path = directory + "/vrquin.mp4"
dst_path = r"/home/pi/piSignagePro/public/app/img/vrquin.mp4"
shutil.copy(src_path, dst_path)
os.remove("/home/pi/piSignagePro/app/views/emptynotice.ejs")
src_path = directory + "/welcome.ejs"
dst_path = r"/home/pi/piSignagePro/app/views/emptynotice.ejs"
shutil.copy(src_path, dst_path)

# for remove png,tmp & srt file in media folder
with open('/home/pi/piSignagePro/remove.py', 'w') as f:
    f.write('''import pathlib
import os
while True:
    source_folder = "/home/pi/media/"
    try:
        for file_name in os.listdir(source_folder):
            source = source_folder + file_name
            if source.endswith(".srt"):
                file = pathlib.Path(source)
                file.unlink()
            elif source.endswith(".tmp"):
                file = pathlib.Path(source)
                file.unlink()
            elif source.endswith(".jpg"):
                file = pathlib.Path(source)
                file.unlink()
            elif source.endswith(".jpeg"):
                file = pathlib.Path(source)
                file.unlink()
            else:
                if source.endswith(".png"):
                    file = pathlib.Path(source)
                    file.unlink()
        else:
            continue
    except FileNotFoundError:
        print("FileNotFoundError")
    except:
        print("Something else went wrong")
''')

# create thumbnails
with open('/home/pi/piSignagePro/thumbnails.py', 'w') as f:
    f.write('''import subprocess
import os
from pathlib import Path
from time import sleep
import glob
try:
    thum = "/home/pi/piSignagePro/public/app/thumbnails/"
    for file_name in os.listdir(thum):
        rem = thum+file_name
        print(rem)
        os.remove(rem)
    while(True):
        count_1 = 0
        count_2 = 0
        media = "/home/pi/media/"
        for file_name in os.listdir(media):
            if file_name.endswith((".mp4", ".mov")):
                count_1 += 1
        for file_name in os.listdir(thum):
            if file_name.endswith(".jpg"):
                count_2 += 1
        print(count_1)
        print(count_2)
        sleep(2)
        if (count_1 > count_2):
            for file_name in os.listdir(media):
                if file_name.endswith(".mp4"):
                    video_p = media+file_name
                    print(video_p)
                    # if file_name.endswith(".mp4"):
                    video_n = Path(video_p).stem
                    img_n = video_n + ".jpg"
                    img_p = thum + img_n
                    if next(glob.iglob(img_p), None):
                        print("")
                    else:
                        subprocess.call(
                            ['ffmpeg', '-i', video_p, '-ss', '00:00:00.000', '-vframes', '1', img_p])
                if file_name.endswith(".mov"):
                    video_p = media+file_name
                    print(video_p)
                    # if file_name.endswith(".mp4"):
                    video_n = Path(video_p).stem
                    img_n = video_n + ".jpg"
                    img_p = thum + img_n
                    if next(glob.iglob(img_p), None):
                        print("")
                    else:
                        subprocess.call(
                            ['ffmpeg', '-i', video_p, '-ss', '00:00:00.000', '-vframes', '1', img_p])
        elif(count_1 < count_2):
            for file_name in os.listdir(thum):
                if file_name.endswith(".jpg"):
                    img_p = thum+file_name
                    # if file_name.endswith(".jpg"):
                    img_n = Path(img_p).stem
                    video_n_mp4 = img_n + ".mp4"
                    video_p_mp4 = media + video_n_mp4
                    video_n_mov = img_n + ".mov"
                    video_p_mov = media + video_n_mov
                    # print(video_p)
                    if next(glob.iglob(video_p_mp4), None):
                        print("")
                    elif next(glob.iglob(video_p_mov), None):
                        print("")
                    else:
                        os.remove(img_p)
        elif(count_1 == count_2):
            for file_name in os.listdir(thum):
                if file_name.endswith(".jpg"):
                    img_p = thum+file_name
                    # if file_name.endswith(".jpg"):
                    img_n = Path(img_p).stem
                    video_n_mp4 = img_n + ".mp4"
                    video_p_mp4 = media + video_n_mp4
                    video_n_mov = img_n + ".mov"
                    video_p_mov = media + video_n_mov
                    # print(video_p)
                    if next(glob.iglob(video_p_mp4), None):
                        print("")
                    elif next(glob.iglob(video_p_mov), None):
                        print("")
                    else:
                        os.remove(img_p)

except:
    print("")''')
with open('/home/pi/piSignagePro/restart.py', 'w') as f:
    f.write('''from gpiozero import Button
import os
from signal import pause


def reboot():
    print("system reboot")
    os.system("sudo reboot")


reboot_btn = Button(2, hold_time=4)
reboot_btn.when_held = reboot
pause()''')


install("sudo cp -r c-img /home/pi/piSignagePro/public/app")
install("sudo cp -r cat-img /home/pi/piSignagePro/public/app")
install("sudo cp -r icons /home/pi/piSignagePro/public/app")
# install("sudo rm -r /home/pi/15-feb-2023.zip")
# os.chdir('/home/pi/captive-portal')
# install("openssl req -x509 -newkey rsa:4096 -nodes -out cert.pem -keyout key.pem -days 365")
# install("cp ./sso_config.example.py ./sso_config.py")
install("sudo reboot")
