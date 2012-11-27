#!/usr/bin/python
#
# Get the current data from BOM - God bless them - in JSON
# Parse it, and set the colour of the CloudLight
# Theoretically.
#
import json, urllib2, sys, time, cgi, cgitb, string, urllib
import feedparser

print "Content-type: text/html"
print
cgitb.enable()

# Get the location data
form = cgi.FieldStorage()
site = urllib.unquote(form.getvalue('site'))

# Get the feed
d = feedparser.parse('http://data.one.gov.hk/dataset/2/en')
for entry in d.entries:
	#print entry.title
	parts = string.split(entry.title, ' : ')
	#print parts
	if parts[0] == site:
		pollution = parts[2]
		
colorval = 0x808080
		
# Map the value based on the chart given at http://en.wikipedia.org/wiki/Ultraviolet_index
# Which is, you know, easier than visualizing it.
if (pollution == u'High'):
	colorval = 0x92FF80
if (pollution == u'Very High'):
	colorval = 0x80FF80
if (pollution == u'Medium'):
	colorval = 0xFFFF80
if (pollution == u'Low'):
	colorval = 0xFF8080
	
colorstr = "http://localhost/cgi-bin/ajaxcolor?color=0x%6x" % colorval
print colorstr
e = urllib2.urlopen(colorstr)
