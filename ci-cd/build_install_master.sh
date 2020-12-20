#!/bin/bash

#break on error
set -e
trap 'error' ERR


buildName="cocori_ng"
projectName="cocori-ng"
cocoriNgGitUrl="git+ssh://git@bitbucket.org/nicosaliagas/cocori-ng.git"
emailReceivers="anthony.moissant@gmail.com,nico.sesma@gmail.com"

baseDir=~
scriptsBaseDir=~/cocorisoft/ci-cd
buildId=$buildName"_"`date +%Y%m%d_%H%M%S`
logFile=$baseDir/logs/$buildId.log
srcPath=$baseDir/src
branch=master
artifactPath=~/artifact/$buildId

function error() {
    cat <(echo -e "Subject:[Cocori-Ng]: CI/CD for '$branch' encoutered error\nTo:$emailReceivers") $logFile | msmtp -t
    return 1
}

cd $scriptsBaseDir
source $scriptsBaseDir/common.sh

echo "Start build and install Cocori-Ng for branch '$branch'." > $logFile

chmod +x $scriptsBaseDir/*.sh

$scriptsBaseDir/get_sources.sh $srcPath $cocoriNgGitUrl $branch &>> $logFile

echoAndRun cd $srcPath/$projectName &>> $logFile
echoAndRun npm install &>> $logFile
echoAndRun ng build --project=$projectName &>> $logFile

if [ -d "$artifactPath" ]; then
    echoAndRun rm -rf $artifactPath &>> $logFile
fi
echoAndRun mkdir -p $artifactPath &>> $logFile
echoAndRun cp -R $srcPath/$projectName/* $artifactPath
echoAndRun cd $artifactPath
echoAndRun sudo npm link

echo -e "\n\nCocori-Ng built and installed with succes." >> $logFile

cat <(echo -e "Subject:[Cocori-Ng]: CI/CD for branch '$branch' done with success\nTo:$emailReceivers") $logFile | msmtp -t
