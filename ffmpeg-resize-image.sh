$origin=~/images/image.png
$dest=~/images/new_image.png

ffmpeg -i $origin -vf scale=100:100 $dest
