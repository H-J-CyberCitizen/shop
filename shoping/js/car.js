function getSum() {
    let count = 0;
    let money = 0;
    var node = 0;
    $('.itxt').each(function (i, e) {
        //i是循环次数 e是对象
        count += parseInt($(e).val());
        if (i == 0) {
            node = $(e).parent().parent().siblings('.p-price').text().slice(0, 1);
        }
        let gp = $(e).parent().parent().siblings('.p-price').text().slice(1);
        money += $(e).val() * gp;
    })
    $('.amount-sum').children('em').text(count);
    $('.price-sum').children('em').text(node + money);
}

axios({
    type: 'GET',
    url: "http://localhost:8080/api/getList",
}).then((res) => {
    console.log(res);
    let htmlStr = template('myModel', res.data)
    $('.cart-item-list').html(htmlStr)
})

var time = setTimeout(() => {
    $(function () {
        console.log(2);
        getSum();
        //全选按钮
        //input内 一般使用change事件
        $('.checkall').change(function () {
            //选中所有使用了 .j-checkbox 的控件 把他们的状态改为 .checkall 相同的状态 
            $('.j-checkbox').prop('checked', $(this).prop('checked'));
            console.log($(this).prop('checked'));
            if ($(this).prop('checked') == true) {
                $('.cart-item').each(function (i, e) {
                    //class修改，添加，taggle类不需要 . 
                    $(e).addClass('check-cart-item');
                })
            }
            else {
                $('.cart-item').each(function (i, e) {
                    //class修改，添加，taggle类不需要 . 
                    $(e).removeClass('check-cart-item');
                })
            }

        })
        //各个子选择框也能对背景操作
        $('.j-checkbox').each(function (i, e) {
            $(e).change(function () {
                if ($(this).prop('checked') == true) {
                    $(this).parents('.cart-item').addClass('check-cart-item');
                }
                else {
                    $(this).parents('.cart-item').removeClass('check-cart-item');
                }
            })

        })




        //商品增加减少
        $('.decrement').click(function () {
            let val = $(this).siblings('input').val();
            if (val > 1) {
                val--;
                $(this).siblings('input').val(val);
                //统计价格变化
                let pprice = $(this).parent().parent().siblings('.p-price')
                let price = pprice.text()
                let node = price.slice(0, 1);
                price = price.slice(1) * val;
                pprice.siblings('.p-sum').text(node + price);
            }
            else if (val == 1) {
                $(this).parents('.cart-item').remove();
            }
            getSum();
        })
        $('.increment').click(function () {
            let val = $(this).siblings('input').val();
            val++;
            $(this).siblings('input').val(val);
            let pprice = $(this).parent().parent().siblings('.p-price')
            let price = pprice.text()
            let node = price.slice(0, 1);
            price = price.slice(1) * val;
            pprice.siblings('.p-sum').text(node + price);
            getSum();
        })

        $('.itxt').change(function () {
            let pprice = $(this).parent().parent().siblings('.p-price');
            let node = pprice.text().slice(0, 1);
            let val = ($(this).val()) * (pprice.text().slice(1));
            pprice.siblings('.p-sum').text(node + val);
            getSum();
        })


    })
}, 100);
