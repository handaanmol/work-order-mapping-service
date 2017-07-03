# Underlying Technologies
 - [Node.js](https://nodejs.org/en/docs/) (javascript runtime)

 - [Express.js](http://expressjs.com/) (Web Application Framework)

#### Prerequisites to run this app

The App requires the following major dependencies:

 - git, for Centralized Version Control Systems and bower packages.

 - Node.js, used to run JavaScript tools from the command line.

 - npm, the node package manager, installed with Node.js and used to install Node.js packages.

#### To install dependencies

1) Check if git is installed using `git --version`.  If not, install git from :
```sh
https://git-scm.com/downloads
```

2)  Check your Node.js version.

```sh
node --version
```

The version should be at or above 0.10.x.

3)  If you don't have Node.js installed, or you have a lower version, install node from:

```sh
https://nodejs.org
```

## Steps to get started with app

#### Get the Code
1) Check out the code from :

```sh
https://github.com/handaanmol/work-order-mapping-service
```

2) Copy the clone URL ( `clone with SSH` ) : copy to clip board.

3) Create a new folder and name it. Say, "microservices-code". If you have cloned work-order-mapping-service in some folder, clone this also in same folder.

4) Enter into the "microservices-code" folder, open `Git Bash` and do a

```sh
git clone git@github.com:handaanmol/work-order-mapping-service.git
```

5) You will get the services folder. Go to the working directory

```sh
cd work-order-mapping-service
```
#### Run the App
1) Install node dependencies
```sh
npm install
```
2) Run the app and you can see the app running in port 9002 by default
```sh
node index 
```
#### You can check the swagger url at

LOCAL
http://localhost:9002/work-order-mapping-service/apis/docs

