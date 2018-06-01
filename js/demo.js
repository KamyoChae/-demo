var person = [
    { name: '张拔拔', src: '1 (1).jpg', sex: '男', des: '风一样的美男子' },
    { name: '马冬梅', src: '1 (2).jpg', sex: '女', des: '扔标杆的大姐' },
    { name: '李春生', src: '1 (3).jpg', sex: '男', des: '单杠能转80圈' },
    { name: '罗勇萍', src: '1 (4).jpg', sex: '女', des: '我是一个作家' },
    { name: '金洁洁', src: '1 (5).jpg', sex: '女', des: '春节运动会清洁工' },
    { name: '拓跋武', src: '1 (6).jpg', sex: '男', des: '清代武举人' },
    { name: '张三丰', src: '1 (7).jpg', sex: '男', des: '我不是练太极那个' },
    { name: '张洁洁', src: '1 (8).jpg', sex: '女', des: '麻衣教圣女' },
];


var oUl = document.getElementById('list-ul'); // 用于渲染列表
var oInp = document.getElementsByTagName('input')[0]; // 用于检测输入改动
var ulSex = document.getElementById('sex'); // 用于绑定点击事件
function render(list) {
    var str = '';
    list.forEach(function (ele, index) {
        str += '<li>\
        <img src="images/'+ ele.src + '">\
        <span>'+ ele.name + '</span>\
        <span>'+ ele.sex + '</span>\
        <span>'+ ele.des + '</span>\
        </li>'
    });
    oUl.innerHTML = str; // 渲染列表
}

render(person); // 初始化列表

oInp.oninput = function () { // 监听
    state.value = this.value; // 获取输入的值 存入value
    // render(filterText(value, person)); // 用filterText函数生成的值渲染列表
    render(addFn(filterFn, person));
}

function filterText(text, arr) { // 自定义一个filter方法
    return arr.filter(function (ele, index) { // arr调用filter方法
        if (ele.name.indexOf(text) !== -1) { // indexOf(text) 用于判断输入值value与该name是否有相同的值
            return true; // 符合条件的列表 返回
        }
    })
}

ulSex.addEventListener('click', function (e) { // 绑定按钮列表
    var event = e || window.event;
    document.getElementsByClassName('active')[0].classList = '' // 做点击显示
    event.target.classList.add('active')
    if (event.target.tagName = 'LI') { // 用事件源对象绑定事件
        state.getSex = event.target.getAttribute('sex'); // 获取该按钮的属性为sex的值
        // render(filterSex(getSex, person)); // 把该值和原列表传入
        console.log(state.getSex)
        render(addFn(filterFn, person))
    }

}, false);

function filterSex(sex, arr) {
    if (sex == "all") { // 如果点击的是all按钮 则返回原列表
        return arr;
    } else {
        return arr.filter(function (ele, index) { // 如果点击了其他按钮 
            if (sex == ele.sex) { // 判断点击按钮的sex属性
                return true;
            }
        })
    }

}

var state = {
    // 用于存储输入的值
    value: "",
    getSex: "all"
};

// 实现条件的对象
var filterFn = {
    // 此处的属性名必须与state一致，用于prop对应
    value: filterText,
    getSex: filterSex
}

//若不一致 该lastArr为空
function addFn(obj, arr) {
    var lastArr = arr;
    for (var prop in obj) {
        lastArr = obj[prop](state[prop], lastArr);
    }
    console.log(lastArr)
    return lastArr;
}

