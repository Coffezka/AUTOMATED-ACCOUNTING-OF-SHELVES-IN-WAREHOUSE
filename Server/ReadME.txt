#Build contrainer
docker build . --tag durotan/nginx-rtmp
docker build . --tag durotan/nginx-rtmp-cuda


#Start container
docker run -it -p 1935:1935 -p 80:80 --rm --mount type=bind,src=C:\Users\Svyatoslav\Desktop\nginx\record,target=/etc/nginx/record durotan/nginx-rtmp
docker run -it -p 1935:1935 -p 80:80 --rm --mount type=bind,src=C:\Users\Svyatoslav\Desktop\nginx\record,target=/etc/nginx/record durotan/nginx-rtmp-cuda


Especially for Oles Melnyk

#List files
localhost:80/record.json
localhost:80/record

#Get file
localhost:80/record.json/<name>
localhost:80/record/<name>