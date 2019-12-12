# WAVE Server
A server to assist the run of the 
[web platform tests](https://github.com/w3c/web-platform-tests) in a single
window.

## Setup
Generate hosts file:
```
$ ./wpt make-hosts-file | sudo tee -a /etc/hosts
```
on Windows:
```
$ python wpt make-hosts-file | Out-File %SystemRoot%\System32\drivers\etc\hosts -Encoding ascii -Append
```

Generate test subset, call from WPT root directory:
```
$ ./wmas2017-subset.sh
```

Initialize WAVE Server:
```
$ ./wave init
```

Start WAVE Server:
```
$ ./wave start
```

Start Web Platform Test runner:
```
$ ./wpt serve
```

## Configuration
The default configuration is loaded from the ```config.default.json```
in the root directory. Configurations from the ```config.json```
in the same format as the ```config.default.json```override those.

Provide a different location with ```--config < path_to_config >``` as a
start parameter.

## Test Run Parameters
It is possible to parameterize a test run with various query parameters
provided with the query in the url of the initial request.

Example:
```
web-platform.test/?path=/2dcontext&types=testharness
```

### Query Parameters
Parameter|Description|Example
------|------|------
`path`|Specify tests to run. Can be directory or file. Multiple paths can be chained by using `, `. Paths with leading '/' are interpreted as absolute paths, paths without as regular expressions. (Default: ```/```)|```web-platform.test/?path=/2dcontext```
types|What types of tests to run. Possible types: ```testharness```, ```manual``` and ```reftest``` (Default: ```testharness```)|```web-platform.test/?types=testharness,manual```
`timeout`|Specify a server side timeout in ms after which a test with no result is timed out|```web-platform.test/?timeout=65000```
`token` and `resume` |Providing a token of an unfinished session will resume it.|```web-platform.test/?token=2fb0fb80-63db-4425-8a76-2ea3e6f8269d&resume=1```
