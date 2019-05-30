# Wue Theme - A Vue.js WordPress single page application starter theme  
with all the goodness of both worlds: 
- Webpacks Hot Module Replacement (HMR) inside php files! 
- PHP rendering (keep using usual WordPress templates to organise your theme)! 
- Full SEO support without Nuxt.js or even phpv8/v8js! 
- Thus keep using the window object in your Vue templates! How cooooool is this! :)
- keep-alive is working! No need for local storage or to use Vuex to handle all the loaded data! That's actually the reason why I stopped working on a Nuxt.js implimentation in January 2019. Nuxt.js doesn't support (properly?) the native keep-alive feature of Vue - at least I couldn't get it work and actually a bunch of other people, too. And how Sebastien Chopin treated the requests was totally disapointing to me:
[https://github.com/nuxt/nuxt.js/issues/431](https://github.com/nuxt/nuxt.js/issues/431)
   
    Here he's promising to have solved the issue: 
    [https://github.com/nuxt/nuxt.js/issues/1706](https://github.com/nuxt/nuxt.js/issues/1706), but it didn't work for me and it's not documented in the official docs at all. So to me it's quite untransparent how the Nuxt.js team is working / communicating. 
   
    Though I am actually thankfull it didn't work with Nuxt.js and I've developed this approach here :blush:

## Demo: [wuetheme.tech-nomad.de](https://wuetheme.tech-nomad.de)

## Dev Environment Setup
1. download this repo
2. setup local Apache VirtualHost named dev.wue-theme-public (on Mac):
    * open hosts file:
    ~~~~
    sudo vim /etc/hosts
    ~~~~
    
    * and add this line
    ~~~~
    127.0.0.1       dev.wue-theme-public
    ~~~~
    
    * add a new VirtualHost to your Apache config. If you are using Homebrew (which you should as Mojave's  Apache doesn't work properly or at least didn't work porperly until recently with Mojave's PHP7.2) then you will find the configs here:
    ~~~~  
    vim /usr/local/etc/httpd/httpd.conf
    ~~~~
    * and add thes lines anywhere at the bottom of the file 
    ~~~~
    <VirtualHost dev.wue-theme-public:80>
       ServerName dev.wue-theme-public
       DocumentRoot "/Users/YourUserName/path/to/project/wue-theme-public/wordpress"
       ServerAdmin your@adminemail.com
       ErrorLog "/Users/YourUserName/path/to/project/wue-theme-public/wordpress/error.log"
       CustomLog "/Users/YourUserName/path/to/project/wue-theme-public/wordpress/access.log" combined
    </VirtualHost>
    
    <VirtualHost dev.wue-theme-public:443>
        ServerAdmin your@adminemail.com
        ServerName dev.wue-theme-public
        DocumentRoot "/Users/YourUserName/path/to/project/wue-theme-public/wordpress"
        ErrorLog "/Users/YourUserName/path/to/project/wue-theme-public/wordpress/error.log"
        CustomLog "/Users/YourUserName/path/to/project/wue-theme-public/wordpress/access.log" combined
        
        #create a self signed certificate on mac:
        #https://ksearch.wordpress.com/2017/08/22/generate-and-import-a-self-signed-ssl-certificate-on-mac-osx-sierra/
        #if you don't need SSL for any reason you will have to search-replace the database via wp-cli or using a plugin like wp migrate db 
        https://dev.wue-theme-public by http://dev.wue-theme-public 
        SSLEngine on
        SSLCertificateFile "/private/etc/apache2/server.crt"
        SSLCertificateKeyFile "/private/etc/apache2/server.key"
    </VirtualHost>
    ~~~~
    
3. create a database named wue_theme_public and a database user wuethemepublic or just change the db credentials in the wp-config.php 

4. start dev server:
    ~~~~
    cd /Users/YourUserName/path/to/project/wue-theme-public
    npm run start    
    ~~~~
    * if port 9200 is already in use change it to any other in the webpack.dev.js
    
5. Login into WordPress Backend:
    * User: KungFuMaster
    * Password: kamasutra
    
    :grin:
    
Now everything should run as in the demo 

You can delete the port number in the browser address bar so the main requests are handeled by Apache. Express.js writes the app assets and hot module replacement chunks  physically (as configured in the webpack.dev.js) to the wue-public-theme/app directory so Apache can access them without any proxieng

If you see after "npm run start" a blank screen and the Wue logo, then just reload the page and then everything should work, if not then something went wrong :)

## Generate production app assets:
1. just simply run:
    ~~~~
    cd /Users/YourUserName/path/to/project/wue-theme-public
    npm run build
    ~~~~
    
## Use the theme only
1. download the repo and use wuetheme.zip to install Wue Theme as a regular theme. 
    
    Though there is no data within the theme. You would have to setup the menus, the permalinks, the pages and other settings by yourself or just import the database.sql via PhpMyAdmin
     
     
## Permalinks 
You have to sync the route structure of Vue Router and of WordPress. For News it's easy - you just have to set the permalinks for blog posts to custom structure and prepend "/news/" to the permalink in the [settings](https://dev.wue-theme-public/wp-admin/options-permalink.php):

~~~~
/news/%postname%/    
~~~~    
    
For custom post types you might have to rewrite rules in the themes functions.php using the [add_rewrite_rule()](https://codex.wordpress.org/Rewrite_API/add_rewrite_rule) function.
    
More documentation is coming soon. Meanwhile you can check [my other repo where the webpack configs are commented properly](https://github.com/Tech-Nomad/wordpress-php-vue-webpack-hot-module-replacement-hmr-starter-setup).

