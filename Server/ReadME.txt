#Build contrainer
docker build . --tag durotan/nginx-rtmp
docker build . --tag durotan/nginx-rtmp-cuda


#Comands to start container

docker run -it -p <port>:1935 -p <port>:80 --rm --mount type=bind,src=<way>,target=/etc/nginx/record durotan/nginx-rtmp
docker run -it -p <port>:1935 -p <port>:80 --rm --mount type=bind,src=<way>,target=/etc/nginx/record durotan/nginx-rtmp-cuda

#Example
docker run -it -p 1935:1935 -p 80:80 --rm --mount type=bind,src=C:\Users\Svyatoslav\Desktop\nginx\record,target=/opt/data/video durotan/nginx-rtmp
docker run -it -p 1935:1935 -p 80:80 --rm --mount type=bind,src=C:\Users\Svyatoslav\Desktop\nginx\record,target=/opt/data/video durotan/nginx-rtmp-cuda

Especially for Oles Melnyk

#List flvs
localhost:80/record.json
localhost:80/record

#Get flv
http://localhost:80/record.json/<name>
http://localhost:80/record/<name>

#Play video
rtmp://localhost:1935/vod/<name>

#Play stream
rtmp://localhost:1935/live/<key_stream>
http://localhost:80/hls/<key_stream>.m3u8