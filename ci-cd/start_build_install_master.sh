#!/bin/bash

#The current script is here to start in background the main script used to build en deploy dline
#It's called from a remote ssh call using COMMAND : 'cd ~/build-deploy/scripts; nohup ./start_build_deploy_pre.sh > /dev/null 2>&1' 
#The current script is required because if we add a trailing '&' in the COMMAND of bitbucket pipeline nothing happen

~/ci-cd/cocori-ng/build_install_master.sh &

