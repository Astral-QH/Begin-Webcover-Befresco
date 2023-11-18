//Hàm ready
$(function () {
    $('.main-carousel').owlCarousel({
        loop: true,
        margin: 10,
        nav: false,
        dots: true,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                items: 1
            }
        }
    });

    $('.product-home-carousel').owlCarousel({
        loop: true,
        margin: 10,
        nav: true,
        dots: false,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true,
        navText: ['<i class="fa-solid fa-caret-left"></i>',
            '<i class="fa-solid fa-caret-right"></i>'],
        responsive: {
            0: {
                items: 2,
            },
            600: {
                items: 3,
            },
            1000: {
                items: 4,
            }
        }
    });

    $('.cooking-home-carousel').owlCarousel({
        stagePadding: 100,
        loop: true,
        margin: 10,
        nav: true,
        dots: false,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true,
        navText: ['<i class="fa-solid fa-caret-left"></i>',
            '<i class="fa-solid fa-caret-right"></i>'],
        responsive: {
            0: {
                items: 2,
                stagePadding: 30,
            },
            600: {
                items: 2,
                stagePadding: 30,
            },
            1000: {
                items: 3,
                stagePadding: 100,
            }
        }
    });

    //Tạo hàm tính chỉ số BMR và TDEE
    const calculatorBmrTdee = function () {
        let gioiTinh = "";
        let chieuCao = 0;
        let tuoi = 0;
        let canNang = 0;
        let cuongDo = 0;
        let caloGiamCanNhe = 0;
        let caloGiamCan = 0;
        let caloGiamCanNhanh = 0;
        let caloTangCanNhe = 0;
        let caloTangCan = 0;
        let caloTangCanNhanh = 0;

        if ($("#radio-gender-nam").is(":checked"))
            gioiTinh = "nam";
        else
            gioiTinh = "nu";

        chieuCao = $("#input-chieu-cao").val();
        tuoi = $("#input-tuoi").val();
        canNang = $("#input-can-nang").val();

        if ($("#radio-van-dong-it").is(":checked"))
            cuongDo = "1.2";
        else if ($("#radio-van-dong-nhe").is(":checked"))
            cuongDo = "1.375";
        else if ($("#radio-van-dong-vua").is(":checked"))
            cuongDo = "1.55";
        else if ($("#radio-van-dong-nhieu").is(":checked"))
            cuongDo = "1.725";
        else
            cuongDo = "1.9";

        //Áp dụng công thức theo nam/nữ
        let bmr = 0;
        if (gioiTinh == "nu")
            //655 + [9.6 x Cân nặng (kg)] + [1.8 x Chiều cao (cm)] – (4.7 x số tuổi)
            bmr = 655 + (9.6 * canNang) + (1.8 * chieuCao) - (4.7 * tuoi);
        else
            //66 + [13.7 x Cân nặng (kg)] + [5 x Chiều cao (cm)] – (6.8 x số tuổi)
            bmr = 65 + (13.7 * canNang) + (5 * chieuCao) - (6.8 * tuoi);

        let tdee = bmr * cuongDo;

        //Làm tròn các số liệu
        bmr = Math.round(bmr);
        tdee = Math.round(tdee);

        //Tính mức độ giảm cân
        caloGiamCanNhe = tdee-250;
        caloGiamCan = tdee - 500;
        caloGiamCanNhanh = tdee - 1000;

        //Tính mức độ tăng cân
        caloTangCanNhe = tdee + 250;
        caloTangCan = tdee + 500;
        caloTangCanNhanh = tdee + 1000;

        //Kiểm tra đã nhập đủ thông tin


        //Hiển thị lên màn hình
        $("#label-standard-bmr").html(bmr);
        $("#label-standard-tdee").html(tdee);
        $("#strong-standard-calories").html(tdee);

        //Hiển thị lên màn hình giảm cân
        $("#label-giam-can-nhe").html(caloGiamCanNhe);
        $("#label-giam-can").html(caloGiamCan);
        $("#label-giam-can-nhanh").html(caloGiamCanNhanh);

        //Hiển thị lên màn hình tăng cân
        $("#label-tang-can-nhe").html(caloTangCanNhe);
        $("#label-tang-can").html(caloTangCan);
        $("#label-tang-can-nhanh").html(caloTangCanNhanh);

    }

    //Gán sự kiện cho các control tính chỉ số BMR và TDEE
    $("#radio-gender-nam, #radio-gender-nu, #input-chieu-cao, #input-tuoi, #input-can-nang").on("input", function () {
        calculatorBmrTdee();
    });

    //Gán sự kiện cho các radio cường độ vận động
    $(".calories-tool [name='radio-van-dong']").on("input", function () {
        calculatorBmrTdee();
    });

});


