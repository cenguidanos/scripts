$origin=~/images/video.mp4
$dest=~/images/video.webm

ffmpeg -i $origin -c:v libvpx-vp9 -crf 30 -b:v 0 -b:a 128k -c:a libopus $dest
