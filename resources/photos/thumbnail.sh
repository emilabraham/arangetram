#!/bin/bash
FILES=* #### This change in code is helpful for us.
for i in $FILES
do
  echo “Prcoessing image $i …”
  /usr/bin/convert -thumbnail 200 $i thumb.$i
done
