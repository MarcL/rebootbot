# rebootbot

Twitter bot which tweets to users as customer support and uses Tracery.
Initial code for bot.

## Install

Install the dependencies.

```shell
git clone git@github.com:MarcL/rebootbot.git
npm install
```

Create a Twitter app and create new a configuration file by copying the sample file and updating it  with your Twitter app credentials.

```javascript
cp config/config.sample.js config/config.js
```

### Run

```shell
npm start
```

### TODO

* Promisify bot
* Add some bot logic
* Add logging
* Totally rewrite!
