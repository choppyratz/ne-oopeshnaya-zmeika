let field_w = '50';
        let field_h = '50';
        let w_size = '15px';

        let count = 0;

        let snake_length = 1;
        let snake_arr = [];

        start();
        gen_apple();

        let up = true;
        let down = false;
        let left = false;
        let right =  false;

        function gen_apple(){
            $('div[data-x="' + Number(Math.floor(Math.random()*Number(field_w))) + '"][data-y="' + Number(Math.floor(Math.random()*Number(field_h))) + '"]').addClass('apple');
        }

        function start(){
            let z = 0;
            $('.field').css('grid-template-columns','repeat(' + field_w + ',1fr)' );
            for (let i = 0;i < field_h;i++){
                for (let j = 0; j < field_h;j++){
                    $('.field').append('<div class="w" data-x="'+ j +'" data-y="'+ i + '"></div>');
                }
            }
        
                for (let i = snake_length-1;i >= 0;i--){
                snake_arr[i] = new Array();
                snake_arr[i].push(field_w / 2);
                snake_arr[i].push(field_h / 2 + z);
                $('div[data-x="' + Number(field_w / 2) + '"][data-y="' + Number(field_h / 2 + z) + '"]').addClass('act');
                z++;
            }
        }


        function update(){
            if (up){
                let n_y = snake_arr[snake_arr.length-1][1];
                let n_x = snake_arr[snake_arr.length-1][0];
                let elem = snake_arr.shift();
                elem[1] = n_y - 1;
                elem[0] = n_x;
                snake_arr.push(elem);
            }else 
                if(down){
                    let n_y = snake_arr[snake_arr.length-1][1];
                    let n_x = snake_arr[snake_arr.length-1][0];
                    let elem = snake_arr.shift();
                    elem[1] = n_y + 1;
                    elem[0] = n_x;
                    snake_arr.push(elem);
                }else   
                    if (left){
                        let n_x = snake_arr[snake_arr.length-1][0];
                        let n_y = snake_arr[snake_arr.length-1][1];
                        let elem = snake_arr.shift();
                        elem[0] = n_x - 1;
                        elem[1] = n_y;
                        snake_arr.push(elem);   
                    }else
                        if (right){
                            let n_x = snake_arr[snake_arr.length-1][0];
                            let n_y = snake_arr[snake_arr.length-1][1];
                            let elem = snake_arr.shift();
                            elem[0] = n_x + 1;
                            elem[1] = n_y;
                            snake_arr.push(elem);
                        }
            draw();
            check_end();
            apples();
        }
        function draw(){
            $('.w').removeClass('act');
            for (let i = 0;i < snake_length;i++){ 
                $('div[data-x="' + Number(snake_arr[i][0]) + '"][data-y="' + Number(snake_arr[i][1]) + '"]').addClass('act');
            }
        }

        function check_end(){
            if (snake_arr[snake_arr.length-1][1] == -1 || snake_arr[snake_arr.length-1][1] == 51){
                    clearInterval(id); 
                    $('.rep').css('display','flex');
                    $('.rep').find('p').html('Ваш счёт: ' + count);
            }

            if (snake_arr[snake_arr.length-1][0] == -1 || snake_arr[snake_arr.length-1][0] == 51){
                    clearInterval(id); 
                    $('.rep').css('display','flex');
                    $('.rep').find('p').html('Ваш счёт: ' + count);

            }
            console.log(snake_arr);
        }

        $('button').on('click',function(){
            snake_length = 3;
            snake_arr = [];
            up = true;
            down = false;
            left = false;
            right = false;
            start();
            count = 0;
            $('span').html('Count: ' + count);
            id = setInterval(update,50);
            draw();
            $('.rep').css('display','none');
        });

        function apples(){
            if ($('div[data-x="' + Number(Number(snake_arr[snake_arr.length-1][0])) + '"][data-y="' + Number(snake_arr[snake_arr.length-1][1]) + '"]').hasClass('act'))
            if (up){
                if ($('div[data-x="' + Number(snake_arr[snake_arr.length-1][0]) + '"][data-y="' + Number(Number(snake_arr[snake_arr.length-1][1])-1) + '"]').hasClass('apple')){
                    count++;
                    $('span').html('Count: ' + count);
                    $('div[data-x="' + Number(snake_arr[snake_arr.length-1][0]) + '"][data-y="' + Number(Number(snake_arr[snake_arr.length-1][1])-1) + '"]').removeClass('apple');
                    let n_elem = [snake_arr[snake_arr.length-1][0],snake_arr[snake_arr.length-1][1]-1];
                    snake_arr.push(n_elem);
                    snake_length++;
                    gen_apple();
                }
            }else 
                if(down){
                    if ($('div[data-x="' + Number(snake_arr[snake_arr.length-1][0]) + '"][data-y="' + Number(Number(snake_arr[snake_arr.length-1][1])+1) + '"]').hasClass('apple')){
                        count++;
                        $('span').html('Count: ' + count);
                        $('div[data-x="' + Number(snake_arr[snake_arr.length-1][0]) + '"][data-y="' + Number(Number(snake_arr[snake_arr.length-1][1])+1) + '"]').removeClass('apple');
                        let n_elem = [snake_arr[snake_arr.length-1][0],snake_arr[snake_arr.length-1][1]+1];
                        snake_arr.push(n_elem);
                        snake_length++;
                        gen_apple();
                    }
                }else   
                    if (left){
                        if ($('div[data-x="' + Number(Number(snake_arr[snake_arr.length-1][0])-1) + '"][data-y="' + Number(snake_arr[snake_arr.length-1][1]) + '"]').hasClass('apple')){
                            count++;
                            $('span').html('Count: ' + count);
                            $('div[data-x="' + Number(Number(snake_arr[snake_arr.length-1][0])-1) + '"][data-y="' + Number(snake_arr[snake_arr.length-1][1]) + '"]').removeClass('apple');
                            let n_elem = [snake_arr[snake_arr.length-1][0]-1,snake_arr[snake_arr.length-1][1]];
                            snake_arr.push(n_elem);
                            snake_length++;
                            gen_apple();
                        }
                    }else
                        if (right){
                            if ($('div[data-x="' + Number(Number(snake_arr[snake_arr.length-1][0])+1) + '"][data-y="' + Number(snake_arr[snake_arr.length-1][1]) + '"]').hasClass('apple')){
                                count++;
                                $('span').html('Count: ' + count);
                                $('div[data-x="' + Number(Number(snake_arr[snake_arr.length-1][0])+1) + '"][data-y="' + Number(snake_arr[snake_arr.length-1][1]) + '"]').removeClass('apple');
                                let n_elem = [snake_arr[snake_arr.length-1][0]+1,snake_arr[snake_arr.length-1][1]];
                                snake_arr.push(n_elem);
                                snake_length++;
                                gen_apple();
                            }   
                        }
        }

        $(document).keydown(function(e) {
            console.log(e.keyCode);
            if (e.keyCode == 38){
                if (!down){
                    up = true;
                    down = false;
                    left = false;
                    right = false;
                }
            }else
                if (e.keyCode == 40){
                    if (!up){
                        up = false;
                        down = true;
                        left = false;
                        right = false;
                    }
            }else
                if (e.keyCode == 37){
                    if (!right){
                        up = false;
                        down = false;
                        left = true;
                        right = false;
                    }
            }else
                if (e.keyCode == 39){
                    if (!left){
                        up = false;
                        down = false;
                        left = false;
                        right = true;
                    }
            }
                
        });


        console.log(snake_arr);
        let id = setInterval(update,200);

        $('.w').css('width',w_size);
        $('.w').css('height',w_size);

