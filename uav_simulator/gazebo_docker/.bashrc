export HOSTNAME=robotDocker

#check if interactive terminal
##################################################
# Fancy PWD display function
##################################################
# The home directory (HOME) is replaced with a ~
# The last pwdmaxlen characters of the PWD are displayed
# Leading partial directory names are striped off
# /home/me/stuff          -> ~/stuff               if USER=me
# /usr/share/big_dir_name -> ../share/big_dir_name if pwdmaxlen=20
##################################################
bash_prompt_command() {
    # How many characters of the $PWD should be kept
    local pwdmaxlen=38
    # Indicate that there has been dir truncation
    local trunc_symbol=".."
    local dir=${PWD##*/}
    pwdmaxlen=$(( ( pwdmaxlen < ${#dir} ) ? ${#dir} : pwdmaxlen ))
    NEW_PWD=${PWD/#$HOME/\~}
    local pwdoffset=$(( ${#NEW_PWD} - pwdmaxlen ))
    if [ ${pwdoffset} -gt "0" ]
    then
        NEW_PWD=${NEW_PWD:$pwdoffset:$pwdmaxlen}
        NEW_PWD=${trunc_symbol}/${NEW_PWD#*/}
    fi
}

if [ "$PS1" ]; then
 #for ls colors
 alias ls='ls --color'
    
  #Overwritten below if using screen
  PROMPT_COMMAND=bash_prompt_command
 
#Things for setting the title of the current screen window
 function rename_screen_tab () { echo -ne "\x1bk$@\x1b\\"; return 0; }
 SCREEN_PROMPT_COMMAND="rename_screen_tab \${LOGNAME}@\${HOSTNAME%%.*}:\${PWD##/*/}"

 function update_prompt() {  eval $SCREEN_PROMPT_COMMAND; bash_prompt_command; }
if [[ "$TERM" = screen* ]]; then
    PROMPT_COMMAND=update_prompt
fi

alias namescreen='source ~/.namescreen_src'

fi

source "/opt/ros/$ROS_DISTRO/setup.bash"

export SETUP_FILE=/home/shared/catkin_ws/devel/setup.bash
if [[ -e $SETUP_FILE ]]; then
    source $SETUP_FILE
fi
