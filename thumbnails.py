import subprocess
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
    print("")
