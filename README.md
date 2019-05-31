# Wue Theme - A Vue.js WordPress single page application starter theme  
with all the goodness of both worlds: 
- Webpacks Hot Module Replacement (HMR) inside php files! 
- PHP rendering (keep using usual WordPress templates to organise your theme)! 
- Full SEO support without Nuxt.js or even phpv8/v8js! 
- Thus keep using the window object in your Vue templates! How cooooool is this! :blush:
- keep-alive is working! No need for local storage or to use Vuex to handle all the loaded data! That's actually the reason why I stopped working on a Nuxt.js implimentation in January 2019. Nuxt.js doesn't support (properly?) the native keep-alive feature of Vue - at least I couldn't get it work and actually a bunch of other people, too. And how Sebastien Chopin treated the requests was totally disapointing to me:
[https://github.com/nuxt/nuxt.js/issues/431](https://github.com/nuxt/nuxt.js/issues/431)
   
    Here he's promising to have solved the issue: 
    [https://github.com/nuxt/nuxt.js/issues/1706](https://github.com/nuxt/nuxt.js/issues/1706), but it didn't work for me and it's not documented in the official docs at all. So to me it's quite untransparent how the Nuxt.js team is working / communicating. 
   
    Though I am actually thankfull it didn't work with Nuxt.js and I've developed this approach here :blush:

## Demo: [wuetheme.tech-nomad.de](https://wuetheme.tech-nomad.de)

## How it works:
„Conventional“ Single Page Applications use the headless approach where the backend is reduced to output the JSON data for the frontend app. While this is great for performance it is bad for SEO. So you need to pre-render the app or render it on each request on the server side. The most famous tool for Server Side Rendering (SSR) Vue.js apps is Nuxt.js. But it has some disadvantages. First it requires to remove all the window object references from the Vue components. Then the router has to be adapted to the Nuxt-Workflow. For me the killer argument was that the keep-alive feature doesn’t work (properly) with Nuxt.js. And on the top of this you need learn one technology more and setup an extra node.js Server vor serving the rendered files. I don't have any problems to learn new things. Otherwise this theme wouldn't exist :) But why should I use and setup a Node.js server to get a WordPress site work?! No way. In some cases (some supa dupa high tech sites with a bunch of micro services and 50 different backend technologies and a team of 20 people for both backend and frontend - but why are you using WordPress then? :grin:) it might be ok. But not in the most of the WordPress use cases. 

After the "keep-alive" troubles I've tried it with [phpv8/v8js](https://github.com/phpv8/v8js). But after I fought myself through the installation I found out you have to eliminate all the window object reference from all the node_modules used in your package.json! In my simple app the app.bundle.js contained over 70 window object references even I didn't use any inside my components! Fuck that shit! :angry:   

Though you can probably get SSR running with v8js when using vue.js without any webpack stuff, just as a drop-in-library (did not test it). There might be also easy ways to remove the node_module's window objects - [let me know](https://tech-nomad.de/kontakt), please. 

So after this problem has arised and when reading through [Vue.js SSR docs](https://vuejs.org/v2/guide/ssr.html) I found there a claim that Google crawls a JavaScript rendered site, but does not wait for the Ajax responses from the server upon the initial App request. So why you not just send the initial data with the HTML as I do all the time when [localizing a script](https://developer.wordpress.org/reference/functions/wp_localize_script/) in my WordPress themes?! And that's exactly what I did. I've added a global window object / variable in the header.php named technomad for this theme and appended all the data I need at the start of rendering the app by Vue.js. And each template (page.php, index.php or whatever.php) adds more stuff to this object. This way you can continue to use your usual template structure on the PHP side. That's actually it. There are no any other "secrets". All the other difficulties (pagenation, comments etc) are not related to the kind of app rendering but will appear in each case regardless whether you use this or a headless approach. I will also provide here some solutions regarding those other difficulties in future. But the main goal of this theme was and is to provide a simple SEO friendly WordPress+Vue Plug-And-Play starter theme as there were no proper documentation of my approach at the time I've started to work on it (January 2019). Later in April, when I've finished all the main conceptual work, I've found out I am not the only one: this [repo](https://github.com/bucky355/vue-wordpress) pursue the same concept and describes even more. Though I would consider my theme as one more simple to use. That's all you can find right now on the internet with this approach. [Let me know](https://tech-nomad.de) if you know some other PHP rendered, SEO friendly Vue.js WordPress themes, I will mention them here.  

## SEO
* Use a [sitemap plugin](https://wordpress.org/plugins/google-sitemap-generator/)
* Index your site through your [Google Search Console](http://search.google.com/search-console/about?hl=de )
* Don't trust Google and request indexing of all your pages / URLs manually in your Google Search Console, [see my post on this](https://wue-a-vue-js-wordpress-theme.tech-nomad.de/news/seo-issues)


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
    
3. create a database named wue_theme_public and a database user wuethemepublic (or just change the db credentials in the wp-config.php):
    ~~~~
    mysql -uroot -p 
    CREATE DATABASE wue_theme_public CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
    CREATE USER wuethemepublic@localhost IDENTIFIED BY 'cornhulio';
    GRANT ALL PRIVILEGES ON wue_theme_public . * TO wuethemepublic@localhost;
    ~~~~
 
4. import database into your MySQL server:
    ~~~~
    cd /Users/YourUserName/path/to/project/wue-theme-public
    mysql -uwuethemepublic -pcornhulio wue_theme_public < database.sql
    ~~~~
   
5. Install dev node modules (I assume you have [Node.js](https://nodejs.org/en/download/) installed):
    ~~~~
    cd /Users/YourUserName/path/to/project/wue-theme-public
    npm install
    ~~~~
6. start dev server:
    ~~~~
    cd /Users/YourUserName/path/to/project/wue-theme-public
    npm run start    
    ~~~~
    * if port 9200 is already in use change it to any other in the webpack.dev.js
    
7. Login into WordPress Backend:
    * https://dev.wue-theme-public/wp-admin
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

