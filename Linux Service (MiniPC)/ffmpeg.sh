#! /bin/sh

docker run alfg/ffmpeg \
ffmpeg -i "http://192.168.220.252" \
-preset ultrafast \
-vcodec libx264 \
-f flv "rtmp://192.168.220.251:1935/live/cam"