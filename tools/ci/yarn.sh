#!/bin/bash
MD5_SUM_PACKAGE_JSON=$(md5sum package.json | cut -d ' ' -f 1)
CACHE_FILE=${MD5_SUM_PACKAGE_JSON}.tgz
CACHE_DIR=../node_modules_cache
# check if folder exists and copy node_modules to current directory
if [ -f ${CACHE_DIR}/${CACHE_FILE} ]; then
    echo "GETTING CACHED NODE_MODULES"
    tar zxf $CACHE_DIR/${CACHE_FILE}
fi
        
yarn install --immutable

# if folder does not exists, create it and cache node_modules folder
if ! [ -f ${CACHE_DIR}/${CACHE_FILE} ]; then
    echo "CREATING NODE_MODULES CACHE ${CACHE_DIR}/${CACHE_FILE}"
    rm -rf ${CACHE_DIR}
    mkdir -p ${CACHE_DIR}
    tar zcf ${CACHE_DIR}/${CACHE_FILE} node_modules
fi