#!/bin/bash

TARGET_HOST=${TARGET_HOST:-rpi-garage}
TARGET_USER=${TARGET_USER:-pi}
TARGET_DIR=${TARGET_DIR:-garage-rpi-node}

echo $TARGET_HOST

ssh -l $TARGET_USER $TARGET_HOST mkdir $TARGET_DIR
scp * $TARGET_USER@$TARGET_HOST:/home/pi/$TARGET_DIR/
ssh -l $TARGET_USER $TARGET_HOST "cd /home/pi/$TARGET_DIR && npm install && node server.js"