$(function () {

    iNowIndex = 0;
    iPreIndex = 0;
    bIsOver = false;


    var $slideDiv = $('.slidepic');

    var $lis = $('.slide_list li');
    var $leftBtn = $('.leftarrow');
    var $rightBtn = $('.rightarrow');
    var $points = $('.points');
    var $PointLis = $(".points li");
    
    var iPicCount = $lis.length;
    // Init
    $lis.not(':first').css({ 'left': '760px' });
    // add points
    for (var index = 0; index < iPicCount; index++) {
        //    create node
        var $pointsli = $('<li>');
        if(index == 0){
            $pointsli.addClass("active");
        }
        // $PointLi.appendTo($pointList);
        $points.append($pointsli);

    }
    $points.delegate('li', 'click', function () {
        // point turn to active
        $(this).addClass("active").siblings().removeClass("active");
        // start animation
        iNowIndex = $(this).index();

        fnAnimation();
    })


    $leftBtn.click(function () {
        if (bIsOver) {
            return;
        }

        bIsOver = true;
        iNowIndex--;
        fnAnimation();

        $('.points li').eq(iNowIndex).addClass('active').siblings().removeClass('active');
        
    })
    $rightBtn.click(function () {
        if (bIsOver) {
            return;
        }

        bIsOver = true;
        iNowIndex++;
        fnAnimation();

        $('.points li').eq(iNowIndex).addClass('active').siblings().removeClass('active');
    })
    function fnAutoPlay() {
        iNowIndex++;
        fnAnimation();
        
        $(".points li").eq(iNowIndex).addClass("active").siblings().removeClass("active");
    }
    
    var timer = setInterval(fnAutoPlay,2000);
    // mouseenter&mouseleave
    $(".slide").mouseenter(function () {
        clearInterval(timer);
    });
    $(".slide").mouseleave(function () {
        timer = setInterval(fnAutoPlay,2000);
    });

    function fnAnimation() {
        if (iNowIndex < 0) {
            iNowIndex = iPicCount -1;
            iPreIndex = 1;

            $lis.eq(iNowIndex).css({'left':-760});
            $lis.eq(iPreIndex).css({'left':760});
            $lis.eq(iNowIndex).animate({'left':0},function () {
                bIsOver = false;
            });
            iPreIndex = iNowIndex;
            return;
        }
        if(iNowIndex >iPicCount -1){
            iNowIndex = 0;
            iPreIndex = iPicCount-1;
            
            $lis.eq(iNowIndex).css({"left":760});
            // 1.1 
            $lis.eq(iPreIndex).animate({'left':-760});

            $lis.eq(iNowIndex).animate({'left': 0},function () {
                bIsOver = false;
            });
            iPreIndex = iNowIndex;
            return;
        }

       
        // indexNum ++ leftanimation
        if (iNowIndex>iPreIndex) {
            $lis.eq(iNowIndex).css({"left":760});
            // 1.1 
            $lis.eq(iPreIndex).animate({'left':'-760'});

            
          
        }
        
        // indexNum -- rightanimation
        if (iNowIndex<iPreIndex) {

            $lis.eq(iNowIndex).css({"left":-760});
            // 1.1 rightsilde
            $lis.eq(iPreIndex).animate({'left':'760'});

        }
            $lis.eq(iNowIndex).animate({'left':'0'},function () {
                bIsOver = false;
            });
        
            iPreIndex = iNowIndex;
    }



})