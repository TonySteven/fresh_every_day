$(function () {

        //当前的角标
        iNowIndex = 0;
        iPreIndex = 0;
        bIsOver = false;//防止左右按钮重复点击


        //1.获取图片的个数,创建对应的小圆点显示
        //1.1获取图片li标签
        var $lis = $(".slide_list li");
              //切换图片的前提其他三张图片放到右边760px
            $lis.not(":first").css({"left":760});
            
        //1.2获取li标签的个数
        var iPointsCount = $lis.length;

        //1.3获取 小圆点的 列表
        var $pointList = $(".points");

        //1.4根据个数创建 小圆点
        for (var i = 0; i < iPointsCount; i++) {
            var $PointLi = $("<li>");
            //如果是第一个小圆点,设置默认选中
            if(i == 0){
                $PointLi.addClass("active");
            }
            $PointLi.appendTo($pointList);
        }

        //2.监听小圆点的点击 动画切换图片
        //2.1获取每个小圆点
        var $PointLis = $(".points li");
        //2.2监听点击
        $PointLis.click(function () {
            //2.3实现点击当前的选中,其他的保持原状
            $(this).addClass("active").siblings().removeClass("active");
            //2.4实现 动画切换图片(前提其他三张图片放到右边760px)
            iNowIndex = $(this).index();
            //2.5根据点击的角标实现动画展示
            fnAnimation();

        })

        //3.监听左右两个按钮 切换图片
        $(".leftarrow").click(function () {
            if (bIsOver) {
                return;
            }

            bIsOver = true;
            //角标变小
            iNowIndex--;
            //切换图片
            fnAnimation();
             //小圆点切换
            $(".points li").eq(iNowIndex).addClass("active").siblings().removeClass("active");

        })
        $(".rightarrow").click(function () {
            if (bIsOver) {
               return;
           }

           bIsOver = true;
           //角标变大
           iNowIndex++;
           //切换图片
           fnAnimation();

           //小圆点切换
           $(".points li").eq(iNowIndex).addClass("active").siblings().removeClass("active");

       })

        //4.自动播放
        function fnAutoPlay(){
            iNowIndex++;
            fnAnimation();
            //小圆点切换
            $(".points li").eq(iNowIndex).addClass("active").siblings().removeClass("active");
        }
        var timer = setInterval(fnAutoPlay,3000);

        //5.鼠标悬浮和移开
        $(".slide").mouseenter(function () {
            clearInterval(timer);
        });
        $(".slide").mouseleave(function () {
            timer = setInterval(fnAutoPlay,2000);
        });

        function fnAnimation() {

            //点击左右按钮 ,需要判断角标的头和尾
            if(iNowIndex < 0){
                iNowIndex = iPointsCount-1;
                iPreIndex = 0;

                $lis.eq(iNowIndex).css({"left":-760});
                //1.前面的图片左移动
                $lis.eq(iPreIndex).animate({"left":760});
                //动画出现在展示框内
                $lis.eq(iNowIndex).animate({"left":0},function () {
                    bIsOver = false;
                });

                iPreIndex = iNowIndex;

                return;
            }

            if(iNowIndex > iPointsCount-1){
                iNowIndex = 0;
                iPreIndex = iPointsCount-1;

                $lis.eq(iNowIndex).css({"left":760});
                //1.前面的图片左移动
                $lis.eq(iPreIndex).animate({"left":-760});
                //动画出现在展示框内
                $lis.eq(iNowIndex).animate({"left":0},function () {
                    bIsOver = false;
                });

                iPreIndex = iNowIndex;

                return;
            }

            //判断 角标的大小
            //1.当前选中的大于以前的
            if(iNowIndex > iPreIndex){//从左往右点
                $lis.eq(iNowIndex).css({"left":760});
                //1.前面的图片左移动
                $lis.eq(iPreIndex).animate({"left":-760});

            }

            //2.当前选中的小于以前的
            if(iNowIndex < iPreIndex){//从右往左
                $lis.eq(iNowIndex).css({"left":-760});
                //1.前面的图片右移动
                $lis.eq(iPreIndex).animate({"left":760});
            }

            //动画出现在展示框内
            $lis.eq(iNowIndex).animate({"left":0},function () {
                    bIsOver = false;
                });
            //记录上次点击的角标
            iPreIndex = iNowIndex;

        }


    })