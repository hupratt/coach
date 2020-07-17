#!/bin/bash

ssh -i "/home/ubuntu/iDropbox/Dropbox/Dev/AWS_cortohprattdo.pem" ubuntu@ec2-3-9-97-82.eu-west-2.compute.amazonaws.com -yes "sudo service jenkins start";

sleep 60

git push

sleep 200

echo "Build: done visit https://coach.pythonbots.software/"
