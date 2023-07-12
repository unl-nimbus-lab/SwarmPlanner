#!/bin/bash
set -e

mkdir -p "$HOME/.vnc"

VNC_PASSWD="$HOME/.vnc/passwd"
if [[ -f $VNC_PASSWD ]]; then
  rm -f $VNC_PASSWD
fi
echo "$VNC_PASSWORD" | vncpasswd -f >> $VNC_PASSWD
chmod 600 $VNC_PASSWD

if [ -z "$VNC_PASSWORD" ]; then
    #Fix Xvnc bug on arm
    if [[ -f /lib/aarch64-linux-gnu/libgcc_s.so.1 ]]; then
      LD_PRELOAD=/lib/aarch64-linux-gnu/libgcc_s.so.1 Xvnc $DISPLAY -depth $VNC_DEPTH -geometry $VNC_RESOLUTION \
                -SecurityTypes None &
     else
           Xvnc $DISPLAY -depth $VNC_DEPTH -geometry $VNC_RESOLUTION \
                -SecurityTypes None &
     fi
else
    #Fix Xvnc bug on arm
    if [[ -f /lib/aarch64-linux-gnu/libgcc_s.so.1 ]]; then
      LD_PRELOAD=/lib/aarch64-linux-gnu/libgcc_s.so.1 Xvnc $DISPLAY -depth $VNC_DEPTH -geometry $VNC_RESOLUTION \
                -PasswordFile $VNC_PASSWD &
       else
           Xvnc $DISPLAY -depth $VNC_DEPTH -geometry $VNC_RESOLUTION \
            -PasswordFile $VNC_PASSWD &
    fi
fi

sleep 1

#Put back the xfce configuration
rm -rf /home/.config
mv /home/config2 /home/.config

#Start the x server interface (remove the redirects to see debug/error messages)
/usr/bin/startxfce4 > /dev/null 2>&1 &

#Now loop forever
while true; do
    echo "VNC Started"

    sleep 100000
done

