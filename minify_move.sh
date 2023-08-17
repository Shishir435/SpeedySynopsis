#!/bin/bash

input_files=("background.js" "off.js" "script.js")
image_folder="images"
output_dir="upload"

# Create the "images" folder inside the upload directory
mkdir -p "$output_dir/$image_folder"

# Copy image files to the images folder in the output directory
cp -r "$image_folder"/* "$output_dir/$image_folder"

# Move the manifest.json file to the upload directory
cp "manifest.json" "$output_dir"

for input_file in "${input_files[@]}"; do
    output_file="$output_dir/$input_file"
    # Minify the input file and save as output_file
    terser "$input_file" -o "$output_file"
done

# Create a zip file
(cd "$output_dir" && zip -r "../upload.zip" .)

