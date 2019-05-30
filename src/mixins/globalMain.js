// scripts for all main components

export default {

    methods: {
        setInternalRouterLinksInsideContent(){

            /**
             * passes absolute public path links like <a href="/bla">Bla</a> inside any page or post content to the vue router
             **/
            var vm = this;
            setTimeout(()=>{

                let pageWrapper = document.getElementById("pageWrapper");
                let links = pageWrapper.getElementsByTagName("A");
                links = Array.from(links);
                links.forEach(function(link){
                    let href = link.getAttribute("href");
                    if(href.indexOf("/" === 0)){
                        link.addEventListener("click", function(e){
                            e.preventDefault();
                            vm.$router.push(href);
                        },false);
                    }
                });

            },500);
        },
        mountedStuff(){
            this.setInternalRouterLinksInsideContent();
        },

        checkDateVsModified(date, modified){
            if(
                new Date(modified).toLocaleString('en-us', { year: 'numeric', month: 'long', day: 'numeric' })
                ===
                new Date(date).toLocaleString('en-us', { year: 'numeric', month: 'long', day: 'numeric' })){
                return false;
            }else{
                return  "(Updated: "+ new Date(modified).toLocaleString('en-us', { year: 'numeric', month: 'long', day: 'numeric' }) + ")"
            }
        }


    }

}