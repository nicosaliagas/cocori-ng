#!/bin/bash

#break on error
set -e
trap 'error' ERR
#to debug
#set -x

#load common functions
scriptPath=~/cocorisoft/ci-cd
chmod +x $scriptPath/*.sh
#TODO les autres scripts on besoin de s'éxécuter dans ce chemin, fait en sorte de se faire inejcter les paramètres pour que ca marche peut importe le chemin courant
cd $scriptPath 
source ./common.sh
date=`date`

#define functions
function printUsage () {
    echo -e "\nBuild script for project Digikulte."
    echo "Usage : $scriptName \$buildId \$branch"
    echo "  \$buildId :  
        The unique id used for this build.
        ex: digikulte_20201221.163220"
     echo "  \$branch :  
        The branch to build.
        ex: master"
    return 1
}

function error() {
    echo "
##################################################################################
#
#    $date
#    Build for branch $branch of project $projectName encountered error.
#
##################################################################################
" >> $logFile
    if [ "$sendEmail" = true ] ; then
        cat <(echo -e "Subject:[$projectName]: Build for branch $branch encountered error\nTo:$emailReceivers") $logFile | msmtp -t
    fi
    return 1
}

#validate and init variables
validateArg 1 "buildId" $1 || printUsage
validateArg 2 "branch" $2 || printUsage

#common variables
buildId=$1
branch=$2
projectName="cocori-ng"
projectGitUrl="git+ssh://git@bitbucket.org/nicosaliagas/cocori-ng.git"
emailReceivers="anthony.moissant@gmail.com,nico.sesma@gmail.com"
sendEmail=true

#se faire injecter ces variables ? ou passer en paramètre un fichier de varables chargées au début ?
logPath=~/log
srcPath=~/src
artifactPath=~/artifact
logFile=$logPath/$buildId"_build."$branch.log

libProjectName="cocori-ng"
libArtifactPath=$artifactPath/$buildId/$projectName

echo "
##################################################################################
#
#    $date
#    Start build and install branch $branch for project $projectName.
#
##################################################################################
" &> $logFile

variables="
Variables : \n
logPath=$logPath\n
srcPath=$srcPath\n
artifactPath=$artifactPath\n
buildId=$buildId\n
projectName=$projectName\n
projectGitUrl=$projectGitUrl\n
branch=$branch\n
emailReceivers=$emailReceivers\n
sendEmail=$sendEmail\n
logFile=$logFile\n
libProjectName=$libProjectName\n
libArtifactPath=$libArtifactPath"
echod $variables &>> $logFile

$scriptPath/get_sources.sh $srcPath $projectGitUrl $branch &>> $logFile

#TODO séparer en scripts de build et d'install 
echoAndRun cd $srcPath/$projectName &>> $logFile
echoAndRun npm install &>> $logFile
echoAndRun ng build --project=$libProjectName &>> $logFile

if [ -d "$libArtifactPath" ]; then
    echoAndRun rm -rf $libArtifactPath &>> $logFile
fi
echoAndRun mkdir -p $libArtifactPath &>> $logFile
echoAndRun cp -R $srcPath/$projectName/* $libArtifactPath &>> $logFile
echoAndRun cd $libArtifactPath &>> $logFile
echoAndRun sudo npm link &>> $logFile

echo "
##################################################################################
#
#    $date
#    Branch $branch for project $projectName built and installed with success.
#
##################################################################################
" &>> $logFile

if [ "$sendEmail" = true ] ; then
    cat <(echo -e "Subject:[$projectName]: Build/Install for branch $branch done with success\nTo:$emailReceivers") $logFile | msmtp -t
fi
