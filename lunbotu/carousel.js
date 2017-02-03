$.fn.carousel=function(){
    this.each(function(){
        var oBox=this;
        var oNext=oBox.children[1];
        var oPrev=oBox.children[0];
        var oUl=oBox.getElementsByTagName('ul')[0];
        var aLi=oUl.children;
        var oOl=oBox.getElementsByTagName('ol')[0];
        var aBtn=oOl.children;
        //复制一份
        oUl.innerHTML+=oUl.innerHTML;
        //算宽度
        oUl.style.width=aLi[0].offsetWidth*aLi.length+'px';
        
        var iNow=0;
        
        var w=oUl.offsetWidth/2;
        var timer=null;
        //准备
        oBox.onmouseover=function(){
            oNext.style.display='block';
            oPrev.style.display='block';
            clearInterval(timer);
        };
        oBox.onmouseout=function(){
            oNext.style.display='none';
            oPrev.style.display='none';
            clearInterval(timer);
             timer=setInterval(function(){
                iNow++;
                tab();
            },2000);
        
        };


        timer=setInterval(function(){
            iNow++;
            tab();
        },2000);

       
        //选项卡
        for(var i=0; i<aBtn.length; i++){
            (function(index){
                aBtn[i].onclick=function(){
                    iNow=index;
                    tab();
                };
            })(i);
        }
        function tab(){
            for(var i=0; i<aBtn.length; i++){
                aBtn[i].className='';
            }
            if(iNow>0){
                aBtn[iNow%aBtn.length].className='active';  
            }else{
                aBtn[(iNow%aBtn.length+aBtn.length)%aBtn.length].className='active';    
            }
            //oUl.style.left=-index*aLi[0].offsetWidth+'px';
            //move(oUl,{left:-iNow*aLi[0].offsetWidth});
            move(oUl,-iNow*aLi[0].offsetWidth); 
        }
        
        //加事件
        oNext.onclick=function(){
            iNow++;
            tab();  
        };
        oPrev.onclick=function(){
            iNow--;
            tab();  
        };
        
        
        var left=0;
        function move(obj,iTarget){
            clearInterval(obj.timer);
            var count=Math.floor(700/30);
            var start=left;
            var dis=iTarget-start;
            
            var n=0;
            obj.timer=setInterval(function(){
                n++;
                
                var a=1-n/count;
                left=start+dis*(1-Math.pow(a,3));
                
                if(left<0){
                    obj.style.left=left%w+'px'; 
                }else{
                    obj.style.left=left%w-w+'px';   
                }
                
                if(n==count){
                    clearInterval(obj.timer);   
                }
            },30);
        }   
    });
};