API
===

DNS - Namecoin Domain Name System
---------------------------------
**/dns/**

Used for doing dns lookups.  If domain ends with .bit namecoin lookup will
be used.

*get*

	//get
	{
		"name" : "localhost"
	}
	
	//response
	{
		"ip" : "127.0.0.1",
		"error" : ""
	}

*post*

	//post - Requires authentication
	//  May just map 1 to 1 to namecoin spec for simplicity and consistancy
	{
		"name" : "newdomain.bit",
		"ips" : ["1.2.3.4", "ns0.nameserver.org"],
		//optional
		"map" : {"<subdomain>": {"ip" : "1.2.3.4"}},
	}
	
	//response
	{
		"error" : ""

	}

*delete*

	//Nothing

Messaging - Bitmessage
----------------------

Storage
-------
###Public
###Private
###Friend

Application
-----------

Authentication
--------------

Core - Core / Global settings
-----------------------------
