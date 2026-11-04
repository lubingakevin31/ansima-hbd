@echo off
REM Usage: compress-video.bat input.mp4 output.mp4
ffmpeg -i %1 -vf "scale='min(1280,iw)':-2" -c:v libx264 -crf 26 -preset slow -pix_fmt yuv420p -c:a aac -b:a 96k -movflags +faststart %2
