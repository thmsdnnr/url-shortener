# url-shortener
url shortening microservice

enhancements:
* log # of times redirected to link and have a "popularity" table of top-10 links shortened/visited
* more robust duplicate handling than strict URL equality (e.g., http://www.google.com and http://google.com should not have separate entries) :heavy_check_mark:
 can use some regexp to input validate :heavy_check_mark:
* prettierness
* extract timestamp of db entry __ID field and have URLs expire if they haven't been used for some period (30 days?)
->alternatively add a column to each document in the collection that is "last visited" (if link exists, last_visited = now, if link doesn't exist, add link & last_visited = now). Could write a batch job to go through dB, select entries older than threshold and drop them (good programming exercise, not so great end user experience :rage:
