# url-shortener
url shortening microservice

enhancements:
1) log # of times redirected to link and have a "popularity" table of top-10 links shortened/visited
2) more robust duplicate handling than strict URL equality (e.g., http://www.google.com and http://google.com should not have separate entries)
-> can use some regexp to input validate
3) prettierness
