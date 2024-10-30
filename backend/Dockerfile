FROM python:3.8

# The enviroment variable ensures that the python output is set straight
# to the terminal with out buffering it first
ENV PYTHONUNBUFFERED 1

# Prevents Python from writing pyc files to disc (equivalent to python -B option)
ENV PYTHONDONTWRITEBYTECODE 1


# Copy the current directory contents into the container at /app
WORKDIR /hdd/Dev/coach
COPY . .
RUN pip install -r requirements/production.txt
RUN python manage.py collectstatic -v 2 --noinput
RUN pip install gunicorn

EXPOSE 9125
