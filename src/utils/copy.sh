#!/bin/sh
cd /Users/huziyin/Documents/Self-study/imook-nodejs/blog-1/logs
cp access.log $(date +%Y-%m-%d).access.log
echo "">access.log