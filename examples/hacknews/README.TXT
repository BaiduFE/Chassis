这是基于3.0内核版本修改的兼容BAE环境的版本
在BAE环境上的使用说明
1、在使用BAE版的thinkphp之前，你一定要对thinkphp有一定的了解。thinkphp官网地址：http://thinkphp.cn/。
2、BAE平台上的限制，数据库只有mysql(thinkphp本身还支持其他的数据库，但在bae暂时只支持mysql)，不支持写文件的缓存。
3、将YourApp目录修改你的应用目录，并修改index.php里的APP_PATH，
4、引入了常用的Smarty模版
5、增加bae cache类型，BAE环境上只能使用此类型的cache,目前不支持数据压缩。文件ThinkPHP/Conf/convention.php
	里已经配置了DATA_CACHE_TYPE为bae，请不要修改。
6、DB_SQL_BUILD_CACHE默认配置为true，使用bae的方式做数据库查询的缓存，
	即模型类在调用select函数时会优先从CacheBae中取值。
7、URL模式，目前BAE环境上可以设置除了PATH INFO模式外的其他3种类型，并且app.conf示例了URL REWRITE
	模式的一种配置方式 访问类似/Bae/Action?aaa=bb 到index.php 的rewrite方法
8、数据库的支持，BAE上仅需要在ThinkPHP/Conf/convention.php配置数据库名称即可。一般只需要修改配置DB_NAME即可，
	DB_NAME设为你在云平台上申请的数据库的名字。目前由于云平台的限制，只支持mysql数据库。
9、默认的模块被设为Bae，可以自行在在文件ThinkPHP/Conf/convention.php中修改DEFAULT_MODULE配置。
10、thinkphp提供ORG.Net.UploadFile用于上传文件，由于在BAE上传的文件时存储在云存储上的，我们建议
	使用BAE云存储的SDK，参考：http://developer.baidu.com/wiki/index.php?title=%E5%B8%AE%E5%8A%A9%E6%96%87%E6%A1%A3%E9%A6%96%E9%A1%B5/%E4%BA%91%E5%AD%98%E5%82%A8#PHP_SDK
11、建议不要用thinkphp提供的Log类(该类会直接写文件，这些操作不支持)，请使用Baelog，详情参考：
	http://developer.baidu.com/wiki/index.php?title=%E5%B8%AE%E5%8A%A9%E6%96%87%E6%A1%A3/%E4%BA%91%E7%8E%AF%E5%A2%83/PHP%E6%9C%8D%E5%8A%A1%E5%88%97%E8%A1%A8/Baelog

