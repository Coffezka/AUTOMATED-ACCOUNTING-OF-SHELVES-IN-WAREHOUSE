#! /bin/sh

docker run alfg/ffmpeg \
ffmpeg -i "http://192.168.220.251" \
-preset ultrafast \
-vcodec libx264 \
-f flv "rtmp://192.168.220.253:1935/live/cam"

#-filter:v "setpts=x*PTS"\ if speed less then 1
