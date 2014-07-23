init:
	mkdir -p src/html
	mkdir -p src/css
	mkdir -p src/js
	mkdir -p src/img
	mkdir -p build/css
	mkdir -p build/js
	mkdir -p build/img
	
	# wget -O src/js/html5shiv.js https://raw.githubusercontent.com/aFarkas/html5shiv/master/src/html5shiv.js
	wget -O src/js/jquery.min.js http://code.jquery.com/jquery-1.11.1.min.js
	wget -O src/js/bootstrap.min.js http://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js
	# wget -O src/js/angular.min.js https://ajax.googleapis.com/ajax/libs/angularjs/1.2.20/angular.min.js
	wget -O src/css/bootstrap.min.css http://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css

	# download d3 and unzip
	wget -O src/js/d3.zip https://github.com/mbostock/d3/releases/download/v3.4.11/d3.zip
	unzip src/js/d3.zip -d src/js/vendor/

	# install gulp plugins
	npm --registry=https://registry.npm.taobao.org install

publish:
	git checkout master; git push; git checkout gh-pages; git merge master; git push; git checkout master

