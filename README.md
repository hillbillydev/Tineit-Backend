## Overview

So I wanted to rewrite my project 'Curriculum-Vitae' with only JavaScript. 
So in this repository is the backend part of it. 

The frontend is coming later on the repository 'Tineit-frontend'.

Keyword for the backend: ['Node', 'Express', 'Mongo', 'Mongoose', 'Jsonwebtoken' ]

## Motivation

 The motivation for my old project 'Curriculum-Vitae', I created it because my school was running to an end.

So I wanted to have something to send to companies that not only wanted to see a piece of paper, and actually check out my
 programming skills at a website.

 So the motivation for the Tineit project its really simple, make the old system legacy and rewrite everything with javascript

## Installation

I'm going to give you two ways to install this on your machine. 
This one is the boring one, and the other one is awesome. 
> See 'Installation with Docker' section.

[Node](https://nodejs.org/en/)

[MongoDb](https://www.mongodb.com/)

Then you download the repository [here](https://github.com/Tinee/Curriculum-Vitae/archive/master.zip)

then you unzip the file and place it in your favourite folder.

Then you navigate to the folder with your terminal.

Example:
```
cd ./documents/downloads/tineit
```

And when your in your awesome folder where you put the project you simple run:
```
npm install
```
then
```
npm start
```

This will the start the server and listens to port 3000 by default. 

So try to navigate to http://localhost:3000/

and you should see a simple website.

## Installation with Docker

Okay so you choise the awesome installation instead of the boring one, good for you! 

So lets to this step by step.

First install [Docker](https://www.docker.com/products/docker#/mac).

Then download this [repository](https://github.com/Tinee/Curriculum-Vitae/archive/master.zip), then unzip it in your favorite folder. :)

After the installation of Docker is done you can start the application 'Docker Quickstart Terminal'.

After you have started it you can navigate to the folder with the terminal you just opened up.


```
Example-
cd ./documents/downloads/tineit
```
Then you run.
```
docker-compose build
```
And lastly type in.
```
docker-compose up
```

docker-compose build will install all the dependency the project needs to run.

docker- compose up will take all the dependencies and host them in separated containers with isolated networks.

So try to navigate to http://192.168.99.100:3000/ in your browser.

If you want to learn more about Docker I recommend you to check out [Dan Wahlins](https://twitter.com/DanWahlin) course on [Pluralsight](https://www.pluralsight.com/courses/docker-web-development).


## API Calls

Its a lot of different api calls to the server, so check out in the code and try them out.
> Documentation for all the api calls is coming later.


## Contributors

[Marcus Tine Carlsson](https://twitter.com/tineiit)

## License

Copyright (c) 2016 Marcus Carlsson

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software
