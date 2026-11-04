#!/bin/sh
# Usage:  sh compress-video.sh input.mp4 output.mp4
# Light file, same visible quality: 720p, H.264 (CRF 26), AAC 96k, fast start (plays almost instantly).
# A 10-15 second clip usually ends up around 1-3 MB.
ffmpeg -i "$1" -vf "scale='min(1280,iw)':-2" -c:v libx264 -crf 26 -preset slow -pix_fmt yuv420p -c:a aac -b:a 96k -movflags +faststart "$2"
