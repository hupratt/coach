
def labels = ['master','slave'] 
def builders = [:]
for (x in labels) {
    def label = x // Need to bind the label variable before the closure 

    // Create a map to pass in to the 'parallel' step so we can fire all the builds at once
    builders[label] = {
		timestamps {
			node () {
				
				def PROJECT="/home/ubuntu/Dev/coach"
				def PYTHON_P="$PROJECT/env/bin/python3.6"
				
				stage ('Checkout') {
					// checkout source control
					sh """ 
					whoami
					sudo service apache2 stop
					cd $PROJECT
					git fetch --all
					git reset --hard origin/master
					"""
				}

				stage ('Build') {
					
					sh """ 
					cd $PROJECT
					sudo chmod -R 770 $PROJECT
					sudo chown -R ubuntu:www-data $PROJECT
					npm install
					npm run build
					sudo rm -rf node_modules
					. bin/activate
					echo 'which python are you running?'
					which python
					
					$PYTHON_P -m pip install --upgrade pip 
					echo 'pip upgrade done'
					$PYTHON_P -m pip install -r backend/requirements/production.txt
					echo 'pip install done'
					
					$PYTHON_P ./backend/coach/manage.py migrate                  
					echo 'manage.py migrate done'

					$PYTHON_P ./backend/coach/manage.py compilemessages --settings=home.settings

					$PYTHON_P ./backend/coach/manage.py collectstatic --noinput --settings=home.settings
					echo 'manage.py collectstatic done'

					$PYTHON_P ./backend/coach/manage.py check --deploy

					deactivate 

					sudo service apache2 start

					""" 
				}
			}
		}
    }
}

throttle(['loadbalancer']) {
  parallel builders
}




