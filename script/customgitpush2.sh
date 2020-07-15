#!/bin/bash
aws ec2 stop-instances --instance-ids i-049b26fc46b314be4

sleep 360

aws ec2 modify-instance-attribute --instance-id i-049b26fc46b314be4 --instance-type "{\"Value\": \"t2.medium\"}"

sleep 5

aws ec2 start-instances --instance-ids i-049b26fc46b314be4

sleep 60

ssh -i "/home/ubuntu/iDropbox/Dropbox/Dev/AWS_cortohprattdo.pem" ubuntu@ec2-3-9-97-82.eu-west-2.compute.amazonaws.com -yes "sudo service jenkins start";

sleep 60

git push

sleep 200

aws ec2 stop-instances --instance-ids i-049b26fc46b314be4

sleep 360

aws ec2 modify-instance-attribute --instance-id i-049b26fc46b314be4 --instance-type "{\"Value\": \"t2.micro\"}"

sleep 5

aws ec2 start-instances --instance-ids i-049b26fc46b314be4

sleep 30

echo "Build: done visit https://coach.pythonbots.software/"
