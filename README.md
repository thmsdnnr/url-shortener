# url-shortener
url shortening microservice

enhancements:
* log # of times redirected to link and have a "popularity" table of top-10 links shortened/visited
* more robust duplicate handling than strict URL equality (e.g., http://www.google.com and http://google.com should not have separate entries) :heavy_check_mark:
 can use some regexp to input validate :heavy_check_mark:
* prettierness
* give end user a key with shortened URL generation; store key in database; have a /delete path that takes as arguments key and shortened URL. Can only delete if key matches.
* option to have link expire in X number of days. Have "expires_on" column in db and throw deletion of this row in the batch job with below "unused" feature
* extract timestamp of db entry __ID field and have URLs expire if they haven't been used for some period (30 days?)
->alternatively add a column to each document in the collection that is "last visited" (if link exists, last_visited = now, if link doesn't exist, add link & last_visited = now). Could write a batch job to go through dB, select entries older than threshold and drop them (good programming exercise, not so great end user experience :rage:
