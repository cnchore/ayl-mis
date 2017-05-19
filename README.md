# ayl-mis
vue 1.0+axios+iview+lazyload+less+es6

## iview知识要点
1. submenu，点击后跳转页面，需进行延时操作，否则菜单未能正常收起来，从而引发对象获取错误；

2. itable，固定宽度的列之和，小于表格宽度宽度时，需在添加一空列{title:' '}，以让其填充空白；

## axios知识要点
1. 和ajax一样，只有get的jsonp方法，如果想实现post跨域请求，需后台组配合；

2. 如果后台接口，进行了session等身份验证，前端和后端项目不同域时，可使用反向代理服务，以求两者同域；

## 什么样的Contribution Github才记录
* Commits是在一年之内。（Calendar只显示一年之内的Contribution）
* 进行Commits的用户被关联到了你的Github帐号中（使用SSH方式能够不输入帐号密码进行push，如果此时你Commit的帐号不在Github帐号列表中，就不会被计入Contribution）
* 是在一个独立的版本库中进行Commit。（在Fork的仓库中进行Commit则不会被记录）
* 是在这个版本库的默认分支（通常是Master）进行的Commit。（如果你在Dev分支下进行开发，你的Commit不会被计入Contribution，但是并不会丢失它们，一旦当你Merge到Master分支后，所有的Commit都会被重新计入。多人协作也是同理，只有被并入Master分支的Commit才会被计入，如果你的Commit在合并时被组长丢弃，在Github看来，你就白干了……）

## 修改git用户名和邮箱
命令分别为：
`git config  --global user.name 你的目标用户名；`

`git config  --global user.email 你的目标邮箱名;`

## Vim知识要点
1. 退出

`ctrl+c; :quit`
