Change Log
=================
All major changes to freehold will be documented here


0.2 - 2015-04-17
--------------------
* Fixed issue where request attempts weren't being reset on successful token authentications.
	* This caused access via security token to quickly overrun the *LogonAttemptRateLimit*
* New header for use with File Uploads *Fh-Modified*
	* This header allows freehold to preserve the modified date of an uploaded file.  If the header is not set, then the last modified date on the file is the upload date of the file.  The core Explorer application was also updated to capture the modified date and set the header on file uploads.
	* This option was specifically added for use with [Freehold-Sync](bitbucket.org/tshannon/freehold-sync) so if you use Freehold-Sync, make sure you have version 0.2 of Freehold or higher.
* Freehold now supports hidden files.  Before all hidden files (files that start with `.` where ignored).
* Removed the ability to generate Sessions from other Sessions or Security Tokens
* Changed datastore ordering to use better sorting method by converting non-string keys to big-endian encoded numbers so that they sort property without all the json encoding nonsense I was doing before.
* Switch Datastore format from [cznic/kv](https://github.com/cznic/kv) to [BoltDB](https://github.com/boltdb/bolt).
	* All old cznic/kv datastore files will be automatically converted to BoltDB files, at their firt load and the old files will be renamed to `.<filename>.converted`
	* All existing applications and behaviors with the old datastore should work the same with new one, and other than a one time short conversion wait, the change should be imperceptible.
* Removed the ability to change user passwords via Security  Tokens
