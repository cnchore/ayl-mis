# ayl-mis
vue 1.0+axios+iview+lazyload+less+es6

## iview知识要点
1、submenu，点击后跳转页面，需进行延时操作，否则菜单未能正常收起来，从而引发对象获取错误；
2、itable，固定宽度的列之和，小于表格宽度宽度时，需在添加一空列{title:' '}，以让其填充空白；

## axios知识要点
1、和ajax一样，只有get的jsonp方法，如果想实现post跨域请求，需后台组配合；
2、如果后台接口，进行了session等身份验证，前端和后端项目不同域时，可使用反向代理服务，以求两者同域；
